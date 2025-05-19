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

const DATA = [
  {
    coin: "BTC",
    direction: "buy",
    timeframe: "1h",
    entryPrice: "27350",
    sl: "27000",
    tp: "28000",
    isSuccess: true,
    pnl: 650,
    notes: "Bounced off support zone. Breakout confirmed.",
    status: "closed",
  },
  {
    coin: "ETH",
    direction: "sell",
    timeframe: "15m",
    entryPrice: "1820",
    sl: "1835",
    tp: "1780",
    isSuccess: false,
    pnl: -150,
    notes: "Wicked into SL. Wrong read on momentum.",
    status: "closed",
  },
  {
    coin: "SOL",
    direction: "buy",
    timeframe: "4h",
    entryPrice: "21.5",
    sl: "20.8",
    tp: "23.0",
    status: "open",
  },
  {
    coin: "XRP",
    direction: "sell",
    timeframe: "5m",
    entryPrice: "0.59",
    sl: "0.60",
    tp: "0.57",
    isSuccess: true,
    pnl: 80,
    notes: "Scalp setup based on EMA crossover.",
    status: "closed",
  },
  {
    coin: "AVAX",
    direction: "buy",
    timeframe: "1d",
    entryPrice: "15.2",
    sl: "14.5",
    tp: "17.0",
    status: "open",
    notes: "Swing trade. Waiting for confirmation candle.",
  },
];

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
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <Card className="w-full max-w-2xl p-6">
        <Tabs defaultValue="account" className="w-full">
          <TabsList style={{ width: "100%" }}>
            <TabsTrigger value="open">Open Trades</TabsTrigger>
            <TabsTrigger value="closed">Closed Trades</TabsTrigger>
          </TabsList>
          <TabsContent value="open">
            <DataTable data={DATA} />
          </TabsContent>
          <TabsContent value="closed">
            <DataTable data={DATA} />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Transactions;
