// src/pages/CreateNote.jsx
import NoteForm from "../components/NoteForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast"; // Install with: npm install react-hot-toast
import { FaSpinner } from "react-icons/fa"; // Install with: npm install react-icons
import { motion } from "framer-motion"; // Install with: npm install framer-motion

const CreateNote = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleCreate = async (noteData) => {
        setIsLoading(true);
        try {
            const res = await axios.post("http://localhost:5000/content/add", {
                text: noteData.text,
                isPrivate: noteData.isPrivate,
                title: noteData.title
            });
            
            if (res.data.status) {
                toast.success("Note created successfully!");
                navigate("/notes"); // or wherever you want to redirect
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Error creating note");
            console.error("Error creating note:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto p-4"
        >
            <div className="bg-white rounded-lg shadow-lg p-6">
                <motion.h1 
                    className="text-3xl font-bold mb-6 text-gray-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Create New Note
                    {isLoading && (
                        <FaSpinner className="inline ml-2 animate-spin" />
                    )}
                </motion.h1>
                
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <NoteForm 
                        onSubmit={handleCreate}
                        initialData={{
                            title: "",
                            text: "",
                            isPrivate: false
                        }}
                    />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default CreateNote;
