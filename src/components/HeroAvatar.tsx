"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const DEFAULT_CDN_AVATAR = "https://models.readyplayer.me/6485cf2168c4d1d91689b706.glb";

export default function HeroAvatar() {
  const [activeSpeech, setActiveSpeech] = useState<string>("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isBlocked, setIsBlocked] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Three.js references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const neckBoneRef = useRef<THREE.Object3D | null>(null);
  const headBoneRef = useRef<THREE.Object3D | null>(null);
  const speakingMeshesRef = useRef<Array<{ mesh: THREE.Mesh; jawIdx: number; mouthIdx: number }>>([]);
  const blinkingMeshesRef = useRef<Array<{ mesh: THREE.Mesh; leftIdx: number; rightIdx: number }>>([]);

  const mouseCoordsRef = useRef({ x: 0, y: 0 });

  // Initialize the 3D Avatar scene
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    setIsLoading(true);
    const canvas = canvasRef.current;
    const container = containerRef.current;

    // 1. Create Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      32,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    // Camera framing focused on upper torso and head for high realistic impact
    camera.position.set(0, 1.43, 0.58);
    camera.lookAt(0, 1.43, 0);

    // 2. WebGL Renderer with alpha transparency and high pixel ratio
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 3. Premium Studio Lighting (gives 3D depth and realism)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    // Dynamic front-right key light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(1.5, 3, 2.5);
    scene.add(keyLight);

    // Soft teal fill light from left to blend with default themes
    const fillLight = new THREE.DirectionalLight(0xbae6fd, 1.2);
    fillLight.position.set(-1.5, 1.5, 1.5);
    scene.add(fillLight);

    // Top rim light to highlight shoulders
    const rimLight = new THREE.DirectionalLight(0xffffff, 1.5);
    rimLight.position.set(0, 4, -2);
    scene.add(rimLight);

    // 4. Resolve Model Path & Load GLB
    const loader = new GLTFLoader();

    const loadAvatar = (url: string) => {
      loader.load(
        url,
        (gltf) => {
          const model = gltf.scene;
          modelRef.current = model;

          model.position.set(0, 0, 0);
          scene.add(model);

          speakingMeshesRef.current = [];
          blinkingMeshesRef.current = [];

          model.traverse((child) => {
            if (child.name === "Head") headBoneRef.current = child;
            if (child.name === "Neck") neckBoneRef.current = child;

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
          setHasLoaded(true);
        },
        undefined,
        (error) => {
          console.error("Failed loading target GLB:", error);
          if (url !== DEFAULT_CDN_AVATAR) {
            console.log("Retrying with CDN fallback...");
            loadAvatar(DEFAULT_CDN_AVATAR);
          } else {
            setIsLoading(false);
          }
        }
      );
    };

    // Check if custom avatar exists in public folder
    const checkAndLoad = async () => {
      try {
        const response = await fetch("/my_avatar.glb", { method: "HEAD" });
        if (response.status === 200) {
          loadAvatar("/my_avatar.glb");
        } else {
          const fallbackRes = await fetch("/profile.glb", { method: "HEAD" });
          if (fallbackRes.status === 200) {
            loadAvatar("/profile.glb");
          } else {
            loadAvatar(DEFAULT_CDN_AVATAR);
          }
        }
      } catch (err) {
        loadAvatar(DEFAULT_CDN_AVATAR);
      }
    };

    checkAndLoad();

    // 5. Animation loop
    const clock = new THREE.Clock();
    let blinkTimer = 0;
    let isBlinking = false;

    const animate = () => {
      const time = clock.getElapsedTime();
      const deltaTime = clock.getDelta();

      // Smooth idle movements (breathing + micro-sway)
      if (modelRef.current) {
        modelRef.current.position.y = Math.sin(time * 1.8) * 0.006;
        modelRef.current.rotation.y = Math.sin(time * 0.5) * 0.015;
      }

      // Neck follow cursor (smooth horizontal/vertical easing)
      if (neckBoneRef.current) {
        const targetRotY = mouseCoordsRef.current.x * 0.28;
        const targetRotX = mouseCoordsRef.current.y * 0.16;
        neckBoneRef.current.rotation.y += (targetRotY - neckBoneRef.current.rotation.y) * 0.08;
        neckBoneRef.current.rotation.x += (targetRotX - neckBoneRef.current.rotation.x) * 0.08;
      }

      // Blink animation loop
      blinkTimer += deltaTime;
      if (!isBlinking && blinkTimer > 2.2 + Math.random() * 3.5) {
        isBlinking = true;
        blinkTimer = 0;
      }

      if (isBlinking) {
        const duration = 0.13; // 130ms
        const progress = blinkTimer / duration;
        let blinkVal = 0;

        if (progress <= 0.5) {
          blinkVal = progress * 2;
        } else if (progress <= 1.0) {
          blinkVal = 2 - progress * 2;
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

      // Lipsync mouth animation loop
      const speaking = window.speechSynthesis && window.speechSynthesis.speaking;
      setIsSpeaking(speaking);

      if (speaking) {
        // Oscillation logic mimicking phoneme mouth shapes
        const mouthOpenValue = (Math.sin(time * 20) * 0.35 + 0.35) * (0.8 + Math.random() * 0.22);
        speakingMeshesRef.current.forEach(({ mesh, jawIdx, mouthIdx }) => {
          if (mesh.morphTargetInfluences) {
            if (jawIdx !== -1) mesh.morphTargetInfluences[jawIdx] = mouthOpenValue;
            if (mouthIdx !== -1) mesh.morphTargetInfluences[mouthIdx] = mouthOpenValue * 0.3;
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

    // Track mouse coordinates within the hero card for head following
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseCoordsRef.current = { x, y };
    };

    container.addEventListener("mousemove", handleMouseMove);

    // Resize viewport listener
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
  }, []);

  // Try to speak greeting after loading completes
  useEffect(() => {
    if (hasLoaded && !isLoading) {
      // Delay slightly for smooth page visual transition
      const timer = setTimeout(() => {
        handleTriggerGreeting();
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [hasLoaded, isLoading]);

  const handleTriggerGreeting = () => {
    const greetingText = "Hai, I am amenda, Happy to see you here.";
    if (!window.speechSynthesis) return;

    // Check if speechSynthesis can speak immediately
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(greetingText);
    speechUtteranceRef.current = utterance;

    // Resolve voice
    const voices = window.speechSynthesis.getVoices();
    const cleanVoice = voices.find(
      (v) =>
        v.lang.startsWith("en-") &&
        (v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Zira") || v.name.includes("Samantha"))
    ) || voices.find((v) => v.lang.startsWith("en-"));

    if (cleanVoice) {
      utterance.voice = cleanVoice;
    }

    utterance.rate = 1.0;
    utterance.pitch = 1.05;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsBlocked(false);
      setActiveSpeech(greetingText);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = (event) => {
      setIsSpeaking(false);
      // If blocked by browser autoplay rules
      if (event.error === "not-allowed") {
        setIsBlocked(true);
      }
    };

    window.speechSynthesis.speak(utterance);

    // A fallback check: if the speech is not running and we don't start within 200ms, assume blocked
    setTimeout(() => {
      if (!window.speechSynthesis.speaking) {
        setIsBlocked(true);
      }
    }, 200);
  };

  const handleMutedSpeechClick = () => {
    setIsBlocked(false);
    handleTriggerGreeting();
  };

  return (
    <div className="hero-avatar-card reveal delay-3" ref={containerRef}>
      {/* 3D Viewport */}
      <div className="hero-avatar-viewport">
        <canvas ref={canvasRef} className="hero-canvas-el" />

        {isLoading && (
          <div className="hero-avatar-loading">
            <div className="hero-spinner"></div>
            <span>Preparing 3D Experience...</span>
          </div>
        )}

        {isSpeaking && (
          <div className="hero-waveform-overlay">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
        )}
      </div>

      {/* Greeting Bubble & Interactive Button */}
      <div className="hero-avatar-speech-panel">
        {isBlocked && (
          <button className="hero-unmute-btn" onClick={handleMutedSpeechClick}>
            <span className="unmute-icon">🔊</span> Hear Welcome Greeting
          </button>
        )}

        {activeSpeech && !isBlocked && (
          <div className="hero-speech-bubble">
            <p className="hero-bubble-text">{activeSpeech}</p>
          </div>
        )}

        {!activeSpeech && !isBlocked && !isLoading && (
          <button className="hero-speak-again-btn" onClick={handleTriggerGreeting}>
            👋 Click to Say Hello
          </button>
        )}
      </div>
    </div>
  );
}
