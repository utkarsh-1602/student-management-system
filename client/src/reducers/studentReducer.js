import {
  CREATE_STUDENT,
  GET_STUDENT,
  UPDATE_STUDENT,

} from "../constant/types";
import { intialState } from "../db/studentData"

export const studentReducer = (state = intialState, action) => {
  switch (action.type) {
    case CREATE_STUDENT:
      return {
        ...state,
        students: [action.payload, ...state.students],
      };
    case UPDATE_STUDENT:
      return {
        students: [action.payload, ...state.students]
      }
    case GET_STUDENT:
      let arr = state.students.filter(
        (student) => student.name == action.payload
      );
      arr = arr.values();
      for (let val of arr) {
        arr = val;
      }
      return {
        ...state,
        student: arr,
      };
    default:
      return state;
  }
};