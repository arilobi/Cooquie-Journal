import React, { useContext, useState } from "react";
import { EntryContext } from "../context/EntryContext";
import { TagContext } from "../context/TagContext";

export default function AddEntry() {
  const { addEntry } = useContext(EntryContext);
  const { tags, addTag } = useContext(TagContext); // <-- corrected function name

  const [title, setTitle] = useState("");
  const [tag_id, setTagId] = useState("");
  const [content, setContent] = useState("");

  const [newTagName, setNewTagName] = useState("");
  const [showTagInput, setShowTagInput] = useState(false);

  // Create a new tag and auto-select it
  const handleCreateTag = async () => {
    if (!newTagName.trim()) return;

    const newTag = await addTag(newTagName); // <-- use correct function
    if (newTag) {
      setTagId(newTag.id);   // auto-select new tag
      setNewTagName("");
      setShowTagInput(false);
    } else {
      alert("Failed to create tag. Try again.");
    }
  };

  // Submit new entry
  const handleSubmit = (e) => {
    e.preventDefault();

    addEntry(title, content, tag_id ? parseInt(tag_id) : null);

    setTitle("");
    setContent("");
    setTagId("");
  };
return (
  <div className="entry-add-container">
    <h3 className="entry-title">Write an entry</h3>

    <form onSubmit={handleSubmit} className="entry-form">
      <input
        id="title"
        type="text"
        placeholder="I went biking today"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="input-field"
      />

      {/* <select
        value={tag_id}
        onChange={(e) => setTagId(e.target.value)}
        className="select-field"
      >
        <option value="">Choose a tag</option>
        {tags?.map((tag) => (
          <option value={tag.id} key={tag.id}>
            {tag.name}
          </option>
        ))}
      </select> */}

      {/* <button
        type="button"
        onClick={() => setShowTagInput(!showTagInput)}
        className="create-tag-btn"
      >
        + Create new tag
      </button> */}

      {/* {showTagInput && (
        <div className="new-tag-box">
          <input
            type="text"
            placeholder="New tag name"
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            className="input-field"
          />

          <button
            type="button"
            onClick={handleCreateTag}
            className="save-tag-btn"
          >
            Save Tag
          </button>
        </div>
      )} */}

      <textarea
        id="content"
        placeholder="It was sunny..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        className="textarea-field"
      ></textarea>

      <div className="entry-btn">
        <button type="submit" className="submit-btn">Submit</button>
      </div>
    </form>
  </div>
);
}
