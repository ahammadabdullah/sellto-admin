"use server";

import { revalidateTag } from "next/cache";
import prisma from "./db";
import { WithdrawStatus } from "@prisma/client";

export const getChatData = async (ticketId: string) => {
  const res = await fetch(
    `${process.env.SERVER_URL}/api/tickets/${ticketId}/messages`,
    {
      next: { tags: ["ticketMessage"] },
    }
  );
  const data = await res.json();
  return data;
};

export async function revalidateMessage() {
  revalidateTag("ticketMessage");
}

export const updateWithdrawalStatus = async (
  withdrawalId: string,
  status: WithdrawStatus
) => {
  return await prisma.withdraw.update({
    where: {
      id: withdrawalId,
    },
    data: {
      status,
    },
  });
};
