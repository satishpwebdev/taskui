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
   const [isLoading, setIsLoading] = useState(false);
   const [isInitialLoading, setInitialLoading] = useState(true);
   const [tasklist, setTaskList] = useState([]);
   const [isHovered, setIsHovered] = useState(false);

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
               setTaskList(tasklist.filter((task) => task._id !== id));
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
      setInitialLoading(true);
      dispatch(taskAction.getAllTasks())
         .then((res) => {
            setTaskList(res.data);
         })
         .catch((err) => {
            console.log(err);
         })
         .finally(() => {
            setIsLoading(false);
            setInitialLoading(false);
         });
   }, []);

   const handleAddTask = (taskData) => {
      setIsLoading(true);
      dispatch(addTaskAction.addTask(taskData))
         .then((res) => {
            if (res.status === 200) {
               setTaskList([...tasklist, res.data]);
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
         <section className="bg-cover bg-center bg-no-repeat bg-discord min-h-screen min-w-screen ">
            <div className="relative">
               <button
                  className="flex text-white font-semibold items-center rounded-full bg-pink-500 justify-start px-4 lg:top-8 lg:left-10 relative left-4 top-3 py-2 group"
                  onClick={() => setIsHovered(!isHovered)}
               >
                  {"S"}
               </button>
               {isHovered && (
                  <div className="absolute lg:left-[5rem] lg:mt-1.9rem lg:top-50 bg-gray-200 py-2 px-4 rounded-lg mt-4">
                     <div className="flex flex-col space-y-2">
                        <span className="text-gray-800">Name</span>
                        <span className="text-gray-800">Login/Logout</span>
                     </div>
                  </div>
               )}
            </div>
            <Addtask onAddTask={handleAddTask} isLoading={isLoading}></Addtask>
            <section className="flex justify-center mt-5 pb-5">
               {isLoading || isInitialLoading ? (
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 lg:mx-2">
                     {tasklist?.length > 0 ? (
                        tasklist.map((item) => (
                           <div key={item?._id} className="p-[1rem]  rounded-lg shadow-lg" style={{ backgroundColor: generateRandomColor() }}>
                              <div className="flex justify-between ">
                                 <h3 className="text-[1rem] text-white font-semibold mb-4">
                                    {item?.taskName && item.taskName.length > 24 ? `${item.taskName.substring(0, 24)} ...` : item?.taskName}
                                 </h3>
                                 <RiDeleteBin6Line
                                    size={17}
                                    onClick={() => deleteTask(item?._id)}
                                    className="hover:cursor-pointer text-white ml-2 "
                                 ></RiDeleteBin6Line>
                              </div>
                              <p className="text-white mb-2 text-[">
                                 Details: {item?.desc && item.desc.length > 24 ? `${item.desc.substring(0, 24)}...` : item?.desc}
                              </p>
                              <p className="text-white">Remind at: {item?.remindAt}</p>
                           </div>
                        ))
                     ) : (
                        <p>No tasks available.</p>
                     )}
                  </div>
               )}
            </section>
         </section>
      </>
   );
};

export default TaskList;
