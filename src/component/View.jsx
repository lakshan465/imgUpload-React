import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function View() {
  const [files, setFiles] = useState([]); // State to store files
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  // Fetch files from the backend
  const fetchFiles = async () => {
    try {
      const response = await axios.get( `${process.env.REACT_APP_BACKEND_URL}/file/getAll`); // Replace with your backend URL
      setFiles(response.data); // Set the fetched files in state
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error("Error fetching files:", err);
      setError("Failed to load files. Please try again.");
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const handleDelete = async (fileUrl, id) => {
    setLoading(true);
    const reducedUrl = fileUrl.replace(
      "https://imglakshanbkt.s3.amazonaws.com/",
      ""
    );

    console.log(reducedUrl);
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/file/delete`, {
        params: {
          fileS3Name: reducedUrl,
          id: id,
        },
      });
      console.log(response.data);
      fetchFiles();
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Use useEffect to fetch files when the component loads
  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">Uploaded Files</h1>

      <div className="flex justify-center space-x-4 mb-6">
        <Link
          to="/form"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Need to Upload
        </Link>
        <Link
          to="/slide"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Slide Show
        </Link>
      </div>

      {loading && (
        <p className="text-center text-lg text-gray-500">Loading files...</p>
      )}
      {error && <p className="text-center text-lg text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {files.map((file) => (
            <div
              key={file.id}
              className="card bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={file.fileUrl}
                alt={file.name}
                className="card-image w-full h-48 object-cover"
              />
              <p className="card-title text-center text-lg font-semibold mt-4 mb-4 px-2">
                {file.name}
              </p>
              <button onClick={() => handleDelete(file.fileUrl, file.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default View;
