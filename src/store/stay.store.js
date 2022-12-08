// import { stayService } from '../services/stay.service.local.js'
import { stayService } from '../services/stay.service.js'

export function getActionRemoveStay(stayId) {
    return {
        type: 'removeStay',
        stayId
    }
}
export function getActionAddStay(stay) {
    return {
        type: 'addStay',
        stay
    }
}
export function getActionUpdateStay(stay) {
    return {
        type: 'updateStay',
        stay
    }
}

export function getActionAddStayMsg(stayId) {
    return {
        type: 'addStayMsg',
        stayId,
        txt: 'Stam txt'
    }
}

export const stayStore = {
    state: {
        stays: [],
        filterBy: null,
        labels: stayService.getLabels(),
        maps: stayService.getMaps(),

    },
    getters: {
        stays({ stays }) {
            return stays
        },
        getLabels({ labels }) {
            return labels
        },
        getMaps({ maps }) {
            return maps;
          },
    },
    mutations: {
        setStays(state, { stays }) {
            state.stays = stays
        },
        setFilter(state,{filterBy}){
            state.filterBy = filterBy
          },
        addStay(state, { stay }) {
            state.stays.push(stay)
        },
        updateStay(state, { stay }) {
            const idx = state.stays.findIndex(c => c.id === stay._id)
            state.stays.splice(idx, 1, stay)
        },
        removeStay(state, { stayId }) {
            state.stays = state.stays.filter(stay => stay._id !== stayId)
        },
        addStayMsg(state, { stayId, msg }) {
            const stay = state.stays.find(stay => stay._id === stayId)
            if (!stay.msgs) stay.msgs = []
            stay.msgs.push(msg)
        },
    },
    actions: {
        async addStay(context, { stay }) {
            try {
                stay = await stayService.save(stay)
                context.commit(getActionAddStay(stay))
                return stay
            } catch (err) {
                console.log('stayStore: Error in addStay', err)
                throw err
            }
        },
        async updateStay(context, { stay }) {
            try {
                stay = await stayService.save(stay)
                context.commit(getActionUpdateStay(stay))
                return stay
            } catch (err) {
                console.log('stayStore: Error in updateStay', err)
                throw err
            }
        },
        async loadStays(context , {userId}) {
            try {
                var filterBy ={}
                console.log(userId)
                if(userId){
                    filterBy.byUserId = userId
                }
                console.log("🚀 ~ file: stay.store.js:97 ~ loadStays ~ filterBy", filterBy)
                // var filterBy = context.state.filterBy ? context.state.filterBy : ''
                const stays = await stayService.query(filterBy)
                context.commit({ type: 'setStays', stays })
                console.log(stays)
            } catch (err) {
                console.log('stayStore: Error in loadStays', err)
                throw err
            }
        },
        setFilter({ commit, dispatch }, { filterBy }) {
            commit({ type: 'setFilter', filterBy })
            dispatch({ type: 'loadStays' })
        },
        async removeStay(context, { stayId }) {
            try {
                await stayService.remove(stayId)
                context.commit(getActionRemoveStay(stayId))
            } catch (err) {
                console.log('stayStore: Error in removeStay', err)
                throw err
            }
        },
        async addStayMsg(context, { stayId, txt }) {
            try {
                const msg = await stayService.addStayMsg(stayId, txt)
                context.commit({ type: 'addStayMsg', stayId, msg })
            } catch (err) {
                console.log('stayStore: Error in addStayMsg', err)
                throw err
            }
        },

    }
}