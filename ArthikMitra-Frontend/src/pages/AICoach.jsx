import { useState } from "react";
import { askAI } from "../services/aiService";
import "./aicoach.css";

function AICoach() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question) return;

    setLoading(true);
    try {
      const res = await askAI(question);
      setAnswer(res.answer);
    } catch (err) {
      setAnswer("⚠️ Unable to connect. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="ai-page">
      <div className="ai-container">

        <h1 className="ai-heading">
          🤖 Your <span>AI Financial Mentor</span>
        </h1>

        <p className="ai-sub">
          Ask anything about investing, saving, trading, or building wealth.
        </p>

        {/* INPUT AREA */}
        <div className="ai-input-box">
          <input
            type="text"
            placeholder="Example: How should a student start investing?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <button onClick={handleAsk}>
            Ask AI →
          </button>
        </div>

        {/* LOADING */}
        {loading && <div className="ai-loading">Analyzing Market Wisdom...</div>}

        {/* ANSWER */}
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
