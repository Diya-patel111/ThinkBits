
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

export default function UploadResume() {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    setIsUploading(true);
    setError(null);
    
    try {
      const uploadedFiles = [];
      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append("file", file);
        
        await axios.post('http://localhost:8000/parse', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        uploadedFiles.push({ name: file.name, status: 'Parsed & Saved' });
      }
      setFiles([...files, ...uploadedFiles]);
    } catch (err) {
      console.error(err);
      setError("Failed to upload and parse some file(s). Make sure the Python server is running.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface font-body text-on-surface">
      <Sidebar />
      <main className="ml-64 pt-12 px-8 pb-12">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">Upload Resumes</h1>
          <p className="text-on-surface-variant">Upload candidate profiles in bulk; our AI will parse and categorize them.</p>
        </header>

        <section className="grid grid-cols-12 gap-8">
          <div className="col-span-12 xl:col-span-7">
            <label className="flex flex-col items-center justify-center w-full min-h-[400px] border-2 border-dashed border-outline-variant/30 rounded-xl cursor-pointer hover:border-primary/50 transition-all bg-surface-container-lowest p-12 text-center">
              <span className="material-symbols-outlined text-4xl text-primary mb-4">upload_file</span>
              <h3 className="text-2xl font-bold mb-2">Drag & drop files here</h3>
              <p className="text-on-surface-variant mb-6">PDF, DOCX, or RTF. Max 25MB.</p>
              <span className="bg-primary text-white px-8 py-3 rounded-lg font-bold">Select Files</span>
              <input type="file" multiple className="hidden" onChange={handleUpload} accept=".pdf,.doc,.docx,.rtf" />
            </label>

            {error && <p className="mt-4 text-red-500 font-bold">{error}</p>}
            {isUploading && <p className="mt-4 text-primary font-bold">Uploading and parsing with AI...</p>}

            {files.length > 0 && (
              <div className="mt-8 space-y-4">
                <h4 className="font-bold text-lg">Parsed Candidates ({files.length})</h4>
                {files.map((file, i) => (
                  <div key={i} className="bg-surface-container-lowest p-6 rounded-xl flex items-center justify-between">
                    <span className="font-semibold">{file.name}</span>
                    <span className="text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">{file.status || 'Uploaded'}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
  