/**
 * @date 23/06/2020
 * @author Vanderson de Moura Vauruk
 * @email vauruk@gmail.com
 * @linkedin https://www.linkedin.com/in/vauruk/
 */


import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Image, View, ScrollView, TouchableOpacity } from 'react-native';
import { I18n } from '@aws-amplify/core';
import {
    Text,
    Spinner,
} from 'native-base'
//import logo from '../../../assets/gb.png'
import theme, { styles } from '../../core/Theme'
import moment from 'moment-timezone'
import { formatDataHour } from '../../../services/util/constants'
import { listPostAction } from '../../../services/actions/blog'
import ItemPost from './itemPost'

const Blog: () => React$Node = () => {
    const dispatch = useDispatch()

    const loading = useSelector((state) => state.blog.loading)
    const listPost = useSelector((state) => state.blog.listPost)

    useEffect(() => {
        dispatch(listPostAction())
    }, [])


    return (
        <>
            <View style={[{ height: '95%' }]}>
                <ScrollView>
                    {loading &&
                        <View style={{ alignContent: "center", marginTop: 30, alignItems: "center" }}>
                            <Spinner size={45} color={theme.SECONDARY_COLOR} />
                        </View>
                    }
                    {
                        !loading && listPost &&
                        Object.keys(listPost).reverse().map((key, index) => (
                            <ItemPost key={key} uid={key} item={listPost[key]} />
                            // listPost.map(item =>
                            //console.log(item)
                            //listPost[key].post
                            //  <Text> {listPost[key].post}</Text>
                            //  const temp = item.val();
                            // categories.push(temp);
                            //return false;
                        ))
                    }
                </ScrollView>
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
