import { Button } from "@/components/ui/button";

export default async function DashboardHeader() {



  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <h1 className="text-lg font-semibold">
       
      </h1>

      <Button variant="outline">Logout</Button>
    </header>
  );
}