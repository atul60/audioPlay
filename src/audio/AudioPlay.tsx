import React, { useState, useRef, useEffect } from 'react';
import { THandleFileChange, THandleTimeUpdate } from './type';
import './audioPlay.css';
import FileInput from '../atomicComponent/inputBox/FileInput.tsx';

const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const handleFileChange: THandleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
      const objectURL = URL.createObjectURL(file);
      if (audioRef.current) {
        audioRef.current.src = objectURL;
      }
    }
  };

  const handleTimeUpdate: THandleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, []);

  return (
    <div className='audio-player'>
      <h3>Audio Player</h3>
      <div className='audio-play-section'>
      <audio ref={audioRef} controls />
      <FileInput onchange={handleFileChange} fileName={selectedFileName}/>
      <div style={{ position: 'relative', marginTop: '10px' }}>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            height: '2px',
            background: 'black',
            width: `${(currentTime / (audioRef.current?.duration || 0)) * 100}%`,
          }}
        />
      </div>
      <div>{Math.floor(currentTime)} seconds</div>
      </div>
    </div>
  );
};

export default AudioPlayer;
