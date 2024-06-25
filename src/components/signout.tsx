import { signOut } from "@/../auth";
import { Button } from "./ui/button";
import { auth } from "@/../auth";
import { redirect } from "next/navigation";
import Link from "next/link";

const SignOut = async () => {
  const session = await auth();
  if (!session) {
    return (
      <Link href="/sign-in">
        <Button variant={"outline"} className="mr-2">
          Connexion
        </Button>
      </Link>
    );
  }
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
        redirect("/");
      }}
    >
      <Button variant={"destructive"} type="submit">
        Sign Out
      </Button>
    </form>
  );
};
export default SignOut;
