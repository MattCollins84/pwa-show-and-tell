import { NextResponse } from "next/server";
import webpush from "web-push";

// Load VAPID keys from environment variables
const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY!;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY!;

webpush.setVapidDetails(
  "mailto:matt@strikesandgutters.com",
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

let subscriptions: webpush.PushSubscription[] = [];

export async function POST(req: Request) {
  try {
    const subscription: webpush.PushSubscription = await req.json();
    subscriptions.push(subscription);
    return NextResponse.json({ message: "Subscribed successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Subscription failed", error }, { status: 500 });
  }
}

export async function GET() {
  const payload = JSON.stringify({
    title: "New Notification",
    body: "You received a push notification from Next.js PWA!",
  });

  for (const sub of subscriptions) {
    webpush.sendNotification(sub, payload).catch((err) => console.error(err));
  }

  return NextResponse.json({ message: "Notification sent" }, { status: 200 });
}
