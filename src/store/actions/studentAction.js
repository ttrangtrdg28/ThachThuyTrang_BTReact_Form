import {
  ADD_STUDENT,
  DELETE_STUDENT,
  SET_SELECTED,
  UPDATE_STUDENT,
} from "../types/studentType";

export const addStudentAction = (data) => {
  return {
    type: ADD_STUDENT,
    payload: data,
  };
};

export const setSelectedAction = (data) => {
  return {
    type: SET_SELECTED,
    payload: data,
  };
};

export const updateStudentAction = (data) => {
  return {
    type: UPDATE_STUDENT,
    payload: data,
  };
};

export const deleteStudentAction = (data) => {
  return {
    type: DELETE_STUDENT,
    payload: data,
  };
};
