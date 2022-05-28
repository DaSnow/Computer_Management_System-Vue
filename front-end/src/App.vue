<template>
  <header>
    <NavBar />
  </header>
  <br>
  <main class="container">
    <RouterView />
  </main>
  <br>
  <footer></footer>
</template>

<script setup>
  import NavBar from '@/components/Navigation.vue'
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  nav {
    padding: 30px;
  }

  nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  nav a.RouterLink-exact-active {
    color: #42b983;
  }

  form {
    border: 1px solid black;
    padding: 5%;
    border-radius: 15px;
  }

  .none {
    border: none;
  }
</style>