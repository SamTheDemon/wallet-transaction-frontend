<template>
    <div v-if="isVisible" class="modal">
        <div class=" modal-content py-10 ">
            <span class="close" @click="closeModal">&times;</span>
            <div class="py-5">Add New Wallet</div>
            <form class="rounded px-8 pt-6 pb-8 mt-6 mb-4" @submit.prevent="submitNewWallet">
                <input
                    class="shadow appearance-none border rounded py-1 px-1 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    v-model="newWallet.name" placeholder="Wallet Name" required>
                <input
                    class="shadow appearance-none border rounded py-1 px-1 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    v-model="newWallet.walletNumber" placeholder="Wallet Number" required>
                <input
                    class="shadow appearance-none border rounded py-1 px-1 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number" min="0" v-model.number="newWallet.initialBalance" placeholder="Initial Balance"
                    required>
                <select
                    class="shadow appearance-none border rounded py-1 px-1 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    v-model="newWallet.currency">
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="SAR">SAR</option>
                </select>
                <button
                    class="bg-light-gray hover:bg-dark-gray text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit">Create Wallet</button>
            </form>
            <flash-message :message="errorMessage" :message-type="messageType"></flash-message>
        </div>
    </div>
</template>

<script>
import FlashMessage from '@/components/FlashMessage.vue';


export default {
    components: {
        FlashMessage
    },
    props: {
        errorMessage: String,
        messageType: String
    },
    data() {
        return {
            isVisible: false,
            newWallet: {
                walletNumber: '',
                initialBalance: 0,
                name: '',
                currency: 'USD'
            },
        };
    },
    methods: {
        openModal() {
            this.isVisible = true;
        },
        closeModal() {
            this.isVisible = false;
            this.$emit('update:error', '', 'error');  // Reset error when closing
            this.resetForm();
        },
        submitNewWallet() {
            this.$emit('create', { ...this.newWallet });
            this.resetForm();  // Reset the form here
            // this.closeModal();
        },
        resetForm() {
            this.newWallet = { // Reset the newWallet object to its initial state
                walletNumber: '',
                initialBalance: 0,
                name: '',
                currency: 'USD'
            };
        }
    }
}
</script>

<style>
.modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
    background-color: #1C1C1C;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    border-radius: 16px;
}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
</style>