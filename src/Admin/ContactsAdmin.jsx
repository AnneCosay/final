import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function ContactsAdmin() {
  const [contacts, setContacts] = useState([]);
  const [type, setType] = useState("");
  const [label, setLabel] = useState("");
  const [value, setValue] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => { fetchContacts(); }, []);

  const fetchContacts = async () => {
    const { data } = await supabase.from("Contacts").select("*");
    setContacts(data || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const entry = { type, label, value };

    if (editingId) {
      await supabase.from("Contacts").update(entry).eq("id", editingId);
      setEditingId(null);
    } else {
      await supabase.from("Contacts").insert([entry]);
    }

    setType(""); setLabel(""); setValue("");
    fetchContacts();
  };

  const handleEdit = (contact) => {
    setEditingId(contact.id);
    setType(contact.type);
    setLabel(contact.label);
    setValue(contact.value);
  };

  const handleDelete = async (id) => {
    await supabase.from("Contacts").delete().eq("id", id);
    fetchContacts();
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Manage Contacts</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input placeholder="Type (facebook/email/phone)"
          value={type} onChange={(e) => setType(e.target.value)} required />

        <input placeholder="Label (Facebook, Email, Mobile Number)"
          value={label} onChange={(e) => setLabel(e.target.value)} required />

        <input placeholder="Value (URL, email, number)"
          value={value} onChange={(e) => setValue(e.target.value)} required />

        <button type="submit">
          {editingId ? "Update Contact" : "Add Contact"}
        </button>
      </form>

      {contacts.map(c => (
        <div key={c.id} style={{ padding: "10px", border: "1px solid #ccc", marginBottom: "10px" }}>
          <h4>{c.label}</h4>
          <p>{c.value}</p>

          <button onClick={() => handleEdit(c)}>Edit</button>
          <button onClick={() => handleDelete(c.id)} style={{ marginLeft: "5px" }}>Delete</button>
        </div>
      ))}
    </div>
  );
}
