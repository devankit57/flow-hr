import type { Metadata } from "next";
import { AuthProvider } from "@/components/auth-provider";
import "reactflow/dist/style.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlowHR",
  description: "Drag-and-drop HR workflow builder with simulation"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
