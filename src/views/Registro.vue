<template>
  <div>
    <br />
    <h2 class="my-4">Registro de usuario</h2>
    <div v-if="showError === 'auth/email-already-in-use'">
      <b-alert variant="danger" show>El usuario ya existe.</b-alert>
    </div>
    <!--  <form @submit.prevent="crearUsuario({ email: email, password: pass1 })"> -->
    <form @submit.prevent="submit">
      <input
        type="email"
        class="form-control mt-2"
        placeholder="alguien@gmail.com"
        v-model="$v.email.$model"
        :class="{ 'is-invalid': $v.email.$error }"
      />
      <p class="text-danger" v-if="!$v.email.email">El correo es incorrecto.</p>
      <!--  <p class="text-danger" v-if="!$v.email.required">Campo requerido.</p> -->

      <input
        type="password"
        class="form-control mt-2"
        v-model="$v.pass1.$model"
        :class="{ 'is-invalid': $v.pass1.$error }"
      />
      <p class="text-danger" v-if="!$v.pass1.minLength">
        Minímo 6 caracteres.
      </p>
      <input
        type="password"
        class="form-control mt-2"
        v-model="$v.pass2.$model"
        :class="{ 'is-invalid': $v.pass2.$error }"
      />
      <p
        class="text-danger"
        v-if="!$v.pass2.sameAsPassword && $v.pass2.$model.length > 0"
      >
        Contraseña incorrecta.
      </p>
      <!--   <button class="btn btn-primary mt-2" :disabled="!desactivar()">
        Registrar
      </button> -->
      <b-button
        variant="primary"
        class="mt-4"
        :disabled="$v.$invalid"
        type="submit"
        >Enviar</b-button
      >
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { required, email, sameAs, minLength } from "vuelidate/lib/validators";
export default {
  name: "Registro",
  data() {
    return {
      email: "",
      pass1: "",
      pass2: "",
      showError: "",
    };
  },
  computed: {
    ...mapState("usuario", ["usuario", "error"]),
  },
  methods: {
    ...mapActions("usuario", ["crearUsuario"]),
    desactivar() {
      return (
        this.pass1 === this.pass2 &&
        this.pass1.trim() !== "" &&
        this.pass1.length > 5
      );
    },
    async submit() {
      this.$v.$touch(); //Cuando se haga clic en el elemento submit va a reaccionar a la validacion $invalid
      if (this.$v.$invalid) {
        console.log("se genero un error");
      } else {
        console.log("Todos los campos correctos");
        await this.crearUsuario({
          email: this.$v.email.$model,
          password: this.$v.pass1.$model,
        });
        this.showError = this.error;
      }
    },
  },
  validations: {
    email: { required, email },
    pass1: {
      required,
      minLength: minLength(6),
    },
    pass2: {
      sameAsPassword: sameAs("pass1"),
    },
  },
};
</script>

<style></style>
