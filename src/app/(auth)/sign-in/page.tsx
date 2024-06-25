import { SignIn } from "@/components/signin";
import { redirect } from "next/navigation";
import { auth } from "../../../../auth";

const SignInPage = async () => {
  const session = await auth();
  if (session) redirect("/");
  return (
    <div>
      <SignIn />
    </div>
  );
};
export default SignInPage;
