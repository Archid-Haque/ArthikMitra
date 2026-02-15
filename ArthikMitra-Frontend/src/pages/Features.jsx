import "./features.css";
import { useNavigate } from "react-router-dom";

import BackButton from "../components/BackButton";


function Features() {
  const navigate = useNavigate();

  const handleMouseMove = (e) => {
    const cards = document.querySelectorAll(".feature-card");
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--y", `${e.clientY - rect.top}px`);
    });
  };

  const handleKeyEnter = (e, path) => {
    if (e.key === "Enter") navigate(path);
  };

  return (


    <div className="features-page">

 <BackButton />

      <section className="features-section">
        <h2 className="features-heading">Choose Your Role</h2>

        <div className="features-grid" onMouseMove={handleMouseMove}>

          {/* STUDENT */}
          <div
            className="feature-card role-student"
            onClick={() => navigate("/Student-Portal")}
            tabIndex={0}
            onKeyDown={(e) => handleKeyEnter(e, "/Student-Portal")}
          >    
            <h3>🎓 Student Portal</h3>
            <p>
              Learn finance, simulate trading, complete challenges,
              and build real-world money intelligence.
            </p>

            <span className="role-enter">Enter →</span>
          </div>

          {/* SCHOOL */}
          <div
            className="feature-card role-school"
            onClick={() => navigate("/school")}
            tabIndex={0}
            onKeyDown={(e) => handleKeyEnter(e, "/school")}
          >
            <h3>🏫 School Panel</h3>
            <p>
              Bring structured financial literacy to your institution and
              monitor student growth through analytics.
            </p>

            <span className="role-enter">Enter →</span>
          </div>

          {/* TEACHER */}
          <div
            className="feature-card role-teacher"
            onClick={() => navigate("/teacher")}
            tabIndex={0}
            onKeyDown={(e) => handleKeyEnter(e, "/teacher")}
          >
            <h3>👨‍🏫 Teacher Portal</h3>
            <p>
              Assign modules, track progress, mentor students,
              and manage classroom financial simulations.
            </p>

            <span className="role-enter">Enter →</span>
          </div>



        </div>
      </section>
    </div>
  );
}

export default Features;