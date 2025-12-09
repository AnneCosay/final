import { useState } from "react";
import { supabase } from "../supabaseClient";
import "./Login.css";

export default function Login({ setIsAdmin }) {
  // Optional: pre-fill email/password for testing
  const [email, setEmail] = useState("annecosay@gmail.com");
  const [password, setPassword] = useState("annecosay@gmail.com");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage("Invalid email or password.");
    } else {
      setMessage("Login successful!");
      setIsAdmin(true); // Show AdminDashboard
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleLogin}>
        <h2>Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        {message && <p className="login-message">{message}</p>}
      </form>
    </div>
  );
}
