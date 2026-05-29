"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Configurable direct link to a high-quality Ready Player Me avatar GLB
const AVATAR_GLB_URL = "https://models.readyplayer.me/6485cf2168c4d1d91689b706.glb";

// Predefined answers for the virtual assistant
const QA_DATABASE = [
  {
    question: "Tell me about Amenda",
    answer: "Hi there! Amenda Maria Johnson is a Product Designer specializing in turning complex systems into clean, user-friendly digital products. She has designed scalable interfaces for healthcare diagnostics, adaptive learning dashboards, and public safety platforms.",
    voiceText: "Hi there! Amenda Maria Johnson is a Product Designer specializing in turning complex systems into clean, user-friendly digital products. She has designed scalable interfaces for healthcare diagnostics, adaptive learning dashboards, and public safety platforms."
  },
  {
    question: "What is her design approach?",
    answer: "Amenda's design philosophy centers on systems thinking, visual minimalism, and intuitive user journeys. She blends structured design components with custom interactive animations to craft premium, responsive user experiences.",
    voiceText: "Amenda's design philosophy centers on systems thinking, visual minimalism, and intuitive user journeys. She blends structured design components with custom interactive animations to craft premium, responsive user experiences."
  },
  {
    question: "What projects did she design?",
    answer: "She has three main case studies: 1. NeuUX AI - a responsive prompt-editor dashboard; 2. Medico - a streamlined clinical diagnostics app; and 3. Purple Movement - a platform mapping safety vectors for women. Check out the Case Studies page for full walkthroughs!",
    voiceText: "She has three main case studies: Neu U X AI, a responsive prompt editor dashboard; Medico, a streamlined clinical diagnostics app; and Purple Movement, a platform mapping safety vectors for women. Check out the Case Studies page for full walkthroughs!"
  },
  {
    question: "How can I contact her?",
    answer: "You can drop her a line using the Contact form page directly! She's also available for design consultations, contract work, and full-time positions. Check out her resume PDF in the header too.",
    voiceText: "You can drop her a line using the Contact form page directly! She is also available for design consultations, contract work, and full-time positions. Check out her resume PDF in the header too."
  }
];

