/**
 * @date 23/06/2020
 * @author Vanderson de Moura Vauruk
 * @email vauruk@gmail.com
 * @linkedin https://www.linkedin.com/in/vauruk/
 */


import * as types from '../../actions/auth/types';

const initialState = {
  currentUser: null,
  userData: null,
  loadingRegister: false,
  isOpenForgotPassword: false,
  messageForgotError: null,
  showInsertPassword: false,
  errorAuth: undefined,
  errorAuthMessage: undefined,
  errorRegisterMessage: undefined,
  isAuthenticated: false,
  showChangePasswordModal: false,
  savedUser: false,
  loadingForgot: false,
  loginLoading: false,
  registerLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    /* Ativar para forçar a inicialização com os dados caso o back alterar sem avisar */
    /* case types.PERSIST_REHYDRATE: {
      return { ...state, ...initialState };
    } */
    case types.CURRENT_USER: {
      return { ...state, currentUser: action.payload, isAuthenticated: true, errorAuth: undefined, errorAuthMessage: undefined };
    }
    case types.AUTH_ERROR: {
      // console.log("types.AUTH_ERROR", action.payload)
      return { ...state, errorAuth: action.payload.error, errorAuthMessage: action.payload.error_description };
    }
    case types.LOGOUT: {
      return { ...state, currentUser: null, isAuthenticated: false, errorAuth: undefined, errorAuthMessage: undefined };
    }

    case types.PURGE: {
      console.log('PURGING STORE!!!!');
      return { ...initialState };
    }
    case types.CLEAR_STATE: {
      return {
        ...state, currentUser: null, message: null, messageForgot: null, errorAuthMessage: undefined, loadingForgot: false
      };
    }
    case types.SAVED_USER: {
      return {
        ...state, savedUser: action.payload, errorRegisterMessage: undefined
      };
    }
    case types.USER_REGISTER_SUCCESS: {
      return { ...state, message: action.payload, errorAuthMessage: undefined, errorRegisterMessage: undefined };
    }
    case types.LOADING_FORGOT: {
      return { ...state, loadingForgot: action.payload };
    }
    case types.USER_REGISTER_ERROR: {
      return { ...state, errorRegisterMessage: action.payload };
    }
    case types.OPEN_FORGOT_PASSWORD: {
      return { ...state, isOpenForgotPassword: action.payload };
    }
    case types.SHOW_IN_FORGOT_PASWORD: {
      return { ...state, showInsertPassword: action.payload };
    }
    case types.SHOW_FORGOT: {
      return { ...state, showForgot: action.payload };
    }
    case types.FORGOT_ERROR: {
      return { ...state, messageForgotError: action.payload };
    }
    case types.SHOW_CHANGE_PASSWORD_MODAL: {
      return { ...state, showChangePasswordModal: action.payload };
    }
    case types.USER_DATA: {
      return { ...state, userData: action.payload, savedUser: false };
    }
    case types.LOADING_LOGIN: {
      console.log("LOADING_LOGIN", action)
      return { ...state, loginLoading: action.payload };
    }
    case types.LOADING_REGISTER: {
      return { ...state, loginLoading: action.payload };
    }
    default:
      return state;
  }
};