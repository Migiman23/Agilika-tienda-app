<template>
  <div>
      <br> <br>
      <h1>Lista de productos</h1>
      <router-link to="/producto">
          <button class="btn btn-success btn-block">Agregar</button>
      </router-link>
      <ul class="list-group mt-5">
        <li
            class="list-group-item"
            v-for="producto in productos"
            :key="producto.id"
            >
            {{producto.id}} - {{producto.nombre}}
            <div class="float-right">
                <router-link
                :to="{ name: 'Editar', params: {id: producto.id} }"
            >
                <button class="btn btn-warning btn-sm">Editar</button>
            </router-link>
            <button @click="deleteProducto(producto.id)" class="btn btn-danger btn-sm ml-2">Eliminar</button>
            </div>
        </li> 
      </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    name:"Inicio",
    created(){
        this.getProductos()
    },
    methods: {
        ...mapActions('producto',['getProductos','deleteProducto'])
    },
    computed: {
        ...mapState('producto',['productos'])
    }
}
</script>

<style>

</style>