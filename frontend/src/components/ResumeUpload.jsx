import React, { useState, useRef } from 'react';
import axios from 'axios';

const ResumeUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndSetFile(droppedFile);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      validateAndSetFile(selectedFile);
    }
  };

  const validateAndSetFile = (selectedFile) => {
    // Basic validation (e.g., PDF and Word documents)
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setUploadStatus(null);
    } else {
      setUploadStatus({ type: 'error', message: 'Please upload a valid PDF or DOCX file.' });
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadStatus(null);

    const formData = new FormData();
    formData.append('resume', file);

    try {
      // Replace with your actual backend endpoint
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadStatus({ type: 'success', message: 'Resume uploaded successfully!' });
      setFile(null); // Clear after upload
      
      if (onUploadSuccess) {
        onUploadSuccess(response.data);
      }
    } catch (error) {
      console.error('Upload Error:', error);
      setUploadStatus({ type: 'error', message: error.response?.data?.message || 'Failed to upload resume. Please try again.' });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div 
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
          isDragging 
            ? 'border-primary bg-primary/5' 
            : file 
              ? 'border-green-400 bg-green-50/30' 
              : 'border-outline-variant/50 hover:border-primary/50 hover:bg-surface-container-highest'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx"
          className="hidden"
        />

        {!file ? (
          <div className="flex flex-col items-center justify-center cursor-pointer" onClick={triggerFileSelect}>
            <span className="material-symbols-outlined text-5xl text-outline-variant mb-4">cloud_upload</span>
            <h3 className="text-lg font-headline font-bold text-on-surface mb-2">Upload Resume</h3>
            <p className="text-sm text-on-surface-variant mb-4">Drag & drop your file here, or click to browse</p>
            <span className="text-xs text-outline font-medium uppercase tracking-wider">Supports PDF, DOCX (Max 5MB)</span>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <span className="material-symbols-outlined text-5xl text-green-500 mb-4">description</span>
            <h3 className="text-sm font-semibold text-on-surface mb-1 truncate w-full px-4">{file.name}</h3>
            <p className="text-xs text-on-surface-variant mb-6">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            
            <div className="flex gap-4">
              <button 
                onClick={() => setFile(null)}
                className="px-4 py-2 rounded-full text-sm font-semibold border border-outline-variant text-on-surface hover:bg-surface-container-highest transition-colors"
                disabled={isUploading}
              >
                Remove
              </button>
              <button 
                onClick={handleUpload}
                disabled={isUploading}
                className="px-6 py-2 rounded-full text-sm font-bold bg-primary text-white shadow-md hover:bg-primary-container disabled:opacity-50 transition-all flex items-center justify-center min-w-[120px]"
              >
                {isUploading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  'Upload'
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {uploadStatus && (
        <div className={`mt-4 p-3 rounded-lg flex items-start gap-3 ${
          uploadStatus.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          <span className="material-symbols-outlined text-[20px]">
            {uploadStatus.type === 'success' ? 'check_circle' : 'error'}
          </span>
          <p className="text-sm font-medium">{uploadStatus.message}</p>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;