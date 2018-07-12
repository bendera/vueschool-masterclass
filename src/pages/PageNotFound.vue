<template>
<div class="col-full" :class="$style['centered']">
  <h1 :class="$style['heading-large']">Not found</h1>
  <p :class="$style['text-large']">404 not found</p>
  <router-link :to="{name: 'Home'}">
    Home
  </router-link>
</div>
</template>

<style module>
.heading-large {
  font-size: 100px;
}

.text-large {
  font-size: 50px;
  font-weight: 100;
}

.centered {
  text-align: center;
}
</style>

