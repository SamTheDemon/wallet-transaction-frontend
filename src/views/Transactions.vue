<template>
    <div class="bg-background-main custom-background  backdrop-blur min-h-screen  mx-auto px-4 sm:px-6 ">
        <!-- Header Section -->

        <header class="text-white p-5 flex justify-between items-center flex-wrap">
            <div class="flex justify-start sm:w-3/3 md:w-1/5 lg:w-1/5 ">
                <img src="@/assets/logo.png" alt="Company Logo" class=" w-28 h-24 max-w-28"> <!-- Logo -->
            </div>
            <div class="flex justify-start sm:w-3/3 md:w-3/5 lg:w-3/5">

                <div class=" text-left font-Roboto font-semibold text-2xl">Transaction History</div>
            </div>

        </header>

        <!-- Main Content -->
        <div class="mx-auto px-4 sm:px-6 ">

            <!-- Navigation -->
            <div class="flex flex-wrap -mx-3">
                <!-- Menu -->
                <Menu />

                <!-- All Transactions goes here -->
                <div class="w-full md:w-3/4 px-3 ">
                    <!-- here you should add transaction details. -->

                    <div class="w-full md:w-3/4 px-3">
                        <div class="mb-6">
                        </div>

                        <!-- Loading State -->
                        <div v-if="loading" class="flex justify-center items-center py-12">
                            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                        </div>

                        <!-- Transactions List -->
                        <div v-else-if="transactions.length > 0" class="space-y-4">
                            <div v-for="transaction in transactions" :key="transaction.transactionId"
                                class="bg-dark-gray bg-opacity-60 rounded-xl p-6 hover:bg-opacity-70 transition-all duration-200">

                                <!-- Transaction Header -->
                                <div class="flex flex-col sm:flex-row justify-between gap-4 mb-4">
                                    <div class="flex flex-wrap items-center gap-3">
                                        <span class="text-sm text-gray-400 font-mono">
                                            #{{ transaction.transactionId }}
                                        </span>
                                        <span :class="{
                                            'text-sm px-3 py-1 rounded-full': true,
                                            'bg-green-500/20 text-green-400': transaction.status === 'Success',
                                            'bg-yellow-500/20 text-yellow-400': transaction.status === 'Pending',
                                            'bg-red-500/20 text-red-400': transaction.status === 'Failed'
                                        }">
                                            {{ transaction.status }}
                                        </span>
                                        <span :class="{
                                            'text-sm px-3 py-1 rounded-full': true,
                                            'bg-green-500/20 text-green-400': transaction.type === 'Incoming',
                                            'bg-red-500/20 text-red-400': transaction.type === 'Outgoing'
                                        }">
                                            {{ transaction.type }}
                                        </span>
                                    </div>
                                    <div class="text-sm text-gray-400">
                                        {{ new Date(transaction.timestamp).toLocaleString() }}
                                    </div>
                                </div>

                                <!-- Transaction Details Grid -->
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <!-- Transfer Details -->
                                    <div class="space-y-4">
                                        <!-- Sender Info -->
                                        <div class="space-y-2">
                                            <div class="text-gray-400 text-sm">From</div>
                                            <div class="flex items-center space-x-2">
                                                <div
                                                    class="bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center">
                                                    <span class="text-sm">👤</span>
                                                </div>
                                                <div class="truncate">
                                                    <div class="font-medium">{{ transaction.senderWallet }}</div>
                                                    <div class="text-sm text-gray-400">Wallet ID</div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Recipient Info -->
                                        <div class="space-y-2">
                                            <div class="text-gray-400 text-sm">To</div>
                                            <div class="flex items-center space-x-2">
                                                <div
                                                    class="bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center">
                                                    <span class="text-sm">👤</span>
                                                </div>
                                                <div class="truncate">
                                                    <div class="font-medium">{{ transaction.recipientName }}</div>
                                                    <div class="text-sm text-gray-400">{{ transaction.recipientWallet }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Amount Details -->
                                    <div class="space-y-4 bg-black/20 rounded-xl p-4">
                                        <!-- Sent Amount -->
                                        <div class="space-y-1">
                                            <div class="text-gray-400 text-sm">Amount Sent</div>
                                            <div class="flex items-baseline gap-2">
                                                <span class="text-xl font-bold">{{ transaction.amountSent }}</span>
                                                <span class="text-gray-400">{{ transaction.senderCurrency }}</span>
                                            </div>
                                        </div>

                                        <!-- Conversion Rate -->
                                        <div class="text-sm text-gray-400 flex items-center gap-2">
                                            <span>Rate:</span>
                                            <span>1 {{ transaction.senderCurrency }} = {{ transaction.conversionRate }}
                                                {{ transaction.recipientCurrency }}</span>
                                        </div>

                                        <!-- Received Amount -->
                                        <div class="space-y-1 pt-2 border-t border-gray-700">
                                            <div class="text-gray-400 text-sm">Amount Received</div>
                                            <div class="flex items-baseline gap-2">
                                                <span class="text-xl font-bold">{{ transaction.amountReceived }}</span>
                                                <span class="text-gray-400">{{ transaction.recipientCurrency }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Empty State -->
                        <div v-else class="text-center py-12 bg-dark-gray bg-opacity-60 rounded-xl">
                            <div class="text-gray-400">No transactions found</div>
                        </div>

                        <!-- Pagination -->
                        <div v-if="transactions.length > 0" class="flex justify-between items-center mt-6 px-4">
                            <button @click="fetchTransactions(currentPage - 1)" :disabled="currentPage <= 1"
                                class="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors">
                                Previous
                            </button>

                            <span class="text-gray-400">
                                Page {{ currentPage }} of {{ totalPages }}
                            </span>

                            <button @click="fetchTransactions(currentPage + 1)" :disabled="currentPage >= totalPages"
                                class="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors">
                                Next
                            </button>
                        </div>
                    </div>


                </div>


            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Menu from '@/components/Menu.vue';

export default {
    components: {

        Menu,
    },
    data() {
        return {
            transactions: [],
            currentPage: 1,
            totalPages: 0,
            limit: 5,
            loading: false,
            error: null
        };
    },
    methods: {
        async fetchTransactions(page) {
            this.loading = true;
            this.error = null;

            try {
                const token = localStorage.getItem('accessToken');
                const response = await axios.get(
                    `http://localhost:3000/transaction/all?page=${page}&limit=${this.limit}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );

                this.transactions = response.data.transactions;
                this.totalPages = Math.ceil(response.data.total / this.limit);
                this.currentPage = page;
            } catch (error) {
                console.error('Error fetching transactions:', error);
                this.error = 'Failed to fetch transactions';
                this.transactions = [];
            } finally {
                this.loading = false;
            }
        }
    },
    mounted() {
        this.fetchTransactions(this.currentPage);
    }
}
</script>

<style scoped>
/* Add styles here */
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.pagination button {
    margin: 0 10px;
}
</style>