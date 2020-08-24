export const SET_USER_DATA = '[USER] SET DATA';
export const REMOVE_USER_DATA = '[USER] REMOVE DATA';
export const USER_LOGGED_OUT = '[USER] LOGGED OUT';

export function setUserData(user) {
	return dispatch => {
		dispatch({
			type: SET_USER_DATA,
			payload: user
		});
	};
}

// /**
//  * Update User Settings
//  */
// export function updateUserSettings(settings) {
// }

// /**
//  * Update User Shortcuts
//  */
// export function updateUserShortcuts(shortcuts) {
// 	return (dispatch, getState) => {
// 		const { user } = getState().auth;
// 		const newUser = {
// 			...user,
// 			data: {
// 				...user.data,
// 				shortcuts
// 			}
// 		};

// 		updateUserData(newUser, dispatch);

// 		return dispatch(setUserData(newUser));
// 	};
// }

// /**
//  * Remove User Data
//  */
// export function removeUserData() {
// 	return {
// 		type: REMOVE_USER_DATA
// 	};
// }

// /**
//  * Update User Data
//  */
// function updateUserData(user, dispatch) {
// 	if (!user.role || user.role.length === 0) {
// 		// is guest
// 		return;
// 	}

// 	jwtService
// 		.updateUserData(user)
// 		.then(() => {
// 			dispatch(MessageActions.showMessage({ message: 'User data saved with api' }));
// 		})
// 		.catch(error => {
// 			dispatch(MessageActions.showMessage({ message: error.message }));
// 		});
// }
