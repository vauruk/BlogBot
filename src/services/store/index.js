/**
 * @author Vanderson de Moura Vauruk
 * @date 05/06/2020
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; //Dispatch after async done
import { persistStore, persistReducer } from 'redux-persist';
import logger from 'redux-logger';
import AsyncStorage from '@react-native-community/async-storage';
import reducers from '../reducers'//'../redux/reducers';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth', 'healthpoints'], // Reducers que serão persisitidos
    blacklist: [], // Reducers que NÃO serão persisitidos
};
const persistedReducer = persistReducer(persistConfig, reducers);
const middleware = applyMiddleware(thunk, logger);
const store = createStore(persistedReducer, compose(middleware));
const persistor = persistStore(store);

export { store, persistor };