'use client';
import { useState, useEffect, useRef } from 'react';
import useSWR from 'swr';
import { Book } from '../../types/Book';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const AudioPlayer = ({ id }: { id: string }) => {
  const { data: book, error } = useSWR<Book>(
    `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`,
    fetcher
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioPlayer = useRef<HTMLAudioElement>(null);
  const progressBar = useRef<HTMLInputElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (book && audioPlayer.current) {
      const seconds = Math.floor(audioPlayer.current.duration);
      setDuration(seconds);
      if (progressBar.current) {
        progressBar.current.max = seconds.toString();
      }
    }
  }, [book, audioPlayer?.current?.onloadedmetadata, audioPlayer?.current?.readyState]);

  const calculateTime = (secs: number) => {
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
      audioPlayer.current?.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current?.pause();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  }

  const whilePlaying = () => {
    if (progressBar.current && audioPlayer.current) {
        progressBar.current.value = audioPlayer.current.currentTime.toString();
        changePlayerCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying);
    }
  }

  const changeRange = () => {
    if (audioPlayer.current && progressBar.current) {
        audioPlayer.current.currentTime = Number(progressBar.current.value);
        changePlayerCurrentTime();
    }
  }

  const changePlayerCurrentTime = () => {
    if (progressBar.current) {
        const value = Number(progressBar.current.value);
        setCurrentTime(value);
        progressBar.current.style.setProperty('--seek-before-width', `${value / duration * 100}%`)
    }
  }

  const backThirty = () => {
    if (progressBar.current) {
        progressBar.current.value = (Number(progressBar.current.value) - 30).toString();
        changeRange();
    }
  }

  const forwardThirty = () => {
    if (progressBar.current) {
        progressBar.current.value = (Number(progressBar.current.value) + 30).toString();
        changeRange();
    }
  }


  if (error) return <div className="wrapper">Failed to load book.</div>;
  if (!book) return <div className="wrapper">Loading...</div>;

  return (
    <div className="audio-player__container">
        <figure className="audio-player__image--wrapper">
            <img src={book.imageLink} alt={book.title} />
        </figure>
        <h2 className="audio-player__title">{book.title}</h2>
        <p className="audio-player__author">{book.author}</p>
        <audio ref={audioPlayer} src={book.audioLink} preload="metadata"></audio>

        <div className="audio-player__controls">
            <button className="audio-player__btn" onClick={backThirty}>-30s</button>
            <button onClick={togglePlayPause} className="audio-player__btn audio-player__btn--play">
                {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button className="audio-player__btn" onClick={forwardThirty}>+30s</button>
        </div>

        <div className="audio-player__progress-bar">
            <div>{calculateTime(currentTime)}</div>
            <input type="range" defaultValue="0" ref={progressBar} onChange={changeRange} />
            <div>{(duration && !isNaN(duration)) && calculateTime(duration)}</div>
        </div>
    </div>
  );
};

export default AudioPlayer;
