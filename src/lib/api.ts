"use server";

import { revalidateTag } from "next/cache";

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
