import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Shuffle, 
  Repeat,
  Music,
  Heart,
  MoreHorizontal,
  List,
  Music4
} from 'lucide-react';
import '../styles/MP3Player.css'
const MusicPlayer = () => {
  // Sample playlist
  const [playlist] = useState([
    {
      id: 1,
      title: "Mening Sevimli Qo'shiq",
      artist: "Artist 1",
      duration: "3:45",
      cover: Music4,
      src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" // Sample audio
    },
    {
      id: 2,
      title: "Yangi Musiqam",
      artist: "Artist 2", 
      duration: "4:12",
      cover: "https://via.placeholder.com/300x300/764ba2/ffffff?text=🎶",
      src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
      id: 3,
      title: "Ajoyib Qo'shiq",
      artist: "Artist 3",
      duration: "2:58",
      cover:Music4,
      src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
      id: 4,
      title: "Romantik Kuy",
      artist: "Artist 4",
      duration: "5:23",
      cover: Music4,
      src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    }
  ]);

  // States
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState('none'); // 'none', 'one', 'all'
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Refs
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  // Effects
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', handleTrackEnd);

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', handleTrackEnd);
    };
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Functions
  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTrackEnd = () => {
    if (repeatMode === 'one') {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else if (repeatMode === 'all') {
      nextTrack();
    } else {
      if (currentTrack < playlist.length - 1) {
        nextTrack();
      } else {
        setIsPlaying(false);
      }
    }
  };

  const nextTrack = () => {
    let nextIndex;
    if (isShuffled) {
      nextIndex = Math.floor(Math.random() * playlist.length);
    } else {
      nextIndex = (currentTrack + 1) % playlist.length;
    }
    setCurrentTrack(nextIndex);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    const prevIndex = currentTrack === 0 ? playlist.length - 1 : currentTrack - 1;
    setCurrentTrack(prevIndex);
    setIsPlaying(true);
  };

  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    const rect = progressRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleShuffle = () => {
    setIsShuffled(!isShuffled);
  };

  const toggleRepeat = () => {
    const modes = ['none', 'one', 'all'];
    const currentIndex = modes.indexOf(repeatMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setRepeatMode(nextMode);
  };

  const selectTrack = (index) => {
    setCurrentTrack(index);
    setIsPlaying(true);
    setShowPlaylist(false);
  };

  const getRepeatIcon = () => {
    if (repeatMode === 'one') return '🔂';
    if (repeatMode === 'all') return '🔁';
    return '🔁';
  };

  const currentSong = playlist[currentTrack];
  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="mp3-player">
      <link rel="stylesheet" href="./MP3Player.css" />
      
      <audio
        ref={audioRef}
        src={currentSong.src}
        preload="metadata"
      />

      <div className="player-container">
        {/* Album Art Section */}
        <div className="album-section">
          <div className="album-art">
            <Music4 />
            <div className="album-overlay">
              <button className="play-overlay-btn" onClick={togglePlayPause}>
                {isPlaying ? <Pause size={40} /> : <Play size={40} />}
              </button>
            </div>
          </div>
          
          <div className="track-info">
            <h2 className="track-title">{currentSong.title}</h2>
            <p className="track-artist">{currentSong.artist}</p>
          </div>

          <div className="track-actions">
            <button 
              className={`action-btn ${isLiked ? 'liked' : ''}`}
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart size={20} fill={isLiked ? '#ff6b6b' : 'none'} />
            </button>
            <button className="action-btn">
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>

        {/* Progress Section */}
        <div className="progress-section">
          <div className="time-display">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          
          <div 
            className="progress-bar" 
            ref={progressRef}
            onClick={handleProgressChange}
          >
            <div 
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
            ></div>
            <div 
              className="progress-handle"
              style={{ left: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="controls-section">
          <div className="secondary-controls">
            <button 
              className={`control-btn ${isShuffled ? 'active' : ''}`}
              onClick={toggleShuffle}
            >
              <Shuffle size={16} />
            </button>
            
            <button 
              className={`control-btn ${repeatMode !== 'none' ? 'active' : ''}`}
              onClick={toggleRepeat}
            >
              <Repeat size={16} />
              {repeatMode === 'one' && <span className="repeat-one">1</span>}
            </button>
          </div>

          <div className="main-controls">
            <button className="control-btn" onClick={prevTrack}>
              <SkipBack size={20} />
            </button>
            
            <button className="play-btn" onClick={togglePlayPause}>
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            
            <button className="control-btn" onClick={nextTrack}>
              <SkipForward size={20} />
            </button>
          </div>

          <div className="volume-controls">
            <button className="control-btn" onClick={toggleMute}>
              {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="volume-slider"
            />
          </div>
        </div>

        {/* Playlist Toggle */}
        <div className="playlist-section">
          <button 
            className={`playlist-btn ${showPlaylist ? 'active' : ''}`}
            onClick={() => setShowPlaylist(!showPlaylist)}
          >
            <List size={20} />
            <span>Playlist</span>
          </button>
        </div>
      </div>

      {/* Playlist Modal */}
      {showPlaylist && (
        <div className="playlist-modal" onClick={() => setShowPlaylist(false)}>
          <div className="playlist-content" onClick={(e) => e.stopPropagation()}>
            <div className="playlist-header">
              <h3>Playlist</h3>
              <button 
                className="close-btn"
                onClick={() => setShowPlaylist(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="playlist-items">
              {playlist.map((track, index) => (
                <div 
                  key={track.id}
                  className={`playlist-item ${index === currentTrack ? 'active' : ''}`}
                  onClick={() => selectTrack(index)}
                >
                  <div className="playlist-item-cover">
                    <Music4/>
                    {index === currentTrack && isPlaying && (
                      <div className="playing-indicator">
                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                      </div>
                    )}
                  </div>
                  
                  <div className="playlist-item-info">
                    <h4>{track.title}</h4>
                    <p>{track.artist}</p>
                  </div>
                  
                  <div className="playlist-item-duration">
                    {track.duration}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Background Blur */}
      <div className="background-blur">
        <img src={currentSong.cover} alt="" />
      </div>
    </div>
  );
};

export default MusicPlayer;