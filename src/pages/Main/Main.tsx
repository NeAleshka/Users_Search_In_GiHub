import React, {useEffect, useState} from 'react';
import styles from './Main.module.css'
import {useLazyGetUserReposQuery, useSearchUserQuery} from "../../store/githubApi";
import {useDebounce} from "../../hooks";
import RepoCard from "../../components/RepoCard/RepoCard";

const Main = () => {
    const [search, setSearch] = useState<string>('')
    const debounce = useDebounce(search)
    const {isLoading, isError, data: users} = useSearchUserQuery(debounce, {
        skip: debounce.length < 3,
    })

    let [getRepos, {
        isSuccess: isSuccessFetchRepos,
        isLoading: isGetRepoLoading,
        data: userRepos,
    }] = useLazyGetUserReposQuery()
    const [showUsersList, setShowUsersList] = useState<boolean>(false)

    const searchUserClick = (userName: string) => {
        localStorage.setItem('searchUser', userName)
        setShowUsersList(false)
        getRepos(userName)
    }

    useEffect(() => {
        getRepos(localStorage.getItem('searchUser')??'')
    }, [])

    useEffect(() => {
        setShowUsersList(debounce.length > 3 && users?.items.length != 0)
    }, [debounce])
    return (
        <>
            <div className={styles.wrapper}>
                <input className={styles.search_input}
                       placeholder={'Search Users...'}
                       value={search}
                       onChange={(e) => setSearch(e.currentTarget.value)}
                />
                {isLoading && <div> Loading Users...</div>}
                {isGetRepoLoading && <div> Loading repos...</div>}
                {isError && <div>Sorry we have error :( </div>}
                <div className={styles.popup}>
                    {!showUsersList && !userRepos?.length && isSuccessFetchRepos && <div>Users don`t have Repos </div>}
                    {
                        showUsersList && users?.items.map(user =>
                            <div className={'hover:bg-blue-400'} key={user.id}
                                 onClick={() => searchUserClick(user.login)}>
                                {user.login}
                            </div>)
                    }
                    {
                        !showUsersList && userRepos?.map((repo) =>
                            <RepoCard key={repo.id} name={repo.name}
                                      language={repo.language}
                                      html_url={repo.html_url}
                                      stargazers_count={repo.stargazers_count}
                                      owner={repo.owner}
                                      id={repo.id}
                            />)
                    }
                </div>
            </div>
        </>

    );
};

export default Main;