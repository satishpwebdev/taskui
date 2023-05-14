import React, { useState, useEffect } from "react";
import axios, { all } from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import { liveURL } from "@/constants/url";
import Addtask from "./addtask";

const TaskList = () => {
   const [alltasks, setAllTask] = useState(null);
   const [isStatus, setStatus] = useState("");
   const [isAdded, setAdded] = useState("");

   const generateRandomColor = () => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
         color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
   };

   const getAllTask = async () => {
      try {
         const res = await axios.get(`${liveURL}/tasks`);
         const respo = await res.data;
         setAllTask(respo);
      } catch (error) {
         console.log(error);
      }
   };

   const deleteTask = async (id) => {
      try {
         const res = await axios.delete(`${liveURL}/taskdel/${id}`);
         const resp = await res.data;
         if (resp) {
            setStatus(res.data);
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getAllTask();
   }, [isStatus,isAdded]);

   const handleAdd =(data)=>{
      setAdded(data)
   }

   return (
      <>
         <Addtask added={handleAdd}></Addtask>
         <section className="flex justify-center mt-5 mb-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
               {alltasks?.length &&
                  alltasks?.map((item) => (
                     <div key={item?._id} className=" p-6 rounded-lg shadow-lg" style={{ backgroundColor: generateRandomColor() }}>
                        <div className="flex justify-between">
                           <h3 className="text-lg text-white font-semibold mb-4">{item?.taskName}</h3>
                           <RiDeleteBin6Line onClick={() => deleteTask(item?._id)} className="hover:cursor-pointer text-white"></RiDeleteBin6Line>
                        </div>
                        <p className="text-white mb-2">Description: {item?.desc}</p>
                        <p className="text-white">Remind at: {item?.remindAt}</p>
                     </div>
                  ))}
            </div>
         </section>
      </>
   );
};

export default TaskList;
