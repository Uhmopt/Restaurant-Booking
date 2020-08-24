import * as Actions from '../actions';

const initialState = {
	success: false,
	error: {
		username: null,
		password: null
    },
    user: null
};

const login = (state = initialState, action) => {
	switch (action.type) {
		case Actions.LOGIN_SUCCESS: {
			return {
				...initialState,
                success: true,
                user: action.payload
			};
		}
		case Actions.LOGIN_ERROR: {
			return {
				success: false,
				error: action.payload
			};
		}
		default: {
			return state;
		}
	}
};

export default login;
