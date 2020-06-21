/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, Image, View, ScrollView } from 'react-native';
import about from '../../../assets/about.png'
import { I18n } from '@aws-amplify/core'
import VersionNumber from 'react-native-version-number';
import theme, { styles } from '../Theme';
import { Text, TextInput } from 'react-native'

const screenId ='UI20'
type Props = {};
class About extends Component<Props> {
    constructor(props) {
        super(props);
        TextInput.defaultProps.allowFontScaling = props.allowFontScaling
        Text.defaultProps.allowFontScaling = props.allowFontScaling
        this.state = {
            textEmail: null,
            textPassword: null
        }
    }

    componentDidMount = async () => {
    }
    
    render() {
        
        console.log('VersionNumber', VersionNumber)
        return (
            <View style={[styles.container, { backgroundColor: theme.BACKGROUND_LIGHT }]}>
                <ScrollView>
                    <View style={{ margin: 10 }}>
                        <Image source={about} style={{ width: '100%' }} />
                        <Text style={stylesLocal.textAbout}>Nós somos uma plataforma que busca conectar globalmente as pessoas através de uma rede precisa de informações relacionadas à saúde.</Text>
                        <Text style={stylesLocal.textAbout}>
                            Empoderando nossos usuários, viemos facilitar o cuidado com sua saúde, dando o acesso na ponta dos dedos aos seus históricos médicos, exames, agendamentos e muito mais. Bem-vindo à evolução. Bem-vindo ao HealthYou.</Text>
                    </View>
                    <Text style={{marginTop: 100}}></Text>
                    <Text style={stylesLocal.instructions}>Version: {VersionNumber.appVersion}</Text>
                    <Text style={stylesLocal.instructions}>Build Version: {VersionNumber.buildVersion}</Text>
                    <Text style={stylesLocal.instructions}>Powered By HealthYou</Text>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.auth.currentUser,
    allowFontScaling: state.core.allowFontScaling
    //   loadingAuth: state.auth.loadingAuth,
    //   message: state.auth.message
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(About);

const stylesLocal = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    textAbout: {
        fontSize: theme.TEXT_18,
        color: theme.PRIMARY_COLOR,
        padding: 20,
        textAlign: "justify"
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
        fontSize: theme.TEXT_18
    },
});
