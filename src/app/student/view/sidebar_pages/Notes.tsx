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
            isDarkMode ? 'bg-black' : 'bg-white'
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
          <div className={`flex-1 ${
            isDarkMode ? 'bg-black' : 'bg-white'
          } rounded-lg shadow-lg p-6`}>
            {selectedNote ? (
              <div className="h-full flex flex-col">
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
                          ? 'bg-black text-white border-gray-600'
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

                <textarea
                  value={selectedNote.content}
                  onChange={(e) => updateNoteContent(e.target.value)}
                  placeholder="Start writing your note..."
                  className={`flex-1 w-full p-4 rounded-lg resize-none focus:outline-none ${
                    isDarkMode
                      ? 'bg-black text-white placeholder-gray-400 border-gray-600'
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








// import { useState, useEffect } from 'react';

// interface Note {
//   id: string;
//   title: string;
//   description: string;
//   content: string;
//   createdAt: string;
//   subject: string;
// }

// interface NotesPageProps {
//   isDarkMode: boolean;
// }

// const NotesPage = ({ isDarkMode }: NotesPageProps) => {
//   const [notes, setNotes] = useState<Note[]>([]);
//   const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedNote, setSelectedNote] = useState<Note | null>(null);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [editNoteData, setEditNoteData] = useState<Note | null>(null);
//   const [newNote, setNewNote] = useState({
//     title: '',
//     description: '',
//     content: '',
//     subject: 'biology'
//   });

//   // Initialize with sample data
//   useEffect(() => {
//     const savedNotes = localStorage.getItem('studyNotes');
//     if (savedNotes) {
//       setNotes(JSON.parse(savedNotes));
//     } else {
//       const sampleNotes: Note[] = [
//         {
//           id: '1',
//           title: 'Cell Structure Notes',
//           description: 'Detailed notes on eukaryotic cell organelles and their functions',
//           content: '# Cell Structure\n\n## Eukaryotic Cells\n- Nucleus: Control center of the cell\n- Mitochondria: Powerhouse of the cell\n- Endoplasmic Reticulum: Transport system\n- Golgi Apparatus: Packaging and distribution\n\n## Prokaryotic Cells\n- Simpler structure\n- No membrane-bound organelles\n- Includes bacteria and archaea',
//           createdAt: '2023-10-15',
//           subject: 'biology'
//         },
//         {
//           id: '2',
//           title: 'Organic Chemistry Basics',
//           description: 'Introduction to hydrocarbons, functional groups, and reactions',
//           content: '# Organic Chemistry Basics\n\n## Hydrocarbons\n- Alkanes: Single bonds\n- Alkenes: Double bonds\n- Alkynes: Triple bonds\n\n## Functional Groups\n- Alcohols: -OH\n- Carboxylic Acids: -COOH\n- Amines: -NH2\n\n## Common Reactions\n- Substitution\n- Addition\n- Elimination',
//           createdAt: '2023-11-02',
//           subject: 'chemistry'
//         },
//         {
//           id: '3',
//           title: 'Newton\'s Laws of Motion',
//           description: 'Explanation of the three laws with examples',
//           content: '# Newton\'s Laws of Motion\n\n## First Law\nAn object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.\n\n## Second Law\nF = ma (Force equals mass times acceleration)\n\n## Third Law\nFor every action, there is an equal and opposite reaction.',
//           createdAt: '2023-09-28',
//           subject: 'physics'
//         },
//         {
//           id: '4',
//           title: 'Calculus Derivatives',
//           description: 'Rules for finding derivatives of functions',
//           content: '# Calculus Derivatives\n\n## Basic Rules\n- Power Rule: d/dx(x^n) = nx^(n-1)\n- Product Rule: d/dx(uv) = u\'v + uv\'\n- Quotient Rule: d/dx(u/v) = (u\'v - uv\')/v^2\n- Chain Rule: d/dx(f(g(x))) = f\'(g(x)) * g\'(x)\n\n## Common Derivatives\n- d/dx(sin x) = cos x\n- d/dx(cos x) = -sin x\n- d/dx(e^x) = e^x',
//           createdAt: '2023-10-20',
//           subject: 'maths'
//         },
//         {
//           id: '5',
//           title: 'Animal Classification',
//           description: 'Taxonomy of the animal kingdom with examples',
//           content: '# Animal Classification\n\n## Kingdom Animalia\n### Invertebrates\n- Porifera (sponges)\n- Arthropoda (insects, crustaceans)\n- Mollusca (snails, squids)\n\n### Vertebrates\n- Fish\n- Amphibians\n- Reptiles\n- Birds\n- Mammals',
//           createdAt: '2023-11-05',
//           subject: 'zoology'
//         }
//       ];
//       setNotes(sampleNotes);
//     }
//   }, []);

//   // Save to localStorage whenever notes change
//   useEffect(() => {
//     localStorage.setItem('studyNotes', JSON.stringify(notes));
//     setFilteredNotes(
//       notes.filter(note => 
//         note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         note.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         note.subject.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     );
//   }, [notes, searchTerm]);

//   const handleDelete = (id: string) => {
//     setNotes(notes.filter(note => note.id !== id));
//     setIsDeleteModalOpen(false);
//   };

//   const handleEdit = () => {
//     if (!editNoteData) return;
    
//     setNotes(notes.map(note => 
//       note.id === editNoteData.id ? editNoteData : note
//     ));
//     setIsEditModalOpen(false);
//     setEditNoteData(null);
//   };

//   const handleAdd = () => {
//     const newNoteObj: Note = {
//       ...newNote,
//       id: Date.now().toString(),
//       createdAt: new Date().toISOString().split('T')[0]
//     };
    
//     setNotes([...notes, newNoteObj]);
//     setIsAddModalOpen(false);
//     setNewNote({
//       title: '',
//       description: '',
//       content: '',
//       subject: 'biology'
//     });
//   };

//   const openEditModal = (note: Note) => {
//     setEditNoteData(note);
//     setIsEditModalOpen(true);
//   };

//   const subjects = ['biology', 'chemistry', 'physics', 'maths', 'zoology'];

//   return (
//     <div className={`min-h-screen p-6 ${isDarkMode ? 'bg-transparent text-white' : 'bg-gray-100 text-gray-900'}`}>
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold mb-2">Study Notes & Guides</h1>
//         <p className="mb-6">Manage your study materials for science subjects</p>
        
//         <div className={`p-4 rounded-lg mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
//           <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
//             <div className="w-full md:w-2/3">
//               <input
//                 type="text"
//                 placeholder="Search notes by keyword, title, or subject..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className={`w-full p-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
//               />
//             </div>
//             <button
//               onClick={() => setIsAddModalOpen(true)}
//               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full md:w-auto"
//             >
//               Add New Note
//             </button>
//           </div>
          
//           <div className="mt-4 flex flex-wrap gap-2">
//             <span className="font-medium">Filter by subject:</span>
//             {subjects.map(subject => (
//               <button
//                 key={subject}
//                 onClick={() => setSearchTerm(searchTerm === subject ? '' : subject)}
//                 className={`px-3 py-1 rounded-full text-sm ${searchTerm === subject ? 'bg-blue-600 text-white' : isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
//               >
//                 {subject.charAt(0).toUpperCase() + subject.slice(1)}
//               </button>
//             ))}
//           </div>
//         </div>
        
//         {/* Notes Grid */}
//         {filteredNotes.length === 0 ? (
//           <div className={`p-8 text-center rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
//             <p className="text-lg">No notes found. Try a different search or add a new note.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredNotes.map(note => (
//               <div 
//                 key={note.id} 
//                 className={`rounded-lg overflow-hidden transition-transform hover:scale-105 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}
//               >
//                 <div className={`p-1 text-center text-xs font-semibold ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
//                   {note.subject.toUpperCase()}
//                 </div>
//                 <div className="p-5">
//                   <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
//                   <p className="text-sm mb-4 opacity-80">{note.description}</p>
//                   <div className="flex justify-between items-center mt-4">
//                     <span className="text-xs opacity-70">Created: {note.createdAt}</span>
//                     <div className="flex gap-2">
//                       <button 
//                         onClick={() => {
//                           setSelectedNote(note);
//                           setIsViewModalOpen(true);
//                         }}
//                         className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
//                       >
//                         View
//                       </button>
//                       <button 
//                         onClick={() => openEditModal(note)}
//                         className="px-3 py-1 bg-yellow-600 text-white text-xs rounded hover:bg-yellow-700"
//                       >
//                         Edit
//                       </button>
//                       <button 
//                         onClick={() => {
//                           setSelectedNote(note);
//                           setIsDeleteModalOpen(true);
//                         }}
//                         className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
        
//         {/* View Modal */}
//         {isViewModalOpen && selectedNote && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className={`w-full max-w-2xl rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6`}>
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-2xl font-bold">{selectedNote.title}</h2>
//                 <button 
//                   onClick={() => setIsViewModalOpen(false)}
//                   className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
//                 >
//                   ✕
//                 </button>
//               </div>
//               <div className={`p-4 rounded-lg mb-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
//                 <p>{selectedNote.description}</p>
//               </div>
//               <div className="mb-4 whitespace-pre-line">{selectedNote.content}</div>
//               <div className="flex justify-between items-center mt-6">
//                 <span className="text-sm opacity-70">Subject: {selectedNote.subject} | Created: {selectedNote.createdAt}</span>
//                 <button 
//                   onClick={() => setIsViewModalOpen(false)}
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
        
//         {/* Edit Modal */}
//         {isEditModalOpen && editNoteData && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className={`w-full max-w-2xl rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6`}>
//               <h2 className="text-2xl font-bold mb-4">Edit Note</h2>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block mb-1">Title</label>
//                   <input
//                     type="text"
//                     value={editNoteData.title}
//                     onChange={(e) => setEditNoteData({...editNoteData, title: e.target.value})}
//                     className={`w-full p-2 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1">Description</label>
//                   <input
//                     type="text"
//                     value={editNoteData.description}
//                     onChange={(e) => setEditNoteData({...editNoteData, description: e.target.value})}
//                     className={`w-full p-2 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1">Subject</label>
//                   <select
//                     value={editNoteData.subject}
//                     onChange={(e) => setEditNoteData({...editNoteData, subject: e.target.value})}
//                     className={`w-full p-2 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
//                   >
//                     {subjects.map(subject => (
//                       <option key={subject} value={subject}>
//                         {subject.charAt(0).toUpperCase() + subject.slice(1)}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block mb-1">Content</label>
//                   <textarea
//                     value={editNoteData.content}
//                     onChange={(e) => setEditNoteData({...editNoteData, content: e.target.value})}
//                     rows={8}
//                     className={`w-full p-2 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
//                   />
//                 </div>
//                 <div className="flex justify-end gap-3 mt-6">
//                   <button 
//                     onClick={() => setIsEditModalOpen(false)}
//                     className={`px-4 py-2 rounded ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
//                   >
//                     Cancel
//                   </button>
//                   <button 
//                     onClick={handleEdit}
//                     className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                   >
//                     Save Changes
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
        
//         {/* Delete Confirmation Modal */}
//         {isDeleteModalOpen && selectedNote && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className={`w-full max-w-md rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6`}>
//               <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
//               <p className="mb-6">Are you sure you want to delete the note "{selectedNote.title}"? This action cannot be undone.</p>
//               <div className="flex justify-end gap-3">
//                 <button 
//                   onClick={() => setIsDeleteModalOpen(false)}
//                   className={`px-4 py-2 rounded ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   onClick={() => handleDelete(selectedNote.id)}
//                   className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
        
//         {/* Add Note Modal */}
//         {isAddModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className={`w-full max-w-2xl rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6`}>
//               <h2 className="text-2xl font-bold mb-4">Add New Note</h2>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block mb-1">Title</label>
//                   <input
//                     type="text"
//                     value={newNote.title}
//                     onChange={(e) => setNewNote({...newNote, title: e.target.value})}
//                     className={`w-full p-2 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1">Description</label>
//                   <input
//                     type="text"
//                     value={newNote.description}
//                     onChange={(e) => setNewNote({...newNote, description: e.target.value})}
//                     className={`w-full p-2 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1">Subject</label>
//                   <select
//                     value={newNote.subject}
//                     onChange={(e) => setNewNote({...newNote, subject: e.target.value})}
//                     className={`w-full p-2 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
//                   >
//                     {subjects.map(subject => (
//                       <option key={subject} value={subject}>
//                         {subject.charAt(0).toUpperCase() + subject.slice(1)}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block mb-1">Content</label>
//                   <textarea
//                     value={newNote.content}
//                     onChange={(e) => setNewNote({...newNote, content: e.target.value})}
//                     rows={8}
//                     className={`w-full p-2 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
//                   />
//                 </div>
//                 <div className="flex justify-end gap-3 mt-6">
//                   <button 
//                     onClick={() => setIsAddModalOpen(false)}
//                     className={`px-4 py-2 rounded ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
//                   >
//                     Cancel
//                   </button>
//                   <button 
//                     onClick={handleAdd}
//                     className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                   >
//                     Add Note
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NotesPage;