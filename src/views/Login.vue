<template>
  <div>
    <br />
    <h2 class="my-4">Iniciar sesión</h2>

    <div
      v-if="showError === 'auth/invalid-email' || showError === 'auth/wrong-password'"
    >
      <b-alert variant="danger" show>Error en correo o contraseña.</b-alert>
    </div>
    <div
      v-if="showError === 'auth/user-not-found'"
    >
      <b-alert variant="danger" show>Error. El usuario no existe.</b-alert>
    </div>

    <form @submit.prevent="submit">
      <input
        type="email"
        placeholder="alguien@gmail.com"
        class="form-control mt-2"
        v-model.lazy="$v.email.$model"
        :class="{ 'is-invalid': $v.email.$error }"
      />
      <p class="text-danger" v-if="!$v.email.email">El correo es incorrecto.</p>
      <!-- <p class="text-danger" v-if="!$v.email.required">Campo requerido.</p> -->
      <input
        type="password"
        class="form-control mt-2"
        v-model="$v.password.$model"
      />
      <p class="text-danger" v-if="!$v.password.minLength">
        Minímo 6 caracteres.
      </p>
      <router-link to="/registro" class="float-right mt-4 my-4">
        Registrarse
      </router-link>
      <button type="submit" class="btn btn-success btn-block mt-4">
        Iniciar sesión
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { required, email, minLength } from "vuelidate/lib/validators";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      showError: '',
    };
  },
  methods: {
    ...mapActions("usuario", ["inicioSesion"]),
   async submit() {
      await this.inicioSesion({
        email: this.$v.email.$model,
        password: this.$v.password.$model,
      });
      this.showError = this.error
    },
  },
  computed: {
    ...mapState("usuario", ["error"]),
  },
  validations: {
    email: { required, email },
    password: {
      required,
      minLength: minLength(6),
    },
  },
};
</script>

<style></style>
