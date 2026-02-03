export default function Footer() {
  return (
    <footer className="border-t bg-background py-6 text-center text-sm text-muted-foreground">
      © {new Date().getFullYear()} MediStore. All rights reserved.
    </footer>
  );
}
