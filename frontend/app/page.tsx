import Admin from "@/components/Admin/Signup.admin";
import { Button } from "@/components/ui/button";
import NavbarComponent from "@/components/ui/nav";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-violet-950 h-screen bg-blend-screen text-white">
      <Admin/>
      <h1>Rishabh</h1>
      <Button>Click me</Button>
      <p>lorem20000</p>
    </div>
  );
}
