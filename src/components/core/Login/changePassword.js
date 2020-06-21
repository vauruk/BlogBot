/**
 * 
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Platform, StyleSheet, View, Modal, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';
import {
    Header, Button,
    Form,
    Item, Input,
    Toast, Grid, Row, Col, Icon
} from 'native-base'
import { I18n } from '@aws-amplify/core';
import theme, { styles } from '../Theme'
import { Text, TextInput } from 'react-native';

import * as authActions from '../../../services/actions/auth'

type Props = {};
class ChangePassword extends React.PureComponent {
    constructor(props) {
        super(props);
        TextInput.defaultProps.allowFontScaling = false;
        Text.defaultProps.allowFontScaling = false;
        this.state = {
            user: {
                password: undefined,
                retypePassword: undefined
            },
            errorMsg: undefined
        }
    }

    handleChangePassword = () => {
        if (this.props.userId && this.state.user.password === this.state.user.retypePassword) {
            this.props.changePasswordAction(this.props.userId, this.state.user.password)
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

    handleChange = (value, name) => {
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
        console.log("user", user)
    }

    render() {
        //console.log("Moddal change password", this.props.showChangePasswordModal)
        return (
            <KeyboardAvoidingView behavior="padding" enabled>
                <Modal
                    overFullScreen
                    transparent
                    animationType="fade"
                    visible={this.props.showChangePasswordModal}
                    onRequestClose={() => this.props.showModalChangePassword(false)}>
                    <TouchableOpacity
                        style={styles.bodyPopup}
                        activeOpacity={1}
                    //onPress={() => this.props.showModalChangePassord()}
                    >
                        <View style={[styles.wrapperPopup, { height: 300, backgroundColor: theme.PRIMARY_COLOR }]}>
                            <Text style={{ paddingTop: 20, textAlign: 'center', textTransform: 'capitalize', fontSize: theme.TEXT_20, color: theme.PRIMARY_COLOR_FONT }} >
                                {I18n.get('Primeiro Acesso trocar senha')}
                            </Text>
                            <View style={{ margin: 10 }}>
                                <Form>
                                    <Item style={{ marginTop: 5, marginLeft: 5, marginRight: 5 }} >
                                        <Input
                                            placeholder={I18n.get('Password')}
                                            value={this.state.password}
                                            autoCapitalize='none'
                                            secureTextEntry={true}
                                            maxLength={11}
                                            placeholderTextColor={theme.SECONDARY_COLOR_FONT}
                                            style={{ fontSize: theme.TEXT_18, color: theme.PRIMARY_COLOR_FONT }}
                                            onChangeText={(text) => this.handleChange(text, 'password')} />
                                    </Item>
                                    <Item style={{ marginTop: 5, marginLeft: 5, marginRight: 5 }} error={(this.state.errorMsg === '')}>
                                        <Input placeholder={I18n.get('Retype Password')}
                                            maxLength={11}
                                            secureTextEntry={true}
                                            autoCapitalize='none'
                                            value={this.state.retypePassword}
                                            placeholderTextColor={theme.SECONDARY_COLOR_FONT}
                                            style={{ fontSize: theme.TEXT_18, color: theme.PRIMARY_COLOR_FONT }}
                                            onChangeText={(text) => this.handleChange(text, 'retypePassword')} />
                                    </Item>
                                </Form>
                            </View>
                            <Grid style={{ marginTop: 20 }}>
                                <Col>
                                    <Button block style={[styles.buttonCancel]} onPress={() => this.props.showModalChangePassword(false)}>
                                        <Text style={{ color: theme.PRIMARY_COLOR }}>{I18n.get('Cancel')}</Text>
                                    </Button>
                                </Col>
                                <Col>
                                    <Button block style={[styles.buttonConfirm]} onPress={() => this.handleChangePassword()}>
                                        <Text style={{ color: theme.PRIMARY_COLOR }}>{I18n.get('Save')}</Text>
                                    </Button>
                                </Col>
                            </Grid>
                        </View>
                    </TouchableOpacity>
                </Modal>
            </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = dispatch => bindActionCreators(authActions, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);

const stylesLocal = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
