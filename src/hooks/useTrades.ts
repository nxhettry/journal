"use client";
import { TradeApiResponse } from "../../types/api-response";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useTrade() {
  return useQuery({
    queryKey: ["trades"],
    queryFn: async () => {
      const res = (await axios.get("/api/transaction")) as {
        data: {
          trades: TradeApiResponse[] | [];
        };
      };
      return res.data.trades;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
}
