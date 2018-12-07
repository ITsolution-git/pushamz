import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, Image, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import ShakingText from 'react-native-shaking-text';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import Loader from '../Loader';
import { verifyPassword } from '../../actions/index';
const {height, width} = Dimensions.get('window')
import OneSignal from 'react-native-onesignal';

class SignInPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sellerId: 'AD0IT7BF702TR',
            marketPlaceId: 'ATVPDKIKX0DER',
            mwsAuthToken: 'amzn.mws.f8b3c241-7d22-eede-d20f-fc35eba8efe3',
            email: 'test@mail.com',

            errorMessage: '',
            loader: false,
            showHelp: false
        };
        this.verifyUser = this.verifyUser.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        
    }

    verifyUser() {
        this.setState({ loader: true });
        let {sellerId, marketPlaceId, secretKey, awsAccessKeyId, email} = this.state;
        this.props.verifyPassword({sellerId, marketPlaceId, secretKey, awsAccessKeyId, email})
        .then(result=>{
            if (result.success) {
                this.setState({ errorMessage: '' });
                this.props.navigation.navigate('WelcomeScreen');

                OneSignal.sendTags({"userId" : result.data._id});
                OneSignal.configure();  // add this to trigger `ids` event
            } else {
                this.setState({ errorMessage: 'The credentials are wrong.' });
            }

            this.setState({ loader: false });
        }).catch(err=>{
            this.setState({ errorMessage: 'The credentials are wrong.' });
            this.setState({ loader: false });
        });
    }

    compoenntWillUnmount() {
        Keyboard.dismiss();
    }
    
    render() {
        return (
            <View style={styles.homeImage} >
                {
                    this.state.showHelp &&
                    <View style={{ position: 'absolute', width: width, height: height, top: 0, left: 0, flex:1, backgroundColor: '#00000080', zIndex: 100}}>
                        <View style={{ flex: 6, alignItems: 'center', justifyContent: 'center' }}>
                        </View>

                        <View style={{ flex: 4, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ flex: 1 }}>
                                <View style={[styles.subContainers, {marginTop: 30, marginBottom: 30, width: width - 20 }]}>
                                    <Text style={{ textAlign: 'center', fontSize: 18, color: '#838383'}}>Help</Text>
                                    <Text style={{ textAlign: 'left', fontSize: 18, color: '#838383', marginTop: 10}}>MWS Auth Token: Please authorize our developer ID  2515-8326-5014  to get this token.</Text>
                                </View>
                                <TouchableOpacity onPress={() => { this.setState({ showHelp: false}); }} style={[styles.subContainers, { paddingBottom: 20, flexDirection: 'row', alignItems: 'center', 'justifyContent': 'center' }]}>
                                    <View style={{ backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', width: 220, height: 60, borderRadius: 52, borderColor: '#4AB3E2', borderWidth: 0.5 }}>
                                        <Text style={{ fontSize: 17, color: '#4AB3E2' }}>Okay</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                }
                <View style={{flex: 1}}>
                {
                    this.state.loader ?
                        <View style={{ flex: 1, backgroundColor: '#454545', opacity: 0.8 }}><Loader /></View> :
                        <View style={{ flex: 1 }}>
                            <TouchableWithoutFeedback  onPress={Keyboard.dismiss} accessible={false}>
                            <View style={{ flex: 1 }}>
                                <View style={styles.password}>

                                    <View style={styles.inputPasswordContainer}>
                                        <TextInput onChangeText={(text) => this.setState({ sellerId: text })} style={[styles.inputPassword, {  fontSize: 20 }]} placeholder='Seller ID'  placeholderTextColor={'#EFE1CB'} autoFocus={true} enablesReturnKeyAutomatically={true} onSubmitEditing={() => this.verifyUser()} underlineColorAndroid='rgba(0,0,0,0)'  value={this.state.sellerId}/>
                                        <TextInput onChangeText={(text) => this.setState({ marketPlaceId: text })} style={[styles.inputPassword, {  fontSize: 20 }]} placeholder='Marketplace ID'  placeholderTextColor={'#EFE1CB'} autoFocus={true} enablesReturnKeyAutomatically={true} onSubmitEditing={() => this.verifyUser()} underlineColorAndroid='rgba(0,0,0,0)'  value={this.state.marketPlaceId}/>
                                        <TextInput onChangeText={(text) => this.setState({ mwsAuthToken: text })} style={[styles.inputPassword, {  fontSize: 20 }]} placeholder='MWS Auth Token'  placeholderTextColor={'#EFE1CB'} autoFocus={true} enablesReturnKeyAutomatically={true} onSubmitEditing={() => this.verifyUser()} underlineColorAndroid='rgba(0,0,0,0)'  value={this.state.mwsAuthToken}/>
                                        <TextInput onChangeText={(text) => this.setState({ email: text })} style={[styles.inputPassword, {  fontSize: 20 }]} placeholder='Email'  placeholderTextColor={'#EFE1CB'} autoFocus={true} enablesReturnKeyAutomatically={true} onSubmitEditing={() => this.verifyUser()} underlineColorAndroid='rgba(0,0,0,0)' value={this.state.email}/>

                                        <ShakingText style={{ fontSize: 16, color: '#ff0000' }} >{this.state.errorMessage}</ShakingText>

                                    </View>

                                    <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', marginBottom: 50 }} onPress={()=> this.verifyUser()}>
                                        <View style={{ backgroundColor: '#454545', alignItems: 'center', justifyContent: 'center', width: 220, height: 52, borderRadius: 52, borderColor: '#FFFFFF', borderWidth: 1 }}>
                                            <Text style={{ fontSize: 17, color: '#FFFFFF' }}>Go</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', marginBottom: 20 }} onPress={()=> {this.setState({showHelp: true})}}>
                                        <Text style={{ fontSize: 17, color: '#4AB3E2' }}>Need Any Help?</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            </TouchableWithoutFeedback>
                        </View>
                }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    password: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#454545",
        opacity: 1
    },
    homeImage: {
        width: width,
        height: height
    },
    inputPasswordContainer: {
        flex: 1,
        width: width - 40,
        margin: 20,
        justifyContent: 'center',
    },
    inputPassword: {
        marginTop: 10,
        color: '#FFFFFF',
        fontSize: 20,
    },
    forgotPassword: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF20',
        padding: 5,
        borderRadius: 20,
        marginTop: 5,
        marginBottom: 5,
        top: '-5%',
    },
    linkButton: {
        alignItems: 'center',
        backgroundColor: '#00000000',
        padding: 10,
        borderColor: '#ffffff',
        borderWidth: 1,
        borderRadius: 20,
        marginTop: 5,
        marginBottom: 5,
    },
});

export default connect(state => {
    const user = state.validUser.user || {};
    return {
        user,
    }
}, dispatch => {
    return bindActionCreators({ verifyPassword: verifyPassword }, dispatch)
}
)(SignInPassword);