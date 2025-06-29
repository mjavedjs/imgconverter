import React, { useState, useRef } from 'react';

const DeepAIImageModifier = () => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [modifiedImageUrl, setModifiedImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        // Check file size (max 10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
          setError('File size too large. Please select an image smaller than 10MB.');
          return;
        }
        setImage(file);
        setPreviewUrl(URL.createObjectURL(file));
        setModifiedImageUrl('');
        setError('');
      } else {
        setError('Please select a valid image file.');
      }
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageChange({ target: { files: e.dataTransfer.files } });
    }
  };

  const handleModifyImage = async () => {
    if (!image) return;
    const apiKey = import.meta.env.VITE_DEEPAI_API_KEY;
    if (!apiKey) {
      setError('❌ No API key configured. Please add your DeepAI API key to the .env file.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('image', image);
      const response = await fetch('https://api.deepai.org/api/toonify', {
        method: 'POST',
        headers: {
          'Api-Key': apiKey,
        },
        body: formData,
      });
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Failed to process image.';
        if (response.status === 401) {
          errorMessage = 'API key is invalid or expired. Please get a new API key from https://deepai.org/';
        } else if (response.status === 400) {
          errorMessage = 'Invalid image format. Please try a different image.';
        } else if (response.status === 429) {
          errorMessage = 'Rate limit exceeded. Please try again later.';
        } else if (response.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        } else {
          errorMessage = `API Error (${response.status}): ${errorText}`;
        }
        throw new Error(errorMessage);
      }
      const result = await response.json();
      if (result.output_url) {
        setModifiedImageUrl(result.output_url);
      } else {
        throw new Error('No output URL received from API');
      }
    } catch (error) {
      setError(error.message || 'Failed to process image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetAll = () => {
    setImage(null);
    setPreviewUrl('');
    setModifiedImageUrl('');
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const downloadImage = () => {
    if (modifiedImageUrl) {
      const link = document.createElement('a');
      link.href = modifiedImageUrl;
      link.download = `cartoonified-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1e293b 0%, #7c3aed 50%, #1e293b 100%)', padding: '20px', color: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px', background: 'linear-gradient(45deg, #9333ea, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            AI Image Cartoonifier
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#cbd5e1' }}>
            Transform your photos into stunning cartoon-style artwork using advanced AI technology
          </p>
        </div>
        {/* API Key Warning */}
        {(!import.meta.env.VITE_DEEPAI_API_KEY) && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '12px', padding: '20px', marginBottom: '32px', textAlign: 'center' }}>
            <div style={{ color: '#f87171', fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
              🔑 API Key Required
            </div>
            <div style={{ color: '#cbd5e1', marginBottom: '16px' }}>
              To use this app, you need a DeepAI API key. Get one for free at:
            </div>
            <a href="https://deepai.org/" target="_blank" rel="noopener noreferrer" style={{ background: 'linear-gradient(45deg, #9333ea, #3b82f6)', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', display: 'inline-block' }}>
              Get Free API Key
            </a>
            <div style={{ fontSize: '14px', color: '#9ca3af', marginTop: '12px' }}>
              Then add it to the .env file as: VITE_DEEPAI_API_KEY=your_key_here
            </div>
          </div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          {/* Upload Section */}
          <div>
            <div style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '16px', padding: '32px' }}>
              <div style={{ border: '2px dashed #6b7280', borderRadius: '12px', padding: '32px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s ease', borderColor: dragActive ? '#9333ea' : '#6b7280', backgroundColor: dragActive ? 'rgba(147, 51, 234, 0.1)' : 'transparent' }} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()}>
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>📁</div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>
                  Drop your image here
                </h3>
                <p style={{ color: '#9ca3af', marginBottom: '16px' }}>
                  or click to browse files
                </p>
                <button style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', color: 'white', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer' }}>
                  Choose Image
                </button>
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
            </div>
            {/* Original Image Preview */}
            {previewUrl && (
              <div style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '16px', padding: '24px', marginTop: '24px' }}>
                <h3 style={{ marginBottom: '16px' }}>Original Image</h3>
                <img src={previewUrl} alt="Original" style={{ width: '100%', height: '256px', objectFit: 'cover', borderRadius: '12px' }} />
                <div style={{ marginTop: '12px', fontSize: '14px', color: '#9ca3af' }}>
                  File: {image?.name} ({(image?.size / 1024 / 1024).toFixed(2)} MB)
                </div>
                <button onClick={resetAll} style={{ marginTop: '12px', background: 'rgba(239, 68, 68, 0.8)', border: 'none', color: 'white', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}>
                  Reset
                </button>
              </div>
            )}
          </div>
          {/* Processing Section */}
          <div>
            <div style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
              <div style={{ width: '64px', height: '64px', background: 'linear-gradient(45deg, #9333ea, #3b82f6)', borderRadius: '50%', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', animation: loading ? 'spin 2s linear infinite' : 'none' }}>
                ✨
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>
                Transform Your Image
              </h3>
              <button onClick={handleModifyImage} disabled={!image || loading} style={{ width: '100%', padding: '16px 24px', borderRadius: '12px', fontSize: '18px', fontWeight: '600', cursor: !image || loading ? 'not-allowed' : 'pointer', background: !image || loading ? '#6b7280' : 'linear-gradient(45deg, #9333ea, #3b82f6)', color: 'white', border: 'none', transition: 'all 0.3s ease' }}>
                {loading ? 'Processing...' : 'Cartoonify Now!'}
              </button>
            </div>
            {/* Loading State */}
            {loading && (
              <div style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '16px', padding: '24px', marginTop: '24px', textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', border: '4px solid rgba(255, 255, 255, 0.3)', borderTop: '4px solid #9333ea', borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 1s linear infinite' }}></div>
                <p style={{ color: '#cbd5e1' }}>Processing your image...</p>
                <p style={{ fontSize: '14px', color: '#9ca3af' }}>This may take a few moments</p>
              </div>
            )}
            {/* Error Message */}
            {error && (
              <div style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid #ef4444', borderRadius: '12px', padding: '16px', marginTop: '24px' }}>
                <div style={{ color: '#f87171', marginBottom: '8px' }}>
                  ⚠️ {error}
                </div>
                <div style={{ fontSize: '14px', color: '#9ca3af' }}>
                  💡 Tip: Try a smaller image or check your internet connection
                </div>
              </div>
            )}
            {/* Modified Image Result */}
            {modifiedImageUrl && (
              <div style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '16px', padding: '24px', marginTop: '24px' }}>
                <h3 style={{ marginBottom: '16px' }}>🎨 Cartoonified Result</h3>
                <img src={modifiedImageUrl} alt="Cartoonified" style={{ width: '100%', height: '256px', objectFit: 'cover', borderRadius: '12px' }} />
                <button onClick={downloadImage} style={{ width: '100%', padding: '16px 24px', borderRadius: '12px', fontSize: '18px', fontWeight: '600', cursor: 'pointer', background: 'linear-gradient(45deg, #10b981, #059669)', color: 'white', border: 'none', marginTop: '16px', transition: 'all 0.3s ease' }}>
                  💾 Download Cartoonified Image
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Success Message */}
        {modifiedImageUrl && (
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', borderRadius: '12px', padding: '16px', marginTop: '24px', textAlign: 'center' }}>
            <div style={{ color: '#10b981', fontSize: '18px', fontWeight: '600' }}>
              ✅ Success! Your image has been cartoonified!
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default DeepAIImageModifier; 