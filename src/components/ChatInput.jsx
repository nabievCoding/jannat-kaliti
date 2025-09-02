import React, { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Mic } from "lucide-react";
import '../styles/ChatInput.css'

export default function ChatInput({ onSendText, onSendVoice, onSendMedia }) {
    const [message, setMessage] = useState("");
    const [recording, setRecording] = useState(false);
    const textareaRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const streamRef = useRef(null);
    const fileInputRef = useRef(null);

    const handleSendText = () => {
        if (message.trim() === "") return;
        onSendText(message);
        setMessage("");
        textareaRef.current.focus();
    };

    const handleInput = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        // Reset height to calculate scrollHeight properly
        textarea.style.height = 'auto';
        
        // Line height va padding ni hisobga olamiz
        const lineHeight = parseInt(getComputedStyle(textarea).lineHeight) || 20;
        const maxHeight = lineHeight * 3; // 3 qator uchun max height
        
        if (textarea.scrollHeight <= maxHeight) {
            textarea.style.height = textarea.scrollHeight + 'px';
            textarea.style.overflowY = 'hidden';
        } else {
            textarea.style.height = maxHeight + 'px';
            textarea.style.overflowY = 'auto';
        }
    };

    // Message o'zgarganda handleInput ni chaqirish
    useEffect(() => {
        handleInput();
    }, [message]);

    // Voice recording
    const handleVoice = async () => {
        if (!recording) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                streamRef.current = stream;
                const mediaRecorder = new MediaRecorder(stream);
                mediaRecorderRef.current = mediaRecorder;
                audioChunksRef.current = [];

                mediaRecorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);
                mediaRecorder.start();
                setRecording(true);
            } catch (error) {
                console.error("Mikrofon ruxsati berilmadi:", error);
            }
        } else {
            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });

                // Fayl sifatida saqlash
                const url = URL.createObjectURL(audioBlob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "voiceMessage.webm";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                if (onSendVoice) onSendVoice(audioBlob);
                
                // Mikrofonni to'xtatish
                if (streamRef.current) {
                    streamRef.current.getTracks().forEach((track) => track.stop());
                    streamRef.current = null;
                }
            };

            mediaRecorderRef.current.stop();
            setRecording(false);
        }
    };

    // File yuborish
    const handleSendFile = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        const fname = file.name || "File" + Date.now(); // new Date().now() o'rniga Date.now()
        const fsize = file.size;

        onSendMedia({ fname, fsize, url, type: file.type });

        e.target.value = ""; // input ni tozalash
    };
    //focusni textareaga qaytarish
    const handleFocused=()=>{
        textareaRef.current.focus();
    }

    return (
        <div className="chat-input-container">
            <label htmlFor="file-upload" className="file-btn">
                <Paperclip size={20} />
            </label>
            <input 
                id="file-upload"
                type="file"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleSendFile}
            />

            <textarea
                ref={textareaRef}
                className="chat-textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendText();
                    }
                }}
                placeholder="Xabar yozing..."
                rows={1}
            />
            
            <div className="chat-input-actions">
                {message.length === 0 ? (
                    <button onClick={handleVoice} className={`voice-btn ${recording ? "recording" : ""}`}>
                        <Mic size={20} />
                    </button>
                ) : (
                    <button onClick={handleSendText} className="send-btn">
                        <Send size={20} />
                    </button>
                )}
            </div>
        </div>
    );
}