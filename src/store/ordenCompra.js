import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { firebase, db, auth, storage } from '../firebase'
import router from '../router'

Vue.use(Vuex)

export default {
    namespaced: true,
    state: {
        ordenes: [],
        ordenCompra: null
    },
    mutations: {
        setOrdenes(state, payload) {
            state.ordenes = payload
        },
        setOrden(state, payload) {
            state.orden = payload
        },
        setDeleteOrden(state, payload) {
            state.ordenes = state.ordenes.filter(orden => orden.id !== payload)
        },
    },
    actions: {
        async getOrdenes({ commit, state }) {
            try {
                let datos = await axios.get(`https://us-central1-api-udemy-1.cloudfunctions.net/getOrden`)
                console.log(datos.data)
                commit('setOrdenes', datos.data)
            } catch (error) {
                console.log(error)
            }
        },
        async setEstatus({ commit }, ordenCompra) {
            try {
               /*  let req = await axios.put(`https://us-central1-api-udemy-1.cloudfunctions.net/updateOrdenC/${ordenCompra.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(ordenCompra)
                }) */
                const { data } = await axios.put(
                    `https://us-central1-api-udemy-1.cloudfunctions.net/updateOrdenC/${ordenCompra.id}`,
                    ordenCompra
                  );
                  console.log(data)
                // const dataDb = await req.json()
                // console.log(dataDb)
            } catch (error) {
                console.log(error)
            }
        }
    },
    getters: {

    }
}