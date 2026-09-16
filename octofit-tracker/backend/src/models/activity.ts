import { InferSchemaType, Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 1 },
    intensity: {
      type: String,
      required: true,
      enum: ['low', 'moderate', 'high'],
    },
    completedAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  },
);

export type ActivityDocument = InferSchemaType<typeof activitySchema>;

const Activity = model<ActivityDocument>('Activity', activitySchema);

export default Activity;