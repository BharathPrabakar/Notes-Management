// src/pages/NoteDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const NoteDetails = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      const res = await axios.get(`http://localhost:5000/api/notes/${id}`);
      setNote(res.data.note);
      setComments(res.data.comments || []);
    };
    fetchNote();
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const res = await axios.post(`http://localhost:5000/api/notes/${id}/comments`, {
      content: newComment,
    });

    setComments((prev) => [...prev, res.data.comment]);
    setNewComment("");
  };

  if (!note) return <p>Loading note...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{note.title}</h1>
      <div className="text-gray-600 mb-4">{note.content}</div>
      <p className="text-sm text-gray-400 mb-8">
        Posted by {note.author?.name || "Anonymous"} on{" "}
        {new Date(note.createdAt).toLocaleString()}
      </p>

      <h2 className="text-xl font-semibold mb-2">Comments</h2>
      <ul className="mb-4">
        {comments.length > 0 ? (
          comments.map((c, idx) => (
            <li key={idx} className="bg-gray-100 p-2 rounded mb-2">
              <p className="text-sm">{c.content}</p>
              <span className="text-xs text-gray-500">
                — {c.author?.name || "Anonymous"} on{" "}
                {new Date(c.createdAt).toLocaleString()}
              </span>
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No comments yet.</p>
        )}
      </ul>

      <form onSubmit={handleAddComment} className="flex flex-col gap-2">
        <textarea
          className="border border-gray-300 rounded p-2"
          rows="3"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default NoteDetails;
