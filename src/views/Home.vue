<template>
  <div>
    <ListaComp />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ListaComp from "../components/producto/ListaComp";

export default {
  name: "Home",
  data(){
    return {
      titulo: 'Todas'
    }
  },
  created() {
    this.getProductos();
  },
  components: {
    ListaComp,
  },
  computed: {
    ...mapState('producto',['tituloCategoria'])
  },
  methods: {
    ...mapActions('producto',['getProductos'])
  }
};
</script>
