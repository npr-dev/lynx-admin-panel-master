import { actionTypes } from "../common/types";

const initialState = {
  bus: [],
  unassignedBuses: [],
  singleBus: {},
  students: [],
  unassignedStudents: [],
  bus_loading: true,
};

export const busReducer = (state = initialState, { type, payload }) => {
  console.log("type, payload", type, payload);
  switch (type) {
    case actionTypes.ADD_BUS:
      console.log("new bus", payload);
      console.log("old buses", state);
      return {
        ...state,
        bus: [...state.bus, payload.result],
        bus_loading: false,
      };

    case actionTypes.ADD_MULTIPLE_BUSES:
      return {
        ...state,
        bus: [...state.bus, ...payload.result],
      };

    case "SET_EMPTY_BUS":
      return {
        ...state,
        bus: [],
        bus_loading: true,
      };

    case actionTypes.EDIT_BUS:
      return {
        ...state,
        // bus: payload.result,
      };

    case actionTypes.FETCH_ALL_BUSES:
      return {
        ...state,
        bus: payload.result,
        bus_loading: false,
      };

    case actionTypes.FETCH_UNASSIGNED_BUSES:
      return {
        ...state,
        unassignedBuses: payload.result,
      };

    case actionTypes.FETCH_SINGLE_BUS:
      return {
        ...state,
        singleBus: payload.result,
      };

    case actionTypes.FETCH_BUS_STUDENTS:
      console.log("students fetched", payload.result);
      return {
        ...state,
        students: payload.result,
      };

    case actionTypes.FETCH_UNASSIGNED_STUDENTS:
      return {
        ...state,
        unassignedStudents: payload.result,
      };

    case actionTypes.DELETE_BUS:
      console.log("bus reducer delete action", payload.result);
      return {
        ...state,
        // bus: payload.result
      };

    case actionTypes.REMOVE_BUS:
      const newBuses = state.bus.filter((bus) => bus._id !== payload);
      return {
        ...state,
        bus: newBuses,
      };

    case actionTypes.ASSIGN_STUDENT:
      const newUnassigned = state.unassignedStudents.filter(
        (student) => student._id !== payload.result.updatedStudent._id
      );
      // const filteredBus =
      return {
        ...state,
        students: [...state.students, payload.result.updatedStudent],
        unassignedStudents: newUnassigned,
        singleBus: {
          ...state.singleBus,
          studentCount: state.singleBus.studentCount + 1,
          studentsCount: state.singleBus.studentsCount + 1,
        },
      };

    case actionTypes.UNASSIGN_STUDENT:
      return {
        ...state,
        // bus: payload.result,
      };

    case "REMOVE_STUDENT":
      const newStudents = state.students.filter(
        (student) => student._id !== payload._id
      );
      return {
        ...state,
        students: newStudents,
        unassignedStudents: [...state.unassignedStudents, payload],
        singleBus: {
          ...state.singleBus,
          studentCount: state.singleBus.studentCount - 1,
          studentsCount: state.singleBus.studentsCount - 1,
        },
      };

    default:
      return state;
  }
};
