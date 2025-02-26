import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import { subscribeUser, unsubscribeUser, sendNotification } from '@/app/actions'
import urlBase64ToUint8Array from "@/lib/urlBase64ToUint8Array"
import ButtonSpinner from "./ButtonSpinner"

export interface PushNotificationManagerHandle {
  sendTestNotification: (priorityMessage?: string) => void
}

const PushNotificationManager = forwardRef<PushNotificationManagerHandle>((_, ref) => {
  const [isSupported, setIsSupported] = useState(false)
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  )
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
 
  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true)
      registerServiceWorker()
    }
  }, [])
 
  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none',
    })
    const sub = await registration.pushManager.getSubscription()
    setSubscription(sub)
  }
 
  async function subscribeToPush() {
    setLoading(true)
    const registration = await navigator.serviceWorker.ready
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    })
    setSubscription(sub)
    setLoading(false)
    const serializedSub = JSON.parse(JSON.stringify(sub))
    await subscribeUser(serializedSub)
  }
 
  async function unsubscribeFromPush() {
    setLoading(true)
    await subscription?.unsubscribe()
    setLoading(false)
    setSubscription(null)
    await unsubscribeUser()    
  }
  
  async function sendTestNotification(priorityMessage?: string) {
    if (subscription) {
      await sendNotification(priorityMessage || message)
      setMessage('')
    }
  }

  useImperativeHandle(ref, () => ({
    sendTestNotification
  }))
 
  if (!isSupported) {
    return <p>Push notifications are not supported in this browser.</p>
  }
 
  return (
    <>
      {
        subscription &&
        <ButtonSpinner variant="warning" label="Unsubscribe" onClick={unsubscribeFromPush} loading={loading}  />
      }
      {
        !subscription &&
        <ButtonSpinner variant="info" label="Subscribe" onClick={subscribeToPush} loading={loading}  />
      }
    </>
  )
})

export default PushNotificationManager