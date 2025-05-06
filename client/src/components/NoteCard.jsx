// src/components/NoteCard.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NoteCard = ({ note }) => {
  return (
    <motion.div
      className="bg-white shadow-md rounded-2xl p-4 mb-4 hover:shadow-lg transition"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-xl font-semibold text-gray-800">{note.title}</h2>
      <p className="text-gray-600 text-sm mt-1">{note.content.slice(0, 100)}...</p>
      <Link
        to={`/notes/${note._id}`}
        className="text-blue-600 text-sm font-medium mt-2 inline-block"
      >
        Read More →
      </Link>
      <div className="text-xs text-gray-400 mt-2">
        Posted by {note.author?.name || "Anonymous"} on{" "}
        {new Date(note.createdAt).toLocaleDateString()}
      </div>
    </motion.div>
  );
};

export default NoteCard;
