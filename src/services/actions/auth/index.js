import * as types from './types';
//import * as typesLoading from '../loading/types';
//import * as typesCore from '../core/types';
import { AsyncStorage, Alert } from 'react-native'
import auth from '@react-native-firebase/auth';

import Api from '../../util/api'
import { errorClg, showModalInfo } from '../../util/constants'
//import { removeMaskCpf, removeMaskPhone } from '../../util/masks'
import { I18n } from '@aws-amplify/core';

import { Actions } from 'react-native-router-flux';
import _ from 'lodash'

export const hideShowForgot = (showForgot) => {
    return dispatch => {
        dispatch({ type: types.SHOW_FORGOT, payload: showForgot })
    }
}

export const logout = () => {
    return dispatch => {
        /* PURGE: Apaga os dados pesistidos */
        dispatch({ type: types.PURGE, key: 'root', result: () => null });
        /* Direciona o fluxo não autenticado */
        Actions.auth();

        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    }
}

export const signUp = (email, password, displayName) => {
    return dispatch => {
        auth()
            .createUserWithEmailAndPassword(email, password)
            //.then()
            .then((res) => {
                console.log(res, 'User account created & signed in!');
                dispatch({ type: types.CURRENT_USER, payload: res.user })
                Actions.home()
                const update = {
                    displayName: displayName,
                    //photoURL: 'https://my-cdn.com/assets/user/123.png',
                };
                auth().currentUser.updateProfile(update);
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                    Alert.alert(
                        I18n.get('Error'),
                        I18n.get('Email esta sendo utilizado.'),
                        [
                            { text: 'OK' },
                        ],
                    );
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                    Alert.alert(
                        I18n.get('Error'),
                        I18n.get('Email invalido.'),
                        [
                            { text: 'OK' },
                        ],
                    );
                }
                console.error(error);
            });
    }
}

export const signIn = (email, password) => {
    console.log("sign", email, password)
    return dispatch => {

        auth()
            .signInWithEmailAndPassword(email, password)
            .then(dispatch({ type: types.LOADING_LOGIN, payload: true }))
            .then((res) => {
                dispatch({ type: types.LOADING_LOGIN, payload: false })
                console.log(res, 'User account created & signed in!');
                dispatch({ type: types.CURRENT_USER, payload: res.user })
                Actions.home()
            })
            .catch(error => {

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                    Alert.alert(
                        I18n.get('Error'),
                        I18n.get('Email invalido.'),
                        [
                            { text: 'OK' },
                        ],
                    );
                }
                console.error(error);
            });
    }
}

export const openForgetPassword = (isOpen) => {
    return dispatch => {
        dispatch({ type: types.OPEN_FORGOT_PASSWORD, payload: isOpen })
        dispatch({ type: types.LOADING_FORGOT, payload: false })
    }
}

export const forgotPassword = (email) => {
    return dispatch => {
        auth()
            .sendPasswordResetEmail(email)
            .then(
                dispatch({ type: types.LOADING_FORGOT, payload: true })
            )
            .then((res) => {
                dispatch({ type: types.LOADING_FORGOT, payload: false })
                console.log(res, 'User account created & signed in!');
                //  dispatch({ type: types.CURRENT_USER, payload: res.user })
                Alert.alert(
                    I18n.get('Success'),
                    I18n.get('Reset de senha enviado com sucesso.'),
                    [
                        { text: 'OK' },
                    ],
                );
            })
            .catch(error => {
                dispatch({ type: types.LOADING_FORGOT, payload: false })
                console.error(error);
                //if (error.code === 'auth/invalid-email') {
                //   console.log('That email address is invalid!');
                Alert.alert(
                    I18n.get('Error'),
                    I18n.get('Email invalido.'),
                    [
                        { text: 'OK' },
                    ],
                );
                // }
            });

        // Api.get(PATH, params).then(
        //     dispatch({ type: types.LOADING_FORGOT, payload: true })
        // ).then(res => {
        //     console.log("forgotPassword", res)
        //     // dispatch({ type: types.AUTH_ERROR, payload: 'Sua senha foi enviada para o seu email!' })
        //     dispatch({ type: types.LOADING_FORGOT, payload: false })

        //     Alert.alert(
        //         I18n.get(JSON.parse(res.data.Success) ? 'Success' : 'Error'),
        //         I18n.get(res.data.Description),
        //         [
        //             { text: 'OK', onPress: () => dispatch({ type: types.OPEN_FORGOT_PASSWORD, payload: false }) },
        //         ],
        //     );
        // }).catch(error => {
        //     errorClg(error, dispatch)
        //     dispatch({ type: types.LOADING_FORGOT, payload: false })
        //     //dispatch({ type: typesLoading.LOADING, payload: false })
        // });
    }
}

