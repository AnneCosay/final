import './Contacts.css';
import { Facebook, Mail, Phone } from "lucide-react";
import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Contacts() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('contacts')
      .insert([{ name, email, message }]);

    if (error) {
      console.error(error);
      setStatus('Failed to send message!');
    } else {
      setStatus('Message sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <section className="contacts-section" id="contacts">
      <h2 className="contacts-title">Contact Me</h2>

      <div className="contacts-container">
        {/* Left Column: Contact Info */}
        <div className="contacts-info">
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

        {/* Right Column: Contact Form */}
        <div className="contacts-form">
          <h3>Send me a message</h3>
          <form onSubmit={handleSubmit} className="contact-form">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <button type="submit">Send Message</button>
          </form>
          {status && <p className="form-status">{status}</p>}
        </div>
      </div>
    </section>
  );
}
