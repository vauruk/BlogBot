/**
 * @date 23/06/2020
 * @author Vanderson de Moura Vauruk
 * @email vauruk@gmail.com
 * @linkedin https://www.linkedin.com/in/vauruk/
 */



import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, View, Alert } from 'react-native'
import {
    Icon,
    Text,
    Button
} from 'native-base'
//import logo from '../../../assets/gb.png'
import theme, { styles } from '../../core/Theme'
import { I18n } from '@aws-amplify/core';
import { deletePostAction, selectPostAction } from '../../../services/actions/blog'
import { formatDataHour } from '../../../services/util/constants'

import moment from 'moment-timezone'

const ItemPost: () => React$Node = (props) => {
    const dispatch = useDispatch()

    const userData = useSelector(state => state.auth.userData)
    const item = props.item

    handleSelectPost = (objPost, uid) => {
        console.log("item post", objPost, uid)
        dispatch(selectPostAction(objPost, uid))
    }

    handleDeletePost = (uid) => {
        Alert.alert(
            I18n.get('Delete'),
            `${I18n.get('Deseja excluir:')} ${uid}?`,
            [
                { text: I18n.get('No') },
                { text: I18n.get('Yes'), onPress: () => dispatch(deletePostAction(uid)) },
            ],
        );
    }

    console.log("item", item)

    return (
        <>
            <View style={{
                margin: 5, padding: 5,
                borderWidth: 1,
                borderColor: theme.LIGHT_GRAY_COLOR,
                borderRadius: 10,
                backgroundColor: item.userId === userData.uid ? theme.LIGHT_DIVIDER : theme.WHITE_COLOR
            }}>
                <View style={[{
                    //height: 60,
                    flexDirection: 'row',
                    alignContent: "center",
                    alignItems: "center",
                }]}>
                    <View style={{ flex: 0.01 }}  >
                        {/* <Image source={logo} style={{
                            marginLeft: 15,
                            width: 30,
                            height: 60
                        }} /> */}
                    </View>
                    <View style={{ flex: 0.99 }} >
                        <View>
                            <Text style={{ fontSize: theme.TEXT_12, color: theme.SECONDARY_COLOR }}>{item.userName}</Text>
                        </View>
                        <View style={{ marginTop: 5 }}>

                            <View style={[{
                                //height: 60,
                                flexDirection: 'row',
                                alignContent: "center",
                                alignItems: "center",
                            }]}>
                                <View style={{ flex: 0.5 }}  >
                                    <Text style={{ fontSize: theme.TEXT_10, color: theme.PRIMARY_COLOR }}>
                                        {moment(item.create_at).fromNow()}
                                    </Text>
                                </View>
                                <View style={{ flex: 0.5, alignContent: "flex-end", alignItems: "flex-end" }} >
                                    <Text style={{ fontSize: theme.TEXT_10, color: theme.PRIMARY_COLOR }}>
                                        {moment(item.create_at).format(formatDataHour)}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={{ margin: 5, textAlign: 'justify' }}> {item.post}</Text>
                </View>
                <View>
                    <View style={[{
                        flexDirection: 'row',
                        alignContent: "center",
                        alignItems: "center",
                    }]}>
                        <View style={{ flex: 0.8 }} >
                        </View>
                        <View style={{ flex: 0.1, alignItems: "flex-end", alignContent: "flex-end" }} >
                            {
                                item.userId === userData.uid &&
                                <Button block style={{ marginRight: 5 }} iconRight transparent onPress={() => handleSelectPost(item, item.uid)}>
                                    <Icon type={'MaterialCommunityIcons'} name="pencil" size={15} style={{ marginLeft: 5, marginRight: 6, color: theme.SECONDARY_COLOR }} />
                                </Button>
                            }
                        </View>
                        <View style={{ flex: 0.1, alignItems: "flex-end", alignContent: "flex-end" }} >
                            {
                                item.userId === userData.uid &&
                                <Button block style={{ marginRight: 5 }} iconRight transparent onPress={() => handleDeletePost(item.uid)}>
                                    <Icon type={'MaterialCommunityIcons'} name="delete" size={15} style={{ marginLeft: 5, marginRight: 6, color: theme.SECONDARY_COLOR }} />
                                </Button>
                            }
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
}

export default ItemPost;

const stylesLocal = StyleSheet.create({
    scrollView: {
        backgroundColor: theme.WHITE_COLOR,
        height: '100%',
        // backgroundColor: 'red'
    },
});
