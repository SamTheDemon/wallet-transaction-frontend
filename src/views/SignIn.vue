<!-- Template: This includes a form with input fields for email and password and a button to submit the form. The form uses TailwindCSS classes for styling.
Script: Contains a Vue component with a data function that returns an object with email and password properties. The signIn method is stubbed in for now.
Style: Scoped styles can be added here if needed for specific styling adjustments. -->

<template>
  <div class="min-h-screen flex flex-col justify-center items-center  custom-background">
    <div class="w-full max-w-xs">
      <div>
        <h2 class="mt-6 mb-4 text-center text-3xl font-extrabold text-white">
          Sign into your account
        </h2>
      </div>
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mt-6 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email"> Email </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email" type="email" placeholder="Email" v-model="email" />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password" type="password" placeholder="******************" v-model="password" />
        </div>
        <div class="flex items-center justify-between">
          <button
            class=" bg-light-gray hover:opacity-90 transition-opacity text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button" @click="signIn">
            Sign In
          </button>
          <router-link class="inline-block align-baseline font-bold text-sm text-light-gray hover:text-dark-gray"
            to="/signup">
            Sign Up
          </router-link>
        </div>
      </form>
      <flash-message :message="errorMessage" :message-type="messageType"></flash-message>
    </div>
  </div>

</template>

<script>
import axios from 'axios';
import FlashMessage from '@/components/FlashMessage.vue';

export default {
  components: {
    FlashMessage
  },
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '', // Updated to errorMessage for consistency
      messageType: 'error' // Default message type is 'error', changes to 'success' on success
    };
  },
  methods: {
    async signIn() {
      try {
        const response = await axios.post('http://localhost:3000/auth/login', {
          email: this.email,
          password: this.password
        });
        localStorage.setItem('accessToken', response.data.data.access_token); // Save the access token
        // Assuming your API will soon return a refresh token
        // localStorage.setItem('refreshToken', response.data.data.refresh_token); 
        this.errorMessage = 'Login successful';
        this.messageType = 'success';
        this.$router.push('/dashboard');
      } catch (error) {
        this.errorMessage = error.response ? error.response.data.message : 'An error occurred during login.';
        this.messageType = 'error';
      }
    }
  }
}
</script>


<style scoped>
/* Add any additional CSS styles here */
</style>
