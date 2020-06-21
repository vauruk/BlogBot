import {
    Alert, Platform, Linking
} from 'react-native';

import { I18n } from '@aws-amplify/core';

export const _alertDev = (msg) => {

    Alert.alert(
        I18n.get('Feature unavailable'),
        I18n.get(msg ? msg : 'Esta funcionalidade esta deabilitada no momento'),
        [
            { text: 'OK' },
        ],
    );
}

export const dialCall = async (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
        phoneNumber = `tel:${number}`;
    } else {
        phoneNumber = `tel://${number}`;
    }
    try {
        const allow = await Linking.canOpenURL(phoneNumber);
        await Linking.openURL(phoneNumber);
        console.log('Permite fazer ligaçõs? ', allow);
    }
    catch (reject) {

        Alert.alert(
            'Erro de Dial',
            // eslint-disable-next-line no-multi-str
            'Chamadas não permitidas nesse dispositivo. \n \n \
        (Função requer device físico com SIM card)',
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
        );
    }
}