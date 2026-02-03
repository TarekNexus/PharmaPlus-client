
import { userService } from "@/services/user.service";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const { data } = await userService.getSession();
  const user = data?.user;

  return <NavbarClient user={user} />;
}