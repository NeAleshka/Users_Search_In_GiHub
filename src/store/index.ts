import {configureStore} from "@reduxjs/toolkit";
import {githubApi} from "./githubApi";
import {githubReducers} from "./github.slice";
import {setupListeners} from "@reduxjs/toolkit/query";

export const store=configureStore({
    reducer:{
        [githubApi.reducerPath]:githubApi.reducer,
        favoritesCards:githubReducers
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(githubApi.middleware)
})

export type RootStateType=ReturnType<typeof store.getState>

setupListeners(store.dispatch)