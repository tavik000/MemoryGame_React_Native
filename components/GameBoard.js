import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableHighlight,
    Text
} from 'react-native';

import {quellConditions} from "../constants/game";
import Pic from "./Pic"
import GameMessage from "./GameMessage";

export default class GameBoard extends Component<{}> {


    constructor(props) {
        super(props);
        this.state = {
            gameEnd: false, // Game end or not.
            hp: 15, // count used
            // half_count: 0,  //count used
            can_press: false,  //control whether player can press or not
            grid_array: [
                [0, 1, 2, 3, 4],
                [5, 6, 7, 8, 9],
                [10, 11, 12, 13, 14],
                [15, 16, 17, 18, 19],
                [20, 21, 22, 23, 24],
            ],              //for render for loop image (.map) used
            pic_state: [
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0
            ],  // 0: unknown; 1: realted color_img; 2: quell;  array is for each grid.
            pic_number: [
                -1, -1, -1, -1, -1,
                -1, -1, -1, -1, -1,
                -1, -1, -1, -1, -1,
                -1, -1, -1, -1, -1,
                -1, -1, -1, -1, -1
            ], // indicate color_img number from game.js.color_img for each grid.
            last_press: 0,  // indicate last pressed grid id, prevent from count + 1.
            quell_last_press: 0,    //indicate last pressed grid id for quell used
            playerInputPicNum: [],  // player inputs color number.
            winCondition: 24,   //winCondition = 0 ; then player win
            gameMessage: [
                'GAME OVER',
                'WINNER WINNER! CHICKEN DINNER!'
            ],
            result: -1, // 0: Lose;    1: Win
            timer: 10, // for count time
            starNumber: 3, //for score used
        };
    }

    //Shuffle img when load component (Auto run this function before render)
    componentWillMount() {

        let pic_number = [...this.state.pic_number];
        let exist_number = [];
        let endless = -1; // for randomize loop used.
        for (let i in pic_number) {
            while (endless === -1) {
                const randomNumber = Number.parseInt(Math.random() * 25);

                if (exist_number.every(d => d !== randomNumber)) {
                    exist_number = exist_number.concat(randomNumber);
                    pic_number[i] = randomNumber;
                    break
                }
            }
        }

        let pic_state = [...this.state.pic_state];
        for (let i in pic_state) {
            pic_state[i] = 1;
        }
        this.setState({
            pic_number: pic_number,
            pic_state: pic_state,
        });

        setTimeout(() => {
            let pic_state = [...this.state.pic_state];
            for (let i in pic_state) {
                pic_state[i] = 0;
            }
            this.setState({
                pic_state: pic_state,
                can_press: true,
            });

        }, 10000);

        let i = 10;
        this.timer = setInterval(() => {
            i--;
            this.setState({
                timer: i,
            });
            if (i <= 0) {
                clearTimeout(this.timer);
            }
        }, 1000);

    }

    restart() {
        this.setState({
            gameEnd: false, // Game end or not.
            hp: 15, // count used
            // half_count: 0,  //count used
            can_press: false,  //control whether player can press or not
            grid_array: [
                [0, 1, 2, 3, 4],
                [5, 6, 7, 8, 9],
                [10, 11, 12, 13, 14],
                [15, 16, 17, 18, 19],
                [20, 21, 22, 23, 24],
            ],              //for render for loop image (.map) used
            pic_state: [
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0
            ],  // 0: unknown; 1: realted color_img; 2: quell;  array is for each grid.
            pic_number: [
                -1, -1, -1, -1, -1,
                -1, -1, -1, -1, -1,
                -1, -1, -1, -1, -1,
                -1, -1, -1, -1, -1,
                -1, -1, -1, -1, -1
            ], // indicate color_img number from game.js.color_img for each grid.
            last_press: 0,  // indicate last pressed grid id, prevent from count + 1.
            quell_last_press: 0,    //indicate last pressed grid id for quell used
            playerInputPicNum: [],  // player inputs color number.
            winCondition: 24,   //winCondition = 0 ; then player win
            gameMessage: [
                'GAME OVER',
                'WINNER WINNER! CHICKEN DINNER!'
            ],
            result: -1, // 0: Lose;    1: Win
            timer: 10, // for count time
            starNumber: 3, //for score used
        });
        this.componentWillMount();
    }

