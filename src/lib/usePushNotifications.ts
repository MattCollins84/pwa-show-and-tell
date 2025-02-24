"use client";

import { useEffect } from "react";

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!;

export function usePushNotifications() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        console.log("Service Worker ready for push notifications");

        if (!("PushManager" in window)) {
          console.error("Push notifications are not supported.");
        }
      });
    }
  }, []);
}

export async function subscribeToPushNotifications() {
  console.log('subscribing')
  if (!("serviceWorker" in navigator)) return;
  console.log('starting ready')
  const registration = await navigator.serviceWorker.ready;
  console.log('ready!')
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: VAPID_PUBLIC_KEY,
  });

  console.log("Push Subscription:", JSON.stringify(subscription));

  const res = await fetch("/api/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    console.error("Failed to subscribe:", await res.json());
  }
}
