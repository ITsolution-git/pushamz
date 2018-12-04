import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import React from 'react';

import { StyleSheet, View, Dimensions, Text, ImageBackground, Platform, Image } from 'react-native';

const {height, width} = Dimensions.get('window')
export default class Loader extends React.Component {
    constructor(props) {
    	super(props);
    }


    render() {
        return (
            <View style={{flex: 1, width: width, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF'}}>
                <Bars size={20} color="#FDAAFF" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
});
