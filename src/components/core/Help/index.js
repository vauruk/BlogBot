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
import { StyleSheet, Image, View, ScrollView, TouchableOpacity } from 'react-native';
import { I18n } from '@aws-amplify/core';
import {
    Text,
    // List,
    ListItem,
    Left,
} from 'native-base'
import { WebView } from 'react-native-webview';
// import IconHy from '../../../config/icon-font.js';
import theme, { styles } from '../../core/Theme'
import { Actions } from 'react-native-router-flux'

type Props = {};
class Help extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    UNSAFE_componentWillMount = () => {

    }

    navigationMedicine = () => {

        console.log("navigationMedicine")
    }


    onLoadProgress = (progress) => {
        if (progress >= 1) {
            this.setState({ loading: false })
        }
    }

    render() {
        return (
            <View style={[styles.container, stylesLocal.container]}>
                <WebView
                    source={{ uri: 'https://healthyou.com.br/tutoriais.html' }}
                    //style={{ marginTop: Platform.OS === 'ios' ? 35 : 0 }}
                    onLoadProgress={e => console.log(e.nativeEvent.progress)}
                    startInLoadingState={this.state.loading}

                />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    // currentUser: state.auth.currentUser,
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Help);

const stylesLocal = StyleSheet.create({
    container: {
        backgroundColor: theme.WHITE_COLOR,
        flexDirection: 'row',
        //backgroundColor: theme.LIST_DARK_BACKGROUND,
    },
    listItem: {
        marginLeft: 0,
        paddingTop: 15,
        paddingBottom: 15,
    },
    text: {
        color: theme.PRIMARY_COLOR_FONT,
        fontSize: theme.TEXT_20,
        marginLeft: 20,
    },
    textItem: {
        color: theme.PRIMARY_COLOR_FONT,
        fontSize: theme.TEXT_18,
        marginTop: 5,
        marginBottom: 5,
    },
});
