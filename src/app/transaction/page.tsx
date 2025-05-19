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
import { Link } from "lucide-react";

const DataTable = ({ data }: { data: TradeApiResponse[] | [] }) => {
  return (
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
            <TableRow key={index}>
              <Link href={`/trade/${item._id}`}>
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
              </Link>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
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
