"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { deleteLetter, fetchLetters, updateLetter } from "../api/services/apiServices";
import { MoreVertical } from "lucide-react";

interface Letter {
  id: number;
  title: string;
  content: string;
  letterUrl: string;
  createdAt: string;
}

const Page: React.FC = () => {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingLetter, setEditingLetter] = useState<Letter | null>(null);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newContent, setNewContent] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchLetters();
        setLetters(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch letters");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeleteConfirm = (id: number) => {
    setMenuOpen(null);
    setDeleteConfirm(id);
  };

  const handleDelete = async () => {
    if (deleteConfirm === null) return;
    try {
      await deleteLetter(deleteConfirm);
      setLetters(letters.filter((letter) => letter.id !== deleteConfirm));
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting letter:", error);
    }
  };

  const handleEdit = (letter: Letter) => {
    setMenuOpen(null);
    setEditingLetter(letter);
    setNewTitle(letter.title);
    setNewContent(letter.content);
  };

  const handleUpdate = async () => {
    if (!editingLetter) return;
    try {
      await updateLetter(editingLetter.id, { title: newTitle, content: newContent });
      setLetters(
        letters.map((letter) =>
          letter.id === editingLetter.id ? { ...letter, title: newTitle, content: newContent } : letter
        )
      );
      setEditingLetter(null);
    } catch (error) {
      console.error("Error updating letter:", error);
    }
  };

  const handleNavigation = () => {
    router.push("/dashboard/editor");
  };

  return (
    <div className="relative">
      <div className="bg-indigo-50 py-5 px-20">
        <h1 className="text-black">Start a new document</h1>
        <div className="cursor-pointer">
          <div
            className="h-60 w-40 rounded-sm flex items-center justify-center border-t border-gray-400 group-hover:border-blue-500 transition duration-300"
            style={{ background: "#E5DECF" }}
            onClick={handleNavigation}
          >
            <Image src="/add.svg" alt="Add Icon" width={40} height={40} />
          </div>
          <h1 className="text-black text-sm text-left ml-2">Create New Document</h1>
        </div>
      </div>

      <div className="py-5 px-20">
        <h1 className="text-black">Recent Added Files</h1>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {letters.map((letter) => (
            <div
              key={letter.id}
              className="w-50 h-70 shadow-md relative rounded-md flex flex-col border border-gray-400"
              style={{ background: "#E5DECF" }}
            >
              <div className="p-4 flex-1">
                <p className="text-black text-sm">{letter.content.substring(0, 50)}...</p>
              </div>

              <div className="bg-white h-20 relative flex items-center justify-between p-2 w-full">
                <div className="relative items-center p-2 w-full">
                  <h2 className="text-black font-semibold mx-auto">{letter.title}</h2>
                  <p className="text-gray-500 text-xs">{new Date(letter.createdAt).toLocaleString()}</p>
                </div>
                <button
                  onClick={() => setMenuOpen((prev) => (prev === letter.id ? null : letter.id))}
                  className="relative hover:bg-gray-200 rounded-full p-2 transition duration-200"
                >
                  <MoreVertical size={20} className="cursor-pointer text-gray-700 hover:text-black" />
                </button>

                {menuOpen === letter.id && (
                  <div className="absolute right-2 top-10 z-10 bg-white shadow-lg rounded-md border w-24">
                    <ul className="text-sm">
                      <li
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setMenuOpen(null);
                          window.open(letter.letterUrl, "_blank");
                        }}
                      >
                        View
                      </li>
                      <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleEdit(letter)}>
                        Edit
                      </li>
                      <li
                        className="p-2 hover:bg-gray-100 cursor-pointer text-red-500"
                        onClick={() => handleDeleteConfirm(letter.id)}
                      >
                        Delete
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm !== null && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-black text-lg font-semibold">Confirm Delete</h2>
            <p className="text-gray-700">Are you sure you want to delete this document?</p>
            <div className="flex justify-between mt-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDelete}>
                Delete
              </button>
              <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setDeleteConfirm(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Form Modal */}
      {editingLetter && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-black text-lg font-semibold">Edit Letter</h2>
            <input
              type="text"
              className="w-full border p-2 rounded mt-2"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Enter title"
            />
            <textarea
              className="w-full border p-2 rounded mt-2"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Enter content"
              rows={4}
            />
            <div className="flex justify-between mt-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleUpdate}>
                Update
              </button>
              <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setEditingLetter(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
