import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function AboutAdmin() {
  const [aboutText, setAboutText] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => { fetchAbout(); }, []);

  const fetchAbout = async () => {
    const { data } = await supabase.from("About").select("*").limit(1);
    if (data && data.length > 0) {
      setAboutText(data[0].text);
      setEditingId(data[0].id);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (editingId) {
      await supabase.from("About").update({ text: aboutText }).eq("id", editingId);
    } else {
      await supabase.from("About").insert([{ text: aboutText }]);
    }

    fetchAbout();
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Manage About</h2>

      <form onSubmit={handleSave}>
        <textarea
          value={aboutText}
          onChange={(e) => setAboutText(e.target.value)}
          rows="6"
          style={{ width: "100%", padding: "10px" }}
          placeholder="Write your About section here..."
        />
        <button type="submit" style={{ marginTop: "10px" }}>
          Save About
        </button>
      </form>
    </div>
  );
}
