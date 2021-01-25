<template>
  <div class="container">
    <div class="row">
      <div class="col-md-9">
        <div class="container row my-4">
          <div v-for="producto in productosFiltrados" :key="producto.id">
            <Card :productoCarrito="producto" />
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card mt-4 mr-2" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">Total: ${{ totalCarrito? totalCarrito.toLocaleString() : ''}} MXN</h5>
            <h6 class="card-title">{{ cantidadProductos }} productos</h6>
            <p class="card-text">
              Envío gratis
            </p>
            <!--   <a to="/producto" class="btn btn-primary">Ver</a> -->
            <div class="text-center">
              <button class="btn btn-warning btn-sm ml-2" @click="getProductosAxios">
                Comprar carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import Card from "./CardCarrito";

export default {
  components: {
    Card,
  },
  props: {
  },
  data() {
    return {
    };
  },
  created() {
  },
  computed: {
    ...mapState('carrito',['totalCarrito','cantidadProductos']),
    ...mapGetters('carrito', ['productosFiltrados']),
  },
  methods: {
    ...mapActions('producto',['getProductosAxios'])
  },
};
</script>

<style></style>
