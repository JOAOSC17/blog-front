const Reducer = (state, action) => {
    switch(action.type){
        case "LOGIN_START":
            return{
                user:null,
                isFetching:true,
                token:null,
                error:false
            };
        case "LOGIN_SUCESS":
            return{
                user:action.payload,
                isFetching:false,
                token:action.payload.token,
                error:false
            };
        case "LOGIN_FAILURE":
            return{
                user:null,
                isFetching:false,
                error:true,
                token:null
            };
        case "UPDATE_START":
            return {
                ...state,
                isFetching:true
            };
        case "UPDATE_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false,
                token:null
            };
        case "UPDATE_FAILURE":
            return {
                user: state.user,
                isFetching: false,
                error: true,
                token:null
            };
        case "LOGOUT":
            return{
                user:null,
                isFetching:false,
                error:false,
                token:null
            };
                default:
                    return state;
                }
}
export default Reducer