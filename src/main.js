import Vue from 'vue'
import Vuelidate from 'vuelidate'
import { BootstrapVue } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import router from './router'
import store from './store'
import { auth } from './firebase';

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(BootstrapVue)

//Verificamos si ya existe un usuario logeado
// Método "observador" detecta los cambios de sesión
auth.onAuthStateChanged(user => {
    if(user) {
      // console.log(user)
      const viewUser = {
        email: user.email,
        uid: user.uid,
        admin: user.email === 'admin@admin.com' ?  true : false
      }
      store.dispatch('usuario/detectarUsuario',viewUser)
    } else {
      // console.log(user)
      store.dispatch('usuario/detectarUsuario',user)
    }
    
  new Vue({
    router,
    store,
    //Vuelidate,
    render: h => h(App)
  }).$mount('#app')

})

