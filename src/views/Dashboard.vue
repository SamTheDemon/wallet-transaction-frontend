<template>
    <div class="bg-background-main custom-background  backdrop-blur min-h-screen  mx-auto px-4 sm:px-6 ">
        <!-- Header Section -->
        <header class="text-white p-5 flex justify-between items-center flex-wrap">
            <div class="flex justify-start sm:w-3/3 md:w-1/5 lg:w-1/5 ">
                <img src="@/assets/logo.png" alt="Company Logo" class=" w-28 h-24 max-w-28"> <!-- Logo -->
            </div>
            <div class="flex justify-start sm:w-3/3 md:w-3/5 lg:w-3/5">

                <div class=" text-left font-Roboto font-semibold text-2xl">Welcome Back, {{ userName }}</div>
            </div>
            <div class="flex flex-row items-center  sm:w-3/3 md:w-1/5 lg:w-1/5 gap-4 justify-end">
                <span class="text-main-gray font-Inter font-medium text-x[18px] ">
                    {{ userName }}
                </span>
                <img src="@/assets/user.svg" alt="User Profile" class="w-4 h-4"> <!-- User Icon -->
            </div>
        </header>

        <!-- Main Content -->
        <div class="mx-auto px-4 sm:px-6 ">


            <!-- Navigation -->
            <div class="flex flex-wrap -mx-3">
                <!-- Menu -->
                <Menu />

                <!-- Line Chart and Recent Transactions -->
                <div class="w-full sm:w-3/3 md:w-3/5 lg:w-3/5  ">
                    <div
                        class="bg-dark-gray bg-opacity-60  backdrop-blur-xl shadow rounded-lg pt-11 pb-5 pl-11 pr-5 flex flex-col items-center mb-5">
                        <!-- Account Overview -->
                        <div class="space-y-4 mb-6">
                            <div class=" transition-colors cursor-pointer gap-2">
                                <div class="flex flex-row flex-wrap items-center justify-between gap-8 ">
                                    <!-- Account Details -->
                                    <div class="flex items-center justify-start gap-2">
                                        <div
                                            class="w-14 h-14 rounded-xl bg-overview-gray flex items-center justify-center">
                                            <img src="@/assets/money-2.svg" alt="wallet" class="w-7 h-7 text-white" />
                                        </div>
                                        <div class="flex gap-1 flex-col py-0">
                                            <h3 class="font-Inter text-[14px] font-medium">Available Balance</h3>
                                            <span class="text-xl text-white text-left font-Inter font-bold">${{
                                                totalBalanceInUSD
                                            }}</span>
                                        </div>
                                    </div>
                                    <div class="flex items-center justify-start gap-2">
                                        <div
                                            class="w-14 h-14 rounded-xl bg-overview-gray flex items-center justify-center">
                                            <img src="@/assets/donate.svg" alt="wallet" class="w-7 h-7 text-white" />
                                        </div>
                                        <div>
                                            <h3 class="font-Inter text-[14px] font-medium">Incoming This Month</h3>
                                            <span class="text-xl text-white text-left font-Inter font-bold">${{
                                                monthlyIncomingInUSD }}</span>
                                        </div>
                                    </div>
                                    <div class="flex items-center justify-start gap-2">
                                        <div
                                            class="w-14 h-14 rounded-xl bg-overview-gray flex items-center justify-center">
                                            <img src="@/assets/money-2.svg" alt="wallet" class="w-7 h-7 text-white" />
                                        </div>
                                        <div>
                                            <h3 class="font-Inter text-[14px] font-medium">Available Balance</h3>
                                            <span class="text-xl text-white text-left font-Inter font-bold">${{
                                                monthlyOutgoingInUSD }}</span>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>

                        <div class="shadow rounded-lg p-4 mb-3 mt-3">
                            <!-- Embed line chart component here -->
                            <div class="text-lg font-bold mb-4">Financial Overview</div>
                            <!-- Placeholder for chart -->
                            <!-- Embed line chart component here -->
                            <FinancialOverviewChart />
                        </div>
                    </div>
                    <!-- Recent Transactions -->
                    <div
                        class="bg-dark-gray bg-opacity-60 backdrop-blur-xl shadow rounded-lg py-4 flex flex-col items-center mb-5 w-full">
                        <div class="text-lg font-bold mb-4 text-white">Recent Transactions</div>
                        <div class="overflow-x-auto w-full px-4">
                            <table class="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th
                                            class="sm:w-1/6 md:w-2/5 lg:w-3/6 px-5 py-1 text-left text-xs font-medium text-shade-gray capitalize tracking-wider">
                                            Name
                                        </th>
                                        <th
                                            class="sm:w-1/6 md:w-1/5 lg:w-1/6 py-2  text-xs font-medium text-shade-gray capitalize tracking-wider">
                                            Balance
                                        </th>
                                        <th
                                            class="sm:w-1/6 md:w-1/5 lg:w-1/6  py-1  text-xs font-medium text-shade-gray capitalize tracking-wider">
                                            Date
                                        </th>
                                        <th
                                            class="sm:w-1/6 md:w-1/5 lg:w-1/6  py-1  text-xs font-medium text-shade-gray capitalize tracking-wider">
                                            Type
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(transaction, num) in transactions" :key="transaction.id">

                                        <td class="sm:w-1/6 md:w-2/5 lg:w-3/6 px-5 py-5  text-sm text-white">
                                            <div class="w-full h-10 rounded-full flex items-center justify-start gap-2">
                                                <div class="w-8 h-8 py-2 px-2 rounded-full flex items-center justify-center"
                                                    :style="{ backgroundColor: getBackgroundColorfortransaction(num) }">
                                                    <img src="@/assets/user.svg" alt="wallet"
                                                        class="w-6 h-6 text-white" />
                                                </div>
                                                {{ transaction.recipientName }}
                                            </div>
                                        </td>
                                        <td class="px-5 py-5  text-sm text-white">
                                            {{ transaction.amountReceived }}
                                        </td>
                                        <td class="px-5 py-5   text-sm text-white">
                                            {{ new Date(transaction.timestamp).toLocaleString() }}
                                        </td>
                                        <td class="px-5 py-5  text-sm  text-white">
                                            <span :class="{
                                                'text-sm px-2 py-1 rounded-md': true,
                                                'bg-incoming text-white': transaction.type === 'Incoming',
                                                'bg-outgoing text-white': transaction.type === 'Outgoing'
                                            }">
                                                {{ transaction.type }}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <!-- My Wallet  -->
                <div class="w-full sm:w-3/3 md:w-1/5 lg:w-1/5 px-3 mb-6">
                    <div class="bg-dark-gray bg-opacity-60 backdrop-blur-xl rounded-2xl p-6">
                        <div class="flex items-center justify-between mb-6">
                            <h2 class="text-xl font-bold text-white">My Wallets</h2>
                            <span class="text-sm text-gray-400">{{ wallets.length }} total</span>
                        </div>

                        <!-- Wallets List -->
                        <div class="space-y-4 mb-6">
                            <div v-for="(wallet, index) in wallets" :key="wallet._id"
                                class=" rounded-xl hover:bg-black/30 transition-colors cursor-pointer">
                                <div class="flex items-center justify-between flex-wrap gap-1">
                                    <!-- Wallet Icon and Name -->
                                    <div class="flex items-center gap-3">
                                        <div class="w-10 h-10 rounded-full flex items-center justify-center"
                                            :style="{ backgroundColor: getBackgroundColor(index) }">
                                            <img src="@/assets/money-2.svg" alt="wallet" class="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 class="font-medium">{{ wallet.name }}</h3>
                                        </div>
                                    </div>

                                    <!-- Balance -->
                                    <div class="text-right flex gap-1">
                                        <div class="text-lg text-gray-400">{{ wallet.currency }}</div>
                                        <div class="font-bold text-lg">{{ wallet.balance }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Add Wallet Button -->
                        <button @click="openAddWalletModal"
                            class="w-full bg-light-gray hover:opacity-90 transition-opacity text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2">
                            Add New Wallet
                        </button>
                    </div>

                    <!-- Modal Component -->
                    <add-wallet-modal ref="addWalletModal" :error-message="errorMessage" :message-type="messageType"
                        @create="onCreateWallet" @update:error="updateError">
                    </add-wallet-modal>
                </div>
            </div>
        </div>
    </div>
</template>

<!-- <script>
import AddWalletModal from '@/components/AddWalletModal.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    components: {
        AddWalletModal
    },
    data() {
        return {
            errorMessage: '',
            messageType: 'error',
            transactions: []
        };
    },
    computed: {
        ...mapGetters(['wallets', 'userName',])
    },
    methods: {
        ...mapActions(['fetchWallets', 'fetchUser', 'createWallet']),
        openAddWalletModal() {
            this.errorMessage = '';  // Clear previous messages
            this.messageType = 'error';  // Default to error, change after action
            this.$refs.addWalletModal.openModal();
        },
        onCreateWallet(walletData) {
            this.createWallet(walletData).then(() => {
                // alert('Wallet created successfully!');
                this.updateError('Wallet created successfully!', 'success');

            }).catch(error => {
                // alert(`Failed to create wallet: ${error.message || 'Unknown error'}`);
                this.updateError(`Failed to create wallet: ${error.message || 'Unknown error'}`, 'error');
            });
        },
        updateError(message, type) {
            this.errorMessage = message;
            this.messageType = type;
        },
        getBackgroundColor(index) {
            // Array of your specified colors
            const colors = ['#F7931A', '#8C8C8C', '#2D5E9B'];
            // Use modulo to cycle through colors every 3 wallets
            return colors[index % 3];
        },
        getBackgroundColorfortransaction(num) {
            // Array of your specified colors
            const colors = ['#F7931A', '#2D5E9B'];
            // Use modulo to cycle through colors every 3 wallets
            return colors[num % 2];
        },
        async fetchTransactions() {
            const token = localStorage.getItem('accessToken');
            try {
                const response = await fetch('http://localhost:3000/transaction/all?page=1&limit=4', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                this.transactions = data.transactions || [];
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        }
    },
    mounted() {
        this.fetchWallets();
        this.fetchUser();
        this.fetchTransactions();
    }
}

</script> -->


<script>
import FinancialOverviewChart from '@/components/FinancialOverviewChart.vue';
import Menu from '@/components/Menu.vue';
import AddWalletModal from '@/components/AddWalletModal.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
    components: {
        AddWalletModal,
        FinancialOverviewChart,
        Menu,
    },
    data() {
        return {
            errorMessage: '',
            messageType: 'error',
            transactions: [],
            // New data properties for overview
            totalBalanceInUSD: 0,
            monthlyIncomingInUSD: 0,
            monthlyOutgoingInUSD: 0
        };
    },
    computed: {
        ...mapGetters(['wallets', 'userName',])
    },
    methods: {
        ...mapActions(['fetchWallets', 'fetchUser', 'createWallet']),

        openAddWalletModal() {
            this.errorMessage = '';  // Clear previous messages
            this.messageType = 'error';  // Default to error, change after action
            this.$refs.addWalletModal.openModal();
        },
        onCreateWallet(walletData) {
            this.createWallet(walletData).then(() => {
                this.updateError('Wallet created successfully!', 'success');
            }).catch(error => {
                this.updateError(`Failed to create wallet: ${error.message || 'Unknown error'}`, 'error');
            });
        },
        updateError(message, type) {
            this.errorMessage = message;
            this.messageType = type;
        },
        getBackgroundColor(index) {
            // Array of your specified colors
            const colors = ['#F7931A', '#8C8C8C', '#2D5E9B'];
            // Use modulo to cycle through colors every 3 wallets
            return colors[index % 3];
        },
        getBackgroundColorfortransaction(num) {
            // Array of your specified colors
            const colors = ['#F7931A', '#2D5E9B'];
            // Use modulo to cycle through colors every 2 transactions
            return colors[num % 2];
        },
        async fetchTransactions() {
            const token = localStorage.getItem('accessToken');
            try {
                const response = await fetch('http://localhost:3000/transaction/all?page=1&limit=2', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                this.transactions = data.transactions || [];
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        },

        // New method to fetch overview data
        async fetchOverview() {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                console.error('No access token found. User may not be authenticated.');
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/wallet/overview', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                // Assign the values from response
                this.totalBalanceInUSD = data.totalBalanceInUSD;
                this.monthlyIncomingInUSD = data.monthlyIncomingInUSD;
                this.monthlyOutgoingInUSD = data.monthlyOutgoingInUSD;
            } catch (error) {
                console.error('Error fetching financial overview:', error);
            }
        }
    },
    mounted() {
        this.fetchWallets();
        this.fetchUser();
        this.fetchTransactions();
        // Fetch the overview data after initial setup
        this.fetchOverview();
    }
}
</script>


<style scoped>
/* Add styles here */
</style>