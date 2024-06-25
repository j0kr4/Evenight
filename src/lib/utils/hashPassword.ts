// import config from "@/config"
import { pbkdf2Sync, randomBytes } from "crypto";
import config from "../../../config";

const { keylen, pepper, iteration, digest } = config.security.password;

const hashPassword = (
  password: string,
  salt = randomBytes(128).toString("hex")
) => [
  Buffer.from(
    pbkdf2Sync(password, salt + pepper, iteration, keylen, digest).toString(),
    "utf-8"
  ).toString("hex"),
  salt,
];
export default hashPassword;
