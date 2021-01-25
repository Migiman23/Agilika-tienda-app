<template>
  <div>
    <table class="table mt-5">
      <thead>
        <tr>
          <!--   <th scope="col">Id</th> -->
          <th scope="col">Producto</th>
          <!-- <th scope="col">idUsuario</th> -->
          <th scope="col">Cantidad</th>
          <th scope="col">Total</th>
          <th scope="col">Estatus</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="orden in ordenes" :key="orden.id">
          <!--  <th scope="row">{{ orden.id }}</th> -->
          <td>{{ orden.idProducto }}</td>
          <!-- <td>{{orden.idUsuario}}</td> -->
          <td>{{ orden.cantidad }}</td>
          <td>{{ orden.total.toLocaleString() }}</td>
          <td>{{ orden.estatus }}</td>
          <td>
            <div class="btn-group">
              <button
                @click="
                  updateOrden(
                    orden.id,
                    orden.idProducto,
                    orden.cantidad,
                    'Aprobado'
                  )
                "
                class="btn btn-success btn-sm"
              >
                Aprovar
              </button>
              <button
                @click="
                  updateOrden(
                    orden.id,
                    orden.idProducto,
                    orden.cantidad,
                    'Rechazado'
                  )
                "
                class="btn btn-danger btn-sm"
              >
                Rechazar
              </button>
              <router-link
                class="btn btn-primary btn-sm "
                :to="{ name: 'Detalle', params: { id: orden.idProducto } }"
              >
                Detalle
              </router-link>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  created() {
    this.getOrdenes();
  },
  computed: {
    ...mapState("ordenCompra", ["ordenes"]),
  },
  methods: {
    ...mapActions("ordenCompra", ["getOrdenes", "setEstatus"]),
    updateOrden(id, idProducto, cantidad, estatus,total) {
      this.setEstatus({
        id: id,
        cantidad: cantidad,
        total:500,
        estatus: estatus
      });
    },
  },
};
</script>

<style></style>
