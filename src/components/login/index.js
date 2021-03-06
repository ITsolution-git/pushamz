import React from 'react';
import { StyleSheet, View, Dimensions, Text, ImageBackground, Platform, Image, TouchableOpacity } from 'react-native';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import Loader from '../Loader';

import { autoSignin } from '../../actions/index';

const BannerWidth = Dimensions.get('window').width;
const {height, width} = Dimensions.get('window')

import * as auth from "../../utils/auth";

import OneSignal from 'react-native-onesignal';

class HomeInitial extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: true,
        };
    }

    async componentWillMount() {
        OneSignal.setLogLevel(7, 0);

        let requiresConsent = false;

        this.setState({emailEnabled: false, 
            animatingEmailButton : false, 
            initialOpenFromPush : "Did NOT open from push",
            activityWidth : 0,
            width: 0,
            activityMargin: 0,
            jsonDebugText : "",
            privacyButtonTitle : "Privacy Consent: Not Granted",
            requirePrivacyConsent : requiresConsent
        });

        OneSignal.setRequiresUserPrivacyConsent(requiresConsent);

        OneSignal.init("0b6427d6-620b-457e-bd39-2cb8058ff542", {kOSSettingsKeyAutoPrompt : true});

        var providedConsent = await OneSignal.userProvidedPrivacyConsent();

        this.setState({privacyButtonTitle : `Privacy Consent: ${providedConsent ? "Granted" : "Not Granted"}`, privacyGranted : providedConsent});

        OneSignal.setLocationShared(false);

        OneSignal.inFocusDisplaying(2);
    }

    componentDidMount() {

        this.onReceived = this.onReceived.bind(this);
        this.onOpened = this.onOpened.bind(this);
        this.onIds = this.onIds.bind(this);
        this.onEmailRegistrationChange = this.onEmailRegistrationChange.bind(this);

        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);
        OneSignal.addEventListener('emailSubscription', this.onEmailRegistrationChange);

        auth.isSignedIn().then(json=>{
            try {

                let obj = JSON.parse(json);
                if (obj && obj._id) {
                    this.props.autoSignin(obj);
                    // OneSignal.sendTags({"userId" : obj._id});
                    // OneSignal.configure();  // add this to trigger `ids` event
                    this.props.navigation.navigate('WelcomeScreen');
                    setTimeout(()=>this.setState({ loader: false }), 1000);
                } else {
                    this.setState({loader: false});
                }

            } catch (e) {
                this.setState({loader: false});
                throw e;
            }
            
        }).catch(e => {
            this.setState({loader: false});
        });
    }

    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
        OneSignal.removeEventListener('emailSubscription', this.onEmailRegistrationChange);

        if (this.player)
            this.player.pause();
    }

    onEmailRegistrationChange(registration) {
        console.log("onEmailRegistrationChange: ", registration);
    }

    onReceived(notification) {
        console.log("Notification received: ", notification);

        this.setState({jsonDebugText : "RECEIVED: \n" + JSON.stringify(notification, null, 2)});
    }

    onOpened(openResult) {
        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);

        this.setState({jsonDebugText : "OPENED: \n" + JSON.stringify(openResult.notification, null, 2)})
    }

    onIds(device) {
        
    }

    onLoad () {
        
    }

    render() {
        return (
            <View style={{flex: 1}}>
                {this.state.loader ? 
                    <Loader/>
                    :
                    <View style={styles.container}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{ fontSize: 20, color: '#ffffff' }}>Welcome</Text>
                        </View>
                        <TouchableOpacity style={[styles.button, {margin: 20}]} onPress={() => this.props.navigation.navigate('SignInPassword')}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                <Text style={{ fontSize: 20, color: '#ffffff', marginVertical: 5, marginHorizontal: 10 }}>Sign in</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#454545'
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
    return bindActionCreators({ autoSignin: autoSignin }, dispatch)
}
)(HomeInitial);