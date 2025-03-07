"use client";

import { createLetter } from "@/app/api/services/apiServices";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { useRouter } from "next/navigation";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const TextEditor: React.FC = () => {
  const router = useRouter()
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const handleSaveToDrive = async () => {
    try {
      const response = await createLetter({ title, content });
      // alert(`File uploaded! File ID: ${response.id}`);
      router.back()

      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error saving letter:", error);
      alert("Failed to save letter.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-2">Warranty Text Editor</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />

      <ReactQuill theme="snow" value={content} onChange={setContent} className="bg-white border rounded-md" />

      <div className="flex justify-center mt-4">
        <button
          onClick={handleSaveToDrive}
          className="bg-amber-600 text-white px-4 py-2 w-72 rounded-full"
        >
          Save to Drive
        </button>
      </div>

    </div>
  );
};

export default TextEditor;
