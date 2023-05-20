import Image from "next/image";
import { Inter } from "next/font/google";
import TaskList from "@/components/tasks";

export default function Home() {
   return (
      <>
               <TaskList></TaskList>
      </>
   );
}
