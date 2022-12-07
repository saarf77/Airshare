<template>
    <section class="dashboard">
        <div class="orders">
            <h1>Orders Status</h1>
            <DoughnutChart :chartData="testData" :options="options" />
        </div>
        <div class="revenue">
            <h1>Revenue Per Month</h1>
            <BarChart :chartData="testData2" :options="options" />
        </div>
        </section>
  </template>
  
  <script>
  import { BarChart, DoughnutChart } from 'vue-chart-3';
  import { Chart, registerables } from "chart.js";
//   import {utilService} from '../services/util-service.js'
  
  Chart.register(...registerables);
  
  export default {
    name: 'chart-host',
    components: { DoughnutChart, BarChart },
    data() {
        return {
            testData: {
                labels: ['Pending','Declined','Approved'],
                datasets: [
                    {
                        data: [2,3,5],
                        backgroundColor: ['yellow','red','green'],
                    },
                ],
            },
            options: {
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            },
            testData2: {
                labels: ['September','October','November','December'],
                datasets: [
                    {
                        data: [2000,2450,3100,1700],
                        backgroundColor: ['rgb(255,56,92)','rgb(255,56,92)','rgb(255,56,92)','rgb(255,56,92)'],
                    },
                ],
            },
            options: {
                plugins: {
                    legend: {
                        display: true,
                    },
                },
            },
        }
    },
    computed: {
        // labels() {
        //     return this.$store.getters.labels
        // }
           pendingOrders() {
            var ordersCount = 0;
            if (this.hostOrders.length > 0) {
                this.hostOrders.forEach((order) => {
                    if (order.status === "pending") {
                        ordersCount++;
                    }
                });
                return ordersCount;
            }
        },
        approvedOrders() {
            var ordersCount = 0;
            if (this.hostOrders.length > 0) {
                this.hostOrders.forEach((order) => {
                    if (order.status === "approved") {
                        ordersCount++;
                    }
                });
                return ordersCount;
            }
        },
        declinedOrders() {
            var ordersCount = 0;
            if (this.hostOrders.length > 0) {
                this.hostOrders.forEach((order) => {
                    if (order.status === "declined") {
                        ordersCount++;
                    }
                });
                return ordersCount;
            }
        },

        chartStatus() {
            var label = [this.pendingOrders, this.approvedOrders, this.declinedOrders]
            return [1, 2, 3]
        }
    },
    methods: {
   
  }
}
  </script>