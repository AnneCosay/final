import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [link, setLink] = useState("");
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    const { data } = await supabase.from("Projects").select("*");
    setProjects(data || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = "";

    if (file) {
      const { data: fileData } = await supabase.storage
        .from("projects")
        .upload(`images/${file.name}`, file, { upsert: true });

      if (fileData) {
        imageUrl = supabase.storage.from("projects").getPublicUrl(fileData.path).publicUrl;
      }
    }

    const entry = { title, description: desc, link, image_url: imageUrl };

    if (editingId) {
      await supabase.from("Projects").update(entry).eq("id", editingId);
      setEditingId(null);
    } else {
      await supabase.from("Projects").insert([entry]);
    }

    setTitle(""); setDesc(""); setLink(""); setFile(null);
    fetchProjects();
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setTitle(project.title);
    setDesc(project.description);
    setLink(project.link);
  };

  const handleDelete = async (id) => {
    await supabase.from("Projects").delete().eq("id", id);
    fetchProjects();
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Manage Projects</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input placeholder="Project Title" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <textarea placeholder="Description"
          value={desc} onChange={(e) => setDesc(e.target.value)} required />

        <input placeholder="Project Link"
          value={link} onChange={(e) => setLink(e.target.value)} />

        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <button type="submit">
          {editingId ? "Update Project" : "Add Project"}
        </button>
      </form>

      {projects.map((p) => (
        <div key={p.id} style={{ padding: "10px", border: "1px solid #ccc", marginBottom: "10px" }}>
          <h3>{p.title}</h3>
          <p>{p.description}</p>
          {p.image_url && <img src={p.image_url} alt="" style={{ width: "150px" }} />}
          <br />

          <button onClick={() => handleEdit(p)}>Edit</button>
          <button onClick={() => handleDelete(p.id)} style={{ marginLeft: "5px" }}>Delete</button>
        </div>
      ))}
    </div>
  );
}
