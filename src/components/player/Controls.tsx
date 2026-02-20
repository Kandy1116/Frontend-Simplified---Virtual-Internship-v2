import React from 'react';
import { FaPlay, FaPause, FaUndo, FaRedo } from 'react-icons/fa';

interface ControlsProps {
  isPlaying: boolean;
  onPlayPauseClick: () => void;
  onSkipClick: (time: number) => void;
}

const Controls: React.FC<ControlsProps> = ({ isPlaying, onPlayPauseClick, onSkipClick }) => {
  return (
    <div className="controls">
      <button className="controls__btn" onClick={() => onSkipClick(-10)}>
        <FaUndo />
        <span>10</span>
      </button>
      <button className="controls__btn controls__btn--play" onClick={onPlayPauseClick}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      <button className="controls__btn" onClick={() => onSkipClick(10)}>
        <FaRedo />
        <span>10</span>
      </button>
    </div>
  );
};

export default Controls;
