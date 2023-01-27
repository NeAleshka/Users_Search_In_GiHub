import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FavoriteRepo} from "../interfaces";

const LS_FAV_REPOS_KEY='rfk'

interface GithubState {
    favoritesCards:FavoriteRepo[]
}

const initialState:GithubState={
    favoritesCards:JSON.parse(localStorage.getItem(LS_FAV_REPOS_KEY)??'[]')
}

const githubSlice=createSlice({
    name:'github',
    reducers:{
        addCard:(state, {payload}:PayloadAction<FavoriteRepo>)=>{
            state.favoritesCards.push(payload)
            localStorage.setItem(LS_FAV_REPOS_KEY,JSON.stringify(state.favoritesCards))
        },
        removeCard:(state, {payload}:PayloadAction<{id:number}>)=>{
            state.favoritesCards=state.favoritesCards.filter(repo=>repo.id!==payload.id)
            localStorage.setItem(LS_FAV_REPOS_KEY,JSON.stringify(state.favoritesCards))
        }
    },
    initialState,
})

export const githubActions=githubSlice.actions
export const githubReducers=githubSlice.reducer