<template>
<div class="col-full">
  <h1>Not found</h1>
  <p>404 not found</p>
  <router-link :to="{name: 'Home'}">
    Home
  </router-link>
</div>
</template>

<style scoped>
h1 {
  font-size: 100px;
}

p {
  font-size: 50px;
  font-weight: 100;
}

div {
  text-align: center;
}
</style>

