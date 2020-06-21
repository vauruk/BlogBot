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
//import { I18n } from '@aws-amplify/core';
import {
    Header,
    List,
    ListItem, Text,
    Left, Right, Icon,
    Thumbnail,
    Button, Body, Title,
} from 'native-base';

import {
    StyleSheet,
    View,
    ScrollView,
    Modal,
    TouchableOpacity,
} from 'react-native';
import { logout, showModalAuthentication } from '../../../services/actions/auth'
import { persistor } from '../../../services/store';

import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import { loadGravatar } from '../../core/function/gravatar';
//import { getProfile } from '../../../redux/actions/profile'
//import fundo from '../../../assets/img_fundo.png'
import theme, { styles } from '../Theme'

type Props = {};
class SideBar extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            showLogout: false,
            navDisable: false,
            isShowAlertDev: false
            //  showAuth: false
        }
    }

    componentDidMount = () => {
        const { currentUser } = this.props
        if (currentUser) {
            // const userId = currentUser.attributes.sub
            // this.props.getProfile(userId)
        }
    }

    handleLogout = () => {
        this.props.logout()
        this.showModalLogout()
        persistor.purge()
        Actions.login()
    }

    showModalLogout = () => {
        this.setState({ showLogout: !this.state.showLogout });
    }

    // navWithDev = (navRouter) => {
    //     if (__DEV__) {
    //         this.navFluxDelay(navRouter)
    //     } else {
    //         _alertDev()
    //     }
    // }

    navFluxDelay = (navRouter) => {
        this.setState({ navDisable: true })
        navRouter()
        setTimeout(() => {
            this.setState({ navDisable: false })
        }, 2000);
    }

    // onPress={() => {
    //         Actions.currentScene !== 'relatorioHorasScreen'
    //           ? Actions.relatorioHorasScreen()
    //           : {};
    //       }}

    handleShowAlertDev = (isShow) => {
        this.setState({ isShowAlertDev: isShow })
    }

    // navigationPagueMenos = async () => {
    //     Actions.webViewDefault({ title: "Ajuda", url: "https://w.tnh.health/c/5102" })

    //     //await this.props.callHelpEmergencyContactAction()
    // }


    render() {
        const { currentUser } = this.props
        return (
            <View style={[stylesLocal.container, { backgroundColor: theme.PRIMARY_COLOR }]}>
                {/* <AlertDevComp
                    isShowAlert={this.state.isShowAlertDev}
                    message={'Esta funcionalidade ainda não esta liberada na sua região'}
                    handleShowAlertDev={this.handleShowAlertDev}
                /> */}
                <Modal
                    overFullScreen
                    transparent
                    animationType="fade"
                    visible={this.state.showLogout}
                    onRequestClose={() => this.showModalLogout()}>
                    <TouchableOpacity
                        style={styles.bodyPopup}
                        activeOpacity={1}
                        onPress={() => this.showModalLogout()}
                    >
                        <View style={[styles.wrapperPopup, { height: 160 }]}>
                            <Text style={{ paddingTop: 20, textAlign: 'center', fontSize: 19, color: "#3F51B5" }} >
                                {I18n.get('Really Want to Leave')}?
                                </Text>
                            <Grid style={{ marginTop: 40 }}>
                                <Col>
                                    <Button block style={[styles.buttonCancel]} onPress={() => this.showModalLogout()}>
                                        <Text style={{ color: theme.PRIMARY_COLOR }}>{I18n.get('No')}</Text>
                                    </Button>
                                </Col>
                                <Col>
                                    <Button block style={[styles.buttonConfirm]} onPress={() => this.handleLogout()}>
                                        <Text style={{ color: theme.PRIMARY_COLOR }}>{I18n.get('Yes')}</Text>
                                    </Button>
                                </Col>
                            </Grid>
                        </View>
                    </TouchableOpacity>
                </Modal>
                <ScrollView>
                    <View>
                        <Grid style={stylesLocal.centerGrid}>
                            <Row style={{ margin: 10, marginTop: 50 }}>
                                {/* {this.props.profile && this.props.profile.image ?
                                        <S3Thumbnail path={this.props.profile.image} large={true} />
                                        :
                                        <Thumbnail source={{ uri: loadGravatar(this.props.currentUser ? this.props.currentUser.username : null) }} large />
                                    } */}
                                <Thumbnail source={{ uri: loadGravatar(this.props.userData ? this.props.userData.Email : null) }} large />
                            </Row>
                            <Row style={{ margin: 10 }}>
                                <Button iconLeft transparent onPress={() => Actions.profile()} style={{ marginTop: 25 }}>
                                    <Text style={{ color: theme.PRIMARY_COLOR_FONT, fontSize: theme.TEXT_14 }}>{this.props.userData ? this.props.userData.FirstName : ''} {this.props.userData ? this.props.userData.LastName : ''}</Text>
                                </Button>
                            </Row>
                        </Grid>
                    </View>
                    <View style={{ borderBottomColor: theme.SECONDARY_COLOR_FONT, borderBottomWidth: 2 }}>

                    </View>
                    <List>
                        <ListItem disabled={this.state.navDisable} style={stylesLocal.item}
                            onPress={() => this.navFluxDelay(() => Actions.home())} >
                            <Left>
                                <Button iconLeft transparent>
                                    {/* <IconHy style={{ marginLeft: 15, width: 25, color: theme.PRIMARY_COLOR_FONT }}
                                        size={23}
                                        name={'ativo-219'} /> */}
                                </Button>
                                <Text style={{ marginLeft: 10, color: theme.PRIMARY_COLOR_FONT, fontSize: theme.TEXT_16 }}>{I18n.get('Home')}</Text>
                            </Left>
                        </ListItem>
                        {/* <ListItem disabled={this.state.navDisable} style={stylesLocal.item}
                            onPress={() => this.navFluxDelay(() => Actions.about())}>
                            <Left>
                                <Button iconLeft transparent >
                                    <IconHy style={{ marginLeft: 15, width: 25, color: theme.PRIMARY_COLOR_FONT }}
                                        size={20}
                                        name={'family'} />
                                </Button>
                                <Text style={{ marginLeft: 10, color: theme.PRIMARY_COLOR_FONT, fontSize: theme.TEXT_16 }}>
                                    {I18n.get('About')}
                                </Text>
                            </Left>
                        </ListItem> */}
                        {/* <ListItem disabled={this.state.navDisable} style={stylesLocal.item} onPress={() => this.navFluxDelay(() => Actions.support())}>
                            <Left>
                                <Button iconLeft transparent >
                                    <IconHy style={{ marginLeft: 15, width: 25, color: theme.PRIMARY_COLOR_FONT }}
                                        size={20}
                                        name={'ativo-220'} />
                                </Button>
                                <Text style={{ marginLeft: 10, color: theme.PRIMARY_COLOR_FONT, fontSize: theme.TEXT_16 }}>
                                    {I18n.get('Support')}
                                </Text>
                            </Left>
                        </ListItem> */}
                        {/* <ListItem disabled={this.state.navDisable} style={stylesLocal.item}
                            onPress={() => this.navFluxDelay(() => Actions.help())}>
                            <Left>
                                <Button iconLeft transparent >
                                    <Icon type={'FontAwesome'} name='question-circle' size={20} style={{ marginLeft: 15, width: 25, color: theme.PRIMARY_COLOR_FONT }} />
                                </Button>
                                <Text style={{ marginLeft: 10, color: theme.PRIMARY_COLOR_FONT, fontSize: theme.TEXT_16 }}>
                                    {I18n.get('Help')}
                                </Text>
                            </Left>
                        </ListItem> */}
                        {
                            currentUser &&
                            <ListItem style={stylesLocal.item} onPress={() => this.showModalLogout()}>
                                <Left>
                                    <IconHy style={{ marginLeft: 15, width: 25, color: theme.PRIMARY_COLOR_FONT }} size={23} name={'ativo-218'} />
                                    <Text style={{ marginLeft: 10, color: theme.PRIMARY_COLOR_FONT, fontSize: theme.TEXT_16 }}>{I18n.get('Sign Out')}</Text>
                                </Left>
                            </ListItem>
                        }
                        {
                            !currentUser &&
                            <ListItem style={stylesLocal.item}>
                                <Left>
                                    <Button iconLeft transparent onPress={() => Actions.login()}>
                                        <Icon name='log-in' style={{ color: theme.PRIMARY_COLOR_FONT }} />
                                    </Button>
                                    <Text style={{ marginLeft: 10, color: theme.PRIMARY_COLOR_FONT, fontSize: theme.TEXT_16 }}>{I18n.get('Login')}</Text>
                                </Left>
                            </ListItem>
                        }
                    </List>
                </ScrollView>
            </View >
        );
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.auth.currentUser,
    loading: state.core.loading,
    userData: state.auth.userData
    // profile: state.profile.profile

});

const mapDispatchToProps = dispatch => bindActionCreators({
    logout,
    // getProfile,
    showModalAuthentication
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);

const stylesLocal = StyleSheet.create({
    container: {
        flex: 1,
        //   backgroundColor: 'blue',
        backgroundColor: 'white',
    },
    centerGrid: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    item: {
        height: 50,
    },
    controlText: {
        color: 'white',
    },
    imageProfile: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 90,
        margin: 20,
    },
    button: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
    }
})