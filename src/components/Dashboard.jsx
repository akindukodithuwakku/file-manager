import React, { useState } from "react";
import axios from "axios";
import '../styles/Dashboard.css';


const Dashboard = () => {
    // State variables
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No file chosen");
    const [uploadedFile, setUploadedFile] = useState(null);
    const [message, setMessage] = useState("");

    // Handle file selection
    const onFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile.name);
        } else {
            setFile(null);
            setFileName("No file chosen");
        }
    };

    // Handle file upload
    const onFileUpload = async () => {
        if (!file) {
            setMessage("Please select a file before uploading.");
            return;
        }
    
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", file.name);
    
        try {
            const res = await axios.post(process.env.REACT_APP_API_URL, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: false, // Ensure no authentication issue
            });
    
            setUploadedFile(res.data);
            setMessage("File uploaded successfully!");
        } catch (err) {
            console.error(err); // Log the error for debugging
            setMessage("Error uploading file");
        }
    };
    

    return (
        <div className="container">
            <div className="card">
                <h2>File Upload</h2>
                {/* File input section */}
                <div>
                    <input
                        type="file"
                        onChange={onFileChange}
                    />
                    <p>{fileName}</p>
                    <button onClick={onFileUpload}>
                        Upload
                    </button>
                    {message && (
                        <p className="message">{message}</p>
                    )}
                </div>
                {/* Uploaded File Details */}
                {uploadedFile && (
                    <div className="uploaded-file">
                        <h3>Uploaded File Details:</h3>
                        <p>📄 {uploadedFile.fileName}</p>
                        <p>
                            🔗 <a href={uploadedFile.filePath} target="_blank" rel="noopener noreferrer">
                                View File
                            </a>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
