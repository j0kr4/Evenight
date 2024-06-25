import { authenticateUser, getUser, register } from "../queries/user";
import { UserRegisterDto } from "../type/user";

export class UsersController {
  static register = async (userDto: UserRegisterDto) => {
    try {
      const jwt = await register(userDto);

      if (!jwt) {
        return { error: "Registration failed for unknown reasons" };
      }
      console.log("dzez");
      const user = await getUser(userDto.email);

      return { data: user };
    } catch (error: any) {
      if (error!.message.includes("already exists")) {
        return { error: "User already exists" };
      } else {
        return { error: "Registration failed due to an internal error" };
      }
    }
  };
  static login = (email: string, password: string) => {
    const jwt = authenticateUser(email, password);

    if (!jwt) {
      return null;
    }

    return getUser(email);
  };
}
