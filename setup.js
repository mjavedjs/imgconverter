#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🎨 AI Image Cartoonifier Setup\n');

// Check if .env file already exists
const envPath = path.join(process.cwd(), '.env');
const envExists = fs.existsSync(envPath);

if (envExists) {
  console.log('⚠️  .env file already exists!');
  rl.question('Do you want to overwrite it? (y/N): ', (answer) => {
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
      createEnvFile();
    } else {
      console.log('Setup cancelled. Your existing .env file was preserved.');
      rl.close();
    }
  });
} else {
  createEnvFile();
}

function createEnvFile() {
  console.log('\n🔑 DeepAI API Key Setup');
  console.log('You need a DeepAI API key to use this app.');
  console.log('Get one for free at: https://deepai.org/\n');
  
  rl.question('Enter your DeepAI API key: ', (apiKey) => {
    if (!apiKey.trim()) {
      console.log('❌ API key is required!');
      rl.close();
      return;
    }
    
    // Create .env file content
    const envContent = `# DeepAI API Configuration
# Get your free API key from: https://deepai.org/
VITE_DEEPAI_API_KEY=${apiKey.trim()}

# Optional: API Configuration
VITE_API_TIMEOUT=30000
VITE_MAX_RETRIES=3
`;
    
    try {
      fs.writeFileSync(envPath, envContent);
      console.log('\n✅ .env file created successfully!');
      console.log('\n🚀 Next steps:');
      console.log('1. Run: npm install');
      console.log('2. Run: npm run dev');
      console.log('3. Open: http://localhost:5173');
      console.log('\n🎨 Happy cartoonifying!');
    } catch (error) {
      console.error('❌ Error creating .env file:', error.message);
    }
    
    rl.close();
  });
}

// Handle process exit
process.on('SIGINT', () => {
  console.log('\n\nSetup cancelled.');
  rl.close();
  process.exit(0);
}); 