import React, { useState, useRef, useEffect } from 'react';
import { Book } from '@/types/Book';
import TrackInfo from './TrackInfo';
import Controls from './Controls';
import ProgressBar from './ProgressBar';

interface AudioPlayerProps {
  book: Book;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ book }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const setAudioData = () => {
        setDuration(audio.duration);
        setCurrentTime(audio.currentTime);
      }

      const setAudioTime = () => setCurrentTime(audio.currentTime);

      audio.addEventListener('loadeddata', setAudioData);
      audio.addEventListener('timeupdate', setAudioTime);

      return () => {
        audio.removeEventListener('loadeddata', setAudioData);
        audio.removeEventListener('timeupdate', setAudioTime);
      }
    }
  }, []);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleTimeChange = () => {
    if (audioRef.current && progressBarRef.current) {
      audioRef.current.currentTime = Number(progressBarRef.current.value);
    }
  };

  const skipTime = (time: number) => {
    if (audioRef.current) {
        audioRef.current.currentTime += time;
    }
  };

  return (
    <div className="audio-player">
      <audio ref={audioRef} src={book.audioLink} />
      <TrackInfo book={book} />
      <div className="audio-player__main">
        <Controls isPlaying={isPlaying} onPlayPauseClick={togglePlayPause} onSkipClick={skipTime} />
        <ProgressBar 
            progressBarRef={progressBarRef} 
            duration={duration} 
            currentTime={currentTime} 
            onTimeChange={handleTimeChange}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
