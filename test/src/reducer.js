export const initialState = {
    user:null,
    mode:"home",
    follows:[]
};

export const actionTypes = {
    SET_USER: "SET_USER",
    SET_MODE: "SET_MODE",
    SET_FOLLOWS: "SET_FOLLOWS",
};

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user,
            };
        case actionTypes.SET_MODE:
            return {
                ...state,
                mode: action.mode,
            };
        case actionTypes.SET_FOLLOWS:
            return {
                ...state,
                follows: action.follows,
            };
    default:
        return state;
    }
};

export default reducer;