'use client';

import { useState, useRef, useEffect } from 'react';

// === CONFIG: Timing Dipercepat untuk lagu 32 Detik ===
const lyricsConfig = [
  { 
    time: 2, 
    duration: 3, 
    text: "Looking back on the things I've done", 
    images: ['foto1.jpg', 'foto2.jpg'] 
  },
  { 
    time: 5, 
    duration: 3,
    text: "I was trying to be someone (trying to be someone)", 
    images: ['foto3.jpg'] 
  },
  { 
    time: 8, 
    duration: 3,
    text: "Played my part, kept you in the dark", 
    images: ['foto4.jpg', 'foto5.jpg'] 
  },
  { 
    time: 11, 
    duration: 4,
    text: "Now let me show you the shape of my heart", 
    images: ['foto6.jpg', 'foto7.jpg'] 
  },
  { 
    time: 15, 
    duration: 3,
    text: "Looking back on the things I've done", 
    images: ['foto8.jpg'] 
  },
  { 
    time: 18, 
    duration: 3,
    text: "I was tryin' to be someone", 
    images: ['foto9.jpg', 'foto10.jpg'] 
  },
  { 
    time: 21, 
    duration: 3,
    text: "Played my part, kept you in the dark", 
    images: ['foto11.jpg', 'foto12.jpg'] 
  },
  { 
    time: 24, 
    duration: 3,
    text: "Now let me show you the shape of", 
    images: ['foto13.jpg'] 
  },
  { 
    time: 27, 
    duration: 5,
    text: "Show you the shape of my heart", 
    images: ['foto14.jpg', 'foto15.jpg'] 
  },
];

export default function SpaceSymphonyShort() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLyric, setActiveLyric] = useState<typeof lyricsConfig[0] | null>(null);
  const [currentBgImage, setCurrentBgImage] = useState<string | null>(null);

  const startExperience = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      const time = audio.currentTime;
      const lyric = lyricsConfig.find(item => time >= item.time && time < (item.time + item.duration));

      if (lyric && lyric !== activeLyric) {
        setActiveLyric(lyric);
        if (lyric.images && lyric.images.length > 0) {
          setCurrentBgImage(lyric.images[0]);
        }
      } else if (!lyric) {
        setActiveLyric(null);
        setCurrentBgImage(null);
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
  }, [activeLyric]);

  useEffect(() => {
    if (activeLyric && activeLyric.images.length > 1) {
      const intervalTime = (activeLyric.duration * 1000) / activeLyric.images.length;
      let imgIndex = 0;

      const imageInterval = setInterval(() => {
        imgIndex = (imgIndex + 1) % activeLyric.images.length;
        setCurrentBgImage(activeLyric.images[imgIndex]);
      }, intervalTime);

      return () => clearInterval(imageInterval);
    }
  }, [activeLyric]);

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen w-full bg-[#050505] text-white overflow-hidden">
      <audio ref={audioRef} src="/song.mp3" />

      {/* Background Bintang Neon */}
      <div className="absolute inset-0 z-0">
        <div id="stars"></div>
        <div id="stars2"></div>
      </div>

      {/* Background Foto Cinematic */}
      <div 
        className="absolute inset-0 z-10 bg-cover bg-center transition-all duration-[1000ms] ease-in-out scale-110"
        style={{ 
          backgroundImage: currentBgImage ? `url(/${currentBgImage})` : 'none',
          opacity: currentBgImage ? 0.5 : 0,
          filter: 'brightness(0.6) contrast(1.2)'
        }}
      />
      
      <div className="absolute inset-0 z-20 bg-black/40" />

      {!isPlaying && (
        <button 
          onClick={startExperience}
          className="z-50 px-8 py-4 border-2 border-[#00f2ff] text-[#00f2ff] text-xl font-bold rounded-full hover:bg-[#00f2ff] hover:text-black transition-all duration-500 shadow-[0_0_20px_#00f2ff] animate-pulse"
        >
          FOR MY EVERYTHING
        </button>
      )}

      {/* Lirik Neon */}
      {isPlaying && activeLyric && (
        <div className="z-40 text-center px-6">
          <p 
            className="text-3xl md:text-5xl font-bold tracking-tight italic"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: '#fff',
              textShadow: '0 0 10px #fff, 0 0 20px #00f2ff, 0 0 40px #00f2ff',
              transform: 'perspective(500px) rotateX(5deg)'
            }}
          >
            {activeLyric.text}
          </p>
        </div>
      )}
    </main>
  );
}
