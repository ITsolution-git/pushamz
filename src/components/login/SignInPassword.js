import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, Image, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import ShakingText from 'react-native-shaking-text';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import Loader from '../Loader';
import { verifyPassword } from '../../actions/index';
const {height, width} = Dimensions.get('window')
class SignInPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sellerId: '',
            marketplaceId: '',
            secretKey: '',
            accessKey: 'dd',
            loader: false,
        };
        this.verifyUser = this.verifyUser.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        
    }

    verifyUser() {
        this.setState({ loader: true });
        this.props.verifyPassword(this.props.userEmail, this.state.activUserPassword)
        .then(result=>{
            if (result.hasError === false) {
                this.setState({ wrongPassword: '', wrongPasswordMsg: '' });
                if (!result.customer.plan_activation_status) {
                    this.props.navigation.navigate('VocherCode');
                } else {
                    this.props.navigation.navigate('WelcomeScreen');
                }
            } else if( result.hasError === true) {
                this.setState({ wrongPassword: 'Passwort', wrongPasswordMsg: 'Dieses Passwort ist nicht korrekt. Bitte versuchen Sie es erneut.' });
            }

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
                    this.state.loader ?
                        <View style={{ flex: 1, backgroundColor: '#454545', opacity: 0.8 }}><Loader /></View> :
                        <View style={{ flex: 1 }}>
                            <TouchableWithoutFeedback  onPress={Keyboard.dismiss} accessible={false}>
                            <View style={{ flex: 1 }}>
                                <ShakingText style={{ fontSize: 16, color: '#ffffff' }} >{this.state.wrongPassword}</ShakingText>

                                <View style={styles.password}>
                                    <View style={styles.inputPasswordContainer}>
                                        <TextInput onChangeText={(text) => this.setState({ sellerId: text })} style={[styles.inputPassword, {  fontSize: 24 }]} placeholder='Seller ID'  placeholderTextColor={'#EFE1CB'} autoFocus={true} enablesReturnKeyAutomatically={true} onSubmitEditing={() => this.verifyUser()} underlineColorAndroid='rgba(0,0,0,0)'  value={this.state.sellerId}/>
                                        <TextInput onChangeText={(text) => this.setState({ marketplaceId: text })} style={[styles.inputPassword, {  fontSize: 24 }]} placeholder='Marketplace ID'  placeholderTextColor={'#EFE1CB'} autoFocus={true} enablesReturnKeyAutomatically={true} onSubmitEditing={() => this.verifyUser()} underlineColorAndroid='rgba(0,0,0,0)'  value={this.state.marketplaceId}/>
                                        <TextInput onChangeText={(text) => this.setState({ secretKey: text })} style={[styles.inputPassword, {  fontSize: 24 }]} placeholder='Secret Key'  placeholderTextColor={'#EFE1CB'} autoFocus={true} enablesReturnKeyAutomatically={true} onSubmitEditing={() => this.verifyUser()} underlineColorAndroid='rgba(0,0,0,0)'  value={this.state.secretKey}/>
                                        <TextInput onChangeText={(text) => this.setState({ accessKey: text })} style={[styles.inputPassword, {  fontSize: 24 }]} placeholder='AWS Access Key ID'  placeholderTextColor={'#EFE1CB'} autoFocus={true} enablesReturnKeyAutomatically={true} onSubmitEditing={() => this.verifyUser()} underlineColorAndroid='rgba(0,0,0,0)' value={this.state.accessKey}/>
                                    </View>

                                    <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', marginBottom: 50 }} onPress={()=> this.verifyUser()}>
                                        <View style={{ backgroundColor: '#454545', alignItems: 'center', justifyContent: 'center', width: 220, height: 52, borderRadius: 52, borderColor: '#FFFFFF', borderWidth: 1 }}>
                                            <Text style={{ fontSize: 17, color: '#FFFFFF' }}>Go</Text>
                                        </View>
                                    </TouchableOpacity>
                                        
                                </View>
                            </View>
                            </TouchableWithoutFeedback>
                        </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    password: {
        flex: 9,
        justifyContent: 'center',
        backgroundColor: "#454545",
        opacity: 1
    },
    homeImage: {
        width: '100%',
        height: '100%',
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