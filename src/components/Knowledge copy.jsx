import React, { useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import "./Knowledge.css";
import uuid from "react-uuid";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "../firebase";

// ノートの初期値を定数として宣言
const initialNote = {
  content: "## 新しいノート\n",
  tag: "",
  id: uuid(),
  created_at: new Date(),
};

const Knowledge = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [notes, setNotes] = useState([]);
  const [isCheckDelete, setIsCheckDelete] = useState(false);
  const [count, setCount] = useState(0);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let tag = urlParams.get("tag")?.toLowerCase() || "";

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await getDocs(collection(db, "notes"));
      const inpNotes = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const filteredNotes = tag
        ? inpNotes.filter((note) => note.tag.includes(tag))
        : inpNotes;
      const sortedNotes = filteredNotes.sort(
        (a, b) => a.created_at.toDate() - b.created_at.toDate()
      );
      setNotes(sortedNotes);
    };
    fetchNotes();
  }, [tag, count]);

  const editNote = (id) => {
    setIsEditing(true);
    setActiveNoteId(id);
  };

  const handleEditNote = (key, value) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === activeNoteId ? { ...note, [key]: value } : note
      )
    );
  };

  const deleteNote = async (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    await deleteDoc(doc(db, "notes", id));
    setIsEditing(false);
    setActiveNoteId(null);
  };

  const updateNote = async () => {
    const activeNote = notes.find((note) => note.id === activeNoteId);
    await updateDoc(doc(db, "notes", activeNote.id), {
      content: activeNote.content,
      tag: activeNote.tag,
    });
    setIsEditing(false);
    setActiveNoteId(null);
  };

  const addNote = async () => {
    const newNote = {
      ...initialNote,
      tag: tag,
    };
    setNotes([newNote, ...notes]);
    await addDoc(collection(db, "notes"), newNote);
    setCount((prevCount) => prevCount + 1);
  };

  const H2 = ({ node, ...props }) => {
    return (
      <h2 className="markdown-h2" id={node.position?.start.line.toString()}>
        {props.children}
      </h2>
    );
  };

  const P = ({ node, ...props }) => {
    return <p className="markdown-p">{props.children}</p>;
  };

  const AnchorLink = ({ node, ...props }) => {
    return (
      <a href={"#" + node.position?.start.line.toString()}>{props.children}</a>
    );
  };

  const editHtml = () => {
    return (
      <div className="edit-all" key={activeNoteId}>
        <button className="btn" onClick={updateNote}>
          save
        </button>
        <button className="btn" onClick={() => deleteNote(activeNoteId)}>
          delete
        </button>
        <div className="edit-tag">
          <p>Tag</p>
          <input
            spellCheck="false"
            id="tag"
            value={notes.find((note) => note.id === activeNoteId)?.tag || ""}
            onChange={(e) => handleEditNote("tag", e.target.value)}
          ></input>
        </div>
        <div className="edit-wrapper">
          <div className="edit-left">
            <textarea
              spellCheck="false"
              id="content"
              value={
                notes.find((note) => note.id === activeNoteId)?.content || ""
              }
              onChange={(e) => handleEditNote("content", e.target.value)}
            ></textarea>
          </div>
          <div className="edit-right">
            <ReactMarkdown
              components={{
                h2: H2,
                p: P,
              }}
              className="markdown-preview"
            >
              {notes.find((note) => note.id === activeNoteId)?.content || ""}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    );
  };

  const previewHtml = () => {
    return (
      <div>
        {notes.map((note) => (
          <div key={note.id}>
            <div className="preview-wrapper" key={note.id}>
              <div className="preview-left">
                <ReactMarkdown
                  components={{
                    h2: H2,
                    p: P,
                  }}
                >
                  {note.content}
                </ReactMarkdown>
              </div>
              <div className="preview-right">
                <ReactMarkdown
                  className="markdown-preview"
                  allowedElements={["h2"]}
                  components={{
                    h2: AnchorLink,
                  }}
                >
                  {note.content}
                </ReactMarkdown>
              </div>
            </div>
            <div className="btn-wrapper">
              <div className="btn-text">
                tags:
                <button className="btn btn-tag">
                  <a href={`/knowledge?tag=${note.tag}`}>{note.tag}</a>
                </button>
              </div>
              <div className="btn-text">
                編集:
                <button
                  className="btn btn-edit"
                  onClick={() => editNote(note.id)}
                >
                  edit
                </button>
              </div>
            </div>
          </div>
        ))}
        <button className="btn" onClick={addNote}>
          +
        </button>
      </div>
    );
  };

  return (
    <div className="main">
      <div className="content">{isEditing ? editHtml() : previewHtml()}</div>
    </div>
  );
};

export default Knowledge;