    gameOver(result) {
        this.setState({
            can_press: false,
            result: result,
        });
        setTimeout(() => {
            this.setState({
                gameEnd: true,
            });
        }, 2000)
    }


    judgeQuell(grid_id) {
        // judge quell

        const {playerInputPicNum, pic_state, quell_last_press} = this.state;
        let {winCondition, hp} = this.state;
        let pic_number = this.state.pic_number[grid_id];
        if (pic_number === 24) {
            //bomb sound
            var soundSrc = 'bomb.mp3';
            this.playSound(soundSrc);

            this.setState({
                starNumber: 0,
            });

            this.gameOver(0);  // 0 meaning lose game
        } else {

            if (playerInputPicNum.length >= 2) {

                //Judging time , can not press anything.
                this.setState({
                    can_press: false,
                });

                // Judege quell or not


                let res = false;
                for (let i in quellConditions) {
                    res = (quellConditions[i].length === playerInputPicNum.length) && quellConditions[i].sort().every(function (element, index) {
                        return element === playerInputPicNum.sort()[index];
                    });
                    if (res === true) {
                        break;
                    }
                }

                // Quell picture
                if (res === true) {
                    setTimeout(() => {
                        pic_state[grid_id] = 2;  // quell the click image
                        pic_state[quell_last_press] = 2;  // quell the click image

                        winCondition = winCondition - 2;

                        this.setState({
                            pic_state: pic_state, // update the image
                            playerInputPicNum: [],
                            can_press: true,  //can press and continute
                            winCondition: winCondition,
                        });


                        //Judge Game Win
                        if (winCondition <= 0) {
                            if(hp >=6 &&
                                    hp < 15
                            ) {
                                this.setState({
                                    starNumber: 2,
                                });
                            }else if(hp < 6){
                                this.setState({
                                    starNumber: 1,
                                });
                            }
                            this.gameOver(1);  // 1 meaning win game
                        }

                    }, 300)
                } else {
                    // Wrong matching, cover picture

                    hp = hp - 1;

                    if (hp <= 0) {
                        this.setState({
                            hp: hp,
                            starNumber: 0,
                        });

                        this.gameOver(0);  // 0 meaning lose game
                    } else {
                        setTimeout(() => {
                            pic_state[grid_id] = 0;  // cover the click image
                            pic_state[quell_last_press] = 0;  // cover the click image

                            this.setState({
                                pic_state: pic_state, // update the image
                                playerInputPicNum: [],
                                hp: hp,
                                can_press: true,  //can press and continute
                            });

                        }, 300)
                    }
                }
            }
        }


    };

    _onPressButton = (grid_id) => {
        // Alert.alert('You tapped the button!')

        if (this.state.can_press === true &&
            this.state.pic_state[grid_id] === 0) {

            //click sound
            var soundSrc = 'click.mp3';
            this.playSound(soundSrc);

            const {playerInputPicNum, pic_state} = this.state;

            let pic_number = this.state.pic_number[grid_id];

            pic_state[grid_id] = 1;  // open the click image

            this.setState({
                quell_last_press: this.state.last_press,
                last_press: grid_id,
                playerInputPicNum: playerInputPicNum.concat(pic_number),  // collect player input pic.number
                pic_state: pic_state, // open the click image
            });

            setTimeout(() => {
                //for counting, press two different image => count=+1
                this.judgeQuell(grid_id);
            }, 0);


        }
    };

    //react-native-sound 3rd party component
    playSound(soundSrc) {
        // Import the react-native-sound module
        var Sound = require('react-native-sound');

        // Enable playback in silence mode (iOS only)
        Sound.setCategory('Playback');

        // Load the sound file 'click.mp3' from the app bundle
        // See notes below about preloading sounds within initialization code below.
        var click = new Sound(soundSrc, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            } else {
                click.play((success) => {
                    if (success) {
                        // console.log('successfully finished playing');
                    } else {
                        console.log('playback failed due to audio decoding errors');
                        // reset the player to its uninitialized state (android only)
                        // this is the only option to recover after an error occured and use the player again
                        click.reset();
                    }
                });
            }
            // loaded successfully
            // console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
        });

        // Set sound volume
        click.setVolume(1);

        // Position the sound to the full right in a stereo field
        //         click.setPan(1);

        // Loop indefinitely until stop() is called
        click.setNumberOfLoops(-1);

        // Release the audio player resource
        click.release();
    }


    render() {
        // let pic_number = [...this.state.pic_number];

        const {gameEnd, gameMessage, result, timer, starNumber} = this.state;

        if (gameEnd === true) {
            return (
                <GameMessage
                    gameMessage={gameMessage[result]}
                    starNumber={starNumber}
                    restart={this.restart.bind(this)}
                />
            );
        } else {

            return (

                <View style={styles.container}>


                    <View style={[styles.boxContainer, styles.boxZero]}>
                        <View style={styles.title}>
                            <Text style={styles.count}>MEMORY GAME</Text>
                            <Text style={[styles.count, styles.skyblue]}>HP: {this.state.hp}</Text>
                            {
                                timer > 0 ?
                                    <Text style={[styles.timer, styles.red]}>{timer} Sec Remaining</Text>
                                    : <Text />
                            }
                        </View>

                    </View>
                    <View style={[styles.boxContainer, styles.boxEach]}>
                        {
                            this.state.grid_array[0].map((d, i) => (
                                <TouchableHighlight
                                    key={d}
                                    onPress={() => this._onPressButton(d)} underlayColor="white">
                                    <View>
                                        <Pic
                                            key={d}
                                            pic_state={this.state.pic_state[d]}
                                            pic_number={this.state.pic_number[d]}
                                        />
                                    </View>
                                </TouchableHighlight>
                            ))
                        }
                    </View>
                    <View style={[styles.boxContainer, styles.boxEach]}>
                        {
                            this.state.grid_array[1].map((d, i) => (
                                <TouchableHighlight
                                    key={d}
                                    onPress={() => this._onPressButton(d)} underlayColor="white">
                                    <View>
                                        <Pic
                                            key={d}
                                            pic_state={this.state.pic_state[d]}
                                            pic_number={this.state.pic_number[d]}
                                        />
                                    </View>
                                </TouchableHighlight>
                            ))
                        }
                    </View>
                    <View style={[styles.boxContainer, styles.boxEach]}>
                        {
                            this.state.grid_array[2].map((d, i) => (
                                <TouchableHighlight
                                    key={d}
                                    onPress={() => this._onPressButton(d)} underlayColor="white">
                                    <View>
                                        <Pic
                                            key={d}
                                            pic_state={this.state.pic_state[d]}
                                            pic_number={this.state.pic_number[d]}
                                        />
                                    </View>
                                </TouchableHighlight>
                            ))
                        }
                    </View>
                    <View style={[styles.boxContainer, styles.boxEach]}>
                        {
                            this.state.grid_array[3].map((d, i) => (
                                <TouchableHighlight
                                    key={d}
                                    onPress={() => this._onPressButton(d)} underlayColor="white">
                                    <View>
                                        <Pic
                                            key={d}
                                            pic_state={this.state.pic_state[d]}
                                            pic_number={this.state.pic_number[d]}
                                        />
                                    </View>
                                </TouchableHighlight>
                            ))
                        }
                    </View>
                    <View style={[styles.boxContainer, styles.boxEach]}>
                        {
                            this.state.grid_array[4].map((d, i) => (
                                <TouchableHighlight
                                    key={d}
                                    onPress={() => this._onPressButton(d)} underlayColor="white">
                                    <View>
                                        <Pic
                                            key={d}
                                            pic_state={this.state.pic_state[d]}
                                            pic_number={this.state.pic_number[d]}
                                        />
                                    </View>
                                </TouchableHighlight>
                            ))
                        }
                    </View>


                </View>

            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // 1:1
        flexDirection: 'column',
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    count: {
        alignItems: 'center',
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    timer: {
        alignItems: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'right'
    },
    skyblue: {
        color: '#23ff00'
    },
    red: {
        color: 'red'
    },
    boxContainer: {
        flex: 1, // 1:3
        flexDirection: 'row',
        alignItems: 'center',

        // justifyContent: 'center'
    },
    pic: {
        width: 70,
        height: 70,
    },
    boxZero: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'space-around', // main axis
        backgroundColor: 'deepskyblue',
    },
    boxEach: {
        flex: 1,
        justifyContent: 'space-around', // main axis
        backgroundColor: '#FFFFFF',
        // justifyContent: 'space-around',
    },

});


