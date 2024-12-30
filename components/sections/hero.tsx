import { Button } from "@/components/ui/button";
import { ArrowRight, FileUp, LogIn } from "lucide-react";
import Link from "next/link";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function Hero() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="relative isolate pt-14">
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-secondary opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      <div className="py-24 sm:py-32 lg:pb-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Share Files Securely with Anyone, Anywhere
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              The fastest and most secure way to share your files. No signup
              required for basic sharing. Enterprise-grade encryption for all
              your files.
            </p>

            {user ? (
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button size="lg" variant="outline" asChild>
                  <Link href="/dashboard">
                    <FileUp className="mr-2 h-4 w-4" />
                    Upload Now
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <RegisterLink>
                  <Button size="lg">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </RegisterLink>
                <LoginLink>
                  <Button size="lg" variant="outline">
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign in
                  </Button>
                </LoginLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};