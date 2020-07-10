/**
 * @date 23/06/2020
 * @author Vanderson de Moura Vauruk
 * @email vauruk@gmail.com
 * @linkedin https://www.linkedin.com/in/vauruk/
 */

import * as types from './types';
//import * as typesLoading from '../loading/types';
//import * as typesCore from '../core/types';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';

import {errorClg, showModalInfo} from '../../util/constants';
import {I18n} from '@aws-amplify/core';

import {Actions} from 'react-native-router-flux';
import _ from 'lodash';

export const hideShowForgot = (showForgot) => {
  return (dispatch) => {
    dispatch({type: types.SHOW_FORGOT, payload: showForgot});
  };
};

export const logout = () => {
  return (dispatch) => {
    /* PURGE: Apaga os dados pesistidos */
    dispatch({type: types.PURGE, key: 'root', result: () => null});
    /* Direciona o fluxo não autenticado */
    Actions.auth();

    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
};

export const signUp = (email, password, displayName) => {
  return (dispatch) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(dispatch({type: types.LOADING_REGISTER, payload: true}))
      .then(async (res) => {
        const update = {
          displayName: displayName,
          //photoURL: 'https://my-cdn.com/assets/user/123.png',
        };
        await auth().currentUser.updateProfile(update);
        const user = auth().currentUser;
        dispatch({type: types.USER_DATA, payload: user._user});
        console.log(res, 'User account created & signed in!');
        dispatch({type: types.CURRENT_USER, payload: res.user});
        dispatch({type: types.LOADING_REGISTER, payload: false});
        Actions.home();
      })
      .catch((error) => {
        dispatch({type: types.LOADING_REGISTER, payload: false});
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          Alert.alert(
            I18n.get('Error'),
            I18n.get('Email esta sendo utilizado.'),
            [{text: 'OK'}],
          );
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          Alert.alert(I18n.get('Error'), I18n.get('Email invalido.'), [
            {text: 'OK'},
          ]);
        }
        console.error(error);
      });
  };
};

export const signIn = (email, password) => {
  console.log('sign', email, password);
  return (dispatch) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(dispatch({type: types.LOADING_LOGIN, payload: true}))
      .then((res) => {
        dispatch({type: types.LOADING_LOGIN, payload: false});
        console.log(res, 'User account created & signed in!');
        dispatch({type: types.CURRENT_USER, payload: res.user});
        Actions.home();
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          Alert.alert(I18n.get('Error'), I18n.get('Email invalido.'), [
            {text: 'OK'},
          ]);
        }
        console.error(error);
      });
  };
};

export const openForgetPassword = (isOpen) => {
  return (dispatch) => {
    dispatch({type: types.OPEN_FORGOT_PASSWORD, payload: isOpen});
    dispatch({type: types.LOADING_FORGOT, payload: false});
  };
};

export const forgotPassword = (email) => {
  return (dispatch) => {
    auth()
      .sendPasswordResetEmail(email)
      .then(dispatch({type: types.LOADING_FORGOT, payload: true}))
      .then((res) => {
        dispatch({type: types.LOADING_FORGOT, payload: false});
        console.log(res, 'User account created & signed in!');
        //  dispatch({ type: types.CURRENT_USER, payload: res.user })
        Alert.alert(
          I18n.get('Success'),
          I18n.get('Reset de senha enviado com sucesso.'),
          [{text: 'OK'}],
        );
      })
      .catch((error) => {
        dispatch({type: types.LOADING_FORGOT, payload: false});
        console.error(error);
        Alert.alert(I18n.get('Error'), I18n.get('Email invalido.'), [
          {text: 'OK'},
        ]);
      });
  };
};

export const getUserDataAction = () => {
  return (dispatch) => {
    const user = auth().currentUser;
    dispatch({type: types.USER_DATA, payload: user ? user._user : undefined});
  };
};
