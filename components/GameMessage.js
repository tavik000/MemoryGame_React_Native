import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    Modal,
    TouchableOpacity
} from 'react-native';

import {nonstar, star} from "../constants/game";

export default class GameMessage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: true,
        };
    }


    setModalVisible(visible) {
        this.setState({modalVisible: visible});
        this.props.restart();
    }


    render() {
        const {gameMessage, starNumber} = this.props;
        let quellNumber = 3 - starNumber;

        let haveStar = [];
        let nonStar = [];
        for(let i = 0; i < starNumber; i++){
            haveStar = haveStar.concat(i)
        }
        for(let i = 0; i < quellNumber; i++){
            nonStar = nonStar.concat(i)
        }

        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert("Modal has been closed.")
                    }}
                >
                    <View style={styles.container}>
                        <View style={styles.boxContainer} />
                        <View style={styles.boxContainer}>
                            <Text style={styles.message}>{gameMessage}</Text>
                        </View>
                        <View style={styles.boxContainer}>
                            {
                                haveStar.map((d, i) => (
                                    <Image key={d} source={star} style={styles.pic}/>
                                ))
                            }
                            {
                                nonStar.map((d, i) => (
                                    <Image key={d} source={nonstar} style={styles.pic}/>
                                ))
                            }
                        </View>
                        <View style={styles.boxContainerButton}>
                            <TouchableOpacity style={styles.btn} onPress={() => {
                                this.setModalVisible(!this.state.modalVisible)
                            }}>
                                <Text style={styles.btnText}>
                                    Restart
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.boxContainer} />
                        <View style={styles.boxContainer} />

                    </View>

                </Modal>
            </View>
        );
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
    boxContainerButton: {
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
    pic: {
        width: 70,
        height: 70,
    },
});
