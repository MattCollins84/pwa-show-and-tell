import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@/css/styles.css';
import Layout from "@/components/Layout";
import { UserProvider } from "@/context/UserProvider";

export const metadata: Metadata = {
  title: "Show and Tell",
  description: "Show and Tell",
  manifest: "/manifest.json"
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode; }>) {
  return (
    <UserProvider>
      <Layout children={children}/>
    </UserProvider>
  );
}
