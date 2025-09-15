import { useState, useRef } from "react";
import { X, Upload, FileText, CheckCircle, AlertCircle, Clock } from "lucide-react";

const UploadModal = ({ isOpen, onClose }) => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    processFiles(selectedFiles);
  };

  const processFiles = (newFiles) => {
    const processedFiles = newFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'pending',
      progress: 0,
      error: null
    }));

    setFiles(prev => [...prev, ...processedFiles]);
    
    processedFiles.forEach(file => simulateUpload(file.id));
  };

  const simulateUpload = (fileId) => {
    setFiles(prev => 
      prev.map(file => 
        file.id === fileId ? { ...file, status: 'uploading' } : file
      )
    );

    const interval = setInterval(() => {
      setFiles(prev => 
        prev.map(file => {
          if (file.id === fileId) {
            const newProgress = Math.min(file.progress + 10, 100);
            return { ...file, progress: newProgress };
          }
          return file;
        })
      );
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      
      const isSuccess = Math.random() > 0.2;
      
      setFiles(prev => 
        prev.map(file => {
          if (file.id === fileId) {
            return { 
              ...file, 
              status: isSuccess ? 'success' : 'error',
              progress: 100,
              error: isSuccess ? null : 'Upload failed. Please try again.'
            };
          }
          return file;
        })
      );
    }, 3000);
  };

  const removeFile = (fileId) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'uploading':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Upload Files</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {/* Drop zone */}
          <div 
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-1">
              Drag & drop files here or click to browse
            </p>
            <p className="text-gray-500 text-sm">
              Supported formats: PDF, DOC, DOCX (Max 10MB)
            </p>
            <input 
              ref={fileInputRef}
              type="file" 
              className="hidden" 
              multiple 
              onChange={handleFileSelect}
            />
          </div>
          
          {/* File list */}
          {files.length > 0 && (
            <div className="mt-6">
              <h4 className="font-medium text-gray-900 mb-3">Uploaded Files</h4>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {files.map(file => (
                  <div key={file.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center min-w-0">
                      <FileText className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                        {file.error && (
                          <p className="text-xs text-red-500">{file.error}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center ml-2">
                      {/* Progress bar for uploading files */}
                      {file.status === 'uploading' && (
                        <div className="w-16 bg-gray-200 rounded-full h-1.5 mr-2">
                          <div 
                            className="bg-blue-600 h-1.5 rounded-full transition-all" 
                            style={{ width: `${file.progress}%` }}
                          ></div>
                        </div>
                      )}
                      
                      {/* Status icon */}
                      {getStatusIcon(file.status)}
                      
                      {/* Remov button */}
                      <button 
                        onClick={() => removeFile(file.id)}
                        className="ml-2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
       
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;