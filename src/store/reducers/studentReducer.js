import { actionTypes } from "../common/types";

const initialState = {
  student: [],
  studentHistory: [],
  student_loading: true,
};

export const studentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.ADD_STUDENT:
      return {
        ...state,
        student: [...state.student, payload.result],
      };

    case actionTypes.ADD_MULTIPLE_STUDENTS:
      console.log("payload.result",payload.result)
      return {
        ...state,
        student: [...state.student, ...payload.result],
      };

    case "SET_EMPTY_STUDENT":
      return {
        ...state,
        // student: [],
        student_loading: true,
      };

    case actionTypes.EDIT_STUDENT:
      return {
        ...state,
      };


    case actionTypes.SET_STUDENT_IMAGE:
      const studentToUpdate = state.student.findIndex(
        (student) => student._id === payload.result._id
      );
      const updatedStudents = state.student;
      updatedStudents[studentToUpdate].pictures = payload.result.pictures;
      return {
        ...state,
        student: updatedStudents,
      };

    case actionTypes.SET_MULTIPLE_STUDENT_IMAGE:
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_STUDENTS:
      return {
        ...state,
        student: payload.result,
        student_loading: false,
      };

    case actionTypes.FETCH_STUDENT_HISTORY:
      return {
        ...state,
        studentHistory: payload.result,
      };

    case actionTypes.DELETE_STUDENT:
      return {
        ...state,
      };

    case actionTypes.REMOVE_STUDENT:
      const newStudent = state.student.filter(
        (student) => student._id !== payload
      );
      return {
        ...state,
        student: newStudent,
      };

    default:
      return state;
  }
};
