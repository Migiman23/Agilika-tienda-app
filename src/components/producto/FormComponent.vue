<template>
  <div>
    <div class="mt-2">
      <label for="pasajeros">Modelo*</label>
      <input
        id="modelo"
        type="text"
        class="form-control"
        placeholder="Modelo"
        v-model.trim="producto.modelo"
      />
    </div>
    <div class="mt-2">
      <label for="nombre">Marca*</label>
      <input
        id="nombre"
        type="text"
        class="form-control"
        placeholder="Marca"
        v-model.trim="producto.nombre"
      />
    </div>
    <div class="mt-2">
      <label for="pasajeros">Color</label>
      <input
        id="color"
        type="text"
        class="form-control"
        placeholder="Color"
        v-model.trim="producto.color"
      />
    </div>
    <div class="mt-2">
      <label for="pasajeros">Categoria*</label>
    </div>
    <div class="form-check form-check-inline">
      <input
        id="radio-1"
        type="radio"
        class="form-check-input"
        v-model="producto.tipo"
        value="Laptop"
      />
      <label for="radio-1" class="form-check-label ml-2">Laptop</label>
      <input
        id="radio-2"
        type="radio"
        class="form-check-input ml-4"
        v-model="producto.tipo"
        value="Celular"
      />
      <label for="radio-2" class="form-check-label ml-2">Celular</label>
      <input
        id="radio-3"
        type="radio"
        class="form-check-input ml-4"
        v-model="producto.tipo"
        value="Monitor"
      />
      <label for="radio-3" class="form-check-label ml-2">Monitor</label>
    </div>
    <div class="mt-2">
      <label for="pasajeros">Precio*</label>
      <input
        id="precio"
        type="number"
        placeholder="Pasajeros"
        class="form-control"
        v-model.number="producto.precio"
      />
    </div>
    <div class="mt-2">
      <label for="stock">Stock*</label>
      <input
        id="stock"
        type="number"
        class="form-control"
        v-model.number="producto.stock"
      />
    </div>
    <div class="mt-2">
      <label for="pasajeros">Descripción</label>
      <textarea
        id="descripcion"
        type="text"
        placeholder="Descripción"
        class="form-control"
        v-model.trim="producto.descripcion"
      />
    </div>
    <div class="mt-4">
      <input
        type="file"       
        @change="buscarImagen($event)">
    </div>
    <br>
    <div>
  <!--   <div :v-if="urlTemp === '' && producto.imagen !== null">
      <img :src="producto.imagen">
    </div> -->
    <div :v-else="urlTemp !== ''">
      <img :src="imagenExiste">
    </div>
    </div>
    <br />
    <!-- <p>{{ producto }}</p> -->
    <button
      :disabled="!validarForm"
      class="btn btn-success mt-4 my-4 float-right"
      type="submit"
    >
      Guardar
    </button>
    <router-link
      class="btn btn-dark mt-4 my-4 mr-4 float-right"
      to="/"
    >
      Cancelar
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'FormComponent',
  data() {
    return {
      file: null,
      urlTemp: ''
    }
  },
  props: {
    producto: Object,
  },
  computed: {
    validarForm() {
      return ( this.producto !== null &&
        this.producto.modelo && this.producto.modelo.length > 0 &&
        this.producto.nombre && this.producto.nombre.length > 0 &&
        this.producto.tipo && this.producto.tipo.length > 0 &&
        this.producto.precio && this.producto.precio > 0
      );
    },
    imagenExiste() {
      return this.producto.imagen !== null && this.producto.imagen !== '' &&
             this.urlTemp === ''? this.producto.imagen : this.urlTemp
    }
  },
  methods: {
    buscarImagen(event) {
      console.log(event.target.files[0])

      this.file = event.target.files[0]
      this.producto.imagen = event.target.files[0]

      const reader = new FileReader()
      reader.readAsDataURL(this.file)
      reader.onload = (e) => {
        this.urlTemp = e.target.result
      }
    }
  }
};
</script>

<style>
img { 
    height: 150px;
    widows: 200px;
} </style>
