import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Phone, PhoneOff, Users, Settings } from 'lucide-react';
import '../styles/VoiceChatApp.css'
const VoiceChatApp = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [participants, setParticipants] = useState([
    { id: 1, name: 'Siz', isActive: true, isMuted: false },
    { id: 2, name: 'Foydalanuvchi 2', isActive: false, isMuted: false },
    { id: 3, name: 'Foydalanuvchi 3', isActive: true, isMuted: true },
    { id: 4, name: 'Foydalanuvchi 4', isActive: true, isMuted: true },
    { id: 1, name: 'Siz', isActive: true, isMuted: false },
    { id: 2, name: 'Foydalanuvchi 2', isActive: false, isMuted: false },
    { id: 3, name: 'Foydalanuvchi 3', isActive: true, isMuted: true },
    { id: 4, name: 'Foydalanuvchi 4', isActive: true, isMuted: true },
    { id: 1, name: 'Siz', isActive: true, isMuted: false },
    { id: 2, name: 'Foydalanuvchi 2', isActive: false, isMuted: false },
    { id: 3, name: 'Foydalanuvchi 3', isActive: true, isMuted: true },
    { id: 4, name: 'Foydalanuvchi 4', isActive: true, isMuted: true },
    
  ]);
  const [roomId, setRoomId] = useState('ROOM-12345');
  const [status, setStatus] = useState('Tayyor');

  const audioRef = useRef(null);

  const toggleConnection = () => {
    if (isConnected) {
      setIsConnected(false);
      setStatus('Ulanish uzildi');
    } else {
      setIsConnected(true);
      setStatus('Ulanmoqda...');
      setTimeout(() => setStatus('Ulangan'), 1000);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    setParticipants(prev => 
      prev.map(p => p.id === 1 ? {...p, isMuted: !isMuted} : p)
    );
  };

  const getStatusClass = () => {
    if (status === 'Ulangan') return 'connected';
    if (status === 'Ulanmoqda...') return 'connecting';
    return 'disconnected';
  };

  return (
    <>
      <link rel="stylesheet" href="./VoiceChat.css" />
      
      <div className="voice-chat-container">
        <div className="voice-chat-main">
          {/* Header */}
          <div className="voice-chat-header">
            <div className="status-indicator">
              <div className={`status-dot ${getStatusClass()}`}></div>
              <span className="status-text">{status}</span>
            </div>
          </div>

         

          {/* Participants */}
          <div className="participants-section">
            <div className="participants-header">
                <Users size={28} style={{ color: '#e0e0e0' }} />
              <h3 className="participants-title">
                Ishtirokchilar
              </h3>
              <p className='userCount'>{participants.length}</p>
            </div>
            <div className="participants-list">
              {participants.map((participant) => (
                <div 
                  key={participant.id} 
                  className={`participant-item ${participant.isActive ? 'active' : 'inactive'}`}
                >
                  <div className="participant-info">
                    <div className={`participant-avatar ${participant.isActive ? 'active' : 'inactive'}`}>
                      {participant.name.charAt(0)}
                    </div>
                    <div>
                      <div className="participant-name">
                        {participant.name}
                      </div>
                      <div className={`participant-status ${participant.isActive ? 'speaking' : 'silent'}`}>
                        {participant.isActive ? '🎤 Gaplashmoqda' : '🔇 Jim'}
                      </div>
                    </div>
                  </div>
                  <div className="participant-controls">
                    {participant.isMuted ? (
                      <MicOff size={18} style={{ color: '#ef4444' }} />
                    ) : (
                      <Mic size={18} style={{ color: '#10b981' }} />
                    )}
                    <div className="audio-visualizer">
                      {[...Array(4)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`audio-bar ${participant.isActive && !participant.isMuted ? 'active wave-animation' : 'inactive'}`}
                          style={{
                            height: Math.random() * 20 + 5 + 'px',
                            animationDelay: `${Math.random() * 0.5}s`,
                            animationDuration: `${0.5 + Math.random() * 0.5}s`
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="voice-controls">
            <button
              onClick={toggleMute}
              disabled={!isConnected}
              className={`control-btn mic-btn ${isMuted ? 'muted' : 'unmuted'}`}
            >
              {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
            </button>

            <button
              onClick={toggleConnection}
              className={`control-btn call-btn ${isConnected ? 'connected' : 'disconnected'}`}
            >
              {isConnected ? <PhoneOff size={24} /> : <Phone size={24} />}
            </button>
            <p>00:00:00</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default VoiceChatApp;