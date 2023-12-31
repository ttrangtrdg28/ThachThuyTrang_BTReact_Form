import {
  ADD_STUDENT,
  SET_SELECTED,
  UPDATE_STUDENT,
  DELETE_STUDENT,
} from "../types/studentType";

const DEFAULT_STATE = {
  studentList: [],
  selected: null,
};

const stringify = localStorage.getItem("STUDENT_LIST");
if (stringify) {
  DEFAULT_STATE.studentList = JSON.parse(stringify);
}

export const studentReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_STUDENT: {
      action.payload.id = Date.now();
      state.studentList = [...state.studentList, action.payload];

      localStorage.setItem("STUDENT_LIST", JSON.stringify(state.studentList));

      break;
    }

    case SET_SELECTED: {
      state.selected = action.payload;

      break;
    }

    case UPDATE_STUDENT: {
      const data = [...state.studentList];

      const index = data.findIndex(
        (element) => element.id === action.payload.id
      );

      data[index] = action.payload;

      state.studentList = data;
      state.selected = null;

      localStorage.setItem("STUDENT_LIST", JSON.stringify(state.studentList));

      break;
    }

    case DELETE_STUDENT: {
      const data = [...state.studentList];

      const index = data.findIndex(
        (element) => element.id === action.payload.id
      );

      data.splice(index, 1);

      state.studentList = data;
      state.selected = null;

      localStorage.setItem("STUDENT_LIST", JSON.stringify(state.studentList));

      break;
    }
  }

  return { ...state };
};
