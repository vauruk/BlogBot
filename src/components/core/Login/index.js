/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Image, View, TouchableOpacity, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import boticario from '../../../assets/logogb.png'
import {
    Text,
} from 'react-native';

import {
    Container,
    Button, Form,
    Item, Input,
    Grid, Row, Col, Icon,
    Spinner
} from 'native-base'
import { I18n } from '@aws-amplify/core';
//import { signIn, hideShowRegister, hideShowForgot } from '../../../redux/actions/auth'
//import { TextInputMask } from 'react-native-masked-text'
import * as authActions from '../../../services/actions/auth'

import theme, { styles } from '../Theme'
import { Actions } from 'react-native-router-flux';
//import ChangePassword from './changePassword';
import _ from 'lodash'

const start = {
    textUser: '',
    textPassword: undefined,
    focusPassword: '',
    user: null,
}

const Login: () => React$Node = () => {

    const dispatch = useDispatch()

    const isLoading = useSelector((state) => state.auth.isLoading)
    const errorAuthMessage = useSelector((state) => state.auth.isLoading)
    const showChangePasswordModal = useSelector((state) => state.auth.showChangePasswordModal)
    const loadingForgot = useSelector((state) => state.auth.loadingForgot)
    const isOpenForgotPassword = useSelector((state) => state.auth.isOpenForgotPassword)
    const [textUser, setTextUser] = useState(undefined)
    const [textPassword, setTextPassword] = useState(undefined)
    const [focusPassword, setFocusPassword] = useState(undefined)

    useEffect(() => {
        // dispatch(pokemonListAction());
    }, []);

    handleSignIn = () => {

        if (textUser && textUser.length > 0
            && textPassword && textPassword.length) {
            // console.log("state", textUser)

            signIn(textUser, textPassword)
        } else {
            Alert.alert(
                I18n.get('Warning'),
                I18n.get('Favor inserir usuário e senha!'),
                [
                    { text: 'OK' },
                ],
            );
        }
    }

    handleForgot = () => {
        if (_.isEmpty(textUser)) {
            Alert.alert(
                I18n.get('Erro'),
                I18n.get('Deve ser digitado um CPF válido'),
                [
                    { text: 'OK' },
                ],
            );
        } else {
            forgotPassword(textUser)
        }
    }

    handlePasswordInputSubmit = () => {
        this.setState({ focusPassword: true });
    }

    handleOpenForgot = () => {
        //openForgetPassword(true)
    }

    // render() {
    //     const { errorAuthMessage } = this.props
    //     // console.log("errorAuthMessage", errorAuthMessage)
    //     console.log("isLoadin", isLoading)
    return (
        <Container style={[{ backgroundColor: theme.WHITE_COLOR }]}>
            {/* <ChangePassword userId={textUser} showChangePasswordModal={showChangePasswordModal} /> */}
            {/* <Modal
                    overFullScreen
                    transparent
                    animationType="fade"
                    visible={isOpenForgotPassword}
                    onRequestClose={() => openForgetPassword(false)}>
                    <TouchableOpacity
                        style={styles.bodyPopup}
                        activeOpacity={1}
                    // onPress={() => this.showModalForgotPassword()}
                    >
                        <View style={[styles.wrapperPopup, { height: 260 }]}>
                            <Text style={styles.modalHeaderLight}  >
                                {I18n.get('Esqueci a senha')}
                            </Text>
                            <View style={{ margin: 10 }}>
                                <Form>
                                    <Item style={{ marginTop: 5, marginLeft: 5, marginRight: 5 }} >
                                        <Input
                                            placeholder={I18n.get('CPF')}
                                            // type={'cpf'}
                                            autoFocus={true}
                                            keyboardType='numeric'
                                            autoCapitalize='none'
                                            placeholderTextColor={theme.GRAY_LIGHT3_COLOR}
                                            style={{ fontSize: theme.TEXT_18, color: theme.PRIMARY_COLOR }}
                                            value={textUser}
                                            onChangeText={text => this.setState({ textUser: text })}
                                        />
                                    </Item>
                                </Form>
                            </View>
                            <Grid style={{ marginTop: 30 }}>
                                <Col>
                                    <Button block style={[styles.buttonCancel]} onPress={() => openForgetPassword(false)}>
                                        <Text style={{ color: theme.PRIMARY_COLOR }} >{I18n.get('Cancel')}</Text>
                                    </Button>
                                </Col>
                                <Col>
                                    <Button disabled={loadingForgot} block style={[styles.buttonConfirm]} onPress={() => this.handleForgot()}>
                                        {
                                            !loadingForgot &&
                                            <Text style={{ color: theme.PRIMARY_COLOR }}>{I18n.get('Send')}</Text>
                                        }
                                        {
                                            loadingForgot &&
                                            <Spinner color={theme.PRIMARY_COLOR} />
                                        }
                                    </Button>
                                </Col>
                            </Grid>
                        </View>
                    </TouchableOpacity>
                </Modal> */}
            <KeyboardAwareScrollView>
                <View style={{ height: theme.HEIGHT }}>
                    <View style={[styles.centerGrid, { marginTop: 100 }]}>
                        <Image style={{
                            alignItems: 'center',
                            width: '80%',
                            // Without height undefined it won't work
                            height: undefined,
                            // figure out your image aspect ratio
                            aspectRatio: 150 / 100,
                        }} source={boticario} />
                    </View>
                    <View style={[styles.centerGrid, { marginTop: 40 }]}>
                        {errorAuthMessage &&
                            <Text style={{
                                marginLeft: '15%', marginRight: '15%',
                                color: theme.EMERGENCY_COLOR,
                                fontSize: theme.TEXT_18
                            }}
                            >{I18n.get(errorAuthMessage)}</Text>
                        }
                        {!errorAuthMessage &&
                            <Text></Text>
                        }
                    </View>
                    <Form>
                        <Item style={{ marginTop: 25, marginLeft: '15%', marginRight: '15%' }}>
                            <Icon type={'FontAwesome'} name="user" size={20} style={{ marginLeft: 5, marginRight: 6, color: theme.PRIMARY_COLOR_FONT }} />
                            <Input
                                // type={'cpf'}
                                autoFocus={true}
                                placeholder={I18n.get('Email')}
                                keyboardType='numeric'
                                autoCapitalize='none'
                                placeholderTextColor={theme.PRIMARY_COLOR_FONT}
                                style={{ paddingBottom: 5, fontSize: theme.TEXT_18, color: theme.PRIMARY_COLOR_FONT }}
                                value={textUser}
                                onChangeText={text => this.setState({ textUser: text })}
                            />
                        </Item>
                        <Item style={{ marginTop: 8, marginLeft: '15%', marginRight: '15%' }}>
                            <Icon type={'FontAwesome'} name="key" size={20} style={{ marginLeft: 5, color: theme.PRIMARY_COLOR_FONT }} />
                            <Input
                                value={textPassword}
                                placeholderTextColor={theme.PRIMARY_COLOR_FONT}
                                style={{ fontSize: theme.TEXT_18, color: theme.PRIMARY_COLOR_FONT }}
                                secureTextEntry={true}
                                placeholder={I18n.get('Password')}
                                autoCapitalize='none'
                                onChangeText={(textPassword) => this.setState({ textPassword })}
                                onSubmitEditing={() => this.handleSignIn()} />
                        </Item>
                    </Form>
                    {
                        !isLoading &&
                        <Button block style={[styles.buttonDefault, {
                            marginTop: 30,
                            backgroundColor: theme.PRIMARY_COLOR_FONT, marginLeft: '15%',
                            marginRight: '15%'
                        }]} onPress={() => this.handleSignIn()}>
                            <Text style={{ textTransform: 'capitalize', color: theme.WHITE_COLOR, fontSize: theme.TEXT_18 }}>{I18n.get('Sign In')}</Text>
                        </Button>
                    }
                    {
                        isLoading &&
                        <Button block style={[styles.buttonDefault, {
                            marginTop: 30,
                            backgroundColor: theme.PRIMARY_COLOR_FONT, marginLeft: '15%',
                            marginRight: '15%'
                        }]} >
                            <Spinner color={theme.PRIMARY_COLOR} />
                        </Button>
                    }
                    <Grid>
                        <Row style={{ marginTop: 10, marginLeft: '10%', marginRight: '10%' }}>
                            <Col>
                                <Button style={{ width: '100%' }} block transparent onPress={() => handleOpenForgot(true)}>
                                    <Text style={{ textTransform: 'capitalize', color: theme.PRIMARY_COLOR_FONT, fontSize: theme.TEXT_14 }} >{I18n.get('Forgot Password')}</Text>
                                </Button>
                            </Col>
                            <Col>
                                <Button block transparent onPress={() => Actions.register()}>
                                    <Text style={{ textTransform: 'capitalize', color: theme.PRIMARY_COLOR_FONT, fontSize: theme.TEXT_14 }} >{I18n.get('Register')}</Text>
                                </Button>
                            </Col>
                        </Row>
                    </Grid>
                </View>
            </KeyboardAwareScrollView>
        </Container >
    );
    //}
}

// const mapStateToProps = (state) => ({
//     isLoading: state.auth.isLoading,
//     errorAuthMessage: state.auth.errorAuthMessage,
//     showChangePasswordModal: state.auth.showChangePasswordModal,
//     loadingForgot: state.auth.loadingForgot,
//     isOpenForgotPassword: state.auth.isOpenForgotPassword,
//     //   allowFontScaling: state.core.allowFontScaling
// });
// const mapDispatchToProps = dispatch =>
//     bindActionCreators(authActions, dispatch);


// export default connect(mapStateToProps, mapDispatchToProps)(Login);
export default Login;

