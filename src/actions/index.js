import * as auth from '../utils/auth';
import { Alert, AsyncStorage } from 'react-native';

const baseUrl = 'http://ec2-3-17-58-195.us-east-2.compute.amazonaws.com:3000/';

import OneSignal from 'react-native-onesignal';
const ApiManager = function(url, params) {
    let user = auth.getUser();
    let fullUrl = baseUrl + url;

    console.log(fullUrl);
    return fetch(fullUrl, {
        ...params,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        mode: 'cors',
    })
    .then((data) => {
        try {
            return data.json()
        } catch(err){
            console.log('API Error', data);
            throw err;
        }
    }).catch((error)=>{
        console.log('Got Error from url', error, fullUrl);
        throw error;
    })    
    
}

export const verifyPassword = (data) => {
    return async (dispatch, getState) => {
        return ApiManager('api/users', {
            method: 'POST',
            body: JSON.stringify(data)
        }).then((json) => {
            if (json.success) {
                return auth.onSignIn(json.data).then(resp=>{
                    auth.onSignIn(json.data);
                    dispatch({
                        type: 'AUTHENTICATE_USER',
                        payload: json.data
                    });

                    return json;
                });
            } else {
                return json;
            }
        })

    }
}

export const autoSignin = (json) => {
    return async (dispatch, getState) => {
        auth.onSignIn(json);
        dispatch({
            type: 'AUTHENTICATE_USER',
            payload: json
        })
    }
}

export const signOut = () => {
    return async (dispatch, getState) => {
        OneSignal.sendTags({"userId" : 0});
        dispatch({
            type: 'SIGNOUT',
            payload: ''
        })
        return auth.onSignOut();
    }
}
