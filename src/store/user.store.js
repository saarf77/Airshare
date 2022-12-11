import { userService } from '../services/user.service'
import { socketService, SOCKET_EMIT_USER_WATCH, SOCKET_EVENT_USER_UPDATED } from '../services/socket.service'

// var localLoggedinUser = null
// if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user || null)

export const userStore = {
    state: {
        loggedinUser: null,
        users: [],
        watchedUser: null
    },
    getters: {
        users({ users }) { return users },
        loggedinUser({ loggedinUser }) {
             console.log("🚀 ~ file: user.store.js:16 ~ loggedinUser ~ loggedinUser", loggedinUser)
             return loggedinUser 
            },
        watchedUser({ watchedUser }) { 
            console.log("🚀 ~ file: user.store.js:17 ~ watchedUser ~ watchedUser", watchedUser)
            // console.log(watchedUser)
            return watchedUser 
        }
    },
    mutations: {
        setLoggedinUser(state, { user }) {
            console.log('FROM LOGGED',user)
            // Yaron: needed this workaround as for score not reactive from birth
            state.loggedinUser = (user)? {...user} : null
        },
        setWatchedUser(state, { user }) {
            state.watchedUser = user
            console.log('FROM WATCHED',state.watchedUser)

        },       
        setUsers(state, { users }) {
            state.users = users
        },
        removeUser(state, { userId }) {
            state.users = state.users.filter(user => user._id !== userId)
        },
        setUserScore(state, { score }) {
            state.loggedinUser.score = score
        },
    },
    actions: {
        async login({ commit }, { userCred }) {
            console.log("🚀 ~ file: user.store.js:48 ~ login ~ userCred", userCred)
            try {
                const user = await userService.login(userCred)
                commit({ type: 'setLoggedinUser', user })
                return user
            } catch (err) {
                console.log('userStore: Error in login', err)
                throw err
            }
        },
        async signup({ commit }, { userCred }) {
            try {
                const user = await userService.signup(userCred)
                commit({ type: 'setLoggedinUser', user })
                return user
            } catch (err) {
                console.log('userStore: Error in signup', err)
                throw err
            }

        },
        async logout({ commit }) {
            try {
                await userService.logout()
                commit({ type: 'setLoggedinUser', user: null })
            } catch (err) {
                console.log('userStore: Error in logout', err)
                throw err
            }
        },
        async loadUsers({ commit }) {
            // TODO: loading
            try {
                const users = await userService.getUsers()
                // console.log('THIS IS WHAT IM LOOKING ',users)
                commit({ type: 'setUsers', users })
            } catch (err) {
                console.log('userStore: Error in loadUsers', err)
                throw err
            }
        },        
        async loadAndWatchUser({ commit }, { userId }) {
            try {
                console.log('HI IM FROM LOADHATRA',userId)
                const user = await userService.getById(userId)
                console.log('im from loadWatch',user)
                commit({ type: 'setWatchedUser', user })
                
            } catch (err) {
                console.log('userStore: Error in loadAndWatchUser', err)
                throw err
            }
        },
        async removeUser({ commit }, { userId }) {
            try {
                await userService.remove(userId)
                commit({ type: 'removeUser', userId })
            } catch (err) {
                console.log('userStore: Error in removeUser', err)
                throw err
            }
        },
        async updateUser({ commit }, { user }) {
            try {
                user = await userService.update(user)
                commit({ type: 'setUser', user })
            } catch (err) {
                console.log('userStore: Error in updateUser', err)
                throw err
            }

        },
        async increaseScore({ commit }) {
            try {
                const score = await userService.changeScore(100)
                commit({ type: 'setUserScore', score })
            } catch (err) {
                console.log('userStore: Error in increaseScore', err)
                throw err
            }
        },
        // Keep this action for compatability with a common user.service ReactJS/VueJS
        setWatchedUser({commit}, payload) {
            commit(payload)
        },       

    }
}