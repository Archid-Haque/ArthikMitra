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
    
  <div className="ai-page-scroll">

    <div className="ai-page">
      <h1 className="ai-title">🤖 Your AI Financial Mentor</h1>

      <div className="ai-input-box">
        <input
          type="text"
          placeholder="Ask about saving, investing, budgeting..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button onClick={handleAsk}>Ask AI →</button>
      </div>

      {loading && <p className="ai-thinking">Thinking...</p>}

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
