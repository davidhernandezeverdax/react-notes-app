import React, { useState } from 'react';
import './style.css';

interface Note {
  id: string;
  content: string;
  color: string;
}

function isColorDark(hexColor: string): boolean {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  return hsp <= 127.5;
}

export const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<string>('');
  const [noteColor, setNoteColor] = useState<string>('yellow');

  const addNote = () => {
    if (newNote) {
      setNotes([
        ...notes,
        { id: Date.now().toString(), content: newNote, color: noteColor },
      ]);
      setNewNote('');
    }
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };
  return (
    <>
      <div>
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="notes-textarea"
          placeholder="Escribe una nueva nota aquí..."
        ></textarea>
        <div className="notes-color-picker-container">
          <label>Color:</label>
          <input
            type="color"
            onChange={(e) => setNoteColor(e.target.value)}
            className="ml-2"
          />
        </div>
        <div>
          <button onClick={addNote} className="notes-button">
            Añadir Nota
          </button>
        </div>
      </div>
      <div className="notes-grid">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`notes-grid-item ${
              isColorDark(note.color) ? 'dark' : 'light'
            }`}
            style={{ backgroundColor: note.color }}
          >
            <span>{note.content}</span>
            <button
              onClick={() => deleteNote(note.id)}
              className="delete-button"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
