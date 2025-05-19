import mongoose, { Schema, Document } from "mongoose";
import { getNextSequence } from "./counter-schema";

interface ITradeSchema extends Document {
  trade_no: number;
  coin: string;
  direction: "buy" | "sell";
  timeframe: "5m" | "15m" | "30m" | "1h" | "4h" | "1d";
  entryPrice: number;
  sl: number;
  tp: number;
  status: "open" | "closed";
  isSuccess?: boolean;
  pnl?: number;
  notes?: string;
}

const tradeSchema = new Schema<ITradeSchema>(
  {
    trade_no: {
      type: Number,
      required: true,
      unique: true,
    },
    coin: {
      type: String,
      required: true,
    },
    direction: {
      type: String,
      enum: ["buy", "sell"],
      required: true,
    },
    timeframe: {
      type: String,
      enum: ["5m", "15m", "30m", "1h", "4h", "1d"],
      required: true,
    },
    entryPrice: {
      type: Number,
      required: true,
    },
    sl: {
      type: Number,
      required: true,
    },
    tp: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
    isSuccess: {
      type: Boolean,
      default: false,
    },
    pnl: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Trade = mongoose.model<ITradeSchema>("Trade", tradeSchema);

export const createTrade = async (data: Omit<ITradeSchema, "trade_no">) => {
  const trade_no = await getNextSequence("tradeCount");

  const newTrade = new Trade({ ...data, trade_no });

  return await newTrade.save();
};

export default Trade;
