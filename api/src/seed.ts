import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Candidate from './models/Candidate';
import { ICandidate, IEducation } from './types';

// Load environment variables
dotenv.config();

// Seed data with Arvind's real information
const seedData: ICandidate = {
  name: 'Arvind Pratap Singh',
  email: 'arvind.career.775@gmail.com',
  phone: '9257234792',
  education: {
    degree: 'B.Tech in Civil Engineering',
    institution: 'IIT Mandi',
    cgpa: 7.25,
  } as IEducation,
  skills: [
    'React',
    'Python',
    'Node.js',
    'Express.js',
    'MongoDB',
    'C++',
    'JavaScript',
    'Gen AI',
  ],
  projects: [
    {
      title: 'CritiqueAI',
      description:
        'AI-Powered Learning Assistant. Developed frontend with React + Vite, Flask backend connected to Gemini API for AI feedback.',
      stack: ['React', 'Vite', 'Flask', 'Gemini API', 'Python'],
      links: {
        github: 'https://github.com/Apsinghsa/CritiqueAI',
        demo: '',
      },
    },
    {
      title: 'MAKEREADME',
      description:
        'AI-Powered README Generator. Node.js Express backend using GitHub API and Gemini API to synthesize descriptions. Cloudflare Turnstile integration.',
      stack: ['Node.js', 'React', 'Express', 'GitHub API', 'Gemini API', 'Cloudflare Turnstile'],
      links: {
        github: 'https://github.com/Apsinghsa/MAKEREADME',
        demo: '',
      },
    },
  ],
  links: {
    github: 'https://github.com/Apsinghsa',
    linkedin: '',
    portfolio: '',
  },
};

const seedDatabase = async (): Promise<void> => {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    await mongoose.connect(mongoURI);

    console.log('✅ MongoDB Connected for seeding...');

    // Clear existing data
    const deleteResult = await Candidate.deleteMany({});
    console.log(`🗑️  Cleared ${deleteResult.deletedCount} existing candidate(s)`);

    // Insert seed data
    const candidate = await Candidate.create(seedData);
    console.log('✨ Seed data inserted successfully!');
    console.log('='.repeat(50));
    console.log(`📝 Profile: ${candidate.name}`);
    console.log(`📧 Email: ${candidate.email}`);
    console.log(`📱 Phone: ${candidate.phone}`);
    console.log(`🎓 Education: ${(candidate.education as IEducation).degree}`);
    console.log(`💼 Skills: ${candidate.skills.length} skills`);
    console.log(`🚀 Projects: ${candidate.projects.length} projects`);
    console.log('='.repeat(50));
    console.log('✅ Database seeding completed!');

    // Disconnect
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    if (error instanceof Error) {
      console.error('❌ Error seeding database:', error.message);
    } else {
      console.error('❌ Unknown error occurred while seeding database');
    }
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
