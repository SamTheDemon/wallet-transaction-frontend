<template>
    <div class=" sm:w-full lg:[580px] h-[355px]">
        <Line v-if="chartData" :data="chartData" :options="chartOptions" />
    </div>
</template>

<script>
import { Line } from 'vue-chartjs'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export default {
    name: 'FinancialChart',
    components: { Line },
    data() {
        return {
            chartData: null,
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                aspectRatio: 1,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                    },
                    x: {
                        grid: {
                            display: true
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        label: {

                        },
                        usePointStyle: true,
                        pointStyle: 'circle',
                    },
                },

            }
        }
    },
    async created() {
        await this.fetchData()
    },
    methods: {
        async fetchData() {
            try {
                const token = localStorage.getItem('accessToken')
                const response = await fetch('http://localhost:3000/transaction/7days-overview', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                const data = await response.json()

                this.chartData = {
                    labels: data.map(item => {
                        const date = new Date(item.date)
                        return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })
                    }),
                    datasets: [
                        {
                            label: 'Income',
                            data: data.map(item => item.incoming),
                            borderColor: '#48A54C',
                            tension: 0.5,
                            pointBackgroundColor: '#48A54C',
                            pointBorderColor: '#fff',
                            pointBorderWidth: 1,
                            pointRadius: 4,
                            backgroundColor: '#48A54C',

                        },
                        {
                            label: 'Expenses',
                            data: data.map(item => item.expense),
                            borderColor: '#2D5E9B',
                            backgroundColor: '#2D5E9B',
                            tension: 0.5,
                            pointBackgroundColor: '#2D5E9B',
                            pointBorderColor: '#fff',
                            pointBorderWidth: 2,
                            pointRadius: 4,
                            backgroundColor: '#2D5E9B',
                        }
                    ]
                }
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
    }
}
</script>