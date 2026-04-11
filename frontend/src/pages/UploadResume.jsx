
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, FileText, AlertCircle, Check, Loader2, X, ArrowRight, Layers, Cpu } from 'lucide-react';
import { parseResumes } from '../services/api';

export default function UploadResume() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  
  const fileInputRef = useRef(null);

  const simulateProgress = (fileId) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;
      if (progress > 95) progress = 95;
      setFiles(prev => prev.map(f => f.id === fileId && f.status === 'parsing' ? { ...f, progress } : f));
    }, 400);
    return interval;
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleUpload = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (!selectedFiles.length) return;
    
    const newFiles = selectedFiles.map(file => ({
      id: Math.random().toString(36).substring(7),
      fileObj: file,
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(1) + ' MB',
      status: 'parsing',
      progress: 0,
      message: 'EXTRACTING TECHNICAL SKILLS...'
    }));
    
    setFiles(prev => [...newFiles, ...prev]);

    for (const fileItem of newFiles) {
      const interval = simulateProgress(fileItem.id);
      const formData = new FormData();
      formData.append("resumes", fileItem.fileObj);
      
      try {
        const response = await parseResumes(formData);
        clearInterval(interval);
        
        // Count skills detected directly from the backend response candidates array
        const candidatesRes = response?.data?.candidates || [];
        const detectedSkills = candidatesRes.length > 0 ? (candidatesRes[0].skills?.length || 0) : 0;
        const candidateName = candidatesRes.length > 0 && candidatesRes[0].name ? candidatesRes[0].name : fileItem.file.name;
        
        let displayMsg = `Parsed: ${detectedSkills} skills mapped.`;
        if (candidatesRes.length > 0 && candidatesRes[0]) {
           const c = candidatesRes[0];
           const emailStr = c.email ? c.email + ' • ' : '';
           const skillsStr = c.skills && c.skills.length > 0 ? c.skills.slice(0,5).join(', ') + (c.skills.length>5?', ...':'') : 'No standard skills mapped';
           displayMsg = emailStr + skillsStr;
        }
        
        setFiles(prev => prev.map(f => f.id === fileItem.id ? { 
          ...f, status: 'ready', progress: 100, name: candidateName,
          message: displayMsg 
        } : f));
      } catch(err) {
        clearInterval(interval);
        console.error("Failed to parse resume:", err);
        setFiles(prev => prev.map(f => f.id === fileItem.id ? { 
          ...f, status: 'failed', 
          message: 'Unable to parse file. Format not recognized.' 
        } : f));
      }
    }
    e.target.value = null; 
  };

  const removeFile = (id) => {
    setFiles(files.filter(f => f.id !== id));
  };

  const clearCompleted = () => {
    setFiles(files.filter(f => f.status === 'parsing' || f.status === 'failed'));
  };

  const retryFile = async (fileItem) => {
    if (!fileItem.fileObj) return;
    
    setFiles(prev => prev.map(f => f.id === fileItem.id ? { ...f, status: 'parsing', progress: 0, message: 'EXTRACTING TECHNICAL SKILLS...' } : f));
    const interval = simulateProgress(fileItem.id);
    const formData = new FormData();
    formData.append("resumes", fileItem.fileObj);
    
    try {
      const response = await parseResumes(formData);
      clearInterval(interval);
      const candidatesRes = response?.data?.candidates || [];
      const detectedSkills = candidatesRes.length > 0 ? (candidatesRes[0].skills?.length || 0) : 0;
      const candidateName = candidatesRes.length > 0 ? candidatesRes[0].name : fileItem.name;
      
      setFiles(prev => prev.map(f => f.id === fileItem.id ? { 
        ...f, status: 'ready', progress: 100, name: candidateName,
        message: `Parsed: ${detectedSkills} skills mapped.` 
      } : f));
    } catch(err) {
      clearInterval(interval);
      setFiles(prev => prev.map(f => f.id === fileItem.id ? { ...f, status: 'failed', message: 'Unable to parse file. Format not recognized.' } : f));
    }
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-7xl mx-auto pb-12">
      
      {/* Header Section */}
      <div className="mb-8">
        <p className="text-[11px] font-bold text-blue-600 tracking-widest uppercase mb-2">Resume Curator</p>
        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Upload Resume</h2>
        <p className="text-slate-600 mt-2 text-md leading-relaxed max-w-2xl">
          Transform raw resumes into actionable data. Our AI extracts skills, experience, and potential in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column - Dropzone & Queue */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Drag & Drop Area */}
          <div className="border-2 border-dashed border-blue-200 bg-white rounded-3xl p-12 flex flex-col items-center justify-center text-center transition-colors hover:bg-blue-50/30">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
              <UploadCloud className="w-8 h-8" />
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Drag & drop your resumes</h3>
            <p className="text-slate-500 font-medium text-sm mb-8">PDF, DOCX, or TXT files supported (Max 10MB per file)</p>
            
            <div className="flex items-center gap-4">
              <button onClick={handleUploadClick} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold text-sm shadow-sm shadow-blue-500/30 transition-all flex items-center gap-2">
                <span className="text-lg leading-none mb-0.5">+</span> Select Files
              </button>
              <button className="text-slate-600 font-bold hover:text-slate-800 px-4 py-3 rounded-lg text-sm transition-all flex items-center gap-2 hover:bg-slate-100">
                <Layers className="w-4 h-4" /> Switch to Batch Upload
              </button>
            </div>
            
             <input 
               type="file" multiple 
               ref={fileInputRef}
               className="hidden" 
               onChange={handleUpload} 
               accept=".pdf,.doc,.docx,.txt,.rtf" 
             />
          </div>

          {/* Uploading Queue Area */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-4 px-1">
              <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest">
                Uploading Queue ({files.length})
              </h3>
              {files.some(f => f.status === 'ready') && (
                <button onClick={clearCompleted} className="text-xs font-bold text-blue-600 hover:text-blue-800">
                  Clear Completed
                </button>
              )}
            </div>

            <div className="flex flex-col gap-3">
              {files.map((file) => (
                <div key={file.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-slate-200 transition-all">
                  
                  {file.status === 'parsing' && (
                    <>
                      <div className="flex items-center justify-between mb-3">
                         <div className="flex items-center gap-3">
                           <div className="bg-slate-100 p-2.5 rounded-lg text-slate-600 shrink-0">
                             <FileText className="w-5 h-5" />
                           </div>
                           <span className="font-bold text-slate-800 text-sm truncate max-w-[200px] sm:max-w-xs">{file.name}</span>
                         </div>
                         <div className="flex items-center gap-4">
                           <div className="flex items-center gap-1.5 text-blue-600">
                             <Loader2 className="w-3.5 h-3.5 animate-spin" />
                             <span className="text-[10px] font-bold tracking-wider uppercase">Parsing</span>
                           </div>
                           <button onClick={() => removeFile(file.id)} className="text-slate-400 hover:text-slate-600">
                             <X className="w-4 h-4" />
                           </button>
                         </div>
                      </div>
                      
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="bg-blue-600 h-full rounded-full transition-all duration-300" style={{ width: `${file.progress}%` }}></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-medium">{file.size}</span>
                        <span className="text-[9px] font-black text-slate-400 tracking-widest uppercase">{file.message}</span>
                      </div>
                    </>
                  )}

                  {file.status === 'ready' && (
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-4">
                         <div className="bg-blue-500 text-white p-1 rounded-full shrink-0 flex items-center justify-center w-8 h-8 ring-4 ring-blue-50">
                           <Check className="w-5 h-5" strokeWidth={3} />
                         </div>
                         <div>
                           <span className="font-bold text-slate-800 text-sm block mb-0.5 truncate max-w-[200px] sm:max-w-xs">{file.name}</span>
                           <span className="text-xs text-slate-500 font-medium">{file.message}</span>
                         </div>
                       </div>
                       
                       <div className="flex items-center gap-4 shrink-0">
                         <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-[10px] font-black tracking-widest uppercase">
                           Ready
                         </div>
                         <button 
                           onClick={() => navigate('/dashboard')}
                           className="text-[11px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-wide cursor-pointer"
                         >
                           View Data
                         </button>
                       </div>
                    </div>
                  )}

                  {file.status === 'failed' && (
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-4">
                         <div className="bg-red-500 text-white p-1 rounded-full shrink-0 flex items-center justify-center w-8 h-8 ring-4 ring-red-50">
                           <AlertCircle className="w-5 h-5" strokeWidth={2.5} />
                         </div>
                         <div>
                           <span className="font-bold text-slate-800 text-sm block mb-0.5 truncate max-w-[200px] sm:max-w-xs">{file.name}</span>
                           <span className="text-xs text-red-500 font-medium">{file.message}</span>
                         </div>
                       </div>
                       
                       <div className="flex items-center gap-4 shrink-0">
                         <div className="bg-red-100 text-red-700 px-3 py-1 rounded-md text-[10px] font-black tracking-widest uppercase">
                           Failed
                         </div>
                         <button onClick={() => retryFile(file)} className="text-[11px] font-bold text-slate-600 hover:text-slate-900 uppercase tracking-wide flex items-center gap-1">
                           Retry
                         </button>
                       </div>
                    </div>
                  )}
                  
                </div>
              ))}
              
              {files.length === 0 && (
                <div className="text-center py-10 bg-slate-50 border border-slate-100 border-dashed rounded-2xl">
                  <p className="text-sm text-slate-500 font-medium">Your upload queue is currently empty.</p>
                </div>
              )}
            </div>
          </div>
          
        </div>

        {/* Right Column - Overview & Cards */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Parsing Overview Card */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 text-lg mb-6">Parsing Overview</h3>
            
            <div className="flex justify-between items-center mb-5">
              <span className="text-sm font-medium text-slate-600">Avg. Extraction Time</span>
              <span className="font-bold text-slate-900">1.2s</span>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-slate-600">Daily Limit Usage</span>
                <span className="font-bold text-slate-900 text-sm">12 / 500</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '5%' }}></div>
              </div>
            </div>
            
            <div className="pt-5 border-t border-slate-100 mt-2 flex items-center gap-4">
               <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                 <Cpu className="w-5 h-5" />
               </div>
               <div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-800 mb-0.5">AI Status</p>
                 <p className="text-xs font-medium text-slate-500">Model GPT-4o-Hybrid Active</p>
               </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
  
