import { useState } from "react";
import { askAI } from "../services/aiService";
import "./aicoach.css";

function AICoach() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 NEW: history state
  const [history, setHistory] = useState([]);

  const handleAsk = async () => {
    if (!question) return;

    setLoading(true);
    try {
      const res = await askAI(question);
      setAnswer(res.answer);

      // 🔥 ADD TO HISTORY
      setHistory([
        { q: question, a: res.answer },
        ...history,
      ]);

    } catch (err) {
      setAnswer("⚠️ Unable to connect. Try again.");
    }
    setLoading(false);
  };

  // 🔥 DELETE CHAT
  const deleteChat = (index) => {
    const updated = history.filter((_, i) => i !== index);
    setHistory(updated);
  };

  return (
    <div className="ai-page-scroll">

      {/* 🔥 SIDEBAR (ADDED ONLY THIS BLOCK) */}
      <div className="ai-sidebar">
        <h2>Chats</h2>

        {history.length === 0 && <p className="empty">No chats yet</p>}

        {history.map((item, i) => (
          <div key={i} className="chat-item">
            <span>{item.q}</span>

            <button
              className="delete-btn"
              onClick={() => deleteChat(i)}
            >
              🗑
            </button>
          </div>
        ))}
      </div>

      <div className="ai-page">

        {/* 🔥 HERO SECTION */}
        <div className="ai-hero">
          <h1>🤖</h1><h1 className="ai-heading">
             Your AI Financial Mentor
          </h1>

          <div className="ai-input-box">
            <input
              type="text"
              placeholder="Ask about saving, investing, budgeting..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />

            <button onClick={handleAsk}>Ask AI →</button>
          </div>
        </div>

        {loading && <p className="ai-loading">Thinking...</p>}

        {answer && (
          <div className="ai-response">
            <h3>AI Insight</h3>
            <p>{answer}</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default AICoach;