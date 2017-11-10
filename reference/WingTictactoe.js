// Exported from snack.expo.io
// Exported from snack.expo.io
// Exported from snack.expo.io
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, //Text,
    View, Image, //Alert
    TouchableHighlight, Button } from 'react-native';


import { Audio } from "expo";
// let uri = 'http://www.pngmart.com/files/5/Snow-PNG-Transparent-Image.png';
let touch = true;
let round = 0;
let androidInputs = [];
let appleInputs = [];

const  conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
//import { Bat, Hat, Cat } from './icons'
class Pic extends Component {
    _handlePlaySoundAsync = async () => {
        await Audio.setIsEnabledAsync(true);
        let sound = new Audio.Sound();
        await sound.loadAsync({
            uri: 'http://cieloestrellado.xxxxxxxx.jp/coming/atos_3.mp3',
        });
        await sound.playAsync();
    };



    constructor(props) {
        super(props);
        this.state = {uri:'http://www.pngmart.com/files/5/Snow-PNG-Transparent-Image.png'}
        this._changeLogo= this._changeLogo.bind(this)
    }

    judgeWinner(inputs) {
        return conditions.some(d => d.every(item => inputs.indexOf(item) !== -1))
    }

    _changeLogo() {
        // this.setState(previousState => {return {uri: !previousState.uri }});
        const { id } = this.props;

        this._handlePlaySoundAsync();
        if( this.state.uri=='http://www.pngmart.com/files/5/Snow-PNG-Transparent-Image.png' ){
            touch = true; // can touch
        }else{
            touch = false; // can touch
        }

        if(touch==true){
            if(round ===0)
            {

                round = 1

            }else if(round ===1)
            {

                round = 2

            }
            else if(round ===2)
            {
                round = 1
            }

            if(round == 1){

                this.setState(previousState => {return {uri: 'http://storage.googleapis.com/ix_choosemuse/uploads/2016/02/android-logo.png'}});
                androidInputs = androidInputs.concat(id)
                let result = this.judgeWinner(androidInputs)
                if (result)
                {
                    console.log("android win")
                }
            }else if(round ==2){
                this.setState(previousState => {return {uri: 'https://tctechcrunch2011.files.wordpress.com/2014/06/apple_topic.png?w=220'}});
                appleInputs = appleInputs.concat(id)
                let result = this.judgeWinner(appleInputs)
                if (result)
                {
                    console.log("apple win")
                }

            }
            // console.log("android :" + androidInputs )
            // console.log("apple :" + appleInputs )

        }
    }

    render() {
        // let uri = this.state.uri ? 'http://storage.googleapis.com/ix_choosemuse/uploads/2016/02/android-logo.png' : 'https://tctechcrunch2011.files.wordpress.com/2014/06/apple_topic.png?w=220'


        let uri = this.state.uri

        return (
            <TouchableHighlight onPress={this._changeLogo} underlayColor="#FF9999">
                <View style={styles.button}>
                    <Image source={{uri}} style={{width: 70, height: 70}}/>
                </View>
            </TouchableHighlight>
        );
    }
}

export default class Main extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.boxContainer, styles.boxOne]}>
                    <Pic id={0}/>
                    <Pic id={1}/>
                    <Pic id={2}/>
                </View>
                <View style={[styles.boxContainer, styles.boxTwo]}>
                    <Pic id={3}/>
                    <Pic id={4}/>
                    <Pic id={5}/>
                </View>
                <View style={[styles.boxContainer, styles.boxThree]}>
                    <Pic id={6}/>
                    <Pic id={7}/>
                    <Pic id={8}/>
                </View>
            </View>
        )}
}
const styles = StyleSheet.create({
    container: {
        flex: 1, // 1:1
        flexDirection: 'column',
    },
    boxContainer: {
        flex: 1, // 1:3
        alignItems: 'center',
        //justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    boxOne: {
        flex: 3, // 3:6
        backgroundColor: '#FFEEE4',
        //justifyContent: 'space-around',
        //alignItems: 'flex-start'
    },
    boxTwo: {
        flex: 3, // 1:6
        backgroundColor: '#CCFFCC'
    },
    boxThree: {
        flex: 3, // 2:6
        //: 'row',
        //justifyContent: 'space-between', // main axis
        //alignItems: 'flex-end', // cross axis
        backgroundColor: '#CCFFFF',
    },
});

AppRegistry.registerComponent('TTT', () => Main);