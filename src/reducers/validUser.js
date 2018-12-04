
const validUser = (state = {}, action) => {
    const { type, payload} = action;
    
    switch(type){
        case 'AUTHENTICATE_USER':
            return { ...state, validPassword: payload, user: payload.customer }

        case 'SIGNOUT':
            state = {};
            return state;
            
        default:
            return state;
    }
};

export default validUser;