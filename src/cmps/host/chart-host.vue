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
                        backgroundColor: ['lightgray','lightgray','lightgray','lightgray'],
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
        
    },
    methods: {
   
  }
}
  </script>