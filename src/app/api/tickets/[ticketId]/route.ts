import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ ticketId: string }>;
  }
) {
  try {
    const ticketId = (await params).ticketId;
    const ticket = await prisma.ticket.findUnique({
      where: {
        id: ticketId,
      },
    });

    return NextResponse.json(ticket);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
