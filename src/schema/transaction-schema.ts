import z from "zod";

export const transactionSchema = z.object({
  coin: z
    .string()
    .min(2, "Coin is required")
    .max(8, "Coin must be less than 8 characters")
    .nonempty(),
  direction: z.enum(["buy", "sell"], {
    invalid_type_error: "Type is required",
  }),
  timeframe: z.enum(["5m", "15m", "1h", "4h", "1d"], {
    invalid_type_error: "Timeframe is required",
  }),
  entryPrice: z.string({ message: "Entry price is required" }),
  sl: z.string({ message: "Stop loss is required" }),
  tp: z.string({ message: "Take profit is required" }),
  isSuccess: z.boolean().optional(),
  pnl: z.number().optional(),
  notes: z.string().optional(),
});

export type TransactionSchemaType = z.infer<typeof transactionSchema>;
