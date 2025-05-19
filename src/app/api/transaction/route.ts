import { type NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Trade, { createTrade } from "../../../../models/trade-schema";

export type TradeRequestBody = {
  coin: string;
  direction: "buy" | "sell";
  timeframe: "5m" | "15m" | "30m" | "1h" | "4h" | "1d";
  entryPrice: number;
  sl: number;
  tp: number;
  notes?: string;
};

export async function POST(req: NextRequest) {
  const {
    coin,
    direction,
    timeframe,
    entryPrice,
    sl,
    tp,
    notes,
  }: TradeRequestBody = await req.json();

  if (!coin || !direction || !timeframe || !entryPrice || !sl || !tp) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    const tradeData = {
      coin,
      direction,
      timeframe,
      entryPrice,
      sl,
      tp,
      notes,
    };

    const trade = await createTrade(tradeData);

    return NextResponse.json(
      { message: "Trade created successfully", trade },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating trade:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const trades = await Trade.find({}).sort({ createdAt: -1 });

    return NextResponse.json(
      { message: "Trades fetched successfully", trades },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching trades:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
