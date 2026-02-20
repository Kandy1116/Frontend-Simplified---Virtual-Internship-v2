"use client";

import { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

const AudioPlayer = ({ book }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioPlayer = useRef();
  const progressBar = useRef();
  const animationRef = useRef();

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  }

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  }

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  }

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  }

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`);
    setCurrentTime(progressBar.current.value);
  }

  const backThirty = () => {
    progressBar.current.value = Number(progressBar.current.value) - 30;
    changeRange();
  }

  const forwardThirty = () => {
    progressBar.current.value = Number(progressBar.current.value) + 30;
    changeRange();
  }

  return (
    <div className="audio-player__container">
      <div className="audio-player__image--wrapper">
        <img src={book.imageLink} alt={book.title} />
      </div>
      <h2 className="audio-player__title">{book.title}</h2>
      <h3 className="audio-player__author">{book.author}</h3>
      <audio ref={audioPlayer} src={book.audioLink} preload="metadata"></audio>
      <div className="audio-player__controls">
        <button className="audio-player__btn" onClick={backThirty}><FaStepBackward /> 30</button>
        <button onClick={togglePlayPause} className="audio-player__btn audio-player__btn--play">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button className="audio-player__btn" onClick={forwardThirty}>30 <FaStepForward /></button>
      </div>
      <div className="audio-player__progress-bar">
        <div>{calculateTime(currentTime)}</div>
        <input type="range" defaultValue="0" ref={progressBar} onChange={changeRange} />
        <div>{(duration && !isNaN(duration)) && calculateTime(duration)}</div>
      </div>
    </div>
  );
}

const PlayerPage = () => {
    const { id } = useParams();
    const { data: book, error } = useSWR(
        id ? `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}` : null,
        fetcher
    );

    if (error) return <div>Failed to load</div>;
    if (!book) return (
        <div className="skeleton audio-player__container">
            <div className="skeleton audio-player__image--wrapper"></div>
            <div className="skeleton audio-player__title"></div>
            <div className="skeleton audio-player__author"></div>
            <div className="skeleton audio-player__controls"></div>
            <div className="skeleton audio-player__progress-bar"></div>
        </div>
    );

    return <AudioPlayer book={book} />
}

export default PlayerPage;

