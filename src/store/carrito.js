import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '../firebase'
import router from '../router'

Vue.use(Vuex)

export default {
    namespaced: true,
    state: {
        carrito: [],
        totalCarrito: 0,
        cantidadProductos: 0
    },
    mutations: {
        setProductos(state, payload) {
            state.carrito = payload
        },
        setTotal(state, payload) {
            state.totalCarrito = payload.total
            state.cantidadProductos = payload.productos
        },
        setTotalSum(state, payload) {
            state.totalCarrito = state.totalCarrito + payload
            state.cantidadProductos = state.cantidadProductos + 1
        },
        setTotalRes(state, payload) {
            state.totalCarrito = state.totalCarrito - payload
            state.cantidadProductos = state.cantidadProductos - 1
        }
    },
    actions: {
        getCarrito({ commit }, idUsuario) {
            const productos = []
            let total = 0
            let productosNum= 0
            console.log(idUsuario)
            db.collection('carrito').where('idUsuario', '==', idUsuario).get()
                .then(res => {
                    res.forEach(doc => {
                        if (!doc.empty) {
                            let producto = doc.data()
                            producto.totalString = producto.total.toLocaleString()
                            producto.id = doc.id
                            productos.push(producto)

                            total += producto.precioUnitario * producto.cantidad;
                            productosNum += producto.cantidad
                        }
                    })

                    console.log(productos)
                    commit('setProductos', productos)
                    commit('setTotal', { total: total, productos: productosNum})

                })
        },
        agregarAlCarrito({ commit }, producto) {
            // Consultamos si ya existe el producto
            db.collection('carrito').where('idUsuario', '==', producto.idUsuario).where('idProducto', '==', producto.idProducto).get()
                .then((res) => {
                    if (!res.empty) {
                        const cantidadSum = res.docs[0].data().cantidad + producto.cantidad
                        console.log('nueva cantidad: ', cantidadSum)
                        db.collection('carrito').doc(res.docs[0].id).update({
                            cantidad: cantidadSum
                        })
                        return;
                    } else {
                        console.log('No existe: ', res)

                        db.collection('carrito').add({
                            idUsuario: producto.idUsuario,
                            idProducto: producto.idProducto,
                            cantidad: producto.cantidad,
                            precioUnitario: producto.total,
                            total: producto.total * producto.cantidad,
                            imagen: producto.imagen,
                            descripcion: producto.descripcion,
                            nombre: producto.nombre,
                            modelo: producto.modelo,
                            fecha: producto.fecha
                        }).then(doc => {
                            alert('Se agregó correctamente')
                        })
                    }
                }).catch(err => {
                    console.log('Error al obtener producto', err);
                });

        },
        cambiarCantidad({ commit }, producto) {
            db.collection('carrito').doc(producto.id).update({
                cantidad: producto.cantidad,
                total: producto.cantidad * producto.precioUnitario
            }).then(() => {
                console.log('Se modificó')
            }).catch(err => {
                console.log(err)
            })
        },
        sumarTotal({ commit }, cantidad) {
            commit('setTotalSum', cantidad)
        },
        restarTotal({ commit }, cantidad) {
            commit('setTotalRes', cantidad)
        },
        comprarCarrito({ commit }, idUsuario) {
            alert(`El usuario (${idUsuario}) compró todo :)`)
        }
    },
    getters: {
        productosFiltrados(state, getters, rootstate) {
            if (rootstate.usuario.usuario) {
                const user = rootstate.usuario.usuario
                const carrito = state.carrito.filter(car => car.idUsuario === user.uid)
                // console.log('usuario:',user)
                // console.log('state:',state.carrito)
                // console.log('filtrado:',carrito)
                return carrito
            }
        },
        cantidadProductos(state, getters, rootstate) {
            if (rootstate.usuario.usuario) {
                const user = rootstate.usuario.usuario
                const carrito = state.carrito.filter(car => car.idUsuario === user.uid)
                let cant = 0
                carrito.forEach((prod) => {
                    cant += Number(prod.cantidad)
                });
                return cant
            }
        },
        totalCarrito(state, getters, rootstate) {
            if (rootstate.usuario.usuario) {
                const user = rootstate.usuario.usuario
                const carrito = state.carrito.filter(car => car.idUsuario === user.uid)
                let total = 0
                carrito.forEach((prod) => {
                    total += prod.total * prod.cantidad;
                });
                // total = total.toLocaleString();
                return total
            }
        }
    }
}