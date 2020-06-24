/**
 * @date 23/06/2020
 * @author Vanderson de Moura Vauruk
 * @email vauruk@gmail.com
 * @linkedin https://www.linkedin.com/in/vauruk/
 */

import * as types from '../../actions/news/types';

const initialState = {
    listNews: undefined,//[{ code: 504, title: "erro", message: "mensagem " }, { code: 544, title: "erro", message: "mensagem " }]
    loading: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.LIST_NEWS: {
            return { ...state, listNews: action.payload };
        }
        case types.LOADING: {
            return { ...state, loading: action.payload };
        }
        default:
            return state;
    }
};