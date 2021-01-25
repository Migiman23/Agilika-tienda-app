<template>
  <div class="navbar navbar-dark bg-dark text-white">
    <router-link to="/" class="navbar-brand">
       <a @click="getProductos" >Inicio</a>
    </router-link>

    <!--   <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Buscar" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0">Buscar</button>
    </form> -->
    <div class="d-flex">
      {{usuario ? usuario.email : ''}}
        <div v-if="usuario && usuario.email.trim() !== ''">
          <button class="btn btn-dark" @click="cerrarSesion">Cerrar sesión</button>
        </div>
        <div v-else>
            <router-link class="btn btn-dark" to="/login">
                Iniciar sesión
            </router-link>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
export default {
  name:'NavBar',
  computed:{
    ...mapState('usuario',['usuario']),
    ...mapGetters('usuario',['esAdmin']),
    logeado() {
      return this.usuario && this.usuario.email.trim() !== '' ? 'Cerrar sesión' : 'Iniciar sesión'
    },
    
  },
  methods: {
    ...mapActions('usuario',['cerrarSesion']),
    ...mapActions('producto',['getProductos'])
  }
};
</script>

<style></style>
