// src/store/index.js
import { createStore } from 'vuex';
import axios from 'axios';  // Ensure this is your custom axios instance


function decodeJWT(token) {
  if (!token) return null;
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

export default createStore({
  state: {
    wallets: [],
    user: {}
  },
  mutations: {
    SET_WALLETS(state, wallets) {
      state.wallets = wallets;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    ADD_WALLET(state, wallet) {
      state.wallets.push(wallet);
    },
  },
  actions: {

    async fetchWallets({ commit }) {
      try {
        const token = localStorage.getItem('accessToken');  // Retrieve the access token from localStorage
        // console.log("Using token for request:", token);

        const response = await axios.get('http://localhost:3000/wallet/all', {
          headers: {
            Authorization: `Bearer ${token}`  // Manually set the Authorization header
          }
        });
        // console.log("response:", response);
        commit('SET_WALLETS', response.data.wallets);
      } catch (error) {
        // console.error('Error fetching wallets:', error);
        throw error;  // Throw the error to handle it further up if necessary
      }
    },
    fetchUser({ commit }) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const decoded = decodeJWT(token);
        commit('SET_USER', decoded); 
      }
    },
    async createWallet({ commit }, walletData) {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.post('http://localhost:3000/wallet/create', walletData, {
          headers: {
            Authorization: `Bearer ${token}` // Manually set the Authorization header
          }
        });
        commit('ADD_WALLET', response.data);
        return response.data; // Optional: Return data in case the caller needs it
      } catch (error) {
        console.error('Error creating wallet:', error);
        throw new Error(error.response.data.message || 'Failed to create wallet');
      }
    },
  },
  getters: {
    wallets: state => state.wallets,
    userName: state => state.user.name || 'Guest'
  }
});