"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import type { Withdrawal } from "./columns";
import { updateWithdrawalStatus } from "@/lib/api";

export function WithdrawalActions({ withdrawal }: { withdrawal: Withdrawal }) {
  const [isDeclineOpen, setIsDeclineOpen] = useState(false);
  const [declineReason, setDeclineReason] = useState("");

  const handleApprove = async () => {
    if (withdrawal.balance < withdrawal.requestAmount) {
      toast({
        title: "Merchant does not have sufficient balance",
        variant: "destructive",
      });
      return;
    }
    if (!withdrawal.stripeAccountId) {
      toast({
        title: "Stripe account not linked",
        variant: "destructive",
      });
      return;
    }
    if (withdrawal.stripeStatus !== "accepted") {
      toast({
        title: "Stripe account not verified",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await fetch("/api/stripe/withdraw", {
        method: "POST",
        body: JSON.stringify({
          amount: withdrawal.requestAmount,
          stripeAccountId: withdrawal.stripeAccountId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      const update = await updateWithdrawalStatus(withdrawal.id, "accepted");
      toast({
        title: "Withdrawal request approved successfully",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Failed to approve withdrawal request",
        variant: "destructive",
      });
    }
  };

  const handleDecline = async () => {
    try {
      const update = await updateWithdrawalStatus(withdrawal.id, "accepted");
      toast({
        title: "Withdrawal request declined",
        variant: "default",
      });
      setIsDeclineOpen(false);
      setDeclineReason("");
    } catch (error) {
      toast({
        title: "Failed to decline withdrawal request",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="default"
        size="sm"
        onClick={handleApprove}
        disabled={withdrawal.status !== "pending"}
      >
        Approve
      </Button>

      <Dialog open={isDeclineOpen} onOpenChange={setIsDeclineOpen}>
        <DialogTrigger asChild>
          <Button
            variant="destructive"
            size="sm"
            disabled={withdrawal.status !== "pending"}
          >
            Decline
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Decline Withdrawal Request</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Enter reason for declining..."
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                variant="destructive"
                onClick={handleDecline}
                disabled={!declineReason.trim()}
              >
                Confirm Decline
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
