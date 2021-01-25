<template>
  <div>
    <h1 class="text-center">Carrito</h1>
    <ListaCarrito />
  </div>
</template>

<script>
import { mapGetters, mapActions} from 'vuex'
import ListaCarrito from "../../components/carrito/ListaCarrito";
export default {
  components: {
    ListaCarrito,
  },
  data() {
      return {
      }
  },
  created() {
    this.getCarrito(this.getIdUsuario)
  },
  computed: {
    ...mapGetters('usuario',['getIdUsuario'])
  },
  methods: {
    ...mapActions("carrito", ["getCarrito"]),
  },
};
</script>

<style></style>
