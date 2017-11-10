import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text
} from 'react-native';

import {unknown, quell, color_img} from "../constants/game";

export default class Pic extends Component {
    render() {
        //key: grid_id
        const {pic_state, pic_number} = this.props;

        return (
            <View>
                {
                    pic_state === 0 ?
                        <Image source={unknown} style={styles.pic}/>
                        : pic_state === 1 ?
                        <Image source={color_img[pic_number]} style={styles.pic}/>
                        :
                        <Image source={quell} style={styles.pic}/>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({

    pic: {
        width: 70,
        height: 70,
    },

});
