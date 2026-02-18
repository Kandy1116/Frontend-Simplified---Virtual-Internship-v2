'use client';
import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

interface AudioPlayerProps {
  src: string;
  duration: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, duration }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleEnded = () => setIsPlaying(false);
      audio.addEventListener('ended', handleEnded);
      return () => {
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, []);

  return (
    <div className="audio-player">
      <audio ref={audioRef} src={src} />
      <button onClick={togglePlayPause} className="audio-player__play-btn">
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      <span className="audio-player__duration">{duration}</span>
    </div>
  );
};

export default AudioPlayer;
