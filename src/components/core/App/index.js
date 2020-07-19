/**
 * @date 23/06/2020
 * @author Vanderson de Moura Vauruk
 * @email vauruk@gmail.com
 * @linkedin https://www.linkedin.com/in/vauruk/
 */

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from '../../../services/store';

import { PersistGate } from 'redux-persist/integration/react';

import {
    StyleSheet,
    NativeModules,
    Platform
} from 'react-native';

import {
    Container,
    Text,
    Root, Content
} from 'native-base';

import { I18n } from '@aws-amplify/core';
import dict_pt from '../../../i18n/i18n_pt_BR';
import dict_es from '../../../i18n/i18n_es';
import moment from 'moment-timezone';
import 'moment/locale/pt-br';
moment.locale('pt-BR');

I18n.putVocabularies(dict_es);
I18n.putVocabularies(dict_pt);

import MainRouter from '../Router'

const App: () => React$Node = () => {
    console.disableYellowBox = true;

    useEffect(() => {
        let lang = undefined
        if (Platform.OS === 'ios') {
            lang = NativeModules.SettingsManager.settings.AppleLocale // Adquire o idioma no device iOS
        } else {
            lang = NativeModules.I18nManager.localeIdentifier // Adquire o idioma no device Android
        }
        console.log("App efetct", lang)
        I18n.setLanguage(lang);
    }, []);


    return (
        <Root>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    {/* <Loading /> */}
                    {/* <ModalError/> */}
                    <MainRouter />
                    {/* <Register2 /> */}
                </PersistGate>
            </Provider>
        </Root>

    );
}

export default App;

const Register2 = () => (
    <Container>
        <Content>
            <Text style={styles.welcome}>
                Register 
            </Text>
        </Content>
    </Container>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //  ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        //alignItems: 'center',
        // backgroundColor: '#F5FCFF',
    },
    welcome: {
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
