/**
 * @date 23/06/2020
 * @author Vanderson de Moura Vauruk
 * @email vauruk@gmail.com
 * @linkedin https://www.linkedin.com/in/vauruk/
 */

import * as types from './types';
import axios from 'axios'

export const listNewsAction = () => {
    return dispatch => {
        axios.get('https://gb-mobile-app-teste.s3.amazonaws.com/data.json')
            .then(dispatch({ type: types.LOADING, payload: true }))
            .then((res) => {
                dispatch({ type: types.LOADING, payload: false })
                dispatch({ type: types.LIST_NEWS, payload: res.data.news })
                // handle success
                console.log("listNewsAction", res);
            })
            .catch((error) => {
                dispatch({ type: types.LOADING, payload: false })
                // handle error
                console.log(error);
            })
        // .then(function () {
        //     // always executed
        // });

    }
}
