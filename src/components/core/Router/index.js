/* eslint-disable no-console */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Image, Animated, Easing, StyleSheet, Platform, Text, TextInput } from 'react-native';
import { Scene, Router, Actions, Drawer, Tabs, Stack, Lightbox } from 'react-native-router-flux';
import {
  Button,
  Icon
} from 'native-base'
import { I18n } from '@aws-amplify/core';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

import SideBar from '../SideBar';

import Home from '../Home'
import Login from '../Login'
//import Register from '../Register'
import Splash from '../Splash'
//import About from '../About'
//import Help from '../Help'
import theme, { styles } from '../Theme'

/* Ícone menu Drawer */
const myIcon = <Icon
  type={'MaterialCommunityIcons'}
  name="menu"
  size={RFValue(35)}
  color={theme.WHITE_COLOR}
  style={{
    marginTop: 5,
  }} />


/* Ícone voltar da navegação */
const arrowLeft = <IconMaterialCommunity name="chevron-left" size={RFValue(35)} color={theme.WHITE_COLOR} />;
const iconMenu = (<Icon type={'MaterialCommunityIcons'} name="menu" style={{ fontSize: 30, color: theme.WHITE_COLOR }} />);

type Props = {};
class MainRouter extends Component<Props>  {
  constructor(props) {
    super(props);
  }

  navBackProfile = () => {
    Actions.pop()
  }

  // selectEditReminder = () => {
  //   if (this.props.selectTypeSchedule === MEDICINE) {
  //   //  Actions.editReminderMedicine()
  //   } else if (this.props.selectTypeSchedule === APPOINTMENT) {
  //     //console.log("selectEditReminder", APPOINTMENT)
  //     Actions.editReminderMedicine()
  //   }
  // }


  render() {
    console.log("isAuthenticated", this.props.isAuthenticated)
    return (
      <Router>
        <Scene key="root"
          hideNavBar
          hideTabBar
          panHandlers={null}>
          {/* Cenas do fluxo autenticado. */}
          <Drawer
            hideNavBar
            key="drawer"
            onExit={() => {
              console.log('Drawer closed');
            }}
            onEnter={() => {
              console.log('Drawer opened');
            }}
            drawerIcon={iconMenu}
            drawerWidth={300}
            contentComponent={SideBar}
            drawerPosition="left"
            navTransparent
          >
            {/* Você deixa as cenas dentro de uma mesma stack para orientar a navegação */}
            <Stack
              key="main"
              panHandlers={null}
              {...sceneConfig}
              initial={this.props.isAuthenticated} // Define se esta cena é a inicial ou não true / false
            //initial={true} // Debug: Define como true manualmente para ir direto para esta cena.
            >
              {/* demais cenas autenticadas devem ser inseridas aqui */}
              <Scene key="home"
                //initial
                component={Home}
                renderTitle={<Text style={styles.headerTitle}>{I18n.get('Home')}</Text>}
                navigationBarStyle={stylesLocal.navBar}
                hideNavBar={false}
                onRight={() => console.log('Pressed')}
              // renderRightButton={<HeaderNotification />}
              />
              {/* <Scene key="about"
                component={About}
                onLeft={() => Actions.pop()}
                navigationBarStyle={stylesLocal.navBar}
                renderTitle={<Text style={styles.headerTitle}>{I18n.get('About')}</Text>}
                leftTitle={arrowLeft}
              /> */}
              {/* <Scene key="support"
                component={Support}
                onLeft={() => Actions.pop()}
                renderTitle={<Text style={styles.headerTitle}>{I18n.get('Support')}</Text>}
                navigationBarStyle={stylesLocal.navBar}
                leftTitle={arrowLeft}
              />
              <Scene key="help"
                component={Help}
                onLeft={() => Actions.pop()}
                renderTitle={<Text style={styles.headerTitle}>{I18n.get('Help')}</Text>}
                navigationBarStyle={stylesLocal.navBar}
                leftTitle={arrowLeft}
              /> */}

            </Stack>
            {/* this.selectEditReminder() */}
          </Drawer>

          {/* Fluxo não autenticado. Aqui vão as cenas que podem ser acessadas sem autenticação */}
          <Scene
            initial={!this.props.isAuthenticated} // Se não estiver autenticado, torna esta cena a inicial.
            key="auth"
            panHandlers={null}
            {...sceneConfig}
          >
            <Scene
              key="splash"
              //initial={true}
              component={Splash}
              hideNavBar={false}
              direction="vertical"
              navTransparent
            />
            <Scene
              key="login"
              component={Login}
              hideNavBar={false}
              direction="vertical"
              navTransparent
            />
            {/* <Scene
              key="register"
              component={Register}
              titleStyle={styles.headerTitle}
              onLeft={() => Actions.pop()}
              // title={I18n.get('Register')}
              renderTitle={<Text style={styles.headerTitle}> {I18n.get('Register')}</Text>}
              leftTitle={arrowLeft}
              navigationBarStyle={stylesLocal.navBar}
            /> */}
            {/* <Scene
              key="termsConditions"
              component={TermsConditions}
              renderTitle={<Text style={styles.headerTitle}>{I18n.get('Termos')}</Text>}
              onLeft={() => Actions.pop()}
              leftTitle={arrowLeft}
              navigationBarStyle={stylesLocal.navBar}
            /> */}

          </Scene>
        </Scene>
      </Router>
    );
  }
}

