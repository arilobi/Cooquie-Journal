import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { EntryContext } from "../context/EntryContext";

export default function SingleEntry() {
  const { id } = useParams();
  const { entries, updateEntry } = useContext(EntryContext);

  // Find the entry by its ID
  const entry = entries && entries.find((entry) => entry.id == id);

  // State for toggling edit mode
  const [editMode, setEditMode] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");

  useEffect(() => {
    if (entry) {
      setUpdatedTitle(entry.title);
      setUpdatedContent(entry.content);
    }
  }, [entry]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    updateEntry(id, updatedTitle, updatedContent);
    setEditMode(false);
  };

  const handleCancel = () => {
    setUpdatedTitle(entry.title);
    setUpdatedContent(entry.content);
    setEditMode(false);
  };

  if (!entry) return <div>Entry not found</div>;

  return (
    <div className="single-entry">
      <h1 className="single-title">
        {editMode ? (
          <input
            type="text"
            className="edit-title-input"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
        ) : (
          entry.title
        )}
      </h1>

      <p className="single-content">
        {editMode ? (
          <textarea
            className="edit-content-input"
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
          />
        ) : (
          entry.content
        )}
      </p>

     <div className="single-controls">
  {editMode ? (
    <div className="edit-mode-buttons">
      <button className="save-button" onClick={handleSave}>
        Save
      </button>
      <button className="cancel-btn" onClick={handleCancel}>
        Cancel
      </button>
    </div>
  ) : (
    <div className="view-mode-buttons">
      <button className="edit-btn" onClick={handleEdit}>
        Edit
      </button>
      <button className="delete-button" onClick={() => deleteEntry(id)}>
        Delete
      </button>
    </div>
  )}
  
</div>

      <div className="single-footer">
        <p className="single-date">Entry made on: {entry.date_created}</p>
        <hr />
      </div>
    </div>
  );
}