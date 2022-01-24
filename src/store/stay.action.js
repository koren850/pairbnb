import { stayService } from '../services/stay.service.js'

export function loadStays(filterBy) {
    return async (dispatch) => {
        try {
            const stays = await stayService.query(filterBy)
            dispatch({ type: 'SET_STAYS', stays });
        } catch {
            console.log('could not get stays ');
        }
    };
}
export function loadSearchedStays(searchParams) {
    return async (dispatch) => {
        try {
            const stays = await stayService.searchStays(searchParams)
            dispatch({ type: 'SET_STAYS', stays });
            dispatch({ type: 'SET_PARAMS', searchParams });

        } catch {
            console.log('could not get stays ');
        }
    };
}

//consider use
// export function removeStay(stayId) {
//     return async (dispatch) => {
//         await stayService.remove(stayId)
//         console.log('Deleted Succesfully!');
//         dispatch({ type: 'REMOVE_TOY', stayId })
//     }
// }

export function addStay(stay) {
    return async (dispatch) => {
        try {
            const savedStay = await stayService.save(stay)
            const action = { type: 'ADD_STAY', stay: savedStay }
            dispatch(action)
        }
        catch {
            console.error('canot add stay')
        }
    }
}

//consider use
// export function updateStay(stay) {
//     return async (dispatch) => {
//         try {
//             const savedStay = await stayService.save(stay)
//             console.log('Updated Stay:', savedStay);
//             dispatch({ type: 'UPDATE_STAY', stay: savedStay })
//         }
//         catch {
//             console.log('cannot update stay')
//         }
//     }
// }

//for futre consider make dynamic dispach *******
export function setFilterBy(filterBy, stayType, stayPrice, searchParams) {
    return async (dispatch) => {
        try {
            const stays = await stayService.query(filterBy, stayType, stayPrice, searchParams)
            dispatch({ type: 'SET_FILTER', filterBy });
            dispatch({ type: 'SET_STAYS', stays });
        }
        catch {
            console.log('cannot filter stays')
        }
    }
}

export function setSortBy(filterBy, stayType, stayPrice, searchParams) {
    return async (dispatch) => {
        try {
            const stays = await stayService.query(filterBy, stayType, stayPrice, searchParams)
            dispatch({ type: 'SET_STAY_TYPE', stayType });
            dispatch({ type: 'SET_STAYS', stays });
        }
        catch {
            console.log('cannot filter stays')
        }
    }
}

export function setByRange(filterBy, stayType, stayPrice, searchParams) {
    return async (dispatch) => {
        try {
            const stays = await stayService.query(filterBy, stayType, stayPrice, searchParams)
            dispatch({ type: 'SET_STAY_RANGE', stayPrice });
            dispatch({ type: 'SET_STAYS', stays });
        }
        catch {
            console.log('cannot filter stays')
        }
    }
}