import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-64px-64px)]">{children}</main>
      <Footer />
    </>
  );
}
