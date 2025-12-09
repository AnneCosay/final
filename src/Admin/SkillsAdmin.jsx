import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function SkillsAdmin() {
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState("");
  const [level, setLevel] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => { fetchSkills(); }, []);

  const fetchSkills = async () => {
    const { data } = await supabase.from("Skills").select("*");
    setSkills(data || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const entry = { skill, level };

    if (editingId) {
      await supabase.from("Skills").update(entry).eq("id", editingId);
      setEditingId(null);
    } else {
      await supabase.from("Skills").insert([entry]);
    }

    setSkill(""); setLevel("");
    fetchSkills();
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setSkill(item.skill);
    setLevel(item.level);
  };

  const handleDelete = async (id) => {
    await supabase.from("Skills").delete().eq("id", id);
    fetchSkills();
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Manage Skills</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input placeholder="Skill (React, CSS, Python...)"
          value={skill} onChange={(e) => setSkill(e.target.value)} required />

        <input placeholder="Level (Beginner, Intermediate, Advanced)"
          value={level} onChange={(e) => setLevel(e.target.value)} required />

        <button type="submit">{editingId ? "Update Skill" : "Add Skill"}</button>
      </form>

      {skills.map(s => (
        <div key={s.id} style={{ padding: "10px", border: "1px solid #ccc", marginBottom: "10px" }}>
          <h4>{s.skill} — {s.level}</h4>

          <button onClick={() => handleEdit(s)}>Edit</button>
          <button onClick={() => handleDelete(s.id)} style={{ marginLeft: "5px" }}>Delete</button>
        </div>
      ))}
    </div>
  );
}
