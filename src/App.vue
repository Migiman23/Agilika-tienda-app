<template>
  <div id="app">
    <NavBar />
    <Categorias />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import Categorias from './components/Categorias';
export default {
  components: {
    NavBar,
    Categorias,
  }
};
</script>
