import { Button } from "@/components/ui/button";
import { FileIcon } from "lucide-react";
import Link from "next/link";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <FileIcon className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">FileShare</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <LogoutLink>
                <Button>Logout</Button>
              </LogoutLink>
            ) : (
              <>
                <LoginLink>
                  <Button variant="ghost">
                    Sign In
                  </Button>
                </LoginLink>
                <RegisterLink>
                  <Button>
                    Sign Up
                  </Button>
                </RegisterLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}