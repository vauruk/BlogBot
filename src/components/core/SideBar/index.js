/**
 * @date 23/06/2020
 * @author Vanderson de Moura Vauruk
 * @email vauruk@gmail.com
 * @linkedin https://www.linkedin.com/in/vauruk/
 */


import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { I18n } from '@aws-amplify/core';
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

const SideBar: () => React$Node = (props) => {
    const currentUser = useSelector(state => state.auth.currentUser)
    const userData = useSelector(state => state.auth.userData)
    const [showLogout, setShowLogout] = useState(false)
    const [navDisable, setNavDisable] = useState(false)
    const [isShowAlertDev, setIsShowAlertDev] = useState(false)

    const dispatch = useDispatch()
    useEffect(() => {
        // dispatch(getUserDataAction())
    }, [])

    console.log("object", userData)
    handleLogout = () => {
        dispatch(logout())
        showModalLogout()
        persistor.purge()
        Actions.login()
    }

    showModalLogout = () => {
        setShowLogout(!showLogout);
    }

    navFluxDelay = (navRouter) => {
        setNavDisable(true)
        navRouter()
        setTimeout(() => {
            setNavDisable(false)
        }, 2000);
    }

    handleShowAlertDev = (isShow) => {
        setIsShowAlertDev(isShow)
    }

    return (
        <>
            <View style={[stylesLocal.container]}>
                {/* <AlertDevComp
                    isShowAlert={this.state.isShowAlertDev}
                    message={'Esta funcionalidade ainda não esta liberada na sua região'}
                    handleShowAlertDev={this.handleShowAlertDev}
                /> */}
                <Modal
                    overFullScreen
                    transparent
                    animationType="fade"
                    visible={showLogout}
                    onRequestClose={() => this.showModalLogout()}>
                    <TouchableOpacity
                        style={styles.bodyPopup}
                        activeOpacity={1}
                        onPress={() => this.showModalLogout()}
                    >
                        <View style={[styles.wrapperPopup, { height: 160 }]}>
                            <Text style={{ paddingTop: 20, textAlign: 'center', fontSize: 19, color: theme.PRIMARY_COLOR }} >
                                {I18n.get('Really Want to Leave')}?
                                </Text>
                            <Grid style={{ marginTop: 40 }}>
                                <Col>
                                    <Button block style={[styles.buttonCancel]} onPress={() => showModalLogout()}>
                                        <Text style={{ color: theme.WHITE_COLOR }}>{I18n.get('No')}</Text>
                                    </Button>
                                </Col>
                                <Col>
                                    <Button block style={[styles.buttonConfirm]} onPress={() => handleLogout()}>
                                        <Text style={{ color: theme.WHITE_COLOR }}>{I18n.get('Yes')}</Text>
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
                                <Thumbnail source={{ uri: loadGravatar(userData ? userData.email : null) }} large />
                            </Row>
                            <Row style={{ margin: 3 }}>
                                <Button iconLeft transparent onPress={() => console.log('alterar perfil')} style={{ marginTop: 8 }}>
                                    <Text style={{ color: theme.PRIMARY_COLOR_FONT, fontSize: theme.TEXT_14 }}>{userData ? userData.displayName : ''} </Text>
                                </Button>
                            </Row>
                            {/* <Row style={{ margin: 3 }}>
                                <Text style={{ color: theme.PRIMARY_COLOR_FONT, fontSize: theme.TEXT_14 }}>{userData ? userData.email : ''} </Text>
                            </Row> */}
                        </Grid>
                    </View>
                    <View style={{ borderBottomColor: theme.PRIMARY_COLOR, borderBottomWidth: 2 }}>
                    </View>
                    <List>
                        <ListItem disabled={navDisable} style={stylesLocal.item}
                            onPress={() => navFluxDelay(() => Actions.home())} >
                            <Left>
                                <Button iconLeft transparent>
                                    <Icon type={'MaterialCommunityIcons'} name="home" size={20} style={{ marginLeft: 5, marginRight: 6, color: theme.SECONDARY_COLOR }} />
                                </Button>
                                <Text style={{ marginLeft: 5, color: theme.SECONDARY_COLOR, fontSize: theme.TEXT_14 }}>{I18n.get('Home')}</Text>
                            </Left>
                        </ListItem>
                        <ListItem disabled={navDisable} style={stylesLocal.item}
                            onPress={() => navFluxDelay(() => Actions.news())} >
                            <Left>
                                <Button iconLeft transparent>
                                    <Icon type={'MaterialCommunityIcons'} name="newspaper" size={20} style={{ marginLeft: 5, marginRight: 6, color: theme.SECONDARY_COLOR }} />
                                </Button>
                                <Text style={{ marginLeft: 5, color: theme.SECONDARY_COLOR, fontSize: theme.TEXT_14 }}>{I18n.get('News')}</Text>
                            </Left>
                        </ListItem>
                        <ListItem disabled={navDisable} style={stylesLocal.item}
                            onPress={() => navFluxDelay(() => Actions.about())} >
                            <Left>
                                <Button iconLeft transparent>
                                    <Icon type={'MaterialCommunityIcons'} name="information" size={20} style={{ marginLeft: 5, marginRight: 6, color: theme.SECONDARY_COLOR }} />
                                </Button>
                                <Text style={{ marginLeft: 5, color: theme.SECONDARY_COLOR, fontSize: theme.TEXT_14 }}>{I18n.get('About')}</Text>
                            </Left>
                        </ListItem>
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
                            <ListItem style={stylesLocal.item} onPress={() => showModalLogout()}>
                                <Left>
                                <Button iconLeft transparent>
                                    <Icon type={'MaterialCommunityIcons'} name="logout-variant" style={{ marginLeft: 5, fontSize: 25, marginRight: 6, color: theme.SECONDARY_COLOR }} />
                                </Button>
                                    <Text style={{ marginLeft: 5, color: theme.SECONDARY_COLOR, fontSize: theme.TEXT_14 }}>{I18n.get('Sign Out')}</Text>
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
            </View>
        </>
    );
}

// const mapStateToProps = (state) => ({
//     currentUser: state.auth.currentUser,
//     loading: state.core.loading,
//     userData: state.auth.userData
//     // profile: state.profile.profile

// });

// const mapDispatchToProps = dispatch => bindActionCreators({
//     logout,
//     // getProfile,
//     showModalAuthentication
// }, dispatch)

// export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
export default SideBar;

const stylesLocal = StyleSheet.create({
    container: {
        flex: 1,
        //   backgroundColor: 'blue',
        backgroundColor: theme.WHITE_COLOR,
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