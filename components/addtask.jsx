import React, { useState, useEffect } from "react";

const Addtask = () => {
   const [title, setTitle] = useState("");
   const [desc, setDesc] = useState("");
   const [date, setDate] = useState("");

   const addTask = (e) => {
      e.preventDefault();
      console.log(title, desc, date)
   };
   return (
      <>
         <section className="flex items-center justify-center">
            <form className="flex flex-col md:flex-row">
               <input
                  className="h-10 w-full md:w-40 p-2 mb-2 md:mr-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                  type="text"
                  placeholder="Title"
                  onChange={(e) => setTitle(e.target.value)}
               />
               <input
                  className="h-10 w-full md:w-64 p-2 mb-2 md:mr-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                  type="text"
                  placeholder="Description"
                  onChange={(e) => setDesc(e.target.value)}
               />
               <div className="flex flex-col md:flex-row">
                  <input
                     className="h-10 w-full md:w-40 p-2 mb-2 md:mr-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                     type="date"
                     placeholder="Date"
                     onChange={(e) => setDate(e.target.value)}
                  />
               </div>
               <button
                  onClick={addTask}
                  type="sumbit"
                  className="h-10 w-full md:w-40 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
               >
                  Add Task
               </button>
            </form>
         </section>
      </>
   );
};
export default Addtask;
