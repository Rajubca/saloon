export default function Footer() {
  return (
    <footer className="bg-background border-t border-border py-8 text-center text-muted-foreground">
      <p>&copy; {new Date().getFullYear()} Free Bird Saloon. All rights reserved.</p>
    </footer>
  );
}
