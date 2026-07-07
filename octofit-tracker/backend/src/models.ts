import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: 'member' },
  },
  { timestamps: true },
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    sport: { type: String, default: 'fitness' },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

const activitySchema = new Schema(
  {
    type: { type: String, required: true },
    durationMinutes: { type: Number, default: 0 },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

const leaderboardEntrySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    score: { type: Number, default: 0 },
    rank: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    difficulty: { type: String, default: 'beginner' },
    durationMinutes: { type: Number, default: 30 },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

export const User = mongoose.model('User', userSchema);
export const Team = mongoose.model('Team', teamSchema);
export const Activity = mongoose.model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardEntrySchema);
export const Workout = mongoose.model('Workout', workoutSchema);
