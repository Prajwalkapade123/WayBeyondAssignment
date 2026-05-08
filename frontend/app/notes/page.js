'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const baseUrl = 'http://localhost:5000/api/notes';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
      return;
    }
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(baseUrl, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setNotes(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(baseUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, content }),
      });
      if (res.ok) {
        setTitle('');
        setContent('');
        fetchNotes();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchNotes();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  if (loading) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <h1>CloudNotes</h1>
        <button onClick={handleLogout} style={{ background: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--border)', padding: '8px 16px', borderRadius: '8px' }}>
          Logout
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        <aside>
          <div className="glass" style={{ padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Create New Note</h3>
            <form onSubmit={handleAddNote} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input 
                placeholder="Title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <textarea 
                placeholder="Content..." 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                style={{ 
                  background: 'rgba(15, 23, 42, 0.5)', 
                  border: '1px solid var(--border)', 
                  color: 'white', 
                  padding: '12px 16px', 
                  borderRadius: '8px', 
                  minHeight: '150px',
                  resize: 'vertical'
                }}
              />
              <button type="submit" className="btn-primary">Add Note</button>
            </form>
          </div>
        </aside>

        <main style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', alignContent: 'start' }}>
          {notes.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', gridColumn: '1/-1' }}>No notes found. Create your first one!</p>
          ) : (
            notes.map(note => (
              <div key={note._id} className="glass" style={{ padding: '1.5rem', position: 'relative' }}>
                <h3 style={{ marginBottom: '0.5rem' }}>{note.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem', whiteSpace: 'pre-wrap' }}>{note.content}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    {new Date(note.createdAt).toLocaleDateString()}
                  </span>
                  <button 
                    onClick={() => handleDelete(note._id)}
                    style={{ background: 'transparent', border: 'none', color: '#ef4444', fontSize: '0.8rem' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </main>
      </div>
    </div>
  );
}
