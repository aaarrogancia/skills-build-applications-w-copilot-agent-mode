"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = exports.LeaderboardEntry = exports.Activity = exports.Team = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: 'member' },
}, { timestamps: true });
const teamSchema = new Schema({
    name: { type: String, required: true },
    sport: { type: String, default: 'fitness' },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });
const activitySchema = new Schema({
    type: { type: String, required: true },
    durationMinutes: { type: Number, default: 0 },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });
const leaderboardEntrySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    score: { type: Number, default: 0 },
    rank: { type: Number, default: 0 },
}, { timestamps: true });
const workoutSchema = new Schema({
    title: { type: String, required: true },
    difficulty: { type: String, default: 'beginner' },
    durationMinutes: { type: Number, default: 30 },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });
exports.User = mongoose_1.default.model('User', userSchema);
exports.Team = mongoose_1.default.model('Team', teamSchema);
exports.Activity = mongoose_1.default.model('Activity', activitySchema);
exports.LeaderboardEntry = mongoose_1.default.model('LeaderboardEntry', leaderboardEntrySchema);
exports.Workout = mongoose_1.default.model('Workout', workoutSchema);