function areEqual() {
  const len = arguments.length;
  for (let i = 1; i < len; i++) {
    console.log(`Analizando ${arguments[i]}`);
    if (arguments[i] === null || arguments[i] !== arguments[i - 1])
      return false;
  }
  return true;
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
  }, dispatch);

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainRouter);

const stylesLocal = StyleSheet.create({
  cardStyle: {
    //backgroundColor: 'black' //Define the color of scene background
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: theme.TEXT_12,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  navBar: {
    backgroundColor: theme.PRIMARY_COLOR,
    //  height: 80,
    borderBottomWidth: 0,
  },
  headerLogoImage: {
    resizeMode: 'contain',
    height: RFValue(28),
  },
  tabBarStyle: {
    height: RFValue(60),
    backgroundColor: '#3A3A3A',
    borderColor: 'transparent',
  },

});

const sceneConfig = {
  headerTitle: {
    color: '#00FF00',
    textAlign: 'left',
    alignSelf: 'flex-start',
    padding: 0,
  },
  tabBarStyle: {
    height: 65,
    backgroundColor: '#FFFFFF',
    borderColor: 'transparent',
  },
  tabBarIcon: {
    resizeMode: 'contain',
    height: 22,
  },
  dotNotification: {
    position: 'absolute',
    top: -10,
    alignSelf: 'center',
    resizeMode: 'contain',
    height: 8,
  },
};




{/* <Router hideNavBar="true">
  <Stack key="root">
    <Scene key="home" component={DrawerNav} title="Home" />
    <Scene key="login" component={Login} hideNavBar={true} />
    <Scene key="teste" component={Home2} hideNavBar={true} />
    <Scene key="drawer" component={DrawerNav} drawer={true} />
    <Scene key="splash" component={Splash} hideNavBar={true} initial={true} />
  </Stack>
</Router> */}


const Login2 = () => (
  <View>

    <Text style={styles.welcome}>
      Register
           </Text>
    <Button
      title="Press me"
      color="#f194ff"
      onPress={() => Alert.alert('Button with adjusted color pressed')}
    />
    <Button
      title="Home"
      color="#f194ff"
      onPress={() => Actions.home()}
    />
    <Button
      title="Teste"
      color="#f194ff"
      onPress={() => Actions.teste()}
    />
  </View>
)
const SideMenu = () => (
  <View style={styles.container}>
    <Text>menu items go here</Text>
  </View>
)