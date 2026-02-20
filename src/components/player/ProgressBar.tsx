import React from 'react';

interface ProgressBarProps {
  progressBarRef: React.RefObject<HTMLInputElement>;
  duration: number;
  currentTime: number;
  onTimeChange: () => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progressBarRef, duration, currentTime, onTimeChange }) => {

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  return (
    <div className="progress-bar">
        <span>{formatTime(currentTime)}</span>
        <input 
            type="range" 
            ref={progressBarRef} 
            defaultValue="0" 
            onChange={onTimeChange} 
            className="progress-bar__input"
            max={duration}
            value={currentTime}
        />
        <span>{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;
