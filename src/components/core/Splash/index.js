/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text, View, Image, ImageBackground
} from 'react-native';
import {
  Spinner, Container
} from 'native-base'

import theme, { styles } from '../Theme'

import { Router, Scene, Actions, Stack } from 'react-native-router-flux';

//import vander from '../../../assets/vander.jpeg'
import boticario from '../../../assets/grupo.png'
import About from '../About'

type Props = {};
export default class Splash extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
  }

  componentDidMount = async () => {
    const data = await this.performTimeConsumingTask();
    if (data !== null) {
      this.setState({ isLoading: false });
    }
  }

  performTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        3000
      )
    );
  }

  render() {
    if (!this.state.isLoading) {
      Actions.replace('login')
      return <View style={styles.container}></View>;
    } else {
      return (
        <Container
          style={{ width: '100%', height: '100%', backgroundColor: theme.WHITE_COLOR }}
        >
          <View style={stylesLocal.container}>
            <Image style={{
              alignItems: 'center',
              width: '80%',
              // Without height undefined it won't work
              height: undefined,
              // figure out your image aspect ratio
              aspectRatio: 150 / 100,
            }} source={boticario} />
            <Spinner style={{ paddingTop: 20 }} color={theme.SECONDARY_COLOR} />
          </View>
        </Container>
      );
    }
  }
}

const stylesLocal = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //  backgroundColor: '#ffffff',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
