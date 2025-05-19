"use client";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTrade } from "@/hooks/useTrades";
import { TradeApiResponse } from "@/types/api-response";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const DataTable = ({ data }: { data: TradeApiResponse[] | [] }) => {
  const [selectedTrade, setSelectedTrade] = useState<TradeApiResponse | null>(
    null
  );
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleRowClick = (trade: TradeApiResponse) => {
    setSelectedTrade(trade);
    setIsPopoverOpen(true);
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Trade No.</TableHead>
            <TableHead>Coin</TableHead>
            <TableHead>Direction</TableHead>
            <TableHead>Entry Price</TableHead>
            <TableHead>Timeframe</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Entered At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => {
            return (
              <TableRow key={index} onClick={() => handleRowClick(item)}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{item.coin}</TableCell>
                <TableCell>{item.direction}</TableCell>
                <TableCell>{item.entryPrice}</TableCell>
                <TableCell>{item.timeframe}</TableCell>
                <TableCell>{item.status ?? "closed"}</TableCell>
                <TableCell>
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "N/A"}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <button className="hidden" />
        </PopoverTrigger>
        <PopoverContent className="fixed top-1/2 left-1/4 transform translate-x-[30%] translate-y-[50%] p-4 bg-white shadow-lg rounded-md">
          {selectedTrade && (
            <div className="p-4">
              <h3 className="text-lg font-bold">Trade Details</h3>
              <p>
                <strong>Coin:</strong> {selectedTrade.coin}
              </p>
              <p>
                <strong>Direction:</strong> {selectedTrade.direction}
              </p>
              <p>
                <strong>Entry Price:</strong> {selectedTrade.entryPrice}
              </p>
              <p>
                <strong>TP:</strong> {selectedTrade.tp}
              </p>
              <p>
                <strong>SL:</strong> {selectedTrade.sl}
              </p>
              <p>
                <strong>Timeframe:</strong> {selectedTrade.timeframe}
              </p>
              <p>
                <strong>Status:</strong> {selectedTrade.status}
              </p>
              <p>
                <strong>Entered At:</strong>{" "}
                {selectedTrade.createdAt
                  ? new Date(selectedTrade.createdAt).toLocaleString()
                  : "N/A"}
              </p>
              <p>
                <strong>Notes:</strong> {selectedTrade.notes}
              </p>
              <p>
                <strong>Success :</strong> {selectedTrade.isSuccess}
              </p>
              <p>
                <strong>PNL :</strong> {selectedTrade.pnl}
              </p>

              {
                selectedTrade.status === "open" && <Button className="mt-3">
                  Close Trade
                </Button>
              }
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

const Transactions = () => {
  const { data: trades } = useTrade();
  const openTrades = trades?.filter((trade) => trade.status === "open");
  const closedTrades = trades?.filter((trade) => trade.status === "closed");

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <Card className="w-full max-w-2xl p-6">
        <Tabs defaultValue="open" className="w-full">
          <TabsList style={{ width: "100%" }}>
            <TabsTrigger value="open">Open Trades</TabsTrigger>
            <TabsTrigger value="closed">Closed Trades</TabsTrigger>
          </TabsList>
          <TabsContent value="open">
            <DataTable data={openTrades || []} />
          </TabsContent>
          <TabsContent value="closed">
            <DataTable data={closedTrades || []} />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Transactions;
