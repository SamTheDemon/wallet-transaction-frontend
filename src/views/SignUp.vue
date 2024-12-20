<template>
    <div class="min-h-screen flex flex-col justify-center items-center custom-background">
        <div class="w-full max-w-xs">
            <div>
                <h2 class="mt-6 mb-4 text-center text-3xl font-extrabold text-white">
                    Sign up for your account
                </h2>
            </div>
            <form class="bg-background-main shadow-md rounded px-8 pt-6 pb-8 mt-6 mb-4" @submit.prevent="register">
                <div class="mb-4">
                    <label class="block text-white text-left text-sm font-bold mb-2" for="name">Name</label>
                    <input id="name" type="text" required v-model="name"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Full name" />
                </div>
                <div class="mb-4">
                    <label class="block text-white text-left text-sm font-bold mb-2" for="email">Email</label>
                    <input id="email" type="email" required v-model="email"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Email address" />
                </div>
                <div class="mb-4">
                    <label class="block text-white text-left text-sm font-bold mb-2" for="password">Password</label>
                    <input id="password" type="password" required v-model="password"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="******************" />
                </div>
                <div class="mb-6">
                    <label class="block text-white text-left text-sm font-bold mb-2" for="password-confirm">Confirm
                        Password</label>
                    <input id="password-confirm" type="password" required v-model="passwordConfirmation"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="******************" />
                </div>
                <div class="flex items-center justify-between">
                    <button
                        class="bg-light-gray hover:bg-dark-gray text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        Sign Up
                    </button>
                    <router-link
                        class="inline-block align-baseline font-bold text-sm text-text-main-white hover:text-main-gray"
                        to="/signin">
                        Sign In
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
            name: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            errorMessage: '',
            messageType: 'error'
        };
    },
    methods: {
        async register() {
            if (this.password !== this.passwordConfirmation) {
                this.errorMessage = 'Passwords do not match.';
                this.messageType = 'error';
                return;
            }

            try {
                const response = await axios.post('http://localhost:3000/auth/register', {
                    name: this.name,
                    email: this.email,
                    password: this.password
                });
                this.errorMessage = 'Registration successful';
                this.messageType = 'success';
                console.log('Registration successful:', response.data);
                // this.$router.push('/dashboard'); // Uncomment to redirect after successful registration
            } catch (error) {
                this.errorMessage = error.response ? error.response.data.message : 'An error occurred during registration.';
                this.messageType = 'error';
                console.log('Error registering:', this.errorMessage);
            }
        }
    }
}
</script>
<!-- <script>
import axios from 'axios';
import FlashMessage from '@/components/FlashMessage.vue';

export default {
    components: {
        FlashMessage
    },
    data() {
        return {
            name: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            errorMessage: '',
            messageType: 'error'  // Default to 'error', change to 'success' on successful registration
        };
    },
    methods: {
        async register() {
            if (this.password !== this.passwordConfirmation) {
                this.errorMessage = 'Passwords do not match.';
                this.messageType = 'error';  // Ensures the message is displayed as an error
                return;
            }

            try {
                const response = await axios.post('http://localhost:3000/auth/register', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                });

                // If registration is successful, set the success message and type
                this.errorMessage = 'Registration successful';
                this.messageType = 'success';  // Change the message type to success
                // console.log('Registration successful:', response.data);

                // Optionally redirect to login page or dashboard here
                // this.$router.push('/dashboard');
            } catch (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    // console.log(error.response.data);
                    this.errorMessage = Array.isArray(error.response.data.message)
                        ? error.response.data.message.join(' ') // Join array into a single string
                        : error.response.data.message || 'An error occurred during registration.';
                    this.messageType = 'error';  // Ensure the message is treated as an error
                } else if (error.request) {
                    // The request was made but no response was received
                    // console.log(error.request);
                    this.errorMessage = 'No response from the server.';
                    this.messageType = 'error';  // Maintain the error message type
                } else {
                    // Something happened in setting up the request that triggered an Error
                    // console.log('Error', error.message);
                    this.errorMessage = 'Error setting up registration request.';
                    this.messageType = 'error';  // Keep the error type
                }
            }
        }
    }
}
</script> -->

<style scoped>
/* Add any additional styles here */
</style>