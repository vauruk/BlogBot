/**
 * @date 23/06/2020
 * @author Vanderson de Moura Vauruk
 * @email vauruk@gmail.com
 * @linkedin https://www.linkedin.com/in/vauruk/
 */


import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View, Alert } from 'react-native';
import { I18n } from '@aws-amplify/core';
import {
    Input,
    Icon,
    Text,
    Button
} from 'native-base'
//import logo from '../../../assets/gb.png'
import theme, { styles } from '../../core/Theme'
import { savePostAction, setPostTextAction, editPostAction } from '../../../services/actions/blog'

const Blog: () => React$Node = () => {
    const dispatch = useDispatch()
    const valueSize = 280
    const objPost = useSelector((state) => state.blog.post);
    const uid = useSelector((state) => state.blog.uid);

    const textPost = useSelector((state) => state.blog.textPost);

    const [sizeText, setSizeText] = useState(valueSize)
    const [saveDisable, setSaveDisable] = useState(false)

    handleSendPost = () => {
        console.log("send", textPost)
        if (textPost && sizeText <= valueSize) {
            if (uid) {
                dispatch(editPostAction(textPost, uid))
            } else {
                dispatch(savePostAction(textPost))
            }
            setSizeText(valueSize)
            setSaveDisable(false)
        } else if (!textPost) {
            Alert.alert(
                I18n.get('Error'),
                I18n.get('É necessário digitar uma mensagem para postar'),
                [
                    { text: 'OK' },
                ],
            );
        } else if (sizeText < valueSize) {
            Alert.alert(
                I18n.get('Error'),
                I18n.get('Excedeu a quantidade de caracteres disponivel'),
                [
                    { text: 'OK' },
                ],
            );
        }
    }

    handleChangeValue = (value) => {
        if (value) {
            setSizeText(valueSize - value.length)
        } else {
            setSizeText(valueSize)
        }

        if (sizeText < valueSize && sizeText > 0) {
            setSaveDisable(false)
        } else {
            setSaveDisable(true)
        }
        // setText(value)
        dispatch(setPostTextAction(value))
    }

    return (
        <>
            <View>
                <View style={[{
                    height: 40,
                    flexDirection: 'row',
                    alignContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                    backgroundColor: '#f1f1f1',
                    borderColor: theme.LIGHT_GRAY_COLOR,
                    borderRadius: 10,
                    margin: 5
                }]}>
                    <View style={{ flex: 0.8 }}  >
                        <Input
                            autoFocus={true}
                            placeholder={I18n.get('Post')}
                            keyboardType='email-address'
                            autoCapitalize='none'
                            maxLength={280}
                            placeholderTextColor={theme.PRIMARY_COLOR_FONT}
                            style={{ marginLeft: 5, fontSize: theme.TEXT_14, color: theme.PRIMARY_COLOR_FONT }}
                            value={textPost}
                            onChangeText={text => handleChangeValue(text)}
                            onSubmitEditing={() => handleSendPost()}
                        />
                    </View>
                    <View style={{ flex: 0.2, alignItems: "flex-end" }} >
                        <Button disabled={saveDisable} style={{ marginRight: 5 }} iconRight transparent onPress={() => handleSendPost()}>
                            <Icon type={'MaterialCommunityIcons'} name="send" size={20} style={{ marginLeft: 5, marginRight: 6, color: saveDisable ? theme.PRIMARY_COLOR : theme.SECONDARY_COLOR }} />
                        </Button>
                    </View>
                </View>
                <View style={{ margin: 5, alignContent: "flex-end", alignItems: "flex-end" }}>
                    <Text style={{ color: theme.SECONDARY_COLOR }}>{sizeText}</Text>
                </View>
            </View>
        </>
    );

}

export default Blog;

const stylesLocal = StyleSheet.create({
    scrollView: {
        backgroundColor: theme.WHITE_COLOR,
        height: '100%',
        // backgroundColor: 'red'
    },
});
