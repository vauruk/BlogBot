import React, { Component } from 'react';

import {
    Button, Icon,
    Form, Item, Input, Label,
     Toast, Grid
} from 'native-base';
import { View } from 'react-native';
import theme, { styles } from '../../core/Theme';
import { I18n } from '@aws-amplify/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    forgotPassword,
    clearState,
    hideShowForgot,
    hideShowInsertPassword,
    forgotPasswordSubmit
} from '../../../redux/actions/auth'
import { Text } from 'react-native'

class Forgot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtEmail: undefined,
            password: undefined,
            retryPassword: undefined,
            retryMessage: undefined,
            code: undefined,
            isCanSave: false
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.messageForgot !== this.props.messageForgot) {
            console.log(prevProps.messageForgot)
            Toast.show({
                text: I18n.get(prevProps.messageForgot),
                textStyle: { color: "#000000" },
                type: "success",
            })
            // this.props.history.push('/login')
            this.props.clearState();
        }
        if (prevProps.messageForgotError !== this.props.messageForgotError) {
            Toast.show({
                text: I18n.get(prevProps.messageForgotError),
                textStyle: { color: "#ffffff" },
                type: "danger",
            })
            this.props.clearState();
        }
    }
    
    handleBack = () => {
        this.props.hideShowForgot(false)
    }

    handleSend = () => {
        if (this.state.txtEmail && this.state.txtEmail.length > 0) {
            this.props.forgotPassword(this.state.txtEmail)
            //  this.props.hideShowForgot(!this.props.showForgot)
        }
    }

    handleChangeRetryPassword = (retryPassword) => {
        const { password } = this.state
        let isCanSave = (password && retryPassword && password === retryPassword)
        this.setState({
            retryPassword: retryPassword,
            isCanSave: isCanSave,
            retryMessage: isCanSave ? undefined : 'Senhas não conferem'
        });
        console.log("handleChangePassword", password && retryPassword && password === retryPassword)
    }
    
    handleChangePassword = () => {
        this.props.forgotPasswordSubmit(this.state.txtEmail, this.state.code, this.state.password)
    }
    
    render() {
        //  console.log("this.props.messageForgotError", this.props.messageForgotError)
        return (
            <View>
                <View>
                    <Form>
                        <Item style={{
                            backgroundColor: '#631e60',
                            justifyContent: 'center',
                            marginLeft: -10,
                            alignItems: 'center'
                        }}>
                            <Text style={{ color: '#ffffff', padding: 14, fontSize: theme.TEXT_20 }}>
                                {I18n.get('Forgot Password')}
                            </Text>
                        </Item>
                    </Form>
                </View>
                {
                    !this.props.showInsertPassword &&
                    <Form>
                        <Item floatingLabel last>
                            <Label>{I18n.get('Email')}</Label>
                            <Input keyboardType='email-address' value={this.state.txtEmail}
                                keyboardType='email-address' maxLength={100}
                                autoCapitalize='none'
                                onChangeText={(txtEmail) => this.setState({ txtEmail })} />
                        </Item>
                        <Button block style={{ marginLeft: 5, marginRight: 5, marginTop: 30, marginBottom: 30 }} onPress={() => this.handleSend()}>
                            <Text>{I18n.get('Send')}</Text>
                        </Button>
                    </Form>
                }
                {
                    this.props.showInsertPassword &&
                    <View>
                        {
                            this.props.messageForgotError &&
                            <Text style={{ color: 'red', padding: 8, fontSize: theme.TEXT_15, textAlign: 'center' }}>
                                {I18n.get(this.props.messageForgotError)}
                            </Text>
                        }
                        <Form>
                            <Item floatingLabel last>
                                <Label>{I18n.get('Email')}</Label>
                                <Input keyboardType='email-address'
                                    autoCapitalize='none'
                                    disabled={true} value={this.state.txtEmail}
                                    onChangeText={(txtEmail) => this.setState({ txtEmail })} />
                            </Item>
                            <Item floatingLabel last>
                                <Label>{I18n.get('Code')}</Label>
                                <Input
                                    keyboardType='numeric'
                                    onChangeText={(code) => this.setState({ code })} />
                            </Item>
                            <Item floatingLabel last>
                                <Label>{I18n.get('Password')}</Label>
                                <Input secureTextEntry={true}
                                    autoCapitalize='none'
                                    onChangeText={(password) => this.setState({ password })} />
                            </Item>
                            <Item floatingLabel last error={this.state.retryMessage ? true : undefined}>
                                <Label>{I18n.get('Retry Password')}</Label>
                                <Input secureTextEntry={true}
                                    autoCapitalize='none' onChangeText={(retryPassword) => this.handleChangeRetryPassword(retryPassword)} />
                                {
                                    this.state.retryMessage &&
                                    <Icon name='close-circle' />
                                }
                            </Item>
                            <Button block style={{ marginLeft: 5, marginRight: 5, marginTop: 30, marginBottom: 30 }} disabled={!this.state.isCanSave} onPress={() => this.handleChangePassword()}>
                                <Text>{I18n.get('Confirm')}</Text>
                            </Button>
                        </Form>
                    </View>
                }
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    messageForgot: state.auth.messageForgot,
    messageForgotError: state.auth.messageForgotError,
    showForgot: state.auth.showForgot,
    showInsertPassword: state.auth.showInsertPassword,
    allowFontScaling: state.core.allowFontScaling
});

const mapDispatchToProps = dispatch => bindActionCreators({
    forgotPassword,
    hideShowInsertPassword,
    clearState,
    hideShowForgot,
    forgotPasswordSubmit
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Forgot);