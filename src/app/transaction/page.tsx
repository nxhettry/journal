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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DataTable = ({ data }: { data: typeof DATA }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Trade No.</TableHead>
          <TableHead>Coin</TableHead>
          <TableHead>Direction</TableHead>
          <TableHead>Timeframe</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Entered At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => {
          return (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{item.coin}</TableCell>
              <TableCell>{item.direction}</TableCell>
              <TableCell>{item.timeframe}</TableCell>
              <TableCell>{item.status ?? "closed"}</TableCell>
              <TableCell>10: 00</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

const Transactions = () => {
  const { data: trades } = useTrade();

  console.log("trades", trades);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <Card className="w-full max-w-2xl p-6">
        <Tabs defaultValue="account" className="w-full">
          <TabsList style={{ width: "100%" }}>
            <TabsTrigger value="open">Open Trades</TabsTrigger>
            <TabsTrigger value="closed">Closed Trades</TabsTrigger>
          </TabsList>
          <TabsContent value="open">
            <DataTable data={[]} />
          </TabsContent>
          <TabsContent value="closed">
            <DataTable data={[]} />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Transactions;
