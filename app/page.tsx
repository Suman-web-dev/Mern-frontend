import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/layout/Hero";
import SubmissionForm from "@/features/submission/SubmissionForm";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <div className="bg-gray-50">
        <SubmissionForm />
      </div>
      <Footer />
      <Toaster position="top-right" />
    </main>
  );
}
