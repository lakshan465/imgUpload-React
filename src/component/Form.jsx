import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Form() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const uploadFile = async (file, imgName) => {
    console.log(`${process.env.REACT_APP_BACKEND_URL}/file/upload`)
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", imgName);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/file/upload`,
        
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file upload
          },
        }
      );
      console.log("File uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (file && name) {
      uploadFile(file, name); // Call the upload function
    } else {
      alert("Please select a file and provide a name");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-semibold mb-2"
          htmlFor="file"
        >
          Choose File CICD
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-semibold mb-2"
          htmlFor="name"
        >
          Enter File Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Enter file name"
          value={name}
          onChange={handleNameChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Upload
      </button>

      <div className="mt-4 text-center">
        <Link to="/" className="text-blue-600 hover:text-blue-800 mx-2">
          View Uploads
        </Link>
        <Link to="/slide" className="text-blue-600 hover:text-blue-800 mx-2">
          Slide Show
        </Link>
      </div>
    </form>
  );
}

export default Form;
