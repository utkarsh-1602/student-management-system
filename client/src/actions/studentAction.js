import {
  CREATE_STUDENT,
  UPDATE_STUDENT,
  GET_STUDENT,
} from "../constant/types";

// update a student
export const updatestudent = (student) => ({
  type: UPDATE_STUDENT,
  payload: student,
});
export const getstudent = (name) => ({
  type: GET_STUDENT,
  payload: name,
});
export const addStudent = (student) => ({
  type: CREATE_STUDENT,
  payload: student,
});

