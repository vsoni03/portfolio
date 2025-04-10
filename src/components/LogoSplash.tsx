import React, { useEffect, useRef, useState } from "react";
import "../stylesheets/Logo.css";
import ProfileSelection from "./ProfileSelection.tsx";

const LogoSplash: React.FC = () => {
  const letters = ["V", "R", "U", "T", "I"];
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [started, setStarted] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [showStreaks, setShowStreaks] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [showProfiles, setShowProfiles] = useState(false);

  useEffect(() => {
    const handleFirstClick = () => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => setStarted(true))
          .catch((err) => console.error("Audio failed to play:", err));
        window.removeEventListener("click", handleFirstClick);
      }
    };

    let zoomTimer: NodeJS.Timeout;
    let streakTimer: NodeJS.Timeout;
    let fadeTimer: NodeJS.Timeout;
    let profileTimer: NodeJS.Timeout;

    if (started) {
      // triggers zoom, rainbow streaks, and then fades
      zoomTimer = setTimeout(() => setZoom(true), 3000);
      streakTimer = setTimeout(() => setShowStreaks(true), 3500);
      fadeTimer = setTimeout(() => setFadeOut(true), 4500);
      profileTimer = setTimeout(() => setShowProfiles(true), 5100);
    }

    window.addEventListener("click", handleFirstClick);
    return () => {
      window.removeEventListener("click", handleFirstClick);
      clearTimeout(zoomTimer);
      clearTimeout(streakTimer);
      clearTimeout(fadeTimer);
      clearTimeout(profileTimer);
    };
  }, [started]);

  if (showProfiles) return <ProfileSelection />;

  return (
    <div className="relative h-screen w-screen bg-black flex items-center justify-center overflow-hidden">
      <audio ref={audioRef} src="/nouveau-jingle-netflix.mp3" preload="auto" />
      {/* {Shows the streaks} */}
      {started && showStreaks && (
        <div className="netflix-streaks z-0 pointer-events-none" />
      )}
      {started && (
        <div className="flex z-10 text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight font-[Bebas Neue] glow-animated">
          {letters.map((letter, index) => (
            <span
              key={index}
              className={`letter letter-${index} inline-block ${
                zoom ? "zoom-in" : ""
              }`}
            >
              {letter}
            </span>
          ))}
        </div>
      )}
      {/* {Fades into the blackness for netflix page} */}
      {fadeOut && (
        <div className="absolute top-0 left-0 w-full h-full bg-black fade-to-black z-20" />
      )}
    </div>
  );
};

export default LogoSplash;
