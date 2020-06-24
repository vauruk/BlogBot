/**
 * @date 23/06/2020
 * @author Vanderson de Moura Vauruk
 * @email vauruk@gmail.com
 * @linkedin https://www.linkedin.com/in/vauruk/
 */

import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, ScrollView, TouchableOpacity } from 'react-native';
import {
    Text,
    Spinner,
} from 'native-base'
import logo from '../../../assets/gb.png'
import theme, { styles } from '../../core/Theme'
import moment from 'moment-timezone'
import { formatDataHour } from '../../../services/util/constants'

const ItemNews: () => React$Node = (props) => {

    const item = props.item

    return (
        <>
            <View style={{ margin: 10 }}>
                <View style={[{
                    flexDirection: 'row',
                    alignContent: "center",
                    alignItems: "center",
                    //height: '35%',
                    //marginTop: 20
                }]}>
                    <View style={{ flex: 0.3 }}  >
                        <Image source={logo} style={{
                            marginLeft: 15,
                            width: 60,
                            height: 80
                        }} />
                    </View>
                    <View style={{ flex: 0.7 }} >
                        <Text style={{ color: theme.SECONDARY_COLOR }}> {item.user.name}</Text>
                    </View>
                </View>

                <Text style={{ color: theme.PRIMARY_COLOR, marginTop: 10 }}>{item.message.content}</Text>
                <View>
                    <Text style={{ textAlign: "right", color: theme.PRIMARY_COLOR, fontSize: theme.TEXT_8, marginTop: 5 }}>
                        Postado  {moment.parseZone(item.message.created_at).local().format(formatDataHour)}
                    </Text>
                </View>
            </View>
        </>
    );
}

export default ItemNews;

const stylesLocal = StyleSheet.create({
});
