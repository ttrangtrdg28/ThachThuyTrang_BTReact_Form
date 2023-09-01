import {
  ADD_STUDENT,
  DELETE_STUDENT,
  SET_SELECTED,
  UPDATE_STUDENT,
} from "../types/studentType";

const DEFAULT_STATE = {
  studentList: [],
  selected: null,
};

const stringify = localStorage.getItem("studentList");
if (stringify) {
  DEFAULT_STATE.studentList = JSON.parse(stringify);
}

export const studentReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_STUDENT: {
      state.studentList = [...state.studentList, action.payload];

      localStorage.setItem("studentList", JSON.stringify(state.studentList));

      break;
    }

    case SET_SELECTED: {
      state.selected = action.payload;

      break;
    }

    case DELETE_STUDENT: {
      const data = [...state.studentList];

      const index = data.findIndex(
        (element) => (element.id = action.payload.id)
      );

      data.splice(index, 1);

      state.studentList = data;
      state.selected = null;

      localStorage.setItem("studentList", JSON.stringify(state.studentList));

      break;
    }

    case UPDATE_STUDENT: {
      const data = [...state.studentList];

      const index = data.findIndex(
        (element) => (element.id = action.payload.id)
      );

      data[index] = action.payload;

      state.studentList = data;
      state.selected = null;

      localStorage.setItem("studentList", JSON.stringify(state.studentList));
    }
  }
  return { ...state };
};
