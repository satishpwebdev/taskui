import { liveURL } from "../../constants/url";
import axios from "axios";

export const TASKS = "TASKS";
export const ADDTASK = "ADDTASK";
export const DELETETASK = "DELETETASK";

export const getAllTasks = () => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
           axios
              .get(`${liveURL}/tasks`)
              .then((res) => {
                 dispatch({ type: TASKS, data: res?.data });
                 resolve(res);
              })
              .catch((err) => {
                 dispatch({ type: TASKS, data: [] });
                 reject(err);
              });
        });
     };
};

// export const addTask = (data) => {
//    return (dispatch) => {
//       axios
//          .post(`${liveURL}/tasks`, data)
//          .then((res) => {
//             dispatch({ type: ADDTASK, data: res?.data });
//          })
//          .catch((err) => {
//             dispatch({ type: ADDTASK, data: [] });
//          });
//    };
// };

export const addTask = (data) => {
    return (dispatch) => {
       return new Promise((resolve, reject) => {
          axios
             .post(`${liveURL}/tasks`, data)
             .then((res) => {
                dispatch({ type: ADDTASK, data: res?.data });
                resolve(res);
             })
             .catch((err) => {
                dispatch({ type: ADDTASK, data: [] });
                reject(err);
             });
       });
    };
 };


 export const deleteTask = (id) => {
    return (dispatch) => {
       return new Promise((resolve, reject) => {
          axios
             .delete(`${liveURL}/taskdel/${id}`)
             .then((res) => {
                dispatch({ type: DELETETASK, data: res?.data });
                resolve(res);
             })
             .catch((err) => {
                dispatch({ type: DELETETASK, data: [] });
                reject(err);
             });
       });
    };
 };
 
 
 
 
 
 
 
 
 
 
 
 
