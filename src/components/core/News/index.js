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
import logo from '../../../assets/gb.png'
import theme, { styles } from '../../core/Theme'
import moment from 'moment-timezone'
import { formatDataHour } from '../../../services/util/constants'
import { listNewsAction } from '../../../services/actions/news'

import ItemNews from './itemNews'

//import { Actions } from 'react-native-router-flux'
const News: () => React$Node = () => {
    const dispatch = useDispatch()

    const loading = useSelector((state) => state.news.loading)
    const listNews = useSelector((state) => state.news.listNews)

    console.log("list news ", listNews)
    useEffect(() => {
        dispatch(listNewsAction())
    }, [])


    return (
        <View style={[styles.container]}>
            <ScrollView>
                {loading &&
                    <View style={{ alignContent: "center", marginTop: 30, alignItems: "center" }}>
                        <Spinner size={45} color={theme.SECONDARY_COLOR} />
                    </View>
                }
                {!loading && listNews &&
                    listNews.map((item, index) =>
                        <ItemNews item={item} key={index} />
                    )
                }
            </ScrollView>
        </View>
    );

}

export default News;

const stylesLocal = StyleSheet.create({
    scrollView: {
        backgroundColor: theme.WHITE_COLOR,
        height: '100%',
        // backgroundColor: 'red'
    },
});
