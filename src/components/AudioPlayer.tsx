"use client";
import { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';
import { Book } from '@/types/Book';

interface AudioPlayerProps {
  book: Book;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ book }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const setAudioData = () => {
        setDuration(audio.duration);
        setCurrentTime(audio.currentTime);
      };

      const setAudioTime = () => setCurrentTime(audio.currentTime);

      audio.addEventListener('loadeddata', setAudioData);
      audio.addEventListener('timeupdate', setAudioTime);

      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }

      return () => {
        audio.removeEventListener('loadeddata', setAudioData);
        audio.removeEventListener('timeupdate', setAudioTime);
      };
    }
  }, [isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  
  const handleSkip = (amount: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime += amount;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="audio-player__wrapper">
      <audio ref={audioRef} src={book.audioLink} preload="metadata"></audio>

      <div className="audio-player__track-info">
        <figure className="audio-player__book--image-wrapper">
            <img src={book.imageLink} alt={book.title} className="audio-player__book--image" />
        </figure>
        <div className="audio-player__book--details">
            <div className="audio-player__book--title">{book.title}</div>
            <div className="audio-player__book--author">{book.author}</div>
        </div>
      </div>

      <div className="audio-player__controls-wrapper">
        <div className="audio-player__controls">
            <button className="audio-player__btn" onClick={() => handleSkip(-10)}>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M603.3 322.2c15.2-12.2 36.3-8.8 48.5 6.4 12.2 15.2 8.8 36.3-6.4 48.5L441.2 512l204.2 134.9c15.2 12.2 18.6 33.3 6.4 48.5-12.2 15.2-33.3 18.6-48.5 6.4L373.2 538.4a32.07 32.07 0 0 1 0-52.8L603.3 322.2z"></path><path d="M896 160H128c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h768c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 664H168V232h688v592z"></path></svg>
            </button>
            <button className="audio-player__btn audio-player__play-btn" onClick={togglePlayPause}>
                {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button className="audio-player__btn" onClick={() => handleSkip(10)}>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M420.7 322.2c-15.2-12.2-36.3-8.8-48.5 6.4-12.2 15.2-8.8 36.3 6.4 48.5L582.8 512 378.6 646.9c-15.2 12.2-18.6 33.3-6.4 48.5 12.2 15.2 33.3 18.6 48.5 6.4L650.8 538.4a32.07 32.07 0 0 0 0-52.8L420.7 322.2z"></path><path d="M896 160H128c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h768c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 664H168V232h688v592z"></path></svg>
            </button>
        </div>
      </div>

      <div className="audio-player__progress-wrapper">
        <span className="audio-player__time">{formatTime(currentTime)}</span>
        <input
          type="range"
          value={currentTime}
          max={duration || 0}
          onChange={handleSeek}
          className="audio-player__progress-bar"
        />
        <span className="audio-player__time">{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default AudioPlayer;
