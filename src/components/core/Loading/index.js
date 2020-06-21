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
import {
    Text, Spinner
} from 'native-base'
import { loadingAction } from '../../../redux/actions/loading'

import theme, { styles } from '../Theme'

import {
    View,
    Modal,
} from 'react-native';
//import { I18n } from '@aws-amplify/core';

type Props = {};
class Loading extends Component<Props> {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        console.log("Startou Loading")
        setTimeout(() => {
            console.log("Forçar Stop Loaging !!!!")
            this.props.loadingAction(false)
        }, 9000);
    }

    render() {
        console.log("Abriu Loading!")
        return (
            <View>
                <Modal
                    animationType="fade"
                    overFullScreen
                    transparent
                    visible={this.props.isLoading}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        //backgroundColor: theme.PRIMARY_COLOR
                        backgroundColor: 'rgba(0,0,0,0.7)'
                    }}>
                        <Spinner color={theme.WHITE_COLOR} large />
                        <Text style={{ color: theme.WHITE_COLOR }}>Carregando ...</Text>
                    </View>
                </Modal>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.loading.isLoading,
});
// const mapDispatchToProps = dispatch =>
//     bindActionCreators(authActions, dispatch);
const mapDispatchToProps = dispatch => bindActionCreators({
    loadingAction,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Loading);

