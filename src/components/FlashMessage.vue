<template>
    <div v-if="message" :class="messageClass">
        {{ message }}
    </div>
</template>

<script>
export default {
    props: {
        message: String,
        messageType: {
            type: String,
            default: 'error'  // 'error' or 'success'
        }
    },
    computed: {
        messageClass() {
            return {
                'bg-red-500 text-white p-3 rounded': this.messageType === 'error',
                'bg-green-500 text-white p-3 rounded': this.messageType === 'success'
            };
        }
    }
}
</script>

<style scoped>
/* Additional styling if needed */
</style>