export default function SpeakingAvatar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSpeech, setActiveSpeech] = useState<string>("");
  const [customQuestion, setCustomQuestion] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Three.js object references for animations
  const sceneRef = useRef<THREE.Scene | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const headBoneRef = useRef<THREE.Object3D | null>(null);
  const neckBoneRef = useRef<THREE.Object3D | null>(null);
  const speakingMeshesRef = useRef<Array<{ mesh: THREE.Mesh; jawIdx: number; mouthIdx: number }>>([]);
  const blinkingMeshesRef = useRef<Array<{ mesh: THREE.Mesh; leftIdx: number; rightIdx: number }>>([]);

  // Mouse coords relative to canvas for eye-tracking
  const mouseCoordsRef = useRef({ x: 0, y: 0 });

  // Handle initialization of the 3D scene
  useEffect(() => {
    if (!isOpen || !canvasRef.current || !containerRef.current) return;

    setIsLoading(true);
    setLoadError(false);

    const canvas = canvasRef.current;
    const container = containerRef.current;

    // 1. Create Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      35,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    // Position camera focused close on the upper chest and head
    camera.position.set(0, 1.45, 0.65);
    camera.lookAt(0, 1.45, 0);

    // 2. Renderer (transparent background for glassmorphic card integration)
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(2, 4, 3);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe0f2fe, 1.0); // soft blue tone fill
    fillLight.position.set(-2, 2, 2);
    scene.add(fillLight);

    // 4. Load GLTF Avatar Model
    const loader = new GLTFLoader();
    
    loader.load(
      AVATAR_GLB_URL,
      (gltf) => {
        const model = gltf.scene;
        modelRef.current = model;

        // Position the model so chest and head align nicely with the camera view
        model.position.set(0, 0, 0);
        scene.add(model);

        // Find key bones and morph targets
        speakingMeshesRef.current = [];
        blinkingMeshesRef.current = [];

        model.traverse((child) => {
          // Identify bones
          if (child.name === "Head") headBoneRef.current = child;
          if (child.name === "Neck") neckBoneRef.current = child;

          // Identify meshes with morph targets (blendshapes)
          if ((child as THREE.Mesh).isMesh && (child as THREE.Mesh).morphTargetDictionary) {
            const mesh = child as THREE.Mesh;
            const dict = mesh.morphTargetDictionary!;

            const jawIdx = dict["jawOpen"] !== undefined ? dict["jawOpen"] : -1;
            const mouthIdx = dict["mouthOpen"] !== undefined ? dict["mouthOpen"] : -1;

            if (jawIdx !== -1 || mouthIdx !== -1) {
              speakingMeshesRef.current.push({ mesh, jawIdx, mouthIdx });
            }

            const leftIdx = dict["eyeBlinkLeft"] !== undefined ? dict["eyeBlinkLeft"] : -1;
            const rightIdx = dict["eyeBlinkRight"] !== undefined ? dict["eyeBlinkRight"] : -1;

            if (leftIdx !== -1 || rightIdx !== -1) {
              blinkingMeshesRef.current.push({ mesh, leftIdx, rightIdx });
            }
          }
        });

        setIsLoading(false);
      },
      undefined,
      (error) => {
        console.error("Error loading avatar GLB:", error);
        setLoadError(true);
        setIsLoading(false);
      }
    );

    // 5. Animation Loop variables
    let clock = new THREE.Clock();
    let blinkTimer = 0;
    let isBlinking = false;

    // 6. Handle update loop
    const animate = () => {
      const time = clock.getElapsedTime();
      const deltaTime = clock.getDelta();

      // Breathing idle animation (slight up and down translation)
      if (modelRef.current) {
        modelRef.current.position.y = Math.sin(time * 1.6) * 0.008;
        modelRef.current.rotation.y = Math.sin(time * 0.6) * 0.02;
      }

      // Neck follow cursor (smooth interpolation)
      if (neckBoneRef.current) {
        const targetRotY = mouseCoordsRef.current.x * 0.28; // Max 16 deg yaw
        const targetRotX = mouseCoordsRef.current.y * 0.16; // Max 9 deg pitch
        neckBoneRef.current.rotation.y += (targetRotY - neckBoneRef.current.rotation.y) * 0.08;
        neckBoneRef.current.rotation.x += (targetRotX - neckBoneRef.current.rotation.x) * 0.08;
      }

      // Blink animation cycle
      blinkTimer += deltaTime;
      if (!isBlinking && blinkTimer > 2.5 + Math.random() * 3.5) {
        isBlinking = true;
        blinkTimer = 0;
      }

      if (isBlinking) {
        const duration = 0.14; // 140ms
        const progress = blinkTimer / duration;
        let blinkVal = 0;

        if (progress <= 0.5) {
          blinkVal = progress * 2; // close
        } else if (progress <= 1.0) {
          blinkVal = 2 - progress * 2; // open
        } else {
          isBlinking = false;
          blinkTimer = 0;
        }

        blinkingMeshesRef.current.forEach(({ mesh, leftIdx, rightIdx }) => {
          if (mesh.morphTargetInfluences) {
            if (leftIdx !== -1) mesh.morphTargetInfluences[leftIdx] = blinkVal;
            if (rightIdx !== -1) mesh.morphTargetInfluences[rightIdx] = blinkVal;
          }
        });
      }

      // Mouth speaking animation loop
      const speaking = window.speechSynthesis && window.speechSynthesis.speaking;
      setIsSpeaking(speaking);

      if (speaking) {
        // Oscillation waves to simulate human lipsync movements
        const mouthOpenValue = (Math.sin(time * 18) * 0.35 + 0.35) * (0.8 + Math.random() * 0.25);
        speakingMeshesRef.current.forEach(({ mesh, jawIdx, mouthIdx }) => {
          if (mesh.morphTargetInfluences) {
            if (jawIdx !== -1) mesh.morphTargetInfluences[jawIdx] = mouthOpenValue;
            if (mouthIdx !== -1) mesh.morphTargetInfluences[mouthIdx] = mouthOpenValue * 0.4;
          }
        });
      } else {
        // Return mouth shape to closed state smoothly
        speakingMeshesRef.current.forEach(({ mesh, jawIdx, mouthIdx }) => {
          if (mesh.morphTargetInfluences) {
            if (jawIdx !== -1 && mesh.morphTargetInfluences[jawIdx] > 0) {
              mesh.morphTargetInfluences[jawIdx] += (0 - mesh.morphTargetInfluences[jawIdx]) * 0.25;
            }
            if (mouthIdx !== -1 && mesh.morphTargetInfluences[mouthIdx] > 0) {
              mesh.morphTargetInfluences[mouthIdx] += (0 - mesh.morphTargetInfluences[mouthIdx]) * 0.25;
            }
          }
        });
      }

      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    // Mouse movement listener on the container card for eye tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
      mouseCoordsRef.current = { x, y };
    };

    container.addEventListener("mousemove", handleMouseMove);

    // Resize listener
    const handleResize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      container.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      scene.clear();
    };
  }, [isOpen]);

  // Clean up any speaking when closed
  useEffect(() => {
    if (!isOpen) {
      handleStopSpeaking();
    }
  }, [isOpen]);

  // Trigger speech synthesis
  const handleSpeak = (text: string, voiceText?: string) => {
    if (!window.speechSynthesis) return;

    // Stop current speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(voiceText || text);
    speechUtteranceRef.current = utterance;

    // Find a clear, natural English voice in client browser
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(
      (v) =>
        v.lang.startsWith("en-") &&
        (v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Zira") || v.name.includes("Samantha"))
    ) || voices.find((v) => v.lang.startsWith("en-"));

    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.rate = 1.02; // slightly faster natural rate
    utterance.pitch = 1.05; // slightly higher pitch

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    setActiveSpeech(text);
    window.speechSynthesis.speak(utterance);
  };

  const handleStopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setActiveSpeech("");
  };

  // Handle custom typed question
  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;

    const lowerQ = customQuestion.toLowerCase();
    let answer = "I'm Amenda's 3D design assistant. I can tell you about her projects, experience, and skills! Try asking about her design philosophy or projects.";
    let voiceText = answer;

    if (lowerQ.includes("who") || lowerQ.includes("amenda") || lowerQ.includes("yourself")) {
      answer = QA_DATABASE[0].answer;
      voiceText = QA_DATABASE[0].voiceText;
    } else if (lowerQ.includes("design") || lowerQ.includes("philosophy") || lowerQ.includes("approach")) {
      answer = QA_DATABASE[1].answer;
      voiceText = QA_DATABASE[1].voiceText;
    } else if (lowerQ.includes("project") || lowerQ.includes("case") || lowerQ.includes("work")) {
      answer = QA_DATABASE[2].answer;
      voiceText = QA_DATABASE[2].voiceText;
    } else if (lowerQ.includes("contact") || lowerQ.includes("reach") || lowerQ.includes("email") || lowerQ.includes("hire")) {
      answer = QA_DATABASE[3].answer;
      voiceText = QA_DATABASE[3].voiceText;
    } else if (lowerQ.includes("hello") || lowerQ.includes("hi ") || lowerQ.includes("hey")) {
      answer = "Hello! Nice to meet you. Ask me anything about Amenda's design portfolio!";
      voiceText = answer;
    } else if (lowerQ.includes("skill") || lowerQ.includes("tools") || lowerQ.includes("use")) {
      answer = "Amenda is skilled in Figma, Design Systems, HTML/CSS/JS, Next.js, and User Research. She builds clean component libraries and high fidelity prototypes.";
      voiceText = answer;
    }

    handleSpeak(answer, voiceText);
    setCustomQuestion("");
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        className={`speaking-avatar-trigger ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle 3D Assistant"
      >
        <span className="avatar-status-ring"></span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          {isOpen ? (
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          ) : (
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
          )}
        </svg>
      </button>

      {/* Main Glassmorphic Assistant Card */}
      {isOpen && (
        <div className="speaking-avatar-container" ref={containerRef}>
          {/* Header */}
          <div className="avatar-header">
            <div className="avatar-title-block">
              <div className="active-dot"></div>
              <span>AMJ AI Assistant</span>
            </div>
            <button className="avatar-close-btn" onClick={() => setIsOpen(false)}>×</button>
          </div>

          {/* 3D Canvas viewport */}
          <div className="avatar-viewport-container">
            <canvas ref={canvasRef} className="avatar-canvas" />

            {isLoading && (
              <div className="avatar-loader">
                <div className="loader-spinner"></div>
                <span>Syncing 3D Model...</span>
              </div>
            )}

            {loadError && (
              <div className="avatar-loader error">
                <span>Model Load Timeout. Check connection.</span>
              </div>
            )}

            {isSpeaking && (
              <div className="speech-waveform">
                <span></span><span></span><span></span><span></span>
              </div>
            )}
          </div>

          {/* Response bubble and controls */}
          <div className="avatar-interaction-panel">
            <div className="avatar-response-box">
              {activeSpeech ? (
                <p className="typing-text">{activeSpeech}</p>
              ) : (
                <p className="default-bubble">
                  Hi! I am Amenda's 3D AI assistant. Click one of the questions below or type your own, and I will speak the answer!
                </p>
              )}
            </div>

            {/* Quick Prompts */}
            <div className="avatar-prompts-grid">
              {QA_DATABASE.map((qa, index) => (
                <button
                  key={index}
                  className="prompt-pill-btn"
                  onClick={() => handleSpeak(qa.answer, qa.voiceText)}
                  disabled={isLoading}
                >
                  {qa.question}
                </button>
              ))}
            </div>

            {/* Stop Speaking button if active */}
            {isSpeaking && (
              <button className="avatar-stop-btn" onClick={handleStopSpeaking}>
                Stop Speaking
              </button>
            )}

            {/* Custom Question input */}
            <form onSubmit={handleCustomSubmit} className="avatar-custom-form">
              <input
                type="text"
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                placeholder="Ask me something..."
                disabled={isLoading}
                maxLength={80}
              />
              <button type="submit" disabled={isLoading || !customQuestion.trim()} aria-label="Send">
                →
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
