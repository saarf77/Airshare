import { stayService } from '../services/stay.service.local'

export function getActionRemoveCar(carId) {
    return {
        type: 'removeCar',
        carId
    }
}
export function getActionAddCar(car) {
    return {
        type: 'addCar',
        car
    }
}
export function getActionUpdateCar(car) {
    return {
        type: 'updateCar',
        car
    }
}

export function getActionAddCarMsg(carId) {
    return {
        type: 'addCarMsg',
        carId,
        txt: 'Stam txt'
    }
}

export const stayStore = {
    state: {
        cars: []
    },
    getters: {
        cars({cars}) { return cars },
    },
    mutations: {
        setCars(state, { cars }) {
            state.cars = cars
        },
        addCar(state, { car }) {
            state.cars.push(car)
        },
        updateCar(state, { car }) {
            const idx = state.cars.findIndex(c => c.id === car._id)
            state.cars.splice(idx, 1, car)
        },
        removeCar(state, { carId }) {
            state.cars = state.cars.filter(car => car._id !== carId)
        },
        addCarMsg(state, { carId , msg}) {
            const car = state.cars.find(car => car._id === carId)
            if (!car.msgs) car.msgs = []
            car.msgs.push(msg)
        },
    },
    actions: {
        async addCar(context, { car }) {
            try {
                car = await stayService.save(car)
                context.commit(getActionAddCar(car))
                return car
            } catch (err) {
                console.log('stayStore: Error in addCar', err)
                throw err
            }
        },
        async updateCar(context, { car }) {
            try {
                car = await stayService.save(car)
                context.commit(getActionUpdateCar(car))
                return car
            } catch (err) {
                console.log('stayStore: Error in updateCar', err)
                throw err
            }
        },
        async loadCars(context) {
            try {
                const cars = await stayService.query()
                context.commit({ type: 'setCars', cars })
            } catch (err) {
                console.log('stayStore: Error in loadCars', err)
                throw err
            }
        },
        async removeCar(context, { carId }) {
            try {
                await stayService.remove(carId)
                context.commit(getActionRemoveCar(carId))
            } catch (err) {
                console.log('stayStore: Error in removeCar', err)
                throw err
            }
        },
        async addCarMsg(context, { carId, txt }) {
            try {
                const msg = await stayService.addCarMsg(carId, txt)
                context.commit({type: 'addCarMsg', carId, msg })
            } catch (err) {
                console.log('stayStore: Error in addCarMsg', err)
                throw err
            }
        },

    }
}