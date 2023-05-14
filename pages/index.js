import Image from "next/image";
import { Inter } from "next/font/google";
import TaskList from "@/components/tasks";
import Addtask from "@/components/addtask";

export default function Home() {
   return (
      <>
         {/* <section className="flex justify-center h-screen  bg-[#7289DA]"> */}
         <section className="flex justify-center h-screen  animate-changebg">
            <div className="mt-10">
               {/* <Addtask></Addtask> */}
               <TaskList></TaskList>
            </div>
         </section>
      </>
   );
}
