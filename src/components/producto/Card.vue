<template>
  <div class="card mt-4 mr-2" style="width: 18rem;">
    <div v-if="producto.imagen">
      <img class="card-img-top" alt="Card image cap" :src="producto.imagen" />
    </div>
    <div v-else>
      <img class="card-img-top" alt="Card image cap" src="../../assets/imgNF.jpg"/>
    </div>
    <div class="card-body">
      <h5 class="card-title">{{producto.nombre + ' ' +producto.modelo}}</h5>
      <p class="card-text">
        {{producto.descripcion.substr(0, 50) + '...'}}
      </p>
      <!--   <a to="/producto" class="btn btn-primary">Ver</a> -->
      <div class="text-center">
        <div class="btn-group" role="group" aria-label="Basic example">
        <router-link class="btn btn-primary btn-sm " :to="{ name: 'Detalle', params: {id: producto.id} }">
          Detalles
        </router-link>
       <!--  <button @click="addOnCarrito({ idUser: usuario.uid, idProd: producto.id })" class="btn btn-warning btn-sm">Carrito</button> -->
        <router-link
          v-if="esAdmin"
          class="btn btn-success btn-sm "
          :to="{ name: 'Editar', params: {id: producto.id} }"
          >
          Editar
        </router-link>
        <button
          v-if="esAdmin"
          @click="deleteProducto(producto.id)"
          class="btn btn-danger btn-sm "
          >
          Eliminar
        </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  props: {
    producto: Object
  },
  computed: {
    ...mapState("usuario", ["usuario"]),
    ...mapGetters("usuario", ["esAdmin"]),
  },
  methods: {
      ...mapActions('producto',['deleteProducto']),
      ...mapActions('carrito',['addOnCarrito'])
  }
};
</script>

<style>
.card {
  background-color: whitesmoke;
}
.card-img-top { 
    height: 150px;
} 
</style>
