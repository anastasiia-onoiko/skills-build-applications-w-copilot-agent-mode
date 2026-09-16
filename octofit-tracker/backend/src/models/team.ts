import { InferSchemaType, Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    city: { type: String, required: true, trim: true },
    focus: { type: String, required: true, trim: true },
    captainName: { type: String, required: true, trim: true },
    memberCount: { type: Number, required: true, min: 1 },
  },
  {
    timestamps: true,
  },
);

export type TeamDocument = InferSchemaType<typeof teamSchema>;

const Team = model<TeamDocument>('Team', teamSchema);

export default Team;