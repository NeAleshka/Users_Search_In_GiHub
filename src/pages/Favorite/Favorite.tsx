import React from 'react';
import {useAppSelector} from "../../hooks";
import FavoriteCard from "../../components/FavoritesCard/FavoriteCard";
import styles from './Favorite.module.css'

const Favorite = () => {
    const favoritesRepos=useAppSelector(state => state.favoritesCards.favoritesCards)

    return (
        <div className={styles.wrapper}>
            {
                favoritesRepos?.map(repo => <FavoriteCard stargazers_count={repo.stargazers_count} name={repo.name} language={repo.language} html_url={repo.html_url} id={repo.id} key={repo.id} owner={repo.owner}/>)
            }
        </div>
    );
};

export default Favorite;