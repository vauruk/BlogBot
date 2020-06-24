/**
 * @date 23/06/2020
 * @author Vanderson de Moura Vauruk
 * @email vauruk@gmail.com
 * @linkedin https://www.linkedin.com/in/vauruk/
 */

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Image, View, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import boticario from '../../../assets/logogb.png'
import {
    Text,
    Modal,
    TouchableOpacity
} from 'react-native';

import {
    Container,
    Button, Form,
    Item, Input,
    Grid, Row, Col, Icon,
    Spinner
} from 'native-base'
import { I18n } from '@aws-amplify/core';
import { signIn, forgotPassword, hideShowRegister, hideShowForgot } from '../../../services/actions/auth'
//import { TextInputMask } from 'react-native-masked-text'

import theme, { styles } from '../Theme'
import { Actions } from 'react-native-router-flux';
//import ChangePassword from './changePassword';
import _ from 'lodash'

// const start = {
//     textUser: '',
//     textPassword: undefined,
//     focusPassword: '',
//     user: null,
// }

const Login: () => React$Node = () => {

    const dispatch = useDispatch()

    const loginLoading = useSelector((state) => state.auth.loginLoading)
    const errorAuthMessage = useSelector((state) => state.auth.isLoading)
    // const showChangePasswordModal = useSelector((state) => state.auth.showChangePasswordModal)
    const loadingForgot = useSelector((state) => state.auth.loadingForgot)
    // const [openForgotPassword, setOpenForgotPassword ] = useSelector((state) => state.auth.isOpenForgotPassword)
    const [openForgotPassword, setOpenForgotPassword] = useState(false)
    const [textUser, setTextUser] = useState(undefined)
    const [textPassword, setTextPassword] = useState(undefined)
    const [focusPassword, setFocusPassword] = useState(undefined)

    // useEffect(() => {
    //     // dispatch(pokemonListAction());
    // }, []);

    handleSignIn = () => {
        if (textUser && textUser.length > 0
            && textPassword && textPassword.length) {
            // console.log("state", textUser)

            dispatch(signIn(textUser, textPassword))
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
            dispatch(forgotPassword(textUser))
            setOpenForgotPassword(false)
        }
    }

    return (
        <Container style={[{ backgroundColor: theme.WHITE_COLOR }]}>
            <Modal
                overFullScreen
                transparent
                animationType="fade"
                visible={openForgotPassword}
                onRequestClose={() => setOpenForgotPassword(false)}>
                <TouchableOpacity
                    style={styles.bodyPopup}
                    activeOpacity={1}
                >
                    <View style={[styles.wrapperPopup, { height: 260 }]}>
                        <Text style={styles.modalHeaderLight}  >
                            {I18n.get('Esqueci a senha')}
                        </Text>
                        <View style={{ margin: 10 }}>
                            <Form>
                                <Item style={{ marginTop: 5, marginLeft: 5, marginRight: 5 }} >
                                    <Input
                                        placeholder={I18n.get('Email')}
                                        autoFocus={true}
                                        keyboardType='email-address'
                                        autoCapitalize='none'
                                        placeholderTextColor={theme.SECONDARY_COLOR}
                                        style={{ fontSize: theme.TEXT_14, color: theme.SECONDARY_COLOR }}
                                        value={textUser}
                                        onChangeText={text => setTextUser(text)}
                                    />
                                </Item>
                            </Form>
                        </View>
                        <Grid style={{ marginTop: 30 }}>
                            <Col>
                                <Button block style={[styles.buttonCancel]} onPress={() => setOpenForgotPassword(false)}>
                                    <Text style={{ color: theme.WHITE_COLOR }} >{I18n.get('Cancel')}</Text>
                                </Button>
                            </Col>
                            <Col>
                                <Button disabled={loadingForgot} block style={[styles.buttonConfirm]} onPress={() => handleForgot()}>
                                    {
                                        !loadingForgot &&
                                        <Text style={{ color: theme.WHITE_COLOR }}>{I18n.get('Send')}</Text>
                                    }
                                    {
                                        loadingForgot &&
                                        <Spinner color={theme.WHITE_COLOR} />
                                    }
                                </Button>
                            </Col>
                        </Grid>
                    </View>
                </TouchableOpacity>
            </Modal>
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
                                onChangeText={text => setTextUser(text)}
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
                                onChangeText={(textPassword) => setTextPassword(textPassword)}
                                onSubmitEditing={() => handleSignIn()} />
                        </Item>
                    </Form>
                    {
                        !loginLoading &&
                        <Button block style={[styles.buttonDefault, {
                            marginTop: 30,
                            backgroundColor: theme.PRIMARY_COLOR_FONT, marginLeft: '15%',
                            marginRight: '15%'
                        }]} onPress={() => handleSignIn()}>
                            <Text style={{ textTransform: 'capitalize', color: theme.WHITE_COLOR, fontSize: theme.TEXT_18 }}>{I18n.get('Sign In')}</Text>
                        </Button>
                    }
                    {
                        loginLoading &&
                        <Button block style={[styles.buttonDefault, {
                            marginTop: 30,
                            marginLeft: '15%',
                            marginRight: '15%'
                        }]} >
                            <Spinner color={theme.WHITE_COLOR} />
                        </Button>
                    }
                    <Grid>
                        <Row style={{ marginTop: 10, marginLeft: '10%', marginRight: '10%' }}>
                            <Col>
                                <Button style={{ width: '100%' }} block transparent onPress={() => setOpenForgotPassword(true)}>
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
export default Login;

