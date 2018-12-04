import * as auth from '../utils/auth';
import { Alert, AsyncStorage } from 'react-native';

const baseUrl = 'https://spano24.com/fitnessportal/fitness/';

const ApiManager = function(url, params) {
    let user = auth.getUser();
    let fullUrl = baseUrl + url;
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

export const verifyPassword = (email, password) => {
    return async (dispatch, getState) => {

        return ApiManager('login', {
            method: 'POST',
            data: {

            }
        }).then((json) => {
            if (!json.hasError) {
                return auth.onSignIn(json).then(resp=>{
                    auth.onSignIn(json);
                    dispatch({
                        type: 'AUTHENTICATE_USER',
                        payload: json
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



