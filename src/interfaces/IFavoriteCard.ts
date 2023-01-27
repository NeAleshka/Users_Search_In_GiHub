import {IFetchRepo} from "./IFethRepo";

export type FavoriteRepo=Pick<IFetchRepo, 'html_url'| 'name' |'language'| 'stargazers_count' |'owner'|'id' >

