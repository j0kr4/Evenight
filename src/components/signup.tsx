import { signIn } from "../../auth";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { UsersController } from "@/lib/controllers/UsersController";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
const SignUp = () => {
  return (
    <div className="m-auto items-center mt-20 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Inscription</CardTitle>
        </CardHeader>
        <form
          action={async (formData) => {
            "use server";
            const rawFormData = {
              name: formData.get("name"),
              email: formData.get("email"),
              password: formData.get("password"),
            };

            UsersController.register(rawFormData as any);
            revalidatePath("/sign-in");
            redirect("/sign-in");
          }}
        >
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <label>
                name
                <Input name="name" type="text" />
              </label>
              <label>
                Email
                <Input name="email" type="email" />
              </label>
              <label>
                Password
                <Input name="password" type="password" />
              </label>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">{" S'inscrire"}</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
export default SignUp;
