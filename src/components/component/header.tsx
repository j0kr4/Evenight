import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { auth } from "../../../auth";
import SignOut from "../signout";

export async function Header() {
  const session = await auth();

  return (
    <header className="flex items-center justify-between h-16 px-4 bg-white shadow-sm sm:px-6 lg:px-8">
      <Link href="/" className="flex items-center" prefetch={false}>
        <Image
          width={200}
          src={"/logo.svg"}
          height={200}
          alt="Evenight Logo"
          className="h-6 w-6 text-primary"
        />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <div className="flex items-center gap-4">
        {session ? (
          <SignOut />
        ) : (
          <>
            <Button
              variant="outline"
              size="sm"
              className="text-muted-foreground"
            >
              <Link href={"/sign-in"}>Login</Link>
            </Button>
            <Button
              variant="default"
              size="sm"
              className="bg-primary text-primary-foreground"
            >
              <Link href={"/sign-up"}>Signup</Link>
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
