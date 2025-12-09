import './Contacts.css';
import { Facebook, Mail, Phone } from "lucide-react";

export default function Contacts() {
  return (
    <section className="contacts-section" id="contacts">
      <h2 className="contacts-title">Contact Information</h2>

      <div className="contacts-list">

        {/* Facebook */}
        <div className="contact-item">
          <a 
            href="https://www.facebook.com/shaneanne02" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Facebook className="contact-icon facebook" size={32} />
          </a>
          <div>
            <h3>Facebook</h3>
            <p>Anne Cosay</p>
          </div>
        </div>

        {/* Email */}
        <div className="contact-item">
          <Mail className="contact-icon gmail" size={32} />
          <div>
            <h3>Email</h3>
            <p>
              Personal: 
              <a
                href="https://mail.google.com/mail/?view=cm&to=cosayanne@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                cosayanne@gmail.com
              </a>
            </p>
            <p>
              Gsuite: 
              <a
                href="https://mail.google.com/mail/?view=cm&to=shaneanne.cosay@email.lcup.edu.ph"
                target="_blank"
                rel="noopener noreferrer"
              >
                shaneanne.cosay@email.lcup.edu.ph
              </a>
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="contact-item">
          <Phone className="contact-icon phone" size={32} />
          <div>
            <h3>Mobile Numbers</h3>
            <p>Smart: 0919 600 9900</p>
            <p>Globe: 0956 996 1130</p>
          </div>
        </div>

      </div>
    </section>
  );
}
