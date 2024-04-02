import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { client } from '@/lib/sanityClient';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-02',
});
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

const fullfillOrder = async (session: any) => {
  try {
    await client.create({
      _type: 'order',
      status: session.status,
      message: 'Payment done',
      description: session?.description || 'Test messages from orders',
      title: session?.id || 'order',
      method: session.confirmation_method,
      amount: session.amount / 100,
    });
  } catch (error: any) {
    console.log('error', error?.message);
  }
};

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const signature = req.headers.get('stripe-signature');

  let event: Stripe.Event | null = null;

  try {
    event = stripe.webhooks.constructEvent(payload, signature!, webhookSecret);

    if (event?.type === 'payment_intent.succeeded') {
      const session = event.data.object;
      return fullfillOrder(session)
        .then(() => NextResponse.json({ status: 200 }))
        .catch((err: any) => NextResponse.json({ error: err?.message }, { status: 500 }));
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error?.message,
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ received: true });
}
