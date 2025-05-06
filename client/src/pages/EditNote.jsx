// src/pages/EditNote.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NoteForm from "../components/NoteForm";

const EditNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [noteData, setNoteData] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/notes/${id}`);
        setNoteData(res.data.note);
      } catch (err) {
        console.error("Failed to fetch note:", err);
      }
    };
    fetchNote();
  }, [id]);

  const handleUpdate = async (updatedData) => {
    try {
      await axios.put(`http://localhost:5000/api/notes/${id}`, updatedData);
      navigate(`/notes/${id}`);
    } catch (err) {
      console.error("Error updating note:", err);
    }
  };

  if (!noteData) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Note</h1>
      <NoteForm initialData={noteData} onSubmit={handleUpdate} />
    </div>
  );
};

export default EditNote;
