import React, { useState, useEffect } from 'react';
import { createDoppelMeAvatar, getDoppelMeAvatar, isDoppelMeApiKeyValid } from '../utils/api';

const DoppelMeAvatarCreator = () => {
  const [avatarId, setAvatarId] = useState('DM1670714VMJWTG');
  const [styleId, setStyleId] = useState('59');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [processingStep, setProcessingStep] = useState('');
  const [apiKeyBanner, setApiKeyBanner] = useState(true);

  // Predefined style options for DoppelMe
  const styleOptions = [
    { id: '59', name: 'Classic Cartoon', description: 'Traditional cartoon style' },
    { id: '60', name: 'Anime Style', description: 'Japanese anime aesthetic' },
    { id: '61', name: 'Pixel Art', description: 'Retro pixelated look' },
    { id: '62', name: 'Watercolor', description: 'Soft watercolor painting' },
    { id: '63', name: 'Oil Painting', description: 'Classic oil painting style' },
    { id: '64', name: 'Sketch', description: 'Hand-drawn sketch style' },
    { id: '65', name: 'Pop Art', description: 'Bold pop art colors' },
    { id: '66', name: 'Gothic', description: 'Dark gothic aesthetic' }
  ];

  useEffect(() => {
    if (isDoppelMeApiKeyValid()) setApiKeyBanner(false);
  }, []);

  const showToast = (msg) => {
    setError(msg);
    setTimeout(() => setError(''), 3500);
  };

  const handleCreateAvatar = async () => {
    if (!avatarId.trim()) {
      showToast('Please enter a valid Avatar ID');
      return;
    }

    setLoading(true);
    setProcessingStep('Creating avatar...');
    try {
      if (!isDoppelMeApiKeyValid()) {
        showToast('Please add your RapidAPI key to the .env file');
        return;
      }

      setProcessingStep('Generating avatar with DoppelMe...');
      const result = await createDoppelMeAvatar(avatarId, styleId);
      
      if (result && result.avatar_url) {
        setAvatarUrl(result.avatar_url);
        setProcessingStep('');
        showToast('Avatar created successfully!');
      } else {
        showToast('No avatar URL received from API');
      }
    } catch (error) {
      showToast(error.message || 'Failed to create avatar. Please try again.');
      setProcessingStep('');
    } finally {
      setLoading(false);
    }
  };

  const handleGetAvatar = async () => {
    if (!avatarId.trim()) {
      showToast('Please enter a valid Avatar ID');
      return;
    }

    setLoading(true);
    setProcessingStep('Fetching avatar...');
    try {
      if (!isDoppelMeApiKeyValid()) {
        showToast('Please add your RapidAPI key to the .env file');
        return;
      }

      setProcessingStep('Retrieving avatar from DoppelMe...');
      const result = await getDoppelMeAvatar(avatarId);
      
      if (result && result.avatar_url) {
        setAvatarUrl(result.avatar_url);
        setProcessingStep('');
        showToast('Avatar retrieved successfully!');
      } else {
        showToast('No avatar URL received from API');
      }
    } catch (error) {
      showToast(error.message || 'Failed to retrieve avatar. Please try again.');
      setProcessingStep('');
    } finally {
      setLoading(false);
    }
  };

  const downloadAvatar = () => {
    if (avatarUrl) {
      const link = document.createElement('a');
      link.href = avatarUrl;
      link.download = `doppelme-avatar-${avatarId}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const resetAvatar = () => {
    setAvatarUrl('');
    setError('');
    setProcessingStep('');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e40af 50%, #0f172a 100%)', padding: '20px', color: 'white' }}>
      {/* API Key Banner */}
      {apiKeyBanner && (
        <div style={{ position: 'fixed', top: 80, left: 0, right: 0, zIndex: 50, background: 'rgba(239,68,68,0.95)', color: 'white', padding: '10px 0', textAlign: 'center', fontWeight: 600, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ marginRight: 8 }}>⚠️ RapidAPI key is missing or invalid.</span>
          <a href="https://rapidapi.com/" target="_blank" rel="noopener noreferrer" style={{ background: '#6366f1', color: 'white', padding: '4px 12px', borderRadius: 6, margin: '0 8px', textDecoration: 'none', fontWeight: 600 }}>Get RapidAPI Key</a>
          <span style={{ fontSize: 12, marginLeft: 8 }}>Set <code style={{ background: 'rgba(0,0,0,0.2)', padding: '2px 4px', borderRadius: 4 }}>VITE_RAPIDAPI_KEY</code> in your <code>.env</code> file.</span>
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
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px', background: 'linear-gradient(45deg, #3b82f6, #1d4ed8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            🎭 DoppelMe Avatar Creator
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#cbd5e1' }}>
            Create stunning personalized avatars with AI-powered DoppelMe technology
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          {/* Configuration Section */}
          <div>
            <div style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '16px', padding: '32px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', textAlign: 'center' }}>
                ⚙️ Avatar Configuration
              </h3>

              {/* Avatar ID Input */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#e2e8f0' }}>
                  Avatar ID
                </label>
                <input
                  type="text"
                  value={avatarId}
                  onChange={(e) => setAvatarId(e.target.value)}
                  placeholder="Enter Avatar ID (e.g., DM1670714VMJWTG)"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '16px'
                  }}
                />
                <p style={{ fontSize: '14px', color: '#9ca3af', marginTop: '4px' }}>
                  Use the default ID or create your own unique identifier
                </p>
              </div>

              {/* Style Selection */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#e2e8f0' }}>
                  Avatar Style
                </label>
                <select
                  value={styleId}
                  onChange={(e) => setStyleId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '16px'
                  }}
                >
                  {styleOptions.map(style => (
                    <option key={style.id} value={style.id} style={{ background: '#1e293b', color: 'white' }}>
                      {style.name} - {style.description}
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                <button
                  onClick={handleCreateAvatar}
                  disabled={loading || !isDoppelMeApiKeyValid()}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: (!isDoppelMeApiKeyValid() || loading) ? 'not-allowed' : 'pointer',
                    background: (!isDoppelMeApiKeyValid() || loading) ? '#6b7280' : 'linear-gradient(45deg, #3b82f6, #1d4ed8)',
                    color: 'white',
                    border: 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {loading ? 'Creating...' : '🎨 Create Avatar'}
                </button>
                <button
                  onClick={handleGetAvatar}
                  disabled={loading || !isDoppelMeApiKeyValid()}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: (!isDoppelMeApiKeyValid() || loading) ? 'not-allowed' : 'pointer',
                    background: (!isDoppelMeApiKeyValid() || loading) ? '#6b7280' : 'linear-gradient(45deg, #10b981, #059669)',
                    color: 'white',
                    border: 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {loading ? 'Fetching...' : '📥 Get Avatar'}
                </button>
              </div>

              <button
                onClick={resetAvatar}
                style={{
                  width: '100%',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  background: 'rgba(239, 68, 68, 0.8)',
                  color: 'white',
                  border: 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                🔄 Reset
              </button>
            </div>

            {/* Loading State */}
            {loading && (
              <div style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '16px', padding: '24px', marginTop: '24px', textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', border: '4px solid rgba(255, 255, 255, 0.3)', borderTop: '4px solid #3b82f6', borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 1s linear infinite' }}></div>
                <p style={{ color: '#cbd5e1' }}>{processingStep || 'Processing your request...'}</p>
                <p style={{ fontSize: '14px', color: '#9ca3af' }}>This may take a few moments</p>
              </div>
            )}
          </div>

          {/* Avatar Display Section */}
          <div>
            <div style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '16px', padding: '32px', textAlign: 'center', minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {avatarUrl ? (
                <>
                  <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px' }}>
                    🎭 Your Avatar
                  </h3>
                  <div style={{ position: 'relative', marginBottom: '24px' }}>
                    <img 
                      src={avatarUrl} 
                      alt="DoppelMe Avatar" 
                      style={{ 
                        width: '100%', 
                        maxWidth: '300px', 
                        height: '300px', 
                        objectFit: 'contain', 
                        borderRadius: '16px',
                        border: '2px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                      }} 
                    />
                  </div>
                  <button
                    onClick={downloadAvatar}
                    style={{
                      width: '100%',
                      padding: '16px 24px',
                      borderRadius: '12px',
                      fontSize: '18px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      background: 'linear-gradient(45deg, #10b981, #059669)',
                      color: 'white',
                      border: 'none',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    💾 Download Avatar
                  </button>
                </>
              ) : (
                <>
                  <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎭</div>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>
                    No Avatar Yet
                  </h3>
                  <p style={{ color: '#9ca3af', marginBottom: '24px' }}>
                    Configure your avatar settings and click "Create Avatar" to generate your personalized avatar
                  </p>
                  <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '16px', textAlign: 'left' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>💡 How it works:</h4>
                    <ul style={{ fontSize: '14px', color: '#9ca3af', lineHeight: '1.6' }}>
                      <li>• Enter a unique Avatar ID or use the default</li>
                      <li>• Choose your preferred avatar style</li>
                      <li>• Click "Create Avatar" to generate</li>
                      <li>• Download your personalized avatar</li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Success Message */}
        {avatarUrl && (
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', borderRadius: '12px', padding: '16px', marginTop: '24px', textAlign: 'center' }}>
            <div style={{ color: '#10b981', fontSize: '18px', fontWeight: '600' }}>
              ✅ Success! Your DoppelMe avatar has been created!
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

export default DoppelMeAvatarCreator; 