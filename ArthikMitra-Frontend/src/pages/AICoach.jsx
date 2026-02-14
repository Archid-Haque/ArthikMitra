import { useState } from "react";
import { askAI } from "../services/aiService";

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
      setAnswer("Error connecting to AI.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>AI Financial Coach</h1>

      <input
        type="text"
        placeholder="Ask about saving, investing, budgeting..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{ width: "400px", padding: "10px" }}
      />

      <button onClick={handleAsk} style={{ marginLeft: "10px" }}>
        Ask AI
      </button>

      {loading && <p>Thinking...</p>}

      {answer && (
        <div style={{ marginTop: "20px" }}>
          <h3>AI Advice:</h3>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default AICoach;
