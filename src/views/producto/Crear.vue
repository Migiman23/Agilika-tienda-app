<template>
  <div>
    <h2 class="text-center mt-4">Nuevo producto</h2>
  <form @submit.prevent="setProducto(producto)">
    <FormComponent :producto="producto" />
  </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import FormComponent from "../../components/producto/FormComponent";
export default {
  components: {
    FormComponent,
  },
  data() {
    return {
      producto: {
        color: "",
        descripcion: "",
        modelo: "",
        nombre: "", // Hace referencia al nombre de la marca
        precio: 0,
        stock: 1,
        tipo: "",
        imagen: null
      },
    };
  },
  methods: {
    ...mapActions("producto", ["setProducto",'subirImagenProducto']),
  },
};

/* color "Blanco" descripcion "Laptop HP (procesador intel i7, 8 GB RAM, 1TB Disco
duro, 480 GB SSD)" modelo "14-1234" nombre "HP-Pavillion" precio 11000 tipo
"Laptop"
 */
</script>

<style></style>
