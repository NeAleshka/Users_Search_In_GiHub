import {useEffect, useState} from "react";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../store";
import {bindActionCreators} from "@reduxjs/toolkit";
import {githubActions} from "../store/github.slice";

export const useDebounce =(value:string,delay:number=600) :string=>{
    const [debounced,setDebounced]=useState(value)

    useEffect(()=>{
        const timeout=setTimeout(()=> setDebounced(value),delay)
        return ()=>clearTimeout(timeout)
    },[value,delay])
    return debounced
}

export const useAppSelector:TypedUseSelectorHook<RootStateType>=useSelector

const actions={
    ...githubActions
}

export const useActions=()=>{
    const dispatch=useDispatch()
    return bindActionCreators(actions,dispatch)
}