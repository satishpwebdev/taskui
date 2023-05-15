import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import Addtask from "./addtask";
import * as taskAction from "../redux/action/tasks";
import * as deleteAction from "../redux/action/tasks";
import { useSelector, useDispatch } from "react-redux";

const TaskList = () => {
   const dispatch = useDispatch();
   const [isStatus, setStatus] = useState("");
   const [isAdded, setAdded] = useState("");
   const tasklist = useSelector((state) => state.tasks.taskList);

   const generateRandomColor = () => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
         color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
   };

   const handleAdd = (data) => {
      setAdded(data);
   };

   const deleteTask = async (id) => {
      dispatch(deleteAction.deleteTask(id))
         .then((res) => {
            if (res) {
               setStatus(res.data);
            }
         })
         .catch((err) => {
            console.log(err);
         });
   };

   useEffect(() => {
      dispatch(taskAction.getAllTasks());
   }, [isStatus, isAdded]);

   return (
      <>
         <Addtask added={handleAdd}></Addtask>
         <section className="flex justify-center mt-5 mb-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
               {tasklist?.length &&
                  tasklist?.map((item) => (
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
