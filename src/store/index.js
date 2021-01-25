import Vue from 'vue'
import Vuex, { Store } from 'vuex'

import usuario from "./usuario";
import producto from "./producto";
import carrito from './carrito';
import ordenCompra from './ordenCompra';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    usuario: usuario,
    producto: producto,
    carrito: carrito,
    ordenCompra: ordenCompra
  }
})
