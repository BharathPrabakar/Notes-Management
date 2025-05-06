// src/components/NoteForm.jsx
import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { motion, AnimatePresence } from "framer-motion";
import { FiSave, FiLock, FiUnlock, FiTag, FiClock } from "react-icons/fi";
import { toast } from 'react-hot-toast';

const NoteForm = ({ initialData, onSubmit }) => {
  initialData = initialData || { title: "", text: "", isPrivate: false, tags: [] };
  const [formData, setFormData] = useState({...initialData, tags: initialData.tags || []});
  //const [formData, setFormData] = useState(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [currentTag, setCurrentTag] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image', 'code-block'],
      ['clean']
    ],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (content) => {
    setFormData((prev) => ({ ...prev, text: content }));
  };

  const handlePrivacyToggle = () => {
    setFormData((prev) => ({ ...prev, isPrivate: !prev.isPrivate }));
    toast.success(`Note is now ${formData.isPrivate ? 'public' : 'private'}`);
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (currentTag && !formData.tags.includes(currentTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag]
      }));
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      await onSubmit(formData);
      toast.success('Note saved successfully!');
      setIsSaving(false);
    } catch (error) {
      setIsSaving(false);
      toast.error('Failed to save note');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-6"
    >
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white rounded-lg shadow-lg p-6"
      >
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <motion.input
              whileFocus={{ scale: 1.01 }}
              name="title"
              placeholder="Note title"
              className="flex-1 border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={handlePrivacyToggle}
              className={`p-3 rounded-lg transition-colors duration-200 ${
                formData.isPrivate ? 'bg-gray-200 hover:bg-gray-300' : 'bg-blue-50 hover:bg-blue-100'
              }`}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              {formData.isPrivate ? <FiLock size={20} /> : <FiUnlock size={20} />}
              <AnimatePresence>
                {showTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute -bottom-8 text-sm bg-gray-800 text-white p-1 rounded"
                  >
                    {formData.isPrivate ? 'Private Note' : 'Public Note'}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          <div className="flex items-center space-x-2">
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              placeholder="Add tags..."
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              className="flex-1 border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddTag}
              type="button"
              className="p-2 bg-green-500 text-white rounded-lg"
            >
              <FiTag size={20} />
            </motion.button>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag) => (
              <motion.span
                key={tag}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="bg-blue-100 px-3 py-1 rounded-full flex items-center space-x-2"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </motion.span>
            ))}
          </div>
        </div>

        <div className="border rounded-lg">
          <ReactQuill
            theme="snow"
            value={formData.text}
            onChange={handleEditorChange}
            modules={modules}
            className="h-64 mb-12"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSaving}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 
            flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          {isSaving ? <FiClock size={20} /> : <FiSave size={20} />}
          <span>{isSaving ? "Saving..." : "Save Note"}</span>
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default NoteForm;
