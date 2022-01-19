import searchSvg from '../styles/svg/search.svg';
import { SpecialButton } from './SpacialButton';

export function Search() {

    return (<button className="search">
        <p>Start your search</p>
        <img src={searchSvg} className="search-svg" alt=""/>
        {/* <div className='spacial-btn'>
        <SpecialButton text={<img src={searchSvg} className="search-svg" alt=""/>}/>
        </div> */}
    </button>)
}