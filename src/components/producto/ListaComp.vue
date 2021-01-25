<template>
  <div>
    <h2 class="text-center mt-4">{{ tituloCategoria }}</h2>
    <div class="container row my-4">
      <div v-for="producto in productos" :key="producto.id">
        <Card :producto="producto" class="card-custom" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Card from "./Card";

export default {
  components: {
    Card,
  },
  created() {
    //this.getProductos()
  },
  computed: {
    ...mapState("producto", ["productos", "tituloCategoria"]),
  },
  methods: {
    ...mapActions("producto", ["getProductos"]),
  },
};
</script>

<style>
.card-custom {
  height: 320px;
}
</style>
