import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import GameBoard from "./GameBoard";

export default class WelcomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gameStart: false,
        };
    }


    gameStart() {
        this.setState({gameStart: true});
    }


    render() {

        const {gameStart} = this.state;

        if (gameStart === false) {
            return (
                <View style={styles.container}>
                    <View style={styles.boxContainer}>
                        <Text style={styles.message}>MEMORY GAME</Text>
                    </View>
                    <View style={styles.boxContainer}>
                        <TouchableOpacity style={styles.btn} onPress={() => {
                            this.gameStart()
                        }}>
                            <Text style={styles.btnText}>
                                Start
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.boxContainer}>
                    </View>
                </View>
            );
        } else {
            return (
                <GameBoard/>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // 1:1
        flexDirection: 'column',
    },
    boxContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn: {
        width: 250,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#FFCA4D',
        borderRadius: 10

    },

    btnText: {
        fontSize: 18
    },

    message: {
        alignItems: 'center',
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#997810'
    },
});
