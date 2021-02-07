import * as ACTIONS from "./message-actionTypes";
import * as api from "../../api/api";

export const getRooms = ()=> async (dispatch) =>{
     try {
         const rooms = await api.getRooms();
         return dispatch({
             type: ACTIONS.GET_ROOMS,
             payload : rooms.data
         })
     } catch (error) {
         console.log(error)
     }
}



export const setUser = (data)=>{
   return {
       type: ACTIONS.SET_USER,
       payload : {
           userData : data
       }
   }   
}