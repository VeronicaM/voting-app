const appConstants = {
    errorCode: {
        Unauthorized: 401,
        UnprocessableEntity: 422,
        NotFound: 404,
        Forbidden: 403
    },
    routes: {
        SIGNUP: 'go/signup',
        LOGIN: 'go/login',
        POLLS: 'dashboard',
        POLL_DETAILS : `pollDetails`
    },
    ui: {
        PAGE_CONTAINER_CLASS: 'pageContent'
    },
    keyCodes: {
        TAB: 9
    }
};

export default appConstants;
