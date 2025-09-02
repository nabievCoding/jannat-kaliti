import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Volume2, 
  Moon, 
  Sun, 
  Camera, 
  Edit3, 
  LogOut, 
  ChevronRight,
  Download,
  Lock,
  UserX
} from 'lucide-react';
import '../styles/SettingsPage.css'
const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [onlineStatus, setOnlineStatus] = useState(true);

  const ToggleSwitch = ({ checked, onChange }) => (
    <div 
      className={`toggle-switch ${checked ? 'active' : ''}`}
      onClick={() => onChange(!checked)}
    >
      <div className="toggle-slider"></div>
    </div>
  );

  const SettingItem = ({ 
    icon, 
    title, 
    subtitle, 
    hasToggle = false, 
    toggleValue, 
    onToggleChange,
    hasArrow = false,
    className = "",
    onClick 
  }) => (
    <div 
      className={`setting-item ${className}`}
      onClick={onClick}
    >
      <div className="setting-left">
        <div className="setting-icon">
          {icon}
        </div>
        <div className="setting-info">
          <h3>{title}</h3>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>
      <div className="setting-right">
        {hasToggle && (
          <ToggleSwitch 
            checked={toggleValue} 
            onChange={onToggleChange}
          />
        )}
        {hasArrow && <ChevronRight className="arrow-icon" />}
      </div>
    </div>
  );

  const handleLogout = () => {
    if (window.confirm('Haqiqatan ham chiqmoqchimisiz?')) {
      console.log('Logout clicked');
    }
  };

  const handleExport = () => {
    console.log('Export chat history');
  };

  return (
    <div className="settings-container">
      {/* Profile Section */}
      <div className="settings-section">
        <div className="section-header">
          <div className="section-title">
            <User className="section-icon" />
            Shaxsiyat
          </div>
        </div>
        
        <div className="profile-section">
          <div className="profile-avatar">
            <div className="avatar">NH</div>
            <button className="camera-btn">
              <Camera size={16} />
            </button>
          </div>
          <div className="profile-info">
            <h3>Nabiyev Hayotbek</h3>
            <p className="email">nabievofficial04@gmail.com</p>
            <button className="edit-btn">
              <Edit3 size={16} />
              Sozlash
            </button>
          </div>
        </div>
      </div>

      {/* Chat Settings */}
      <div className="settings-section">
        <div className="section-header">
          <div className="section-title">
            <Bell className="section-icon" />
            Suhbat sozlamalari
          </div>
        </div>
        
        <SettingItem
          icon={<Bell size={20} />}
          title="Bilrishnomalar"
          subtitle="Bildirishnoma kelib tursinmi?"
          hasToggle={true}
          toggleValue={notifications}
          onToggleChange={setNotifications}
        />
        
        <SettingItem
          icon={<Volume2 size={20} />}
          title="Ovoz"
          subtitle="Bildirishnoma uchun musiqa"
          hasToggle={true}
          toggleValue={soundEnabled}
          onToggleChange={setSoundEnabled}
        />
      </div>

      {/* Appearance */}
      <div className="settings-section">
        <div className="section-header">
          <div className="section-title">
            <Palette className="section-icon" />
            Ko'rinish
          </div>
        </div>
        
        <SettingItem
          icon={darkMode ? <Moon size={20} /> : <Sun size={20} />}
          title="Ko‘rinish"
          subtitle={darkMode ? "Qorong`u" : "Yorug`"}
          hasToggle={true}
          toggleValue={darkMode}
          onToggleChange={setDarkMode}
        />
        
        <SettingItem
          icon={<Palette size={20} />}
          title="So'zlashmalar uchun  surat"
          subtitle="Suhbatxona uchun orqa tomon rasmi"
          hasArrow={true}
        />
        
        <SettingItem
          icon={<Globe size={20} />}
          title="Til"
          subtitle="O'zbek tili"
          hasArrow={true}
        />
      </div>

      {/* Privacy & Security */}
      <div className="settings-section">
        <div className="section-header">
          <div className="section-title">
            <Shield className="section-icon" />
            Shaxsiy ma'lumotlar va xavfsizlik
          </div>
        </div>
        
        <SettingItem
          icon={<Lock size={20} />}
          title="Ikki qatlamli qulf"
          subtitle="shaxsiyingiz uchun yana bir kalit"
          hasArrow={true}
        />
      </div>

      {/* Account Actions */}
      <div className="settings-section">
        <SettingItem
          icon={<Download size={20} />}
          title="Export Chat History"
          subtitle="Download your conversations"
          hasArrow={true}
          className="export-item"
          onClick={handleExport}
        />
        
        <SettingItem
          icon={<LogOut size={20} />}
          title="Log Out"
          subtitle="Sign out from all devices"
          hasArrow={true}
          className="logout-item"
          onClick={handleLogout}
        />
      </div>

      {/* Version Info */}
      <div className="version-info">
        <p>Jannat Kaliti 1.0</p>
        <p>USTOZJON uchun</p>
      </div>
    </div>
  );
};

export default SettingsPage;