import './App.css';
import { 
  MessageSquare, 
  Mic, 
  Music, 
  HelpCircle, 
  Settings, 
  User,
  ChevronLeft,
  Image,
  X
} from 'lucide-react';
import { useState } from 'react';
import GroupChat from './components/GroupChat';
import LiveVoiceChat from './components/VoiceChatApp'
import MusicPlayer from './components/MusicPlayer';
import QnA from './components/QnA';
import SettingsPage from './components/SettingsPage';
import imgLogo from './Logo.png'
function App() {
  const [activeBtnMenu, setActiveBtnMenu] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const headerNames=["","Guruh bilan suxbat","Ovozli muloqot","Ma`ruzalar","Savollar","Sozlamalar"]

  return (
    <>
      

      <div className="container">
        <div className='sidebar-container' onClick={()=>{setSidebarOpen(false)}} style={{left:sidebarOpen?'0':'-100%'}}>
          <div className='sidebar'>
          <div className="logo"><img src={imgLogo} className='logoImage' alt="xatolik"/><X onClick={()=>{setSidebarOpen(false)}} style={{display:sidebarOpen?'block':'none'}}/></div>
          <div className="menu">
            <ul>
              <li 
                onClick={() => {setActiveBtnMenu(1);setSidebarOpen(false)}} 
                className={activeBtnMenu === 1 ? 'activeMenu' : 'unactiveMenu'}
              >
                <MessageSquare /> <span>Suhbat guruhi</span>
              </li>
              <li 
                onClick={() => {setActiveBtnMenu(2);setSidebarOpen(false);}} 
                className={activeBtnMenu === 2 ? 'activeMenu' : 'unactiveMenu'}
              >
                <Mic /> <span>Ovozli muloqot</span>
              </li>
              <li 
                onClick={() => {setActiveBtnMenu(3);setSidebarOpen(false)}} 
                className={activeBtnMenu === 3 ? 'activeMenu' : 'unactiveMenu'}
              >
                <Music /> <span>Ma`ruzalar</span>
              </li>
              <li 
                onClick={() => {setActiveBtnMenu(4);setSidebarOpen(false)}} 
                className={activeBtnMenu === 4 ? 'activeMenu' : 'unactiveMenu'}
              >
                <HelpCircle /> <span>Savol va Javob</span>
              </li>
              <li 
                onClick={() => {setActiveBtnMenu(5);setSidebarOpen(false)}} 
                className={activeBtnMenu === 5 ? 'activeMenu' : 'unactiveMenu'}
              >
                <Settings /> <span>Sozlamalar</span>
              </li>
            </ul>
          </div>
          <div className="footer">
            <User className='iconfooter'/>
            <div className='nameMail'>
              <h4>Nabiyev Hayotbek</h4>
              <p style={{fontSize:'11px'}}>nabievofficial04@gmail.com</p>
            </div>
          </div>
        </div>
        </div>
        <div class="content-container">
          <div class="content-header">
            <ChevronLeft onClick={()=>{setSidebarOpen(true)}} className='content-header-icon'/>
            <h3 className='content-header-name'>{headerNames[activeBtnMenu]}</h3>
          </div>
        <div className="content">
          
          <div class="pages">
          {
            activeBtnMenu==1?<GroupChat/>
            :activeBtnMenu==2?<LiveVoiceChat/>
            :activeBtnMenu==3?<MusicPlayer/>
            :activeBtnMenu==4?<QnA/>
            :activeBtnMenu==5?<SettingsPage/>:""
          }
          </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default App;
