// app/admin/components/add/BulkUploadTab.tsx
'use client';

import React, { useState, useCallback } from 'react';
import { Button } from '../../../components';
import { useAuth } from '../../../context/AuthContext';

interface UploadResult {
  created: number;
  failed: number;
  results: {
    success: Array<{ index: number; title: string; id: string }>;
    errors: Array<{ index: number; title: string; error: string }>;
  };
}

export default function BulkUploadTab() {
  const { token } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelect = (selectedFile: File) => {
    const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
    if (fileExtension !== 'json' && fileExtension !== 'xlsx') {
      setError('Please upload a JSON or Excel (.xlsx) file');
      return;
    }
    setFile(selectedFile);
    setError(null);
    setResult(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setUploading(true);
    setError(null);
    setResult(null);

    try {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      let fileData: string;
      let fileType: string;

      if (fileExtension === 'json') {
        fileData = await file.text();
        fileType = 'json';
      } else {
        // Excel file - convert to base64
        const arrayBuffer = await file.arrayBuffer();
        const base64 = btoa(
          new Uint8Array(arrayBuffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        fileData = base64;
        fileType = 'excel';
      }

      const res = await fetch('/api/services/bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ fileData, fileType })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Upload failed');
      }

      setResult(data.data);
      setFile(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const downloadTemplate = (type: 'json') => {
    const link = document.createElement('a');
    link.href = '/templates/pooja-template.json';
    link.download = 'pooja-template.json';
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">How to use bulk upload:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800 dark:text-blue-200">
          <li>Download the sample template (JSON or Excel)</li>
          <li>Fill in your pooja details following the template format</li>
          <li>Upload the completed file using the upload area below</li>
          <li>Review the results and check for any errors</li>
        </ol>
      </div>

      {/* Template Downloads */}
      <div className="flex gap-4">
        <Button onClick={() => downloadTemplate('json')} variant="outline">
          📄 Download JSON Template
        </Button>
        <a
          href="/templates/pooja-template.xlsx"
          download
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          📊 Download Excel Template
        </a>
      </div>

      {/* File Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-600'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept=".json,.xlsx"
          onChange={handleFileChange}
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="space-y-2">
            <div className="text-4xl">📁</div>
            <p className="text-lg font-medium">
              {file ? file.name : 'Drop your file here or click to browse'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Supports JSON and Excel (.xlsx) files
            </p>
          </div>
        </label>
      </div>

      {/* Upload Button */}
      {file && (
        <div className="flex gap-4">
          <Button
            onClick={handleUpload}
            disabled={uploading}
            className="flex-1"
          >
            {uploading ? 'Uploading...' : 'Upload & Create Poojas'}
          </Button>
          <Button
            onClick={() => {
              setFile(null);
              setError(null);
              setResult(null);
            }}
            variant="outline"
          >
            Clear
          </Button>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      {/* Results Display */}
      {result && (
        <div className="space-y-4">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
              Upload Complete!
            </h3>
            <p className="text-green-800 dark:text-green-200">
              ✅ {result.created} poojas created successfully
              {result.failed > 0 && ` | ❌ ${result.failed} failed`}
            </p>
          </div>

          {/* Success List */}
          {result.results.success.length > 0 && (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Successfully Created:</h4>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {result.results.success.map((item) => (
                  <div key={item.id} className="text-sm text-gray-700 dark:text-gray-300">
                    {item.index}. {item.title}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error List */}
          {result.results.errors.length > 0 && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">Errors:</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {result.results.errors.map((item, idx) => (
                  <div key={idx} className="text-sm">
                    <span className="font-medium text-red-800 dark:text-red-200">
                      {item.index}. {item.title}:
                    </span>
                    <span className="text-red-700 dark:text-red-300 ml-2">{item.error}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
