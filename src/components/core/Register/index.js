import React, { Component } from 'react';

import {
    Container, Header,
    Left, Body, Right,
    Button, Icon, Title,
    Form, Item, Input, Label, Content,
    Toast, Col, Row, Grid
} from 'native-base';
import { Text, TextInput } from 'react-native'
import {
    View,
    Image,
    Modal, Switch,
    Platform,
    TouchableOpacity,
    Dimensions, Alert
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import moment from 'moment-timezone'
import { preciseDiff } from 'moment-precise-range-plugin'
//import CheckBox from '@react-native-community/checkbox';
import { I18n } from '@aws-amplify/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import { TextInputMask } from 'react-native-masked-text'
import { signUp, clearState } from '../../../redux/actions/auth'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { isEmail } from '../../core/function/email'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//import DateTimePicker from '@react-native-community/datetimepicker';
//import DatePicker from 'react-native-date-picker'
import logo from '../../../assets/logo.png'
import theme, { styles } from '../Theme'
import _ from 'lodash'

//import DateModal from '../../common/dateModal'

const valueName = {
    FIRST_NAME: 'firstName',
    FAMILY_NAME: 'lastName',
    IS_ACCEPTED: 'isAccepted',
    EMAIL: 'email',
    CPF: 'cpf',
    PHONE: 'phone',
    PASSWORD: 'password',
    RETRY_PASSWORD: 'retryPassword',
    PARENTS_NAME: 'parentsName',
    PARENTS_CPF: 'parentsCpf',
    PARENTS_PHONE: 'parentsPhone',

}

const errorMsg = {
    email: undefined,
    name: undefined,
    password: undefined,
    retryPassword: undefined,
    cellPhone: undefined,
}
const Register: () => React$Node = (props) => {
    // const loading = useSelector(state => state.core.loading)
    // const count = useSelector(state => state.core.count)

    const { count, loading } = useSelector(state => ({
        count: state.core.count,
        loading: state.core.loading,
    }), shallowEqual);
    // class Register extends Component {
    //     constructor(props) {
    //         super(props);
    //         this.state = {
    //             isCanSave: false,
    //             emailValid: false,
    //             message: undefined,
    //             retryMessage: undefined,
    //             errors: [],
    //             showParents: false,//controle de responsavel 
    //             errorMsg: errorMsg,
    //             showBirth: false,
    //             dateSelect: new Date(),
    //             user: {
    //                 email: '',
    //                 isAccepted: undefined,
    //                 firstName: '',
    //                 birthDate: '',
    //                 lastName: '',
    //                 password: '',
    //                 cpf: '',
    //                 gender: '',
    //                 retryPassword: '',
    //                 phone: '',
    //                 passwordMessage: '',
    //                 parentsName: '',
    //                 parentsCpf: '',
    //                 parentsPhone: '',
    //                 isPasswordValid: false
    //             },
    //             gender: [
    //                 { label: I18n.get('Female'), value: 'F' },
    //                 { label: I18n.get('Male'), value: 'M' },
    //             ],
    //             showCalendar: false
    //         }
    //     }

    // UNSAFE_componentWillMount = () => {
    //     if (!isEmail(this.state.user.email)) {
    //         this.setState({ message: I18n.get('Invalid email'), emailValid: false })
    //         return
    //     } else {
    //         this.setState({ message: undefined, emailValid: true })
    //     }
    // }


    handleChange = (value, name) => {
        const { user, errors } = this.state;
        let isCanSave = false
        let msg = ''
        switch (name) {
            case valueName.EMAIL:
                let email = value.toLowerCase().trim()
                if (!isEmail(email)) {
                    this.setState({
                        message: I18n.get('Invalid email'),
                        emailValid: false,
                        errorMsg: {
                            ...errorMsg,
                            [name]: I18n.get('Invalid email')
                        }
                    })
                    return
                } else {
                    isCanSave = true
                    this.setState({
                        message: undefined, emailValid: true,
                        errorMsg: {
                            ...errorMsg,
                            [name]: undefined
                        }
                    })
                }
                break;
            case valueName.FIRST_NAME:
                //isCanSave = value.length > 0 && value !== ''
                msg = undefined
                if (!isCanSave) {
                    //  msg = 'Nome deve ser preenchido'
                }
                this.setState({
                    errorMsg: {
                        ...errorMsg,
                        [name]: msg
                    }
                })
                break;
            case valueName.FAMILY_NAME:
                this.setState({
                    errorMsg: {
                        ...errorMsg,
                        [name]: msg
                    }
                })
                break;
            case valueName.PHONE:
                // value = '+55' + value
                break;
            case valueName.IS_ACCEPTED:
                value = !user.isAccepted
                break;
        }

        this.setState({
            user: {
                ...user,
                [name]: value
            },
            // errors: err,
            isCanSave: isCanSave &&
                //   !this.state.errorMsg.cellPhone &&
                //  !this.state.errorMsg.name &&
                !this.state.errorMsg.email

        });
        // console.log("user", user)
    }

    handleSave = () => {
        console.log(this.state.user)
        const { user } = this.state;
        // if (user.name === undefined || user.name === '') {
        //     this.setState({ isRequiredName: true })
        //     return
        // }
        this.props.signUp(user)
    }

    handleChangeRadio = (value) => {
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                gender: value
            }
        });
    }

    return (
        <Content style={{ flex: 1, backgroundColor: theme.PRIMARY_COLOR }}>
            {/* <DateModal title={'Birth Date'} funcOpenModalDate={this.openModalDate} showCalendar={this.state.showBirth} setDate={this.setSelectDate} /> */}
            <KeyboardAwareScrollView>
                <Modal
                    overFullScreen
                    transparent
                    animationType="fade"
                    visible={this.state.showParents}
                    onRequestClose={() => this.showModalParents()}>
                    <TouchableOpacity
                        style={styles.bodyPopup}
                        activeOpacity={1}
                    >
                        <View style={[styles.wrapperPopup, { height: 380, backgroundColor: theme.PRIMARY_COLOR }]}>
                            <Text style={[styles.modalHeaderLight, { color: theme.PRIMARY_COLOR_FONT }]} >
                                {I18n.get('Register Health You')}
                            </Text>
                            <Text style={{ paddingTop: 20, textAlign: 'center', textTransform: 'capitalize', fontSize: theme.TEXT_18, color: theme.GREENLIGHT_COLOR }} >
                                {I18n.get('inform data of legal guardian')}
                            </Text>
                            <View style={{ margin: 10 }}>
                                <Form>
                                    <Item style={{ marginTop: 5, marginLeft: 5, marginRight: 5 }} error={(this.state.user.name === '' && this.state.isRequiredName)}>
                                        <Input
                                            autoFocus={true}
                                            placeholder={I18n.get('Name')}
                                            value={this.state.user.parentsName}
                                            placeholderTextColor={theme.SECONDARY_COLOR_FONT}
                                            style={{ fontSize: theme.TEXT_18, color: theme.PRIMARY_COLOR_FONT }}
                                            onChangeText={(text) => this.handleChange(text, valueName.PARENTS_NAME)} />

                                    </Item>
                                    <Item style={{ marginTop: 5, marginLeft: 5, marginRight: 5, backgroundColor: theme.PRIMARY_COLOR }} error={(this.state.user.name === '' && this.state.isRequiredName)}>
                                        <Input
                                            // type={'cpf'}
                                            placeholder={I18n.get('CPF')}
                                            autoCapitalize='none'
                                            keyboardType='numeric'
                                            autoFocus={true}
                                            value={this.state.user.parentsCpf}
                                            placeholderTextColor={theme.SECONDARY_COLOR_FONT}
                                            style={{ marginBottom: 10, marginLeft: 5, marginTop: 5, fontSize: theme.TEXT_18, color: theme.PRIMARY_COLOR_FONT }}
                                            onChangeText={(text) => this.handleChange(text, valueName.PARENTS_CPF)}
                                        />

                                    </Item>
                                    {/* <Item style={{ marginTop: 5, marginLeft: 5, marginRight: 5 }}>
                                        <Input
                                            type={'cel-phone'}
                                            options={{
                                                maskType: 'BRL',
                                                withDDD: true,
                                                dddMask: '(99) '
                                            }}
                                            placeholder={I18n.get('Phone')}
                                            value={this.state.user.parentsPhone}
                                            placeholderTextColor={theme.SECONDARY_COLOR_FONT}
                                            style={{ marginBottom: 10, marginLeft: 5, marginTop: 5, fontSize: theme.TEXT_18, color: theme.PRIMARY_COLOR_FONT }}
                                            textContentType='telephoneNumber'
                                            keyboardType='numeric'
                                            onChangeText={(text) => this.handleChange(text, valueName.PARENTS_PHONE)}
                                        />
                                    </Item> */}
                                </Form>
                            </View>
                            <Grid style={{ marginTop: 30 }} >
                                <Col>
                                    <Button block style={[styles.buttonCancel]} onPress={() => this.showModalParents()}>
                                        <Text style={{ color: theme.PRIMARY_COLOR }}>{I18n.get('Cancel')}</Text>
                                    </Button>
                                </Col>
                                <Col>
                                    <Button block style={[styles.buttonConfirm]} onPress={() => this.showModalParents()}>
                                        <Text style={{ color: theme.PRIMARY_COLOR }}>{I18n.get('Ok')}</Text>
                                    </Button>
                                </Col>
                            </Grid>
                        </View>
                    </TouchableOpacity>
                </Modal>

                <View style={{ backgroundColor: theme.PRIMARY_COLOR }}>
                    <View style={[styles.centerGrid, { marginTop: 20 }]}>
                        <Image style={{ alignItems: 'center' }} source={logo} />
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
                    <View style={{ margin: 40, marginTop: 20 }}>
                        <Form>
                            <Item style={{ marginTop: 5, marginLeft: 5, marginRight: 5 }} error={(this.state.user.name === '' && this.state.isRequiredName)}>
                                <Input
                                    //  type={'cpf'}
                                    placeholder={I18n.get('CPF')}
                                    autoCapitalize='none'
                                    keyboardType='numeric'
                                    autoFocus={true}
                                    //maxLength={11}
                                    value={this.state.user.cpf}
                                    placeholderTextColor={theme.SECONDARY_COLOR_FONT}
                                    style={{ marginBottom: 10, marginLeft: 5, fontSize: theme.TEXT_18, color: theme.PRIMARY_COLOR_FONT }}
                                    onChangeText={(text) => this.handleChange(text, valueName.CPF)}
                                />
                            </Item>
                            <Item style={{ marginTop: 5, marginLeft: 5, marginRight: 5 }}  >{/**error={this.state.message ? true : false} */}
                                <Input
                                    keyboardType='email-address'
                                    placeholderTextColor={theme.SECONDARY_COLOR_FONT}
                                    style={{ fontSize: theme.TEXT_18, color: theme.PRIMARY_COLOR_FONT }}
                                    textContentType='emailAddress'
                                    maxLength={60}
                                    placeholder={I18n.get('Email')}
                                    autoCapitalize='none'
                                    onChangeText={(email) => this.handleChange(email, valueName.EMAIL)} />
                            </Item>
                            <Item style={{ marginTop: 5, marginLeft: 5, marginRight: 5 }} >{/*error={(this.state.user.name === '' && this.state.isRequiredName)} */}
                                <Input
                                    placeholder={I18n.get('Name')}
                                    placeholderTextColor={theme.SECONDARY_COLOR_FONT}
                                    style={{ fontSize: theme.TEXT_18, color: theme.PRIMARY_COLOR_FONT }}
                                    onChangeText={(text) => this.handleChange(text, valueName.FIRST_NAME)} />

                            </Item>
                            <Item style={{ marginTop: 5, marginLeft: 5, marginRight: 5 }} error={(this.state.user.name === '' && this.state.isRequiredName)}>
                                <Input
                                    placeholder={I18n.get('Family Name')}
                                    placeholderTextColor={theme.SECONDARY_COLOR_FONT}
                                    style={{ fontSize: theme.TEXT_18, color: theme.PRIMARY_COLOR_FONT }}
                                    onChangeText={(text) => this.handleChange(text, valueName.FAMILY_NAME)} />
                            </Item>
                            <Item style={{ marginTop: 5, marginLeft: 5, marginRight: 5 }}>
                                <Button style={{ marginLeft: -12 }} transparent onPress={() => this.openModalDate(true)}>
                                    <Text style={{ fontSize: theme.TEXT_18, textTransform: 'capitalize', color: theme.SECONDARY_COLOR_FONT }} >
                                        {this.state.user.birthDate ? moment.parseZone(this.state.user.birthDate).local().format('DD/MM/YYYY') : I18n.get('Birth Date')}
                                    </Text>
                                </Button>

                            </Item>
                            <Item style={{ marginTop: 15, marginLeft: 5, marginRight: 5, borderBottomColor: theme.PRIMARY_COLOR }} >
                                <RadioForm
                                    radio_props={this.state.gender}
                                    initial={-1}
                                    labelStyle={{ fontSize: theme.TEXT_18, color: theme.SECONDARY_COLOR_FONT }}
                                    labelColor={theme.PRIMARY_COLOR_FONT}
                                    buttonColor={theme.SECONDARY_COLOR_FONT}
                                    selectedLabelColor={theme.PRIMARY_COLOR_FONT}
                                    selectedButtonColor={theme.SECONDARY_COLOR}
                                    onPress={(value) => { this.handleChangeRadio(value) }}
                                />
                            </Item>

                            {/* <Item style={{ marginTop: 5, marginLeft: 5, marginRight: 5 }}>

                                <Input
                                    type={'cel-phone'}
                                    options={{
                                        maskType: 'BRL',
                                        withDDD: true,
                                        dddMask: '(99) '
                                    }}
                                    placeholder={I18n.get('Phone')}
                                    value={this.state.user.phone}
                                    placeholderTextColor={theme.SECONDARY_COLOR_FONT}
                                    style={{ marginBottom: 10, marginLeft: 5, marginTop: 5, fontSize: theme.TEXT_18, color: theme.PRIMARY_COLOR_FONT }}
                                    textContentType='telephoneNumber'
                                    keyboardType='numeric'
                                    onChangeText={(text) => this.handleChange(text, valueName.PHONE)}
                                />
                            </Item> */}
                            <View style={{
                                marginTop: 20, flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Grid>
                                    <Col style={{ width: '13%' }}>
                                        <Switch
                                            value={this.state.user.isAccepted}
                                            thumbColor={Platform.OS === 'ios' ? theme.PRIMARY_COLOR : theme.SECONDARY_COLOR_FONT}
                                            // trackColor={theme.PRIMARY_COLOR_FONT}
                                            trackColor={{ true: theme.GREENLIGHT_COLOR, false: theme.PRIMARY_COLOR_FONT }}
                                            ios_backgroundColor={theme.SECONDARY_COLOR_FONT}
                                            onValueChange={(value) => this.handleChange(value, valueName.IS_ACCEPTED)}>
                                        </Switch>
                                    </Col>
                                    <Col>
                                        <Button transparent onPress={() => this.navTerms()}>
                                            <Text style={[{ marginLeft: 8, marginTop: -10, color: theme.PRIMARY_COLOR_FONT }]}>
                                                Aceito Termos e Condições
                                                </Text>
                                        </Button>
                                    </Col>
                                </Grid>
                            </View>
                            <Button block disabled={!this.isCanSaveForm()} style={this.isCanSaveForm() ? [styles.buttonDefault, { backgroundColor: theme.SECONDARY_COLOR, marginTop: 20 }] : [styles.buttonDisable, { marginTop: 20 }]}
                                onPress={() => this.handleSave()}>
                                <Text style={{ textTransform: 'capitalize', fontSize: theme.TEXT_18, color: theme.PRIMARY_COLOR }}>{I18n.get('Register')}</Text>
                            </Button>
                        </Form>

                    </View>
                </View>
            </KeyboardAwareScrollView>
        </Content>

    );
}

export default Register;