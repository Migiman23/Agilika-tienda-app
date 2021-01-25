<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <!--   <a class="navbar-brand" href="/">Productos</a> -->
    <router-link to="/" class="navbar-brand">
      <a @click="filtroTodas" >Productos</a>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <!-- <a class="nav-item nav-link active" href="#">Home <span class="sr-only">(current)</span></a> -->
        <!--    <a class="nav-item nav-link" href="#">Laptops</a>
      <a class="nav-item nav-link" href="#">Celulares</a>
      <a class="nav-item nav-link" href="#">Monitores</a> -->
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-gray" @click="filtroLaptop">Laptops</button>
          <button type="button" class="btn btn-gray" @click="filtroCelular">Celulares</button>
          <button type="button" class="btn btn-gray" @click="filtroMonitor">Monitores</button>
        </div>
      </div>
    </div>
    <div class="d-flex">
      <div v-if="esAdmin">
        <router-link class="btn btn-primary" to="/listaOrden">
          Orden de compra
        </router-link>
        <router-link class="btn btn-primary ml-4" to="/producto">
          Nuevo producto
        </router-link>
      </div>
        <router-link class="btn btn-warning ml-4" to="/carrito">
          Carrito
        </router-link>
    </div>
  </nav>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "Categorias",
  computed: {
    ...mapState("usuario", ["usuario"]),
    ...mapGetters("usuario", ["esAdmin"]),
  },
  methods: {
    ...mapActions('producto',['getProductos','filtroLaptop', 'filtroCelular', 'filtroMonitor','filtroTodas'])
  }
};
</script>

<style></style>
