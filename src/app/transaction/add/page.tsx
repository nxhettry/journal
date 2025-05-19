"use client";
import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import {
  transactionSchema,
  TransactionSchemaType,
} from "@/schema/transaction-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IoChevronBack } from "react-icons/io5";

import axios from "axios";
import { toast } from "sonner";

const DEFAULT_VALUES = {
  coin: "",
  direction: "buy",
  timeframe: "15m",
  entryPrice: "0",
  sl: "0",
  tp: "0",
  isSuccess: false,
  pnl: 0,
  notes: "",
} as TransactionSchemaType;

const AddTransaction = () => {
  const form = useForm<TransactionSchemaType>({
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
    resolver: zodResolver(transactionSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: TransactionSchemaType) => {
    console.log("Form submitted", data);

    try {
      const res = await axios.post("/api/transaction", data);

      if (res.status === 200 || res.status === 201) {
        console.log("Transaction added successfully", res.data);
        toast.success("Transaction added successfully");
        form.reset();
      } else {
        toast.error("Error adding transaction");
        console.error("Error adding transaction", res.data);
      }
    } catch (error) {
      console.error("Error adding transaction", error);
      toast.error("Error adding transaction");
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Link href="/dashboard" className="w-full flex justify-start p-4">
        <IoChevronBack className="text-2xl text-gray-500 hover:text-gray-700 transition duration-200" />
        <span>Go back</span>
      </Link>
      <Card className="w-[95%] max-w-md p-6 space-y-4">
        <h1 className="text-xl font-bold w-full text-center">Add Record</h1>

        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 w-full p-5"
          >
            <FormField
              control={form.control}
              name="coin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coin / Pair</FormLabel>
                  <FormControl>
                    <Input placeholder="BTC" autoComplete="coin" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="direction"
                render={({ field }) => (
                  <FormItem {...field}>
                    <FormLabel>Direction</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Direction" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="buy">Buy</SelectItem>
                          <SelectItem value="sell">Sell</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timeframe"
                render={({ field }) => (
                  <FormItem {...field}>
                    <FormLabel>Timeframe</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Timeframe" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5m">5m</SelectItem>
                          <SelectItem value="15m">15m</SelectItem>
                          <SelectItem value="1h">1h</SelectItem>
                          <SelectItem value="4h">4h</SelectItem>
                          <SelectItem value="1d">1d</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="entryPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Entry Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0.00"
                      autoComplete="entryPrice"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="sl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stop Loss</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.00"
                        autoComplete="sl"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Take Profit</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.00"
                        autoComplete="tp"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Notes"
                      autoComplete="notes"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default AddTransaction;
