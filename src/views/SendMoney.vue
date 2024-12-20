<template>
    <div class="min-h-screen flex flex-col justify-center items-center custom-background">
        <div class="w-full max-w-xs">
            <div>
                <h2 class="mt-6 mb-4 text-center text-3xl font-extrabold text-white">
                    Send Money
                </h2>
            </div>
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mt-6 mb-4" @submit.prevent="sendMoney">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="fromWallet">From Wallet</label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="fromWallet" type="text" placeholder="Your Wallet Number" v-model="fromWallet" />
                </div>
                <div class="mb-4">
                    <select
                        class="shadow appearance-none border rounded py-1 px-1 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        v-model="fromCurrency">
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="SAR">SAR</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="toWallet">To Wallet</label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="toWallet" type="text" placeholder="Recipient's Wallet Number" v-model="toWallet" />
                </div>
                <div class="mb-4">
                    <select
                        class="shadow appearance-none border rounded py-1 px-1 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        v-model="toCurrency">
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="SAR">SAR</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="recipientName">Recipient Name</label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="recipientName" type="text" placeholder="Recipient Name" v-model="recipientName" />
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="amount">Amount</label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="amount" type="number" placeholder="Amount to Send" v-model.number="amount" />
                </div>

                <div class="flex items-center justify-between">
                    <button
                        class="bg-light-gray hover:bg-dark-gray text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        Send Money
                    </button>
                    <router-link to="/dashboard"
                        class="bg-red-600 hover:bg-red-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="reset">
                        Cancel
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
            fromWallet: '',
            toWallet: '',
            amount: 0,
            fromCurrency: 'SAR', // Assuming default currency, can be made dynamic
            toCurrency: 'USD', // Assuming default currency, can be made dynamic
            recipientName: '',
            errorMessage: '',
            messageType: 'error'
        };
    },
    methods: {
        sendMoney() {
            const token = localStorage.getItem('accessToken'); // Retrieve the token from local storage
            const payload = {
                fromWallet: this.fromWallet,
                toWallet: this.toWallet,
                amount: this.amount,
                fromCurrency: this.fromCurrency,
                toCurrency: this.toCurrency,
                recipientName: this.recipientName
            };
            axios.post('http://localhost:3000/wallet/transfer', payload, {
                headers: {
                    'Authorization': `Bearer ${token}` // Include the token in the Authorization header
                }
            })
                .then(response => {
                    this.errorMessage = response.data.message;
                    this.messageType = 'success';
                    this.resetForm();
                })
                .catch(error => {
                    this.errorMessage = error.response ? error.response.data.message : 'Failed to send money';
                    this.messageType = 'error';
                });
        },
        resetForm() {
            // Reset all the form fields to their default values
            this.fromWallet = '';
            this.toWallet = '';
            this.amount = 0; // Assuming 0 is a safe default for amount
            this.recipientName = '';
            // Optionally reset the currencies if needed, or leave them at defaults
            this.fromCurrency = 'SAR'; // Set back to default currency
            this.toCurrency = 'USD'; // Set back to default currency
        }
    }
}
</script>

<style>
/* Add any specific styles for your send money page here */
</style>