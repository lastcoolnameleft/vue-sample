import Vue from 'vue'
import Vuex from 'vuex'
//import store from './store'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        count: 1,
        roomName: '',
    },
    mutations: {
        setCount(state, count) {
            state.count = count
        },
        setRoomName(state, roomName) {
            state.roomName = roomName
        },
    },
    actions: {
        increment(context) {
            context.commit('increment')
        }
    },
    getters: {
        roomName: state => {
            return state.roomName
        },
        count: state => {
            return state.count
        },
        countUnit: state => {
            console.log(state.count + " Units")
            return state.count + " Units"
        }
    }
})


Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://localhost:80',
}))

new Vue({
    store,
    render: h => h(App)
}).$mount('#app')
