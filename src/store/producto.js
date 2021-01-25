import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {firebase, db, auth, storage} from '../firebase'
import router from '../router'
import store from '../store'
Vue.use(Vuex)

const productoVacio = {
    color: '',
    descripcion: '',
    modelo: '',
    nombre: '',
    precio: 0,
    stock: 1,
    tipo: '',
    imagen: null
}

export default {
    namespaced: true,
    state: {
        productos: [],
        productosTemp: [],
        producto: productoVacio,
        tituloCategoria: 'Todas',
    },
    mutations: {
        setProductos(state, payload) {
            state.productos = payload
            state.productosTemp = payload
            state.tituloCategoria = 'Todas'
            // console.log(state.productos)
        },
        setProducto(state, payload) {
            state.producto = payload
        },
        setDeleteProducto(state, payload) {
            state.productos = state.productos.filter(tar => tar.id !== payload)
        },
        async setImagenProducto (state, payload) {
            try {
                
                const refImagen = storage.ref().child('imgProductos').child(payload.idProducto)
                const res = await refImagen.put(payload.imagen)

                const urlImagen = await refImagen.getDownloadURL()
                await db.collection('productos').doc(payload.idProducto).update({
                    imagen: urlImagen
                })
            } catch (error) {
                alert(error)
                console.log(error)
            }
        },
        setFiltroLaptop(state) {
            state.productos = state.productosTemp.filter(prod => prod.tipo === 'Laptop')
            state.tituloCategoria = 'Laptops'
        },
        setFiltroCelular(state) {
            state.productos = state.productosTemp.filter(prod => prod.tipo === 'Celular')
            state.tituloCategoria = 'Celulares'
        },
        setFiltroMonitor(state) {
            state.productos = state.productosTemp.filter(prod => prod.tipo === 'Monitor')
            state.tituloCategoria = 'Monitores'
        },
        setFiltroTodas(state) {
            state.productos = state.productosTemp
            state.tituloCategoria = 'Todas'
        }

    },
    actions: {
        getProductos({ commit }) {
            const productos = []
            db.collection('productos').where('stock', '>', 0).get() //Regresa una promesa
                .then(res => {
                    res.forEach(doc => {
                        let producto = doc.data()
                        producto.precioString = producto.precio.toLocaleString()
                        producto.id = doc.id
                        productos.push(producto)
                    })
                    commit('setProductos', productos)
                })
        },
        async getProductosAxios({commit}) {
            //let datos = await axios.get(`https://us-central1-api-udemy-1.cloudfunctions.net/app/api/productos`)
            console.log('no')
        },
        getProducto({ commit }, idProducto) {
            db.collection('productos').doc(idProducto).get()
                .then(doc => {
                    let producto = doc.data()
                    producto.precioString = producto.precio.toLocaleString()
                    producto.id = doc.id
                    commit('setProducto', producto)
                })
        },
        editProducto({ commit }, producto) {
            db.collection('productos').doc(producto.id).update({
                color: producto.color,
                descripcion: producto.descripcion,
                modelo: producto.modelo,
                nombre: producto.nombre, // Hace referencia al nombre de la marca
                precio: producto.precio,
                stock: producto.stock,
                tipo: producto.tipo
            })
                .then(() => {
                    if(producto.imagen){
                        const img = {
                            imagen: producto.imagen,
                            idProducto: producto.id
                        }
                        commit('setImagenProducto',img)
                        /* Refrescar los productosde la lista inicial
                        const productos = []
                        db.collection('productos').get() //Regresa una promesa
                            .then(res => {
                                res.forEach(doc => {
                                    let producto = doc.data()
                                    producto.id = doc.id
                                    productos.push(producto)
                                })
                                commit('setProductos', productos)
                            }) */
                    }
                    commit('setProducto', productoVacio)
                    router.push('/')
                })
        },
        setProducto({ commit },producto) {
            // Para crear un registro con id automática se utiliza "add" sin id "set" (doc(id).set(obj))
            db.collection('productos').add({
                color: producto.color,
                descripcion: producto.descripcion,
                modelo: producto.modelo,
                nombre: producto.nombre, // Hace referencia al nombre de la marca
                precio: producto.precio,
                stock: producto.stock,
                tipo: producto.tipo
            })
                .then(doc => {
                    if(producto.imagen){
                        const img = {
                            imagen: producto.imagen,
                            idProducto: doc.id
                        }
                        commit('setImagenProducto',img)
                    }
                    commit('setProducto', productoVacio)
                    router.push('/')
                })
        },
        deleteProducto({ commit, dispatch }, idProducto) {
            db.collection('productos').doc(idProducto).delete()
                .then(() => {
                    // dispatch('getProductos')
                    commit('setDeleteProducto', idProducto)
                    // alert('producto eliminada')
                })
        },
        subirImagenProducto({commit}, imagen){
            if(imagen){
                commit('setImagenProducto',imagen)
            }
        },
        comprarUno({commit}, producto) {
            db.collection('ordenCompra').add({
                idUsuario: producto.idUsuario,
                idProducto: producto.idProducto,
                cantidad: producto.cantidad,
                total: producto.total,
                estatus: "Solicitud",
                fecha: producto.fecha
            }).then(doc => {
                alert('Compra exitosa con el identificador: ' + doc.id)
            })
        },
        filtroLaptop({commit}) {
            commit('setFiltroLaptop')
        },
        filtroCelular({commit}) {
            commit('setFiltroCelular')
        },
        filtroMonitor({commit}) {
            commit('setFiltroMonitor')
        },
        filtroTodas({commit}) {
            commit('setFiltroTodas')
        }
    },
    getters: {
        getUno: (state) => (id) => { // A pero si no hay nada en la lista?
            let uno = state.productosTemp.filter(prod => prod.id === id)
            console.log('buscar por',id, uno,'en: ',state.productosTemp)
            return uno
        }
    }
}
