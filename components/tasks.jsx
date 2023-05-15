import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Oval } from "react-loader-spinner";
import Addtask from "./addtask";
import * as taskAction from "../redux/action/tasks";
import * as deleteAction from "../redux/action/tasks";
import * as addTaskAction from "../redux/action/tasks";
import { useSelector, useDispatch } from "react-redux";

const TaskList = () => {
   const dispatch = useDispatch();
   const [isStatus, setStatus] = useState("");
   const [isAdded, setAdded] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const tasklist = useSelector((state) => state.tasks.taskList);

   const generateRandomColor = () => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
         color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
   };

   const deleteTask = async (id) => {
      setIsLoading(true);
      dispatch(deleteAction.deleteTask(id))
         .then((res) => {
            if (res) {
               setStatus(res.data);
            }
         })
         .catch((err) => {
            console.log(err);
         })
         .finally(() => {
            setIsLoading(false);
         });
   };

   useEffect(() => {
      setIsLoading(true);
      dispatch(taskAction.getAllTasks())
         .catch((err) => {
            console.log(err);
         })
         .finally(() => {
            setIsLoading(false);
         });
   }, [isStatus, isAdded]);

   const handleAddTask = (taskData) => {
      setIsLoading(true);
      dispatch(addTaskAction.addTask(taskData))
         .then((res) => {
            if (res.status === 200) {
               setAdded(taskData);
            }
         })
         .catch((err) => {
            console.log(err);
         })
         .finally(() => {
            setIsLoading(false);
         });
   };

   return (
      <>
         <Addtask onAddTask={handleAddTask} isLoading={isLoading}></Addtask>
         <section className="flex justify-center mt-5 mb-5">
            {isLoading ? (
               // <div className="loader">Loading...</div>
               <div className="">
                  <Oval
                     height={30}
                     width={30}
                     color="#fff"
                     wrapperStyle={{}}
                     wrapperClass=""
                     visible={true}
                     ariaLabel="oval-loading"
                     secondaryColor="pink"
                     strokeWidth={2}
                     strokeWidthSecondary={2}
                  />
               </div>
            ) : (
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {tasklist?.length > 0 ? (
                     tasklist.map((item) => (
                        <div key={item?._id} className="p-6 rounded-lg shadow-lg" style={{ backgroundColor: generateRandomColor() }}>
                           <div className="flex justify-between">
                              <h3 className="text-lg text-white font-semibold mb-4">{item?.taskName}</h3>
                              <RiDeleteBin6Line onClick={() => deleteTask(item?._id)} className="hover:cursor-pointer text-white"></RiDeleteBin6Line>
                           </div>
                           <p className="text-white mb-2">Description: {item?.desc}</p>
                           <p className="text-white">Remind at: {item?.remindAt}</p>
                        </div>
                     ))
                  ) : (
                     <p>No tasks available.</p>
                  )}
               </div>
            )}
         </section>
      </>
   );
};

export default TaskList;
