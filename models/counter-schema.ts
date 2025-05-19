import mongoose, { Schema, Document } from "mongoose";

interface ICounter extends Document {
  _id: string;
  seq: number;
}

const CounterSchema: Schema = new Schema<ICounter>(
  {
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 },
  },
  { collection: "counters" }
);
const Counter = mongoose.model<ICounter>("Counter", CounterSchema);

const getNextSequence = async (sequenceName: string): Promise<number> => {
  const sequenceDocument = await Counter.findByIdAndUpdate(
    sequenceName,
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return sequenceDocument?.seq || 0;
};

export { Counter, getNextSequence };
