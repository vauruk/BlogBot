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

import vander from '../../../assets/vander.jpeg'

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
            <Image source={vander} />
            <Spinner style={{ paddingTop: 20 }} color={theme.PRIMARY_COLOR} />
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
