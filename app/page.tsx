import { Button } from "./ui/components/ui/button";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <Button href="/sign-in" data-testid="login">
        Login
      </Button>
    </main>
  );
}
