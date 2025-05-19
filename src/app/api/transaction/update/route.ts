import { type NextRequest, NextResponse } from "next/server";
import Trade from "../../../../../models/trade-schema";
import connectDB from "@/lib/mongoose";

export async function POST(req: NextRequest) {
  const { id, isSuccess, pnl } = await req.json();

  if (!id || !pnl) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    await Trade.findByIdAndUpdate(id, {
      isSuccess,
      status: "closed",
      pnl: pnl,
    });

    return NextResponse.json(
      { message: "Trade updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating trade:", error);
    return NextResponse.json(
      { message: "Failed to update trade" },
      { status: 500 }
    );
  }
}
