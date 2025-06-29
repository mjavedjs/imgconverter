import React, { useState, useRef, useEffect } from 'react';
import { cartoonifyImage, isApiKeyValid } from '../utils/api';
import { validateFile } from '../config/api';

const DeepAIImageModifier = () => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [modifiedImageUrl, setModifiedImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [apiKeyBanner, setApiKeyBanner] = useState(true);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isApiKeyValid()) setApiKeyBanner(false);
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validationErrors = validateFile(file);
      if (validationErrors.length > 0) {
        showToast(validationErrors[0]);
        return;
      }
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setModifiedImageUrl('');
      setError('');
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

  const showToast = (msg) => {
    setError(msg);
    setTimeout(() => setError(''), 3500);
  };

  const handleModifyImage = async () => {
    if (!image) return;
    setLoading(true);
    setProcessingStep('Preparing image...');
    try {
      if (!isApiKeyValid()) {
        showToast('Please add your DeepAI API key to the .env file');
        return;
      }
      setProcessingStep('Uploading to AI service...');
      const result = await cartoonifyImage(image);
      if (result.output_url) {
        setModifiedImageUrl(result.output_url);
        setProcessingStep('');
      } else {
        showToast('No output URL received from API');
      }
    } catch (error) {
      showToast(error.message || 'Failed to process image. Please try again.');
      setProcessingStep('');
    } finally {
      setLoading(false);
    }
  };

  const resetAll = () => {
    setImage(null);
    setPreviewUrl('');
    setModifiedImageUrl('');
    setError('');
    setProcessingStep('');
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
      {/* API Key Banner */}
      {apiKeyBanner && (
        <div style={{ position: 'fixed', top: 80, left: 0, right: 0, zIndex: 50, background: 'rgba(239,68,68,0.95)', color: 'white', padding: '10px 0', textAlign: 'center', fontWeight: 600, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ marginRight: 8 }}>⚠️ API key is missing or invalid.</span>
          <a href="https://deepai.org/" target="_blank" rel="noopener noreferrer" style={{ background: '#6366f1', color: 'white', padding: '4px 12px', borderRadius: 6, margin: '0 8px', textDecoration: 'none', fontWeight: 600 }}>Get Free API Key</a>
          <span style={{ fontSize: 12, marginLeft: 8 }}>Set <code style={{ background: 'rgba(0,0,0,0.2)', padding: '2px 4px', borderRadius: 4 }}>VITE_DEEPAI_API_KEY</code> in your <code>.env</code> file.</span>
          <button onClick={() => setApiKeyBanner(false)} style={{ marginLeft: 16, background: 'transparent', border: 'none', color: 'white', fontSize: 18, cursor: 'pointer' }}>&times;</button>
        </div>
      )}
      {/* Toast for errors */}
      {error && (
        <div style={{ position: 'fixed', top: 140, right: 20, zIndex: 100, background: '#ef4444', color: 'white', padding: '12px 24px', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.15)', fontWeight: 500 }}>{error}</div>
      )}
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
              <button 
                onClick={handleModifyImage} 
                disabled={!image || loading || !isApiKeyValid()} 
                style={{ 
                  width: '100%', 
                  padding: '16px 24px', 
                  borderRadius: '12px', 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  cursor: (!image || loading || !isApiKeyValid()) ? 'not-allowed' : 'pointer', 
                  background: (!image || loading || !isApiKeyValid()) ? '#6b7280' : 'linear-gradient(45deg, #9333ea, #3b82f6)', 
                  color: 'white', 
                  border: 'none', 
                  transition: 'all 0.3s ease' 
                }}
              >
                {loading ? 'Processing...' : 'Cartoonify Now!'}
              </button>
            </div>
            {/* Loading State */}
            {loading && (
              <div style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '16px', padding: '24px', marginTop: '24px', textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', border: '4px solid rgba(255, 255, 255, 0.3)', borderTop: '4px solid #9333ea', borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 1s linear infinite' }}></div>
                <p style={{ color: '#cbd5e1' }}>{processingStep || 'Processing your image...'}</p>
                <p style={{ fontSize: '14px', color: '#9ca3af' }}>This may take a few moments</p>
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