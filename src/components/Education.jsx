import './Education.css';

export default function Education() {
  return (
    <section className="education-section" id="education">
      <h2 className="education-title">Education & Certifications</h2>

      {/* Two-column education grid */}
      <div className="education-grid">
        {/* Left column */}
        <div className="education-column">
          <div className="education-item">
            <h3>Elementary School</h3>
            <p>San Agustin Elementary School</p>
            <p>2010-2016</p>
          </div>
          <div className="education-item">
            <h3>Junior High School</h3>
            <p>San Pedro National High School</p>
            <p>2016-2020</p>
          </div>
        </div>

        {/* Right column */}
        <div className="education-column">
          <div className="education-item">
            <h3>Senior High School</h3>
            <p>La Consolacion University Philippines</p>
            <p>2020-2022</p>
            <p>With Honors</p>
            <p>Rank 7 among all TVL-ICT students</p>
          </div>

          <div className="education-item">
            <h3>College</h3>
            <p>La Consolacion University Philippines</p>
            <p>Bachelor of Science in Information Technology</p>
            <p>2022-current year</p>
            <p>Dean's Lister Awardee (2022–2023)</p>
            <p>Dean's Lister Awardee (2024–2025)</p>
            <p>TOPCIT12 Passer (2025)</p>
          </div>
        </div>
      </div>

      {/* Certifications below education */}
      <div className="certifications-section">
        <h3>Certifications</h3>

        <div className="certification-item">
          <p>Microsoft Excel Certification</p>
          <img src="excel.jpg" alt="Microsoft Excel Certificate" className="certificate-image" />
        </div>

        <div className="certification-item">
          <p>Cisco Introduction of Internet of Things Certification</p>
          <img src="cisco.jpg" alt="Cisco Certificate" className="certificate-image" />
        </div>
      </div>
    </section>
  );
}
