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

export const listPostAction = () => {
    console.log("listPostAction")
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
        //const today = moment().valueOf();
        database()
            .ref('/blogs')
            //.orderByChild('dateInverse')
            //.orderByKey()
            // .orderByValue('dateInverse')
            //.orderBy('dateInverse', 'desc')
            .on('value', snapshot => {
                console.log('User data: ', snapshot.val());
                dispatch({ type: types.LIST_BLOG, payload: snapshot.val() })
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
            .update(post)


    }
}
export const deletePostAction = (postId) => {
    return (dispatch, getState) => {
        database()
            .ref(`/blogs/${postId}`)
            .set(null)
            .then(() => console.log('Delete Data set.'));


    }
}
