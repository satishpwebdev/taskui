import React, { useState } from "react";
import * as addTaskAction from "../redux/action/tasks";
import { useSelector, useDispatch } from "react-redux";

const Addtask = ({onAddTask, isLoading}) => {
   const [title, setTitle] = useState("");
   const [desc, setDesc] = useState("");
   const [date, setDate] = useState("");
   const dispatch = useDispatch();

   const addTask = (e) => {
      e.preventDefault();
      if (!title.length || !desc.length || !date.length) {
         return;
      }
      const data = {
         taskName: title,
         desc,
         remindAt: date,
      };
      onAddTask(data);
      resetInputs();
   };

   const resetInputs = () => {
      setTitle("");
      setDesc("");
      setDate("");
   };

   return (
      <>
         <section className="flex items-center justify-center pt-5">
            <form className="flex flex-col md:flex-row">
               <input
                  className="h-10 w-full md:w-40 p-2 mb-2 md:mr-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                  type="text"
                  value={title}
                  placeholder="Title"
                  onChange={(e) => setTitle(e.target.value)}
               />
               <input
                  className="h-10 w-full md:w-64 p-2 mb-2 md:mr-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                  type="text"
                  value={desc}
                  placeholder="Description"
                  onChange={(e) => setDesc(e.target.value)}
               />
               <div className="flex flex-col md:flex-row">
                  <input
                     className="h-10 w-full md:w-40 p-2 mb-2 md:mr-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                     type="date"
                     value={date}
                     placeholder="Date"
                     onChange={(e) => setDate(e.target.value)}
                  />
               </div>
               <button
                  onClick={addTask}
                  type="sumbit"
                  className="h-10 w-full md:w-40 py-2 px-4 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition duration-300"
                  disabled={isLoading}
               >
                  {"Add Task"}
               </button>
            </form>
         </section>
      </>
   );
};

export default Addtask;
