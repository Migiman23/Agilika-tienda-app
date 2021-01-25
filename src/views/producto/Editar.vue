<template>
  <div>
    <h2 class="text-center mt-4">Editar producto</h2>
    <form @submit.prevent="editProducto(producto)">
        <label>ID: {{ id }}</label>
        <FormComponent :producto="producto" />
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import FormComponent from "../../components/producto/FormComponent";
export default {
  name: "Editar",
  components: {
      FormComponent
  },
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  created() {
    this.getProducto(this.id);
  },
  methods: {
    ...mapActions("producto", ["getProducto", "editProducto"]),
  },
  computed: {
    ...mapState("producto", ["producto"]),
  },
};
</script>

<style></style>
