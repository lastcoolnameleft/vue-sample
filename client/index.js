import Vue from 'vue'
//import store from './store'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'

Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://localhost:80',
}))

new Vue({
    render: h => h(App)
}).$mount('#app')
