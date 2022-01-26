import { httpService } from './http.service'

export const orderService = {
    query,
    getById,
    save,
    remove,

}

async function query() {
    const stays = await httpService.get(`order`);
    return stays;
}


async function getById(stayId) {
    const stay = await httpService.get(`order/${stayId}`)
    return stay

}

async function remove(stayId) {
    return httpService.delete(`order/${stayId}`)
}

function save(order) {
    return httpService.post(`order`, order)
}


// function subscribe(listener) {
//     listeners.push(listener)
// }

// function _notifySubscribersStaysChanged(stays) {
//     console.log('Notifying Listeners');
//     listeners.forEach(listener => listener(stays))
// }

// window.addEventListener('storage', () => {
//     console.log('Storage Changed from another Browser!');
//     query()
//         .then(stays => {
//             _notifySubscribersStaysChanged(stays)
//         })
// })






