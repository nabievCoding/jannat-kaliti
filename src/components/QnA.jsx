import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Plus,
  X,
  Eye,
  CircleCheck,
  Clock,
  LucideListFilter,
  Play
} from 'lucide-react';
import '../styles/QnA.css';

const QnA = () => {
  // 📌 Yangi Q&A data
  const [qnaData, setQnaData] = useState([
    {
      id: 1,
      question: "Namozni qasr qilish qoidalari qanday?",
      answer: "Safarda 4 rakatli farz namozlar 2 rakat qilib o‘qiladi.",
      typeAnswer: "text",
      category: "Namoz",
      tags: ["namoz", "safar"],
      author: "Ustoz Ali",
      date: "2024-07-11",
      time: "14:35",
      views: 120,
    },
    {
      id: 2,
      question: "Qur’ondan mashhur oyatni ovozda eshitish mumkinmi?",
      answer: "https://example.com/quran001.mp3",
      typeAnswer: "voice",
      category: "Qur’on",
      tags: ["quran", "tilovat"],
      author: "Imom Karim",
      date: "2024-05-21",
      time: "19:05",
      views: 540,
    },
    {
      id: 3,
      question: "Ro‘zaning fidyasi qancha?",
      answer: "Faqir-miskinlarga taom berish yoki moddiy yordam qilish kerak.",
      typeAnswer: "text",
      category: "Ro‘za",
      tags: ["roza", "fidiya"],
      author: "Mufti Usmon",
      date: "2024-04-02",
      time: "10:15",
      views: 230,
    },
    {
      id: 4,
      question: "Tahajjud namozi haqida ma’lumot bormi?",
      answer: "https://example.com/tahajjud.mp3",
      typeAnswer: "voice",
      category: "Namoz",
      tags: ["namoz", "tahajjud"],
      author: "Shayx Ahmad",
      date: "2024-03-10",
      time: "04:20",
      views: 340,
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Barchasi');
  const [sortBy, setSortBy] = useState('date');
  const [showFilters, setShowFilters] = useState(true);

  const searchInputRef = useRef(null);
  const listRef = useRef(null);

  // 📌 Kategoriyalar
  const categories = ['Barchasi', 'Namoz', 'Qur’on', 'Ro‘za', 'Zakot', 'Haj', 'Nikoh'];

  // 📌 Filtering va sorting
  const filteredData = qnaData
    .filter(item => {
      const matchesSearch =
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.typeAnswer === "text" && item.answer.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'Barchasi' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'views':
          return b.views - a.views;
        default:
          return 0;
      }
    });

  return (
    <div className="qna-container">
      {/* Search & Filters */}
      <div className="search-filters">
        <div className="search-section">
          <div className="search-input-wrapper">
            <Search size={20} className="search-icon" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Savol, javob yoki teglar bo'yicha qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button className="clear-search" onClick={() => setSearchQuery('')}>
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        <div className="filter-section">
          <div className="btn-filter " onClick={() => setShowFilters(!showFilters)}>
            <LucideListFilter /><p>Saralash</p>
          </div>
            <div className={showFilters?" filter-content":"show filter-content"} >
              <p>Mavzular:</p>
              <select onChange={(e) => setSelectedCategory(e.target.value)}>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <p>Tartiblash:</p>
              <select onChange={(e) => setSortBy(e.target.value)}>
                <option value="date">Yangi</option>
                <option value="views">Ko‘rishlar</option>
              </select>
              <button onClick={() => setShowFilters(!showFilters)} className='btn-filter-finish'>Saralash</button>
            </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-section">
        <h3 className="stats-head-name">Savollar</h3>
        <ul className="status-questions">
          <li><Eye className='stat-icons' /><p>{qnaData.length}</p></li>
          <li><CircleCheck className='stat-icons' /><p>{filteredData.length}</p></li>
        </ul>
      </div>

      {/* Q&A List */}
      <div ref={listRef} className="qna-list">
        {filteredData.map((item) => (
          <div key={item.id} className="qna-card">
            <h3>{item.question}</h3>

            {item.typeAnswer === "text" ? (
              <p className="answer-text">{item.answer}</p>
            ) : (
              <div className="voice-box">
                <audio controls src={item.answer}></audio>
              </div>
            )}

            <div className="meta">
              <span><Clock size={14} /> {item.time}</span>
              <span><Eye size={14} /> {item.views} marta</span>
              <span>✍ {item.author}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QnA;
