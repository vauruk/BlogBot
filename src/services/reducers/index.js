/**
 * @author Vanderson de Moura Vauruk
 * @date 05/06/2020
 */
import { combineReducers } from 'redux';

import core from './core';
import auth from './auth';
import news from './news';


export default combineReducers({
    core,
    auth,
    news
});
