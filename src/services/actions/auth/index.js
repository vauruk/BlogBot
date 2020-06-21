import * as types from './types';
//import * as typesLoading from '../loading/types';
import * as typesCore from '../core/types';
import { AsyncStorage, Alert } from 'react-native'

import Api from '../../util/api'
import { errorClg, showModalInfo } from '../../util/constants'
//import { removeMaskCpf, removeMaskPhone } from '../../util/masks'
import { I18n } from '@aws-amplify/core';

import { Actions } from 'react-native-router-flux';
import _ from 'lodash'

export const hideShowRegister = (showRegister) => {
    return dispatch => {
        dispatch({ type: types.SHOW_REGISTER, payload: showRegister })
    }
}
export const hideShowInsertPassword = (showInsertPassword) => {
    return dispatch => {
        dispatch({ type: types.SHOW_IN_FORGOT_PASWORD, payload: showInsertPassword })
    }
}

export const hideShowForgot = (showForgot) => {
    return dispatch => {
        dispatch({ type: types.SHOW_FORGOT, payload: showForgot })
    }
}

export const loadUserLogged = (user) => {
    return dispatch => {
        dispatch({ type: types.CURRENT_USER, payload: user })
    }
}

export const logout = () => {
    return dispatch => {
        /* PURGE: Apaga os dados pesistidos */
        dispatch({ type: types.PURGE, key: 'root', result: () => null });
        /* Direciona o fluxo não autenticado */
        Actions.auth();
        //dispatch({ type: types.LOGOUT })
    }
}

export const clearState = (user) => {
    return dispatch => {
        dispatch({ type: types.CLEAR_STATE })
    }
}

export const signUp = (formUser) => {
    const user = {
        //Id: removeMaskCpf(formUser.cpf),
        FirstName: formUser.firstName,
        LastName: formUser.lastName,
        BirthDate: formUser.birthDate,
        Gender: formUser.gender,
        Email: formUser.email,
        PhoneNumber: formUser.phone,
        ResponsibleCPF: formUser.parentsName,
        // ResponsibleName: removeMaskCpf(formUser.parentsCpf),
        ResponsiblePhone: formUser.parentsPhone,
        AlterPassword: true
    }
    console.log("signUp", user)
    const PATH = '/hpoints/CreateUser'
    return dispatch => {
        // Api.post(PATH, user).then(
        //     //dispatch({ type: typesLoading.LOADING, payload: true })
        // ).then(res => {
        //     console.log("signUp", res)
        //     //dispatch({ type: typesLoading.LOADING, payload: false })
        //     if (!JSON.parse(res.data.Success)) {
        //         dispatch({ type: types.USER_REGISTER_ERROR, payload: res.data.Description })
        //         showModalInfo(344, "Login Error", res.data.Description)
        //         // Alert.alert(
        //         //     I18n.get('Error'),
        //         //     I18n.get(res.data.Description),
        //         //     [
        //         //         { text: 'OK' },
        //         //     ],
        //         // );
        //     } else {
        //         dispatch({ type: types.USER_REGISTER_SUCCESS, payload: res.data.Description })//'Successful Registration, confirme your email.' 
        //         Actions.login()
        //         Alert.alert(
        //             I18n.get('Success'),
        //             I18n.get(res.data.Description),
        //             [
        //                 { text: 'OK' },
        //             ],
        //         );
        //     }
        // }).catch(error => {
        //     errorClg(error, dispatch)
        // });
    }
}

export const signIn = (username, password) => {
    return dispatch => {
        // let data = new URLSearchParams();
        // data.append('username', username);
        // data.append('password', password);
        // data.append('grant_type', 'password');
        // signInAction(username, password, dispatch)
    }
}

const signInAction = (username, password, dispatch) => {
    username = removeMaskCpf(username)
    console.log("sigin ", username)
    let data = {
        'grant_type': 'password',
        username,
        password
    }

    Api.postAuth('/token', data)
        .then(
            dispatch({ type: types.LOADING_LOGIN, payload: true })
            // dispatch({ type: typesLoading.LOADING, payload: false })
        )
        .then(res => {
            console.log("signInAction", res)
            //try {
            console.log("postAuth", JSON.parse(res.data.AlterPassword), res);
            res.data = { ...res.data, userId: data.username };
            if (JSON.parse(res.data.AlterPassword)) {
                dispatch({ type: types.SHOW_CHANGE_PASSWORD_MODAL, payload: true })
            } else {
                dispatch({ type: types.CURRENT_USER, payload: res.data })
                Actions.home();
            }

            dispatch({ type: types.LOADING_LOGIN, payload: false })
            // } catch (error) {
            //     console.log("error 2: ", error);
            //     dispatch({ type: typesLoading.LOADING, payload: false })
            // }
        })
        .catch(error => {
            dispatch({ type: types.LOADING_LOGIN, payload: false })
            //console.log("434343", error.toJSON())
            if (error && error.response && error.response.data.error === 'invalid_grant') {
                dispatch({ type: types.AUTH_ERROR, payload: error.response.data })
            } else {
                errorClg(error, dispatch)
            }
        })
}

export const openForgetPassword = (isOpen) => {
    return dispatch => {
        dispatch({ type: types.OPEN_FORGOT_PASSWORD, payload: isOpen })
        dispatch({ type: types.LOADING_FORGOT, payload: false })
    }
}

export const forgotPassword = (userId) => {
    const PATH = 'hpoints/ForgotMyPassword'
    userId = removeMaskCpf(userId)
    const params = {
        params: {
            userId,
        }
    }

    return dispatch => {
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

export const getUserDataAction = (userId) => {
    const PATH = `HBus/User/${userId}`
    return dispatch => {
        Api.getNew(PATH).then(res => {
            console.log("getUserAction", res.data.Data)
            dispatch({ type: types.USER_DATA, payload: res.data.Data })

        }).catch(error => {
            errorClg(error, dispatch)
        });
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
        dispatch({ type: types.SHOW_CHANGE_PASSWORD_MODAL, payload: idOpen })

    }
}
export const clearFirstAccessAction = () => {
    console.log("clearFirstAccessAction")
    return dispatch => {
        dispatch({ type: types.SHOW_CHANGE_PASSWORD_MODAL, payload: false })
        dispatch({ type: types.AUTH_ERROR, payload: { error: undefined, error_description: undefined } })
    }
}
export const cleanAddressBackAction = () => {
    console.log("cleanAddressBackAction")
    return dispatch => {
        dispatch({ type: typesCore.ADDRESS_LOAD, payload: undefined })
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