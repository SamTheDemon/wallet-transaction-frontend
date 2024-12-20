<template>

    <div class="w-full sm:w-1/3 md:w-1/5 lg:w-1/5 p-4">
        <div class="flex flex-col h-full space-y-3 justify-between">
            <div class="flex-grow">
                <!-- Dashboard Link -->
                <router-link to="/dashboard" :class="[
                    'flex items-center gap-4 w-full text-left rounded-2xl font-bold py-3 px-4 sm:px-6 transition-opacity',
                    {
                        'bg-main-gradient text-white': $route.path === '/dashboard',
                        'bg-transparent text-white hover:opacity-90': $route.path !== '/dashboard'
                    }
                ]">
                    <img src="@/assets/dasboard.svg" alt="dashboard" class="w-5 h-5 sm:w-6 sm:h-6">
                    <span class="flex-1">Dashboard</span>
                </router-link>

                <!-- Send Money Link -->
                <router-link to="/sendmoney" :class="[
                    'flex items-center gap-4 w-full text-left rounded-2xl font-bold py-3 px-4 sm:px-6 hover:bg-white/10 transition-colors',
                    {
                        'bg-main-gradient text-white': $route.path === '/sendmoney',
                        'bg-transparent text-white': $route.path !== '/sendmoney'
                    }
                ]">
                    <img src="@/assets/donate.svg" alt="send money" class="w-5 h-5 sm:w-6 sm:h-6">
                    <span class="flex-1">Send Money</span>
                </router-link>

                <!-- Transactions Link -->
                <router-link to="/transactions" :class="[
                    'flex items-center gap-4 w-full text-left rounded-2xl font-bold py-3 px-4 sm:px-6 hover:bg-white/10 transition-colors',
                    {
                        'bg-main-gradient text-white': $route.path === '/transactions',
                        'bg-transparent text-white': $route.path !== '/transactions'
                    }
                ]">
                    <img src="@/assets/protocols.svg" alt="transactions" class="w-5 h-5 sm:w-6 sm:h-6">
                    <span class="flex-1">Transactions</span>
                </router-link>
            </div>

            <div>
                <!-- Logout button (Sticky at bottom) -->
                <button @click="logout"
                    class=" flex items-center gap-4 w-full text-left rounded-2xl font-bold py-3 px-4 sm:px-6 hover:bg-white/10 transition-colors">
                    <img src="@/assets/logout-1.svg" alt="transactions" class="w-5 h-5 sm:w-6 sm:h-6">
                    Logout
                </button>
            </div>



        </div>
    </div>
</template>


<script>
import axios from 'axios';

export default {
    methods: {
        async logout() {
            try {
                // Get the token from localStorage
                const token = localStorage.getItem('accessToken');

                // Make a logout request to the backend with the token in the Authorization header
                const response = await axios.post(
                    'http://localhost:3000/auth/logout',
                    {},
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );

                if (response.data.message === 'Logout successful') {
                    // Clear the token and redirect to the sign-in page
                    localStorage.removeItem('accessToken');
                    this.$router.push('/signin');
                }
            } catch (error) {
                console.error('Error during logout:', error);
            }
        }
    }
};
</script>

<style scoped>
/* Optional additional styles for sticky positioning */
button {
    position: sticky;
    bottom: 0;
}
</style>
