import * as auth from '../utils/auth';
import { Alert, AsyncStorage } from 'react-native';

const baseUrl = 'http://ec2-52-14-208-236.us-east-2.compute.amazonaws.com:3000/';

const ApiManager = function(url, params) {
    let user = auth.getUser();
    let fullUrl = baseUrl + url;

    console.log(fullUrl);
    debugger
    return fetch(fullUrl, {
        ...params,
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
            if (!json.ops) {
                return auth.onSignIn(json.ops).then(resp=>{
                    auth.onSignIn(json.ops);
                    dispatch({
                        type: 'AUTHENTICATE_USER',
                        payload: json.ops
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

        dispatch({
            type: 'SIGNOUT',
            payload: ''
        })
        return auth.onSignOut();
    }
}
