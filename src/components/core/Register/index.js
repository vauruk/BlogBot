import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import {
    Button,
    Icon, Title,
    Form, Item, Input, Label, Content,
    Toast, Col, Row, Grid
} from 'native-base';
import { Text, TextInput } from 'react-native'
import {
    View,
    Platform,
} from 'react-native';
//import { Actions } from 'react-native-router-flux'
import moment from 'moment-timezone'
import { I18n } from '@aws-amplify/core';
//import { TextInputMask } from 'react-native-masked-text'
import { signUp, getUserDataAction } from '../../../services/actions/auth'
import { isEmail } from '../../core/function/email'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import boticario from '../../../assets/logogb.png'
import theme, { styles } from '../Theme'
import _ from 'lodash'

const valueName = {
    EMAIL: 'email',
    PASSWORD: 'password',
    DISPLAY_NAME: 'displayName',
    RETRY_PASSWORD: 'retryPassword',
}

const errorMsg = {
    email: undefined,
    name: undefined,
    password: undefined,
    retryPassword: undefined,
}
const Register: () => React$Node = (props) => {
    // const count = useSelector(state => state.core.count)
    const dispatch = useDispatch();


    const [email, setEmail] = useState(undefined)
    const [password, setPassword] = useState(undefined)
    const [retryPassword, setRetryPassword] = useState(undefined)
    const [displayName, setDisplayName] = useState(undefined)
    const [message, setMessage] = useState(undefined)
    const [isCanSave, setIsCanSave] = useState(false)
    const [emailValid, setEmailValid] = useState(false)

    const { errorRegisterMessage, loading } = useSelector(state => ({
        errorRegisterMessage: state.auth.errorRegisterMessage,
        loading: state.auth.loading,
    }), shallowEqual);

    handleChange = (value, name) => {
        //evt.preventDefault();
        // const { user, errors } = this.state;
        let isCanSave = false
        let msg = ''
        console.log("handleChange", value, name)
        switch (name) {
            case valueName.EMAIL:
                let email = value.toLowerCase().trim()
                if (!isEmail(email)) {
                    setMessage(I18n.get('Invalid email'))
                    setEmailValid(false)
                    return
                } else {
                    setIsCanSave(true)
                    setMessage(undefined)
                    setEmailValid(true)
                }
                setEmail(email)
                break;
            case valueName.PASSWORD:
                setPassword(value)
                break;
            case valueName.DISPLAY_NAME:
                setDisplayName(value)
                break;
            case valueName.RETRY_PASSWORD:
                setRetryPassword(value)
                break;
        }
    }

    // handleChangeEmail = (value) => {
    //     // e.preventDefault();
    //     let email = value.toLowerCase().trim()
    //     if (!isEmail(email)) {
    //         setMessage(I18n.get('Invalid email'))
    //         setEmailValid(false)
    //         setEmail(email)
    //         //return
    //     } else {
    //         setIsCanSave(true)
    //         setMessage(undefined)
    //         setEmailValid(true)
    //     }
    // }

    handleSave = () => {
        if (password === retryPassword) {
            // this.props.changePasswordAction(this.props.userId, this.state.user.password)
            // if (user.name === undefined || user.name === '') {
            //     this.setState({ isRequiredName: true })
            //     return
            // }
            console.log("handleSave", email, password)
            dispatch(signUp(email, password, displayName));
        } else {
            Alert.alert(
                I18n.get('Senhas não conferem'),
                I18n.get('Senhas estão diferentes para atualizar precisam ser iguais.'),
                [
                    { text: 'OK' },
                ],
            );
        }
    }

    return (
        <>
            <Content style={{ flex: 1, backgroundColor: theme.WHITE_COLOR }}>
                <KeyboardAwareScrollView>
                    <View >
                        <View style={[styles.centerGrid, { marginTop: 20 }]}>
                            <Image style={{
                                alignItems: 'center',
                                width: '80%',
                                // Without height undefined it won't work
                                height: undefined,
                                // figure out your image aspect ratio
                                aspectRatio: 150 / 100,
                            }} source={boticario} />
                        </View>
                        <View style={[styles.centerGrid, { marginTop: 30 }]}>
                            {errorRegisterMessage &&
                                <Text style={{
                                    marginLeft: '10%', marginRight: '10%',
                                    color: theme.EMERGENCY_COLOR,
                                    fontSize: theme.TEXT_18
                                }}>{I18n.get(this.props.errorRegisterMessage)}</Text>
                            }
                            {!errorRegisterMessage &&
                                <Text></Text>
                            }
                        </View>
                        <View style={{ margin: 40, marginTop: 5 }}>
                            <Form>
                                <Item style={{ marginTop: 5, marginLeft: 5, marginRight: 5 }} error={message ? true : false}>
                                    <Input
                                        keyboardType='default'
                                        value={displayName}
                                        placeholderTextColor={theme.PRIMARY_COLOR_FONT}
                                        style={{ fontSize: theme.TEXT_18, color: theme.PRIMARY_COLOR_FONT }}
                                        //textContentType='emailAddress'
                                        maxLength={155}
                                        placeholder={I18n.get('Name')}
                                        autoCapitalize='none'
                                        onChangeText={value => handleChange(value, valueName.DISPLAY_NAME)} />
                                </Item>
                                <Item style={{ marginTop: 5, marginLeft: 5, marginRight: 5 }} error={message ? true : false}>
                                    <Input
                                        keyboardType='email-address'
                                        placeholderTextColor={theme.PRIMARY_COLOR_FONT}
                                        style={{ fontSize: theme.TEXT_18, color: theme.PRIMARY_COLOR_FONT }}
                                        textContentType='emailAddress'
                                        maxLength={60}
                                        value={email}
                                        placeholder={I18n.get('Email')}
                                        autoCapitalize='none'
                                        onChangeText={value => handleChange(value, valueName.EMAIL)} />
                                </Item>
                                <Item style={{ marginTop: 5, marginLeft: 5, marginRight: 5 }} >
                                    <Input
                                        placeholder={I18n.get('Password')}
                                        value={password}
                                        autoCapitalize='none'
                                        secureTextEntry={true}
                                        maxLength={11}
                                        placeholderTextColor={theme.PRIMARY_COLOR_FONT}
                                        style={{ fontSize: theme.TEXT_18, color: theme.PRIMARY_COLOR_FONT }}
                                        onChangeText={(text) => handleChange(text, valueName.PASSWORD)} />
                                </Item>
                                <Item style={{ marginTop: 5, marginLeft: 5, marginRight: 5 }} >
                                    <Input placeholder={I18n.get('Retry Password')}
                                        maxLength={11}
                                        secureTextEntry={true}
                                        autoCapitalize='none'
                                        value={retryPassword}
                                        placeholderTextColor={theme.PRIMARY_COLOR_FONT}
                                        style={{ fontSize: theme.TEXT_18, color: theme.PRIMARY_COLOR_FONT }}
                                        onChangeText={(text) => handleChange(text, valueName.RETRY_PASSWORD)} />
                                </Item>
                                <Button block style={[styles.buttonDefault, { marginTop: 20 }]}
                                    /*disabled={!this.isCanSaveForm()} style={this.isCanSaveForm() ? [styles.buttonDefault, { backgroundColor: theme.SECONDARY_COLOR, marginTop: 20 }] : [styles.buttonDisable, { marginTop: 20 }]}*/
                                    onPress={() => handleSave()}>
                                    <Text style={{ textTransform: 'capitalize', fontSize: theme.TEXT_18, color: theme.WHITE_COLOR }}>{I18n.get('Save')}</Text>
                                </Button>
                            </Form>

                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </Content >
        </>
    );
}

export default Register;