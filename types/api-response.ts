export type TradeApiResponse = {
  coin: string;
  createdAt: string;
  direction: string;
  entryPrice: number;
  isSuccess: boolean;
  notes?: string;
  pnl: number;
  sl: number;
  status: string;
  timeframe: string;
  tp: number;
  trade_no: number;
  updatedAt: string;
  _id: string;
};
