import { actionTypes } from '../common/types';

const initialState = {
  user: {
    userIsLoggedIn: false,
  },
  signupEmail: '',
  signupOTP: '',
  signupPassword: '',
  signupEmailData: '',
  forgetNewPassword: '',
  updateNewEmail: '',
  updateNewPassword: '',
  profileInformation: '',
  updateEmailOTP: '',
  newEmailData: '',
  totalCountOfCollections: {}
  // token: "",
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case actionTypes.GET_TOTAL_COUNT_OF_COLLECTIONS:
      return {
        ...state,
        totalCountOfCollections: payload.result,
      };

    case actionTypes.LOGIN:
      console.log('LOGIN REDUCER', payload.result);
      if (payload.result && payload.result.status == 404) {
        console.log('ERROR OCCURED PSIDERMAN', state);
        return {
          ...state,
        };
      } else {
        return {
          ...state,
          user: {
            userIsLoggedIn: true,
            ...payload.result,
          },
        };
      }
    case actionTypes.SIGNUP:
      return {
        ...state,
        user: {
          userIsLoggedIn: false,
          // ...payload.result,
        },
        signupEmail: [...state.signupEmail, payload.result],
      };
    case actionTypes.SIGNUP_OTP:
      console.log('SIGN UP OTP REDUCER', state);
      return {
        ...state,
        user: {
          userIsLoggedIn: false,
          // ...payload.result,
        },
        signupOTP: [...state.signupOTP, payload.result],
      };
    case actionTypes.SIGNUP_PASSWORD:
      console.log('SIGN UP PASSWORD REDUCER', state);
      return {
        ...state,
        user: {
          userIsLoggedIn: false,
          // ...payload.result,
        },
        signupPassword: [...state.signupPassword, payload.result],
      };

    case actionTypes.SIGNUPEMAILDATA:
      return {
        ...state,
        // user: {
        //   ...state.user,
        // },
        signupEmailData: payload,
      };
    case actionTypes.UPDATE_EMAIL_DATA:
      console.log('UPDATE EMAIL DATA REDUCER');
      return {
        ...state,
        // user: {
        //   ...state.user,
        // },
        newEmailData: payload,
      };

    case actionTypes.FORGET_NEW_PASSWORD:
      console.log('FORGET_NEW_ PASSWORD REDUCER', state);
      return {
        ...state,
        user: {
          userIsLoggedIn: false,
          // ...payload.result,
        },
        forgetNewPassword: [...state.forgetNewPassword, payload.result],
      };

    case actionTypes.UPDATE_NEW_EMAIL:
      console.log('UPDATE_NEW_EMAIL REDUCER', state);
      return {
        ...state,
        // user: {
        //   // ...payload.result,
        //   // userIsLoggedIn: true,
        //   // ...payload.result,
        // },
        // updateNewEmail:[]
        updateNewEmail: [...state.updateNewEmail, payload.result],
      };
    case actionTypes.UPDATE_EMAIL_OTP:
      console.log('UPDATE EMAIL OTP REDUCER', state.newEmailData);
      return {
        ...state,
        user: {
          ...state.user,
          result: {
            ...state.user.result,
            userExist: {
              ...state.user.result.userExist,
              email: state.newEmailData,
            },
          },
        },
        signupOTP: [...state.signupOTP, payload.result],
      };
    case actionTypes.UPDATE_SCHOOL:
      console.log('school updated', payload.school);
      console.log('old school', state.user.result.userExist);
      return {
        ...state,
        user: {
          ...state.user,
          result: {
            ...state.user.result,
            userExist: {
              ...state.user.result.userExist,
              ...payload.school,
            },
          },
        },
      };

    case actionTypes.SET_PROFILE_INFO:
      return {
        ...state,
        user: {
          ...state.user,
          userIsLoggedIn: false,
          profileInformation: payload.result,
        },
      };

    case actionTypes.SIGNUP:
      return {
        ...state,
        user: {
          userIsLoggedIn: true,
          ...payload.result,
        },
      };
    case actionTypes.SIGNUP_OTP:
      console.log('SIGN UP OTP REDUCER', state);
      return {
        ...state,
        user: {
          userIsLoggedIn: false,
          // ...payload.result,
        },
        signupOTP: [...state.signupOTP, payload.result],
      };

    case actionTypes.SET_WAREHOUSE_ADDRESS:
      return {
        ...state,
        user: {
          ...state.user,
          wareHouseAddress: payload.result,
        },
      };

    case actionTypes.TOKEN:
      //console.log("view response token here", payload.result);
      return {
        ...state,
        token: payload.result,
      };

    case actionTypes.INCREASE_SLOTS:
      console.log('REDUCER ===', payload.result);
      return {
        ...state,
        user: {
          ...state.user,
          result: {
            ...state.user.result,
            userExist: {
              ...payload.result,
            },
          },
        },
      };
    case actionTypes.INCREASE_STUDENT_COUNT:
      console.log('chal gya');
      return {
        ...state,
        user: {
          ...state.user,
          result: {
            ...state.user.result,
            studentCount: state.user.result.studentCount + 1,
            userExist: {
              ...state.user.result.userExist,
              studentsCount: state.user.result.userExist.studentsCount + 1,
            },
          },
        },
      };
    case actionTypes.DECREASE_STUDENT_COUNT:
      console.log('chal gya');
      return {
        ...state,
        user: {
          ...state.user,
          result: {
            ...state.user.result,
            studentCount: state.user.result.studentCount - 1,
            userExist: {
              ...state.user.result.userExist,
              studentsCount: state.user.result.userExist.studentsCount - 1,
            },
          },
        },
      };
    case actionTypes.INCREASE_BUS_COUNT:
      console.log('chal gya');
      return {
        ...state,
        user: {
          ...state.user,
          result: {
            ...state.user.result,
            userExist: {
              ...state.user.result.userExist,
              busCount: state.user.result.userExist.busCount + 1,
            },
          },
        },
      };
    case actionTypes.DECREASE_BUS_COUNT:
      console.log('chal gya');
      return {
        ...state,
        user: {
          ...state.user,
          result: {
            ...state.user.result,
            userExist: {
              ...state.user.result.userExist,
              busCount: state.user.result.userExist.busCount - 1,
            },
          },
        },
      };
    case actionTypes.UPDATE_DATA:
      console.log('REDUCER ===', payload.result);
      return {
        ...state,
        user: {
          ...state.user,
          result: {
            ...state.user.result,
            userExist: {
              ...payload.result,
            },
          },
        },
      };
    case actionTypes.CREATE_CUSTOMER:
      console.log('REDUCER ===', payload.result);
      return {
        ...state,
        user: {
          ...state.user,
          result: {
            ...state.user.result,
            userExist: {
              ...payload.result,
            },
          },
        },
      };
    default:
      return state;
  }
};
