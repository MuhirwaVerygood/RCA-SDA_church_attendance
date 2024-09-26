import { AuthProvider } from "@/app/contexts/FamilyContextProvider";
import Login from "@/components/Login";
import Signup from "@/components/Signup";

import Image from "next/image";

export default function Home() {
  return (
   <div>
    <main>
        <Login />
    </main>
   </div>
  );
}
