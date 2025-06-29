import React, { useState } from 'react';
import DeepAIImageModifier from './components/DeepAIImageModifier';
import DoppelMeAvatarCreator from './components/DoppelMeAvatarCreator';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [activeTab, setActiveTab] = useState('cartoonifier');

  const tabs = [
    { id: 'cartoonifier', name: '🎨 AI Cartoonifier', component: DeepAIImageModifier },
    { id: 'avatar', name: '🎭 DoppelMe Avatar', component: DoppelMeAvatarCreator }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <ErrorBoundary>
      <div className="App">
        {/* Tab Navigation */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '16px 20px'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '8px' }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  background: activeTab === tab.id 
                    ? 'linear-gradient(45deg, #3b82f6, #1d4ed8)' 
                    : 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease',
                  minWidth: '180px'
                }}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div style={{ marginTop: '80px' }}>
          {ActiveComponent && <ActiveComponent />}
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
