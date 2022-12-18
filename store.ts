import { configureStore } from '@reduxjs/toolkit';
import gleetsReducer from './gleetsReducer';
import userReducer from './userReducer';

export interface Gleet {
    content: string;
    title: string;
    photoUrl: string;
    email: string;
    created: string;
    id: string;
}

export interface State {
    user: { name: string | null; email: string | null; photoUrl: string | null };
    gleets: { gleets: Gleet[] };
}

export default configureStore({
    reducer: {
        user: userReducer,
        gleets: gleetsReducer,
    },
});
