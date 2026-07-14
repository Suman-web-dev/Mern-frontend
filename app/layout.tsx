import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/components/providers/ReduxProvider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "ARCC - Abstract Submission",
  description: "Submit your abstract to ARCC conference",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif" }}>
        <ReduxProvider>
          {children}
          <Toaster
            position="top-right"
            richColors
            closeButton
            toastOptions={{
              style: {
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                padding: '0.75rem',
              },
            }}
            theme="light"
          />
        </ReduxProvider>
      </body>
    </html>
  );
}
