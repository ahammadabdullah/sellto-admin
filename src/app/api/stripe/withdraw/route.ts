import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
});

export async function POST(req: NextRequest) {
  const { amount, stripeAccountId } = await req.json();

  try {
    const transfer = await stripe.transfers.create({
      amount: amount * 100,
      currency: "usd",
      destination: stripeAccountId,
    });

    return NextResponse.json(
      { success: true, data: transfer },
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 400 }
      );
    }
  }
}
