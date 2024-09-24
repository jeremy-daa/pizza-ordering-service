import Logout from "@/components/Logout";
import { getAuthSession } from "@/lib/authOptions";
import Image from "next/image";

export default async function Home() {
  const session = await getAuthSession();

  return (
    <div className="">
      <Logout />
    </div>
  );
}
