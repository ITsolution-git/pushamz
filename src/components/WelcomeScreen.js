import React from 'react';
import { StyleSheet, View, Dimensions, Text, ImageBackground, Platform, Image, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import Loader from './Loader';

import { signOut } from '../actions/index';

class WelcomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: true,
        };

        Keyboard.dismiss();
    }

    render() {
        return (
            <TouchableWithoutFeedback  onPress={Keyboard.dismiss} accessible={false}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#454545'}}>
            	<Text style={{fontSize: 20, color: '#fff', textAlign: 'center'}}>You will get notified when there's new orders</Text>
            	<TouchableOpacity style={[styles.button, {marginTop: 20}]} onPress={() => {this.props.signOut(); this.props.navigation.navigate('Login') }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Text style={{ fontSize: 20, color: '#ffffff', marginVertical: 10, marginHorizontal: 20 }}>Sign out</Text>
                    </View>
                </TouchableOpacity>
            </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '95%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    homeImage: {
        width: '100%',
        height: '100%', 
    },
    button: {
        backgroundColor: '#FFFFFF20',
        padding: 5,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#fff'
    },
});


export default connect(state => {
    return {
    }
}, dispatch => {
    return bindActionCreators({ signOut }, dispatch)
}
)(WelcomeScreen);