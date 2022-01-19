import { stayService } from "../services/stay.service";

export function loadStays() {
    return (dispatch, getState) => {
        // const { filterBy } = getState().stayModule
        const filterBy = null
        let sort;

        if (filterBy) sort = filterBy.sortBy;
        stayService.query(filterBy)
            .then(stays => {
                if (sort) {
                    stays.sort((a, b) => {
                        const aSort = a[sort];
                        const bSort = b[sort];
                        if (aSort < bSort) return -1;
                        else if (bSort < aSort) return 1;
                        else return 0;
                    })
                    if (filterBy.isSortReverese) stays.reverse()
                }
                const action = { type: 'SET_TOYS', stays };
                dispatch(action)
            })
    }
}



export function removeStay(stayId) {
    return (dispatch) => {
        return stayService.remove(stayId)
            .then(() => {
                console.log('Todo Deleted!')
                const action = { type: 'REMOVE_TOY', stayId }
                dispatch(action)
                return Promise.resolve()
            })
            .catch(err => {
                console.log('err:', err);
            })
    }
}

export function updateStayContent(stayToUpdate) {
    return (dispatch) => {
        return stayService.save(stayToUpdate)
            .then(stayToUpdate => {
                const action = { type: 'UPDATE_TOY', stayToUpdate }
                console.log('stay updated!');
                dispatch(action)
                return Promise.resolve()
            })
            .catch(err => {
                console.log('err:', err);
            })
    }
}

export function addStay(stay) {
    return (dispatch) => {
        return stayService.save(stay)
            .then(newTodo => {
                const action = { type: 'ADD_TOY', newTodo };
                dispatch(action)
                return Promise.resolve()
            })
    }
}

export function setFilter(filterBy) {
    return (dispatch) => {
        const action = { type: 'SET_FILTER', filterBy };
        dispatch(action)
        return Promise.resolve()
    }
}