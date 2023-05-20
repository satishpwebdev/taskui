import Image from "next/image";
import { Inter } from "next/font/google";
import TaskList from "@/components/tasks";
import Addtask from "@/components/addtask";
import bgImg from '../public/discord.svg'

export default function Home() {
   return (
      <>
         {/* <section className="flex justify-center h-screen  bg-[#7289DA]"> */}
         {/* <section className="flex justify-center lg:h-screen  animate-changebg"> */}
         <section className="bg-[url('../public/discord.svg')] bg-cover bg-center lg:h-screen flex  justify-center">
            <div className="mt-10">
               {/* <Addtask></Addtask> */}
               <TaskList></TaskList>
            </div>
         </section>
      </>
   );
}
