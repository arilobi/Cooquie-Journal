import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const TagContext = createContext();

export const TagProvider = ({ children }) => {
  const { authToken } = useContext(UserContext);

  const [tags, setTags] = useState([]);
  const [onChange, setOnChange] = useState(false); // refresh trigger

  // Fetch all tags
  const fetchTags = () => {
    fetch("https://cooquie-journal.onrender.com/tags", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then(res => res.json())
      .then(data => setTags(data));
  };

  useEffect(() => {
    if (authToken) {
      fetchTags();
    }
  }, [authToken, onChange]); // refresh when tag changes

  // Create a tag
  const addTag = async (name) => {
    const response = await fetch("https://cooquie-journal.onrender.com/tags", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ name }),
    });

    const data = await response.json();

    // backend should return something like: { id, name }
    if (data && data.id) {
      setOnChange(!onChange);   // triggers re-fetch
      return data;              // allow immediate selection
    }

    return null;
  };

  // Delete tag
  const deleteTag = async (tagId) => {
    await fetch(`https://cooquie-journal.onrender.com/tags/${tagId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    setOnChange(!onChange); // refresh tags
  };

  const data = {
    tags,
    addTag,
    deleteTag,
  };

  return (
    <TagContext.Provider value={data}>
      {children}
    </TagContext.Provider>
  );
};
