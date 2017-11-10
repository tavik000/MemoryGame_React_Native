/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, Alert ,AppRegistry ,TouchableHighlight} from 'react-native';

export default class helloworld extends Component {
    constructor(props){
        super(props);
        this.state = {bool : false , array: [0,0,0,0,0,0,0,0,0] , x_input:[], o_input:[] };
    }
    _handleButtonPress = (e , f) => {
        // Alert.alert(
        //   'Button pressed!',
        //   'You did it!',
        // );



        console.log("id of this box is " + e);

        if(f){
            let array = [ ...this.state.array ];
            array[e] = 1 ;  // is not 0
            this.setState({ array }); // set array
            console.log("temp array is :" + array);
            let x_input = [...this.state.x_input];
            x_input[e] = e ;  // id
            this.setState({ x_input }); // set x_input

            console.log(this._isWinner(1 , array))
            console.log(this._isWinner(2 , array))


            if(this._isWinner(1 , array)){
                Alert.alert("X is winnner");
            }else if(this._isWinner(2 , array)){
                Alert.alert("O is winnner");
            }

        }else{
            let array = [ ...this.state.array ];
            array[e] = 2 ;  // is not 0
            this.setState({ array }); // set array
            console.log("temp array is :" + array);
            let o_input = [...this.state.o_input];
            o_input[e] = e ;  // id
            this.setState({ o_input }); // set o_input

            console.log(this._isWinner(1 , array))
            console.log(this._isWinner(2 , array))
            if(this._isWinner(1 , array)){
                Alert.alert("X is winnner");
            }else if(this._isWinner(2 , array)){
                Alert.alert("O is winnner");
            }
        }

        this.setState(previousState => {
            return {bool: !previousState.bool };
        });



        // this._logging();
    };
    _logging = () => {
        console.log("Check empty" + this.state.array)
        console.log("X array" + this.state.x_input)
        console.log("O array" + this.state.o_input)
        // console.log(this._isWinner(1))
        // console.log(this._isWinner(2))
    };
    _isWinner = (p , a) => {
        let winner = '';

        if( p == 1 ){
            winner = "x"
        }else{
            winner = "o"
        }
        if( a[0] == p && a[1] == p && a[2] == p ){
            console.log("winner is :" + winner)
            return true;
        }
        if( a[3] == p && a[4] == p && a[5] == p ){
            console.log("winner is :" + winner)
            return true;
        }
        if( a[6] == p && a[7] == p && a[8] == p ){
            console.log("winner is :" + winner)
            return true;
        }
        if( a[0] == p && a[3] == p && a[6] == p ){
            console.log("winner is :" + winner)
            return true;
        }
        if( a[1] == p && a[4] == p && a[7] == p ){
            console.log("winner is :" + winner)
            return true;
        }
        if( a[2] == p && a[5] == p && a[8] == p ){
            console.log("winner is :" + winner)
            return true;
        }
        if( a[2] == p && a[4] == p && a[6] == p ){
            console.log("winner is :" + winner)
            return true;
        }
        if( a[0] == p && a[4] == p && a[8] == p ){
            console.log("winner is :" + winner)
            return true;
        }


    };
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <View style={styles.col}>
                        {this.state.array[0] == 0 ?
                            <TouchableHighlight onPress={() => this._handleButtonPress(0 , this.state.bool)}>
                                <View style={styles.box}></View>
                            </TouchableHighlight> : this.state.array[0] == 1 ? <Text style={styles.box}>X</Text> : <Text style={styles.box}>O</Text> }




                    </View>
                    <View style={styles.col}>
                        {this.state.array[1] == 0 ?
                            <TouchableHighlight onPress={() => this._handleButtonPress(1, this.state.bool)}>
                                <View style={styles.box}></View>
                            </TouchableHighlight> : this.state.array[1] == 1 ? <Text style={styles.box}>X</Text> : <Text style={styles.box}>O</Text> }

                    </View>
                    <View style={styles.col}>
                        {this.state.array[2] == 0 ?
                            <TouchableHighlight onPress={() => this._handleButtonPress(2, this.state.bool)}>
                                <View style={styles.box}></View>
                            </TouchableHighlight> : this.state.array[2] == 1 ? <Text style={styles.box}>X</Text> : <Text style={styles.box}>O</Text> }

                    </View>
                </View>
                <View  style={styles.row}>
                    <View style={styles.col}>
                        {this.state.array[3] == 0 ?
                            <TouchableHighlight onPress={() => this._handleButtonPress(3, this.state.bool)}>
                                <View style={styles.box}></View>
                            </TouchableHighlight> : this.state.array[3] == 1 ? <Text style={styles.box}>X</Text> : <Text style={styles.box}>O</Text> }

                    </View>
                    <View style={styles.col}>
                        {this.state.array[4] == 0 ?
                            <TouchableHighlight onPress={() => this._handleButtonPress(4, this.state.bool)}>
                                <View style={styles.box}></View>
                            </TouchableHighlight> : this.state.array[4] == 1 ? <Text style={styles.box}>X</Text> : <Text style={styles.box}>O</Text> }

                    </View>
                    <View style={styles.col}>
                        {this.state.array[5] == 0 ?
                            <TouchableHighlight onPress={() => this._handleButtonPress(5, this.state.bool)}>
                                <View style={styles.box}></View>
                            </TouchableHighlight> : this.state.array[5] == 1 ? <Text style={styles.box}>X</Text> : <Text style={styles.box}>O</Text> }

                    </View>

                </View>
                <View  style={styles.row}>
                    <View style={styles.col}>
                        {this.state.array[6] == 0 ?
                            <TouchableHighlight onPress={() => this._handleButtonPress(6, this.state.bool)}>
                                <View style={styles.box}></View>
                            </TouchableHighlight> : this.state.array[6] == 1 ? <Text style={styles.box}>X</Text> : <Text style={styles.box}>O</Text> }

                    </View>
                    <View style={styles.col}>
                        {this.state.array[7] == 0 ?
                            <TouchableHighlight onPress={() => this._handleButtonPress(7, this.state.bool)}>
                                <View style={styles.box}></View>
                            </TouchableHighlight> : this.state.array[7] == 1 ? <Text style={styles.box}>X</Text> : <Text style={styles.box}>O</Text> }

                    </View>
                    <View style={styles.col}>
                        {this.state.array[8] == 0 ?
                            <TouchableHighlight onPress={() => this._handleButtonPress(8, this.state.bool)}>
                                <View style={styles.box}></View>
                            </TouchableHighlight> : this.state.array[8] == 1 ? <Text style={styles.box}>X</Text> : <Text style={styles.box}>O</Text> }

                    </View>
                </View>
                <Button
                    title="logging"
                    onPress={() => this._logging()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',

    },
    row :{
        flex:1,
        flexDirection : 'row' ,
        alignItems: 'center',
        justifyContent: 'center',

    },
    col :{
        flex:1,
        flexDirection : 'column' ,
        alignItems: 'center',
        justifyContent: 'center',
    },
    red: {
        color: 'red',
        fontSize: 30,
    },
    black:{
        color: 'black',
        fontSize: 30,
    },
    box:{
        width: 50,
        height: 50,
        backgroundColor: '#777',
    }
});



