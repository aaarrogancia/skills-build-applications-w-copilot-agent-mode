import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { name: 'Maya Chen', email: 'maya.chen@example.com', role: 'captain' },
      { name: 'Liam Patel', email: 'liam.patel@example.com', role: 'member' },
      { name: 'Sophia Rivera', email: 'sophia.rivera@example.com', role: 'member' },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'River Runners',
        sport: 'running',
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Peak Power',
        sport: 'strength',
        members: [users[2]._id],
      },
    ]);

    await Activity.insertMany([
      {
        type: 'run',
        durationMinutes: 35,
        userId: users[0]._id,
      },
      {
        type: 'strength',
        durationMinutes: 50,
        userId: users[1]._id,
      },
      {
        type: 'yoga',
        durationMinutes: 25,
        userId: users[2]._id,
      },
    ]);

    await LeaderboardEntry.insertMany([
      { userId: users[0]._id, score: 980, rank: 1 },
      { userId: users[1]._id, score: 912, rank: 2 },
      { userId: users[2]._id, score: 889, rank: 3 },
    ]);

    await Workout.insertMany([
      {
        title: 'Tempo Interval Run',
        difficulty: 'intermediate',
        durationMinutes: 40,
        userId: users[0]._id,
      },
      {
        title: 'Full Body Strength',
        difficulty: 'beginner',
        durationMinutes: 45,
        userId: users[1]._id,
      },
      {
        title: 'Mobility Flow',
        difficulty: 'beginner',
        durationMinutes: 20,
        userId: users[2]._id,
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
