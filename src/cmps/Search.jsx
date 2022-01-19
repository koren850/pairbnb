import searchSvg from '../styles/svg/search.svg';

export function Search() {

    return (<button className="search">
        <p>Start your search</p>
<img src={searchSvg} className="search-svg" alt=""/>
    </button>)
}