import './Projects.css';

export default function Projects() {
  return (
    <section className="projects-section" id="projects">
      <h2 className="projects-title">Projects</h2>

      <div className="projects-grid">

        <div className="projects-card">
          <h3>HandWave</h3>
          <p>
            An AI-powered gesture recognition system that translates sign language
            into text using computer vision.
          </p>
        </div>

        <div 
          className="projects-card"
          style={{ backgroundImage: `url('/images/tara.png')` }}
        >
          <div className="overlay"></div>
          <h3>Tara G – Trip Planning</h3>
          <p>
            A mobile app for easy trip planning across the Philippines and Southeast Asia.
          </p>
        </div>

        <div className="projects-card">
          <h3>Portfolio Website</h3>
          <p>
            A responsive personal portfolio built with React + Vite showing my skills,
            projects, and background.
          </p>
        </div>

      </div>
    </section>
  );
}
