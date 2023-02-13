import * as api from '../api';

export const fetchUser = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchUser(id);
        dispatch({ type: 'FETCH_USER', payload: data });

    } catch (err) {
        console.log(err);
    }
}

export const followUser = (followId) => async (dispatch) => {
    try {
        const { data } = await api.followUser(followId);
        dispatch({ type: 'UPDATE', payload: data });

    } catch (err) {
        console.log(err);
    }
}

export const unfollowUser = (unfollowId) => async (dispatch) => {
    try {
        const { data } = await api.unfollowUser(unfollowId);
        dispatch({ type: 'UPDATE', payload: data });

    } catch (err) {
        console.log(err);
    }
}

