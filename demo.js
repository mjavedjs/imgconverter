// Demo script for DoppelMe Avatar API
// This script demonstrates how to use the DoppelMe API

import axios from 'axios';

// Configuration
const RAPIDAPI_KEY = '68deefe93emshbcaf075f3a1a1cfp187d87jsn18efbe156976';
const API_HOST = 'doppelme-avatars.p.rapidapi.com';

// Function to create an avatar
async function createAvatar(avatarId = 'DM1670714VMJWTG', styleId = '59') {
  const options = {
    method: 'PUT',
    url: `https://${API_HOST}/avatar/${avatarId}/${styleId}`,
    headers: {
      'x-rapidapi-key': RAPIDAPI_KEY,
      'x-rapidapi-host': API_HOST,
      'Content-Type': 'application/json'
    },
    data: {}
  };

  try {
    console.log(`Creating avatar with ID: ${avatarId}, Style: ${styleId}`);
    const response = await axios.request(options);
    console.log('✅ Avatar created successfully!');
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error creating avatar:', error.response?.data || error.message);
    throw error;
  }
}

// Function to get an avatar
async function getAvatar(avatarId = 'DM1670714VMJWTG') {
  const options = {
    method: 'GET',
    url: `https://${API_HOST}/avatar/${avatarId}`,
    headers: {
      'x-rapidapi-key': RAPIDAPI_KEY,
      'x-rapidapi-host': API_HOST
    }
  };

  try {
    console.log(`Getting avatar with ID: ${avatarId}`);
    const response = await axios.request(options);
    console.log('✅ Avatar retrieved successfully!');
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error getting avatar:', error.response?.data || error.message);
    throw error;
  }
}

// Demo function
async function runDemo() {
  console.log('🎭 DoppelMe Avatar API Demo');
  console.log('============================\n');

  try {
    // Create an avatar
    console.log('1. Creating a new avatar...');
    const createdAvatar = await createAvatar('DEMO123', '59');
    
    if (createdAvatar.avatar_url) {
      console.log(`Avatar URL: ${createdAvatar.avatar_url}\n`);
    }

    // Get the avatar
    console.log('2. Retrieving the avatar...');
    const retrievedAvatar = await getAvatar('DEMO123');
    
    if (retrievedAvatar.avatar_url) {
      console.log(`Avatar URL: ${retrievedAvatar.avatar_url}\n`);
    }

    console.log('🎉 Demo completed successfully!');
    
  } catch (error) {
    console.error('💥 Demo failed:', error.message);
  }
}

// Available style IDs and their descriptions
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

console.log('Available Avatar Styles:');
styleOptions.forEach(style => {
  console.log(`  ${style.id}: ${style.name} - ${style.description}`);
});
console.log('');

// Run the demo
runDemo(); 