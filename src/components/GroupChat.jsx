import React, { useState, useRef, useEffect } from "react";
import '../styles/GroupChat.css';
import ChatInput from "./ChatInput";
import { Play, Pause, File } from "lucide-react";
export default function GroupChat() {
    const videoRef = useRef(null);
    const [styleHidden, setStyleHidden] = useState("playDivVideo");
    const [currentAudio, setCurrentAudio] = useState(null);
    const [messages, setMessages] = useState([
        { id: 1, type: "text", content: "Salom, hammaga!", sender: "user" },
        { id: 2, type: "text", content: "Salom! Qalaysiz?", sender: "other" },
    ]);
    const messagesEndRef = useRef(null);
    // Scrollni oxiriga surish
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Matn yuborish
    const handleSendText = (text) => {
        setMessages((prev) => [...prev, { id: Date.now(), context: " ", type: "text", content: text, sender: "user" }]);
    };
    const coverSize = (size) => {
        if (size > 1023) {
            const Kb = size / 1024;
            if (Kb > 1024) {
                const Mb = Kb / 1024
                if (Mb > 1023) {
                    const Gb = Mb / 1024;
                    return Gb.toFixed(2) + "Gb"
                }
                else {
                    return Mb.toFixed(1) + "Mb"
                }
            }
            else {
                return Math.floor(Kb) + "Kb"
            }
        }
        else {
            return Math.floor(size) + "B"
        }
    }
    // Ovoz yuborish
    const handleSendVoice = (audioBlob) => {
        const url = URL.createObjectURL(audioBlob);
        const size = audioBlob.size;

        setMessages((prev) => [
            ...prev,
            {
                id: Date.now(),
                context: " ",
                type: "voice",
                content: url,
                size,  // agar state-ga saqlamoqchi bo'lsangiz
                sender: "user"
            }
        ]);
    };

    const handleSendFile = ({ filename, fsize, url, type }) => {


        setMessages((prev) => [
            ...prev,
            { id: Date.now(), filename, fsize, type, content: url, sender: "user" },
        ]);
    };


    return (
        <div className="chat-container">
            <div className="chat-messages">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`chat-message ${msg.sender === "user" ? "own" : "other"}`}
                    >
                        {
                            msg.type === 'text' ? (
                                <span className={msg.sender === "user" ? "owntext" : "othertext"}>{msg.content}</span>
                            ) : msg.type === 'video/webm' || msg.type?.startsWith('voice') || msg.type?.startsWith('audio') ? (
                                <audio
                                    src={msg.content}
                                    controls
                                    onPlay={(e) => {
                                        if (currentAudio && currentAudio !== e.target) {
                                            currentAudio.pause();
                                        }
                                        setCurrentAudio(e.target);
                                    }}
                                />
                            ) : msg.type?.startsWith('video') ? (
                                <video
                                    src={msg.content}
                                    controls
                                    onPlay={(e) => {
                                        if (currentAudio && currentAudio !== e.target) {
                                            currentAudio.pause();
                                        }
                                        setCurrentAudio(e.target);
                                    }}
                                    className='video'
                                />
                            ) : (
                                <span><a href={msg.content} target="_blank" rel="noopener noreferrer">
                                    <div className="filecontainer ">
                                        <File />
                                        <div className={`chat-message ${msg.sender === "user" ? "own" : "other"}`}>
                                            <p>{'File' + msg.id}</p>
                                            <p>{coverSize(msg.fsize)}</p>
                                        </div>
                                    </div>
                                </a></span>
                            )
                        }

                    <p class="timeSend">{new Date().toTimeString().slice(0,8)}</p>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-wrapper">
                <ChatInput onSendText={handleSendText} onSendVoice={handleSendVoice} onSendMedia={handleSendFile} />
            </div>
        </div>
    );
}
