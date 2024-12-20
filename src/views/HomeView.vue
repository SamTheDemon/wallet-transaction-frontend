<template>
  <div class="home custom-background h-screen">
    <img alt="DMS logo" src="../assets/logo.png" />

    <div class="flex items-center justify-center flex-col gap-10">
      <h1 class="font-Inter text-6xl"> welcome to our App</h1>
      <div class="flex items-center justify-center flex-row gap-4">
        <router-link class="inline-block align-baseline font-bold text-sm text-white hover:text-dark-gray" to="/signin">
          Sign In
        </router-link>
        <router-link class="inline-block align-baseline font-bold text-sm text-white hover:text-dark-gray" to="/signup">
          Sign Up
        </router-link>

      </div>

    </div>

  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: "HomeView",
  components: {
  },
};
</script>
