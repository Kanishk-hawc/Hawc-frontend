import React, { useState, useEffect } from 'react';
import { FileText, Plus, Save, Trash2, Edit3 } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

interface NotesProps {
  isDarkMode: boolean;
}

const Notes: React.FC<NotesProps> = ({ isDarkMode }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      try {
        const parsedNotes = JSON.parse(savedNotes).map((note: any) => ({
          ...note,
          createdAt: new Date(note.createdAt),
          updatedAt: new Date(note.updatedAt)
        }));
        setNotes(parsedNotes);
      } catch (error) {
        console.error('Error parsing notes from localStorage:', error);
      }
    }
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const createNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled Document',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setNotes(prevNotes => [newNote, ...prevNotes]);
    setSelectedNote(newNote);
    setIsEditingTitle(true);
  };

  const updateNoteContent = (content: string) => {
    if (!selectedNote) return;

    const updatedNote = {
      ...selectedNote,
      content,
      updatedAt: new Date()
    };

    setSelectedNote(updatedNote);
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === selectedNote.id ? updatedNote : note
      )
    );
  };

  const updateNoteTitle = (title: string) => {
    if (!selectedNote) return;

    const updatedNote = {
      ...selectedNote,
      title: title || 'Untitled Document',
      updatedAt: new Date()
    };

    setSelectedNote(updatedNote);
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === selectedNote.id ? updatedNote : note
      )
    );
    setIsEditingTitle(false);
  };

  const deleteNote = (noteId: string) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
    if (selectedNote?.id === noteId) {
      setSelectedNote(null);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-transparent text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Notes</h1>
          <button
            onClick={createNewNote}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isDarkMode
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            } transition-colors`}
          >
            <Plus size={20} />
            New Note
          </button>
        </div>

        <div className="flex gap-6">
          {/* Sidebar - Notes List */}
          <div className={`w-80 flex-shrink-0 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } rounded-lg shadow-lg p-4`}>
            <h2 className="text-lg font-semibold mb-4">Your Notes</h2>
            {notes.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FileText size={48} className="mx-auto mb-4 opacity-50" />
                <p>No notes yet</p>
                <p className="text-sm">Create your first note to get started</p>
              </div>
            ) : (
              <div className="space-y-2">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    onClick={() => setSelectedNote(note)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedNote?.id === note.id
                        ? isDarkMode
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-100 text-blue-900'
                        : isDarkMode
                        ? 'hover:bg-gray-700'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{note.title}</h3>
                        <p className="text-sm opacity-75 truncate">
                          {note.content.substring(0, 50)}
                          {note.content.length > 50 && '...'}
                        </p>
                        <p className="text-xs opacity-60 mt-1">
                          {formatDate(note.updatedAt)}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNote(note.id);
                        }}
                        className="ml-2 p-1 hover:bg-red-500 hover:text-white rounded transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Main Content - Note Editor */}
          <div className={`flex-1 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } rounded-lg shadow-lg p-6`}>
            {selectedNote ? (
              <div className="h-full flex flex-col">
                {/* Title Section */}
                <div className="flex items-center gap-3 mb-6">
                  {isEditingTitle ? (
                    <input
                      type="text"
                      value={selectedNote.title}
                      onChange={(e) => setSelectedNote({
                        ...selectedNote,
                        title: e.target.value
                      })}
                      onBlur={() => updateNoteTitle(selectedNote.title)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          updateNoteTitle(selectedNote.title);
                        }
                      }}
                      className={`flex-1 text-2xl font-bold p-2 rounded ${
                        isDarkMode
                          ? 'bg-gray-700 text-white border-gray-600'
                          : 'bg-gray-100 text-gray-900 border-gray-300'
                      } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      autoFocus
                    />
                  ) : (
                    <>
                      <h2
                        className="text-2xl font-bold cursor-text flex-1"
                        onClick={() => setIsEditingTitle(true)}
                      >
                        {selectedNote.title}
                      </h2>
                      <button
                        onClick={() => setIsEditingTitle(true)}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                      >
                        <Edit3 size={18} />
                      </button>
                    </>
                  )}
                </div>

                {/* Content Editor */}
                <textarea
                  value={selectedNote.content}
                  onChange={(e) => updateNoteContent(e.target.value)}
                  placeholder="Start writing your note..."
                  className={`flex-1 w-full p-4 rounded-lg resize-none focus:outline-none ${
                    isDarkMode
                      ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600'
                      : 'bg-gray-50 text-gray-900 placeholder-gray-500 border-gray-300'
                  } border focus:ring-2 focus:ring-blue-500`}
                  style={{ minHeight: '400px' }}
                />

                {/* Footer */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
                  <span className="text-sm opacity-75">
                    Last updated: {formatDate(selectedNote.updatedAt)}
                  </span>
                  <div className="flex items-center gap-2 text-sm opacity-75">
                    <Save size={16} />
                    Auto-saved
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 text-gray-500">
                <FileText size={64} className="mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">Select a note</h3>
                <p>Choose an existing note or create a new one to start writing</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;