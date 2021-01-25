<template>
  <div>
    <div class="row mt-4">
      <div class="col-md-6">
        <div v-if="producto.imagen">
          <img
            class="fotoDetalle"
            alt="Card image cap"
            :src="producto.imagen"
          />
        </div>
      </div>
      <div class="col-md-6">
        <h2>{{ producto.nombre + " " + producto.modelo }}</h2>
        <br />
        <br />
        <h4>{{ "Precio: $" + producto.precioString }}</h4>
        <p class="mt-2">
          Envío gratis si lo compras antes del 14 de febrero.
        </p>
        <br />
        <br />
        <br />
        <p>Disponibles: {{producto.stock}}</p>
        <div class="input-group mb-3">
          <button class="btn btn-secondary" @click="restar">-</button>
          <input
            v-model="cantidad"
            type="text"
            form-control
            style="width : 30px; heigth : 30px"
          />
          <button class="btn btn-secondary" @click="sumar">+</button>

          <button class="btn btn-success ml-4" @click="validarUsusario('comprar')">Comprar</button>
          <button class="btn btn-warning ml-4" @click="validarUsusario('carrito')">
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <h3>Descripción</h3>
      <br />
      <p>{{ producto.descripcion }}</p>
      <br />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { auth } from "../../firebase";
export default {
  components: {},
  data() {
    return {
      id: this.$route.params.id,
      cantidad: 1,
      productoCompra: {
        idUsuario: null,
        idProducto: null,
        cantidad: null,
        precio: 0,
        fecha: null,
      },
    };
  },
  created() {
    this.getProducto(this.id);
  },
  methods: {
    ...mapActions("producto", ["getProducto", "comprarUno"]),
    ...mapActions("carrito", ["agregarAlCarrito"]),
    sumar() {
      this.validarCantidad();
      if (this.cantidad < this.producto.stock) this.cantidad++;
    },
    restar() {
      this.validarCantidad();
      if (this.cantidad > 1) this.cantidad--;
    },
    validarCantidad() {
      if (this.cantidad < 1) this.cantidad = 1;
      if (this.cantidad > this.producto.stock) this.cantidad = this.producto.stock;
    },
    comprar() {
      this.validarCantidad();

      let total = this.cantidad * this.producto.precio;
      let productoCompra = {
        idUsuario: this.usuario.uid,
        idProducto: this.producto.id,
        cantidad: Number(this.cantidad),
        total: total,
        fecha: new Date(),
      };

      console.log("hay que comprar", productoCompra);
      this.comprarUno(productoCompra);
    },
    agregarCarrito() {
      let productoCarrito = {
        idUsuario: this.usuario.uid,
        idProducto: this.producto.id,
        cantidad: Number(this.cantidad),
        total: this.producto.precio,
        imagen: this.producto.imagen,
        descripcion: this.producto.descripcion,
        nombre: this.producto.nombre,
        modelo: this.producto.modelo,
        fecha: new Date(),
      };

      this.agregarAlCarrito(productoCarrito);
    },
    validarUsusario(accion) {
      const usuario = auth.currentUser;
      console.log(usuario);
      if (!usuario) {
        alert('No has iniciado sesión')
      } else {
        if(accion === 'comprar'){
          this.comprar()
        }
        if(accion === 'carrito')
          this.agregarCarrito()
      }
    },
  },
  computed: {
    ...mapState("producto", ["producto"]),
    ...mapState("usuario", ["usuario"]),
  },
  actions: {},
};
</script>

<style>
.fotoDetalle {
  height: 350px;
  width: 400px;
}
</style>
