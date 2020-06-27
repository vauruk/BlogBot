/**
 * @date 23/06/2020
 * @author Vanderson de Moura Vauruk
 * @email vauruk@gmail.com
 * @linkedin https://www.linkedin.com/in/vauruk/
 */

import * as types from './types'
import database from '@react-native-firebase/database'
import moment from 'moment-timezone'
import _ from 'lodash'
import { Toast } from 'native-base';


export const listPostAction = () => {
    return dispatch => {

        dispatch({ type: types.LOADING, payload: true })
        // database()
        //     .ref('/blogs')
        //     .once('value')
        //     .then(snapshot => {
        //         console.log('User data: ', snapshot.val());
        //         dispatch({ type: types.LIST_BLOG, payload: snapshot.val() })
        //         dispatch({ type: types.LOADING, payload: false })
        //     });
        const today = moment().valueOf();
        database()
            .ref('/blogs')
            .orderByValue('dateInverse')
            .on('value', snapshot => {
                let arr = []
                snapshot.forEach((child) => {
                    //console.log("database", child, child._snapshot.key) // NOW THE CHILDREN PRINT IN ORDER
                    let obj = child.val()
                    _.set(obj, "uid", child._snapshot.key)
                    arr.push(obj)
                });
                arr = arr.sort((a, b) => {
                    return a.dateInverse - b.dateInverse;
                })
                //console.log('User data: ', arr);
                //  dispatch({ type: types.LIST_BLOG, payload: snapshot.val() })
                dispatch({ type: types.LIST_BLOG, payload: arr })
                dispatch({ type: types.LOADING, payload: false })
            });

    }
}

export const savePostAction = (postUser) => {
    return (dispatch, getState) => {
        const user = getState().auth.userData;
        let key = database().ref().child('blogs').push().key;
        let post = {
            [key]: {
                post: postUser,
                create_at: moment().toISOString(),
                userId: user.uid,
                userName: user.displayName,
                dateInverse: moment().valueOf()
            }
        }
        database()
            .ref('/blogs')
            .update(post).then(() => {
                dispatch({ type: types.POST, payload: undefined })
                dispatch({ type: types.UID, payload: undefined })

            });


    }
}
export const deletePostAction = (postId) => {
    return dispatch => {
        database()
            .ref(`/blogs/${postId}`)
            .set(null)
            .then(() =>
                // Alert.alert(
                //     I18n.get('Information'),
                //     `Post deletado com sucesso.`,
                //     [
                //         { text: 'Ok' },
                //     ],
                // )

                Toast.show({
                    text: 'Post deletado com sucesso.',
                    buttonText: 'Ok',
                    type: "success",
                    duration: 3000
                })
            );
    }
}

export const editPostAction = (textPost, uid) => {
    return (dispatch, getState) => {
        let post = getState().blog.post;
        _.set(post, "post", textPost)
        console.log("editPostAction", post)
        database()
            .ref(`/blogs/${uid}`)
            .set(post)
            .then(() => {
                dispatch({ type: types.POST, payload: undefined })
                dispatch({ type: types.UID, payload: undefined })
                Toast.show({
                    text: 'Post editado com sucesso.',
                    buttonText: 'Ok',
                    type: "success",
                    duration: 3000

                })
            }
                // Alert.alert(
                //     I18n.get('Information'),
                //     `Post alterado com sucesso.`,
                //     [
                //         {
                //             text: I18n.get('Ok'), onPress: () => {
                //                 dispatch({ type: types.POST, payload: undefined })
                //                 dispatch({ type: types.UID, payload: undefined })
                //             }
                //         },
                //     ],
                // )
            );
    }
}
export const selectPostAction = (post, uid) => {
    return dispatch => {
        dispatch({ type: types.POST, payload: post })
        dispatch({ type: types.UID, payload: uid })
    }
}
export const setPostTextAction = (text) => {
    return dispatch => {
        dispatch({ type: types.SET_POST, payload: text })
    }
}
