import Vue from 'vue'
import Vuex from 'vuex'
import { db, auth, storage } from '../firebase'
import router from '../router'

Vue.use(Vuex)

export default {
    namespaced: true,
    state: {
        usuario: null,
        error: null
    },
    mutations: {
        setUsuario(state, payload) {
            state.usuario = payload
        },
        setError(state, payload) {
            state.error = payload
            console.log(payload)
        },
    },
    actions: {
        crearUsuario({ commit }, usuario) {
            auth.createUserWithEmailAndPassword(usuario.email, usuario.password)
                .then(res => {
                    const usuarioCreado = {
                        email: res.user.email,
                        uid: res.user.uid
                    }
                    commit('setUsuario', usuarioCreado)
                    router.push('/')
                    localStorage.setItem('usuario', JSON.stringify(usuarioCreado))
                })
                .catch(error => {
                    commit('setError', error.code)
                })
        },
        inicioSesion({ commit }, usuario) {
            auth.signInWithEmailAndPassword(usuario.email, usuario.password)
                .then(res => {
                    const usuario = {
                        email: res.user.email,
                        uid: res.user.uid,
                        admin: res.user.email === 'admin@admin.com' ? true : false
                    }
                    commit('setUsuario', usuario)
                    router.push('/') // Cómo saber si ya esta en la raíz para que no se duplique?
                    localStorage.setItem('usuario', JSON.stringify(usuario))
                })
                .catch(error => {
                    alert(error)
                    commit('setError', error.code)
                })
        },
        cerrarSesion({ commit }, usuario) {
            auth.signOut()
                .then(() => {

                    let nuevo = {
                        nombre: '',
                        email: '',
                        password: '',
                        admin: false
                    }
                    commit('setUsuario', nuevo)
                    router.push('/')
                    localStorage.removeItem('usuario')
                    alert('Adiooos')
                })
        },
        detectarUsuario({ commit }, usuario) {
            commit('setUsuario', usuario)
        }
    },
    getters: {
        existeUsuario(state) {
            if (state.usuario) {
                return true
            } else
                return false
        },
        esAdmin(state) {
            if (state.usuario && state.usuario.admin === true) {
                return true
            } else
                return false
        },
        getIdUsuario(state) {
            return state.usuario ? state.usuario.uid : null
        }
    }
}