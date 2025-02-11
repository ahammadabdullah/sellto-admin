"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";

interface WithdrawalRequestProps {
  amount: number;
}

export function WithdrawalRequest({ amount }: WithdrawalRequestProps) {
  if (amount <= 0) return null;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Pending Withdrawal Request</CardTitle>
        <CardDescription>
          This seller has requested to withdraw funds from their account
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div className="text-2xl font-semibold">${amount.toFixed(2)}</div>
        <div className="flex gap-3">
          <Button className="bg-green-600 hover:bg-green-700">
            <Link href={"/sellers/withdrawls"}>Go to withdrawal Request</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
