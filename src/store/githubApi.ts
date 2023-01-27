import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IFetchRepo, IFetchUsers} from "../interfaces";
import * as url from "url";


export const githubApi=createApi({
    reducerPath:'github/api',
    baseQuery:fetchBaseQuery({
        baseUrl:'https://api.github.com/',
    }),
    refetchOnFocus:true,
    endpoints:build => ({
        searchUser:build.query<IFetchUsers,string>({
            query:(search:string)=>({
                url:`search/users`,
                params:{
                    q:search,
                }
            }),
            transformResponse:(res:IFetchUsers)=> {
                return {
                    items:res.items,
                    total_count:res.total_count
                }
            }
        }),
        getUserRepos:build.query<IFetchRepo[],string>({
            query:(userName:string)=> ({
                url:`users/${userName}/repos`
            })
        })

    })
})

export const {useSearchUserQuery,useLazyGetUserReposQuery}=githubApi
