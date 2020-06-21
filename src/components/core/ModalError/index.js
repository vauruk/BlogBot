/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @autor Vanderson de Moura Vauruk
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Text, Spinner,
  Button,
  Grid, Row, Col,
  Icon
} from 'native-base'
import { showErrorModalAction } from '../../../redux/actions/core'

import theme, { styles } from '../Theme'
import { I18n } from '@aws-amplify/core'

import {
  View,
  Modal,
  TouchableOpacity
} from 'react-native';
//import { I18n } from '@aws-amplify/core';

type Props = {};
class ModalError extends Component<Props> {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    console.log("Startou Error")
    setTimeout(() => {
      console.log("Forçar Stop Erro !!!!")
      this.props.showErrorModalAction(false)
    }, 9000);
  }

  render() {
    const { showErrorModal, messageErrorModal } = this.props
   // console.log("teste", showErrorModal, messageErrorModal, showErrorModal && messageErrorModal)
    if (showErrorModal) {
      console.log("Show Alert!!!!")
      return (
        <Modal
          overFullScreen
          transparent
          animationType="fade"
          visible={this.props.showErrorModal}
          onRequestClose={() => this.props.showErrorModalAction(false)}
        >
          <TouchableOpacity
            style={styles.bodyPopup}
            activeOpacity={1}
            onPress={() => this.props.showErrorModalAction(false)}
          >
            <View style={[styles.wrapperPopup, { height: 230, backgroundColor: theme.PRIMARY_COLOR }]}>
              <View
                style={{
                  flexDirection: 'row',
                  marginRight: 1
                  //padding: 20
                }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ paddingLeft: 10, paddingTop: 10, textAlign: 'center', fontSize: theme.TEXT_20, color: theme.PRIMARY_COLOR_FONT }} >
                    {I18n.get(messageErrorModal ? messageErrorModal.title : "Error")}
                  </Text>
                </View>
                {/* <View style={{
                  flex: 0.2,
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  padding: 5,
                  //backgroundColor: 'blue'
                }}>
                  <Icon type={'FontAwesome'} name="exclamation-triangle" size={30} style={{ color: theme.EMERGENCY_COLOR, margin: 10 }} />
                </View> */}
              </View>
              <View style={{
                margin: 10,
                justifyContent: 'center',
                alignItems: 'center',
                //backgroundColor: theme.PRIMARY_COLOR
              }}>
                <Text style={{
                  paddingTop: 20, textAlign: 'center', 
                  fontSize: theme.TEXT_16,
                  color: theme.PRIMARY_COLOR_FONT
                }} >
                  {messageErrorModal ? messageErrorModal.message : "Error"}
                </Text>
              </View>
              <Grid style={{ marginTop: 25 }}>
                <Col>
                  <Button block style={[styles.buttonConfirm]} onPress={() => this.props.showErrorModalAction(false)}>
                    <Text style={{ color: theme.PRIMARY_COLOR }}>{I18n.get('Ok')}</Text>
                  </Button>
                </Col>
              </Grid>
            </View>
          </TouchableOpacity>
        </Modal>
      );
    } else {
      return (<View></View>)
    }
  }
}

const mapStateToProps = (state) => ({
  showErrorModal: state.core.showErrorModal,
  messageErrorModal: state.core.messageErrorModal,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  showErrorModalAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ModalError);
