<template>
  <div class="card mb-3" style="max-width: 840px;">
    <div class="row g-0">
      <div class="col-md-4">
        <div v-if="productoCarrito.imagen">
          <img
            class="card-img-top custm"
            alt="Card image cap"
            :src="productoCarrito.imagen"
          />
        </div>
        <div v-else>
          <img
            class="card-img-top custm"
            alt="Card image cap"
            src="../../assets/imgNF.jpg"
          />
        </div>
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">
            {{ productoCarrito.nombre + " " + productoCarrito.modelo }}
          </h5>
          <p class="card-text">
            {{
              productoCarrito.descripcion
                ? productoCarrito.descripcion.substr(0, 60) + "..."
                : "..."
            }}
          </p>
          <p>Disponibles: {{ productoReal.stock }}</p>
          <div class="input-group mb-3">
            <button class="btn btn-secondary" @click="restar">-</button>
            <input
              v-model="cantidad"
              form-control
              style="width : 30px; heigth : 30px"
              @change="setCantidad"
            />
            <button class="btn btn-secondary" @click="sumar">+</button>

            <h5 class="ml-4">
              {{ "Subtotal: $" + subtotal.toLocaleString() }}
            </h5>
          </div>
          <button
            v-if="
              Number(this.cantidad) !== Number(this.productoCarrito.cantidad)
            "
            class="btn btn-success btn-sm"
            @click="cambiarProducto"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { db } from "../../firebase";
export default {
  props: {
    productoCarrito: Object,
  },
  created() {
    this.getProducto(this.productoCarrito.idProducto);
  },
  data() {
    return {
      cantidad: Number(this.productoCarrito.cantidad),
      subtotal: this.productoCarrito.total,
      stockProd: null,
      productoReal: {
        stock: 0,
      },
    };
  },
  computed: {
    ...mapGetters("carrito", ["productosFiltrados", "totalCarrito"]),
    ...mapGetters("producto", ["getUno"]),
    validarCantidad() {
      if (this.cantidad < 1) {
        // this.cantidad = this.productoCarrito.cantidad;
        alert("No es una cantidad válida");
        return false;
      } else if (this.cantidad > this.productoReal.stock) {
        //this.cantidad = this.productoCarrito.cantidad;
        alert("No es una cantidad válida");
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    ...mapActions("carrito", ["cambiarCantidad", "sumarTotal", "restarTotal"]),
    setCantidad(event) {
      let subTotalAnterior = this.subtotal;
      let nuevaCantidad = Number(event.target.value);
      console.log(
        this.cantidad,
        " vs ",
        nuevaCantidad,
        nuevaCantidad >= 1 && nuevaCantidad <= this.productoReal.stock
      );
      if (
        nuevaCantidad >= 1 &&
        nuevaCantidad <= this.productoReal.stock &&
        this.validarCantidad
      ) {
        let nuevoSubtotal = nuevaCantidad * this.productoReal.precio;
        this.subtotal = nuevoSubtotal;

        if (nuevaCantidad < this.productoCarrito.cantidad) {
          subTotalAnterior = subTotalAnterior - nuevoSubtotal;
          this.restarTotal(subTotalAnterior);
        } else {
          subTotalAnterior = nuevoSubtotal - subTotalAnterior;
          this.sumarTotal(subTotalAnterior);
        }
      }
    },
    sumar() {
      if (this.cantidad < this.productoReal.stock && this.validarCantidad) {
        this.cantidad++;
        let subTotalMod = this.subtotal + this.productoReal.precio; //Cambiar subtotal
        this.sumarTotal(this.productoReal.precio); //Cambair total global

        this.subtotal = subTotalMod;
      }
    },
    restar() {
      if (this.cantidad > 1 && this.validarCantidad) {
        this.cantidad--;
        let subTotalMod = this.subtotal - this.productoReal.precio;
        this.restarTotal(this.productoReal.precio);
        this.subtotal = subTotalMod;
      }
    },
    getProducto(idProducto) {
      db.collection("productos")
        .doc(idProducto)
        .get()
        .then((doc) => {
          let producto = doc.data();
          producto.precioString = producto.precio.toLocaleString();
          producto.id = doc.id;
          this.productoReal = producto;
          // console.log(this.productoReal);
          // console.log(this.productoCarrito);
        });
    },
    async cambiarProducto() {
      //if (this.cantidad > 0 && this.cantidad <= this.productoReal.stock && this.validarCantidad()) {
      if (this.validarCantidad === true) {
        // console.log("Se puede comprar");

        let obj = {
          id: this.productoCarrito.id, // id del producto en carrito
          cantidad: Number(this.cantidad),
          precioUnitario: this.productoCarrito.precioUnitario,
        };
        await this.cambiarCantidad(obj);
        this.productoCarrito.cantidad = this.cantidad;
      } /* else {
        alert("No se puede comprar");

      } */
    },
  },
};
</script>

<style>
.custm {
  height: 180px;
}
</style>
