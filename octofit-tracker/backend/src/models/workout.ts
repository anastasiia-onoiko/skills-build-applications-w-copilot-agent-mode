import { InferSchemaType, Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    scheduledFor: { type: Date, required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    targetArea: { type: String, required: true, trim: true },
    coachTip: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  },
);

export type WorkoutDocument = InferSchemaType<typeof workoutSchema>;

const Workout = model<WorkoutDocument>('Workout', workoutSchema);

export default Workout;