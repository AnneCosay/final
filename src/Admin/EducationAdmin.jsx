import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function EducationAdmin() {
  const [education, setEducation] = useState([]);
  const [level, setLevel] = useState('');
  const [school, setSchool] = useState('');
  const [details, setDetails] = useState('');
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => { fetchEducation(); }, []);

  const fetchEducation = async () => {
    const { data, error } = await supabase.from('Education').select('*').order('level');
    if (!error) setEducation(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let certificateUrl = '';
    if (file) {
      const { data: fileData, error: uploadError } = await supabase.storage
        .from('certificates')
        .upload(`certificates/${file.name}`, file, { upsert: true });

      if (!uploadError && fileData) {
        certificateUrl = supabase.storage
          .from('certificates')
          .getPublicUrl(fileData.path).publicUrl;
      }
    }

    if (editingId) {
      // Update
      await supabase.from('Education').update({ level, school, details, certificate_url: certificateUrl })
        .eq('id', editingId);
      setEditingId(null);
    } else {
      // Insert
      await supabase.from('Education').insert([{ level, school, details, certificate_url: certificateUrl }]);
    }

    setLevel(''); setSchool(''); setDetails(''); setFile(null);
    fetchEducation();
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setLevel(item.level);
    setSchool(item.school);
    setDetails(item.details);
  };

  const handleDelete = async (id) => {
    await supabase.from('Education').delete().eq('id', id);
    fetchEducation();
  };

  return (
    <div style={{ padding: '40px' }}>
      <h2>Manage Education</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input type="text" placeholder="Level" value={level} onChange={e => setLevel(e.target.value)} required/>
        <input type="text" placeholder="School" value={school} onChange={e => setSchool(e.target.value)} required/>
        <textarea placeholder="Details" value={details} onChange={e => setDetails(e.target.value)} />
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <button type="submit">{editingId ? 'Update' : 'Add'} Education</button>
      </form>

      {education.map((edu) => (
        <div key={edu.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <h4>{edu.level} - {edu.school}</h4>
          <p>{edu.details}</p>
          {edu.certificate_url && <img src={edu.certificate_url} alt="Certificate" style={{ width: '150px' }} />}
          <div style={{ marginTop: '5px' }}>
            <button onClick={() => handleEdit(edu)}>Edit</button>
            <button onClick={() => handleDelete(edu.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
