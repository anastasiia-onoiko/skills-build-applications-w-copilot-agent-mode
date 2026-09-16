import { InferSchemaType, Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    score: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    streakDays: { type: Number, required: true, min: 0 },
    totalWorkouts: { type: Number, required: true, min: 0 },
  },
  {
    timestamps: true,
  },
);

export type LeaderboardDocument = InferSchemaType<typeof leaderboardSchema>;

const Leaderboard = model<LeaderboardDocument>('Leaderboard', leaderboardSchema);

export default Leaderboard;