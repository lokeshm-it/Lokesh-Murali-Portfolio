import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="grid min-h-[100svh] place-items-center px-6">
      <div className="flex flex-col items-center text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          404
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-3 max-w-md text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/">
              <Home className="size-4" />
              Back to home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/#projects">
              <ArrowLeft className="size-4" />
              View projects
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