export const getUserDataAction = () => {
    return dispatch => {
        const user = auth().currentUser;
        dispatch({ type: types.USER_DATA, payload: user._user })
    }
}

export const changePasswordAction = (username, password) => {
    // let data = new URLSearchParams();
    // data.append('username', username);
    // data.append('password', password);
    // data.append('grant_type', 'password');
    let data = {
        Id: removeMaskCpf(username),
        Password: password,
        AlterPassword: false
    }
    console.log("Data", data)
    const PATH = 'hpoints/UpdateUserPassword'
    return dispatch => {
        // Api.post(PATH, data).then(
        //    // dispatch({ type: typesLoading.LOADING, payload: true })
        // ).then(res => {
        //     console.log("UpdateUserPassword", res);
        //     if (JSON.parse(res.data.Success)) {

        //         Alert.alert(
        //             I18n.get(JSON.parse(res.data.Success) ? 'Success' : 'Error'),
        //             I18n.get(res.data.Description),
        //             [
        //                 {
        //                     text: 'OK', onPress: () => {
        //                         dispatch({ type: types.SHOW_CHANGE_PASSWORD_MODAL, payload: false })
        //                         signInAction(username, password, dispatch)
        //                     }
        //                 },
        //             ],
        //         );

        //     } else {
        //         //  console.log("error_description", error.response.data.error_description)
        //         dispatch({ type: types.AUTH_ERROR, payload: error.response.data })
        //         //dispatch({ type: typesLoading.LOADING, payload: false })
        //     }
        // })
    }
}

export const showModalChangePassword = (idOpen) => {
    return dispatch => {
        // dispatch({ type: types.SHOW_CHANGE_PASSWORD_MODAL, payload: idOpen })

    }
}
export const clearFirstAccessAction = () => {
    console.log("clearFirstAccessAction")
    return dispatch => {
        // dispatch({ type: types.SHOW_CHANGE_PASSWORD_MODAL, payload: false })
        // dispatch({ type: types.AUTH_ERROR, payload: { error: undefined, error_description: undefined } })
    }
}
export const cleanAddressBackAction = () => {
    console.log("cleanAddressBackAction")
    return dispatch => {
        // dispatch({ type: typesCore.ADDRESS_LOAD, payload: undefined })
    }
}

export const updateUserProfileAction = (infoData) => {
    let data = {
        Id: Number(infoData.Id),
        Email: infoData.Email,
        FirstName: infoData.FirstName,
        LastName: infoData.LastName,
        BirthDate: infoData.BirthDate,
        Gender: infoData.Gender,
        PhoneNumber: infoData.PhoneNumber,
        BloodType: infoData.BloodType,
        City: infoData.City,
        District: infoData.District,
        State: infoData.State,
        UserAddress: infoData.UserAddress
    }
    console.log("Data Update", data)
    const PATH = 'hpoints/UpdateUser'
    return dispatch => {
        // Api.post(PATH, data).then(
        //    // dispatch({ type: typesLoading.LOADING, payload: true })
        // ).then(res => {
        //     console.log("updateUserProfileAction", res);
        //     dispatch({ type: typesCore.ADDRESS_LOAD, payload: undefined })
        //     // Alert.alert(
        //     //     I18n.get(JSON.parse(res.data.Success) ? 'Success' : 'Error'),
        //     //     I18n.get(res.data.Description),
        //     //     [
        //     //         { text: 'OK', onPress: () => dispatch({ type: types.SHOW_MODAL_EDIT_PROFILE, payload: false }) },
        //     //     ],
        //     // );
        //     if (JSON.parse(res.data.Success)) {
        //         dispatch({ type: types.SAVED_USER, payload: true })
        //     }
        //    // dispatch({ type: typesLoading.LOADING, payload: false })
        // }).catch(error => {
        //     errorClg(error, dispatch)
        // })
    }
}