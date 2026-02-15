import React from "react";
import "./FeaturesSection.css";

const features = [
  {
    title: "Student Portal",
    desc: "Track learning, savings & financial growth.",
    icon: "🎓",
  },
  {
    title: "School Panel",
    desc: "Institutions manage financial curriculum.",
    icon: "🏫",
  },
  {
    title: "E-Modules",
    desc: "Interactive finance lessons & simulations.",
    icon: "📘",
  },
  {
    title: "Trading Simulator",
    desc: "Practice stock market without risk.",
    icon: "📈",
  },
  {
    title: "AI Coach",
    desc: "Your personal AI financial mentor.",
    icon: "🤖",
  },
  {
    title: "Expense Tracker",
    desc: "Understand where your money goes.",
    icon: "💰",
  },
];

function FeaturesSection() {
  return (
    <section className="features">
      <h2 className="features-title">Everything You Need to Build Wealth Early</h2>

      <div className="features-grid">
        {features.map((item, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturesSection;
