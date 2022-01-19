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

export function removeStay(stayId) {
    console.log(stayId);
    return async (dispatch) => {
        await stayService.remove(stayId)
        console.log('Deleted Succesfully!');
        dispatch({ type: 'REMOVE_TOY', stayId })
    }
}

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


export function updateStay(stay) {
    return async (dispatch) => {
        try {
            const savedStay = await stayService.save(stay)
            console.log('Updated Stay:', savedStay);
            dispatch({ type: 'UPDATE_STAY', stay: savedStay })
        }
        catch {
            console.log('cannot update stay')
        }
    }
}

export function setFilterBy(filterBy) {
    return async (dispatch) => {
        let sort;
        if (filterBy) sort = filterBy.sortBy;
        try {
            const stays = await stayService.query(filterBy)
            if (sort) {
                stays.sort((a, b) => {
                    const aSort = a[sort];
                    const bSort = b[sort];
                    if (aSort < bSort) return -1;
                    else if (bSort < aSort) return 1;
                    else return 0;
                })
            }
            dispatch({ type: 'SET_FILTER_BY', filterBy });
            dispatch({ type: 'SET_TOYS', stays });
        }
        catch {
            console.log('cannot filter stays')
        }
    }
}

export function toggleDetails(set) {
    return (dispatch) => {
        try {
            dispatch({ type: 'TOGGLE_HEADER_LAYOUT', set });
        } catch {
            console.log('could not toggle ');
        }
    };
}

