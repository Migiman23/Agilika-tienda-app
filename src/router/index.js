import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from '../firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import('../views/Registro.vue')
  },
  {
    path: '/producto',
    name: 'Crear',
    component: () => import('../views/producto/Crear.vue'),
    meta: { requiresAuth: true}
  },
  {
    path: '/producto/detalle/:id',
    name: 'Detalle',
    component: () => import('../views/producto/Detalle.vue')
  },
  {
    path: '/productos',
    name: 'Lista',
    component: () => import('../views/producto/Lista.vue'),
    meta: { requiresAuth: true}
  },
  {
    path: '/editar/:id',
    name: 'Editar',
    component: () => import('../views/producto/Editar.vue'),
    meta: { requiresAuth: true}
  },
  {
    path: '/carrito',
    name: 'Carrito',
    component: () => import('../views/carrito/Carrito.vue'),
    // meta: { requiresAuth: true}
  },
  {
    path: '/listaOrden',
    name: 'ListaOrden',
    component: () => import('../views/ordenCompra/ListaOrden.vue'),
    // meta: { requiresAuth: true}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    const usuario = auth.currentUser
    // console.log(usuario)
    if(!usuario) {
      next({path: '/login'})
    } else if(usuario.email === 'admin@admin.com') {
      next()
    } else {
      next({path: '/login'}) // Cambiar a página: "No eres admin"
    }
  } else { // si la ruta no está protegida "deja pasar al usuario"
    next()
  }
})
export default router
