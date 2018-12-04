import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, Image, TouchableOpacity, KeyboardAvoidingView, Dimensions, Animated, Alert } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
const { height, width } = Dimensions.get('window');


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            leftButton: this.props.leftButton,
            leftButtonName: this.props.leftButtonName,
            leftButtonColor: this.props.leftButtonColor,
            rightButtonColor : this.props.rightButtonColor ? this.props.rightButtonColor : '#454545',
            rightButtonName: this.props.rightButtonName || 'menu',

            rightButton: this.props.rightButton,
            showNext: this.props.showNext,
        }
        this.animated = new Animated.Value(0);
    }

    componentDidMount(){
        this.animate();
    }

    animate () {
        this.animated.setValue(0);
        Animated.timing(this.animated,{
            toValue: 1,
            duration: 2000,
        }).start( () => this.animate())
    }

    render() {

        const  rotateZ = this.animated.interpolate({
          inputRange: [0,1],
          outputRange:['0deg','360deg'],
        });

        const transform = [{ rotateZ }];

        return (

            <View style={[styles.signInContainer, { backgroundColor: this.props.backgroundcolor }]}>

                <View style={styles.header}>

                    <TouchableOpacity style={{flex:2}} onPress={() => this.props.goBack()} >
                        {
                            this.state.leftButton ?
                                <Icon name={this.state.leftButtonName} size={50} style={{ marginLeft: -5}} color={this.state.leftButtonColor} />
                                : <View></View>
                        }
                    </TouchableOpacity>


                    <Text style={{ flex:6, fontFamily: 'DINPro-Medium', fontSize: 16, textAlign: 'center', color: this.props.headColor}} numberOfLines={2} ellipsizeMode={'tail'}>{this.props.headerTitle} </Text>
                    
                    <View style={{ flex:2, alignItems: 'flex-end', justifyContent: 'center' }}>
                        {
                            this.state.showNext ? <Text onPress={() => this.props.verifyUser()} style={{ fontFamily: 'DINPro-Medium', fontSize: 16, textAlign: 'center', color: '#ffffff' }}>Next</Text>
                                : 
                                <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                                    {!!this.props.rightButton && <TouchableOpacity onPress={this.state.rightButtonName === 'menu' ? this.checkAndGo : ()=> this.props.rightButtonFunc()} >
                                        <Icon name={this.state.rightButtonName} size={50} color={this.state.rightButtonColor} />
                                    </TouchableOpacity>}
                                </View>
                        }
                    </View>

                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    signInContainer: {
        flex: 1,
        justifyContent: 'center',
        //opacity: 0.8,
    },
    header: {
        flex: 1,
        // margin: 5,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    rightButton: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',  
    },
    componentContainer: {
        flex: 1,
    },
});

export default connect(state => {
    const user = state.validUser.user || {};
    return {
        user,
    }
}, dispatch => {
    return bindActionCreators({ }, dispatch)
})(Header)

