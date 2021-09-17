import Chart from 'chart.js'

import { defaultSettings } from './DefaultSettings'
import { renderCOCO2Chart } from './RenderFunctions'

export const initCOCO2Chart = (loadedData) => {
    /* var lang = localStorage.getItem('lang') */
    let yAxesText = 'Koncentrácia (%)'
    let xAxesText = 'Čas (s)'

    /*   if (lang === 'sk') {
    yAxesText = 'Koncentrácia (%)'
  } else {
    yAxesText = 'Concentration (%)'
  }

  if (lang === 'sk') {
    xAxesText = 'Čas (s)'
  } else {
    xAxesText = 'Time (s)'
  } */

    window.chartModel = {}
    window.uploadedData = {}

    if (window.chart) {
        window.chart.destroy()
    }
    // Global option
    defaultSettings()

    const ctx = document.getElementById('myChartCOCO2').getContext('2d')
    window.chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [],
        },
        options: {
            responsive: true,
            title: {
                display: false,
                text: 'Analýza technologických dát o procese skujňovania',
                fontSize: 25,
                fontColor: 'blue',
                fontStyle: 'bold',
                padding: 5,
            },

            legend: {
                position: 'top',
                display: true,
                fontStyle: 'bold',
            },

            layout: {
                padding: {
                    left: 20,
                    top: 20,
                    right: 20,
                    bottom: 20,
                },
            },

            scales: {
                yAxes: [
                    {
                        gridLines: {
                            display: true,
                            color: 'black',
                            borderDash: [2],
                        },
                        ticks: {
                            beginAtZero: true,
                        },
                        scaleLabel: {
                            display: false,
                            labelString: yAxesText,
                            fontColor: 'black',
                        },
                    },
                ],
                xAxes: [
                    {
                        gridLines: {
                            display: true,
                            color: 'black',
                            borderDash: [2],
                        },
                        scaleLabel: {
                            display: false,
                            labelString: xAxesText,
                            fontColor: 'black',
                        },
                        ticks: {
                            beginAtZero: true,
                            min: 0,
                        },
                    },
                ],
            },
            pan: {
                enabled: false,
                mode: 'xy',
            },

            zoom: {
                enabled: false,
                mode: 'xy',
            },
        },
    })

    if (loadedData) {
        const data = []
        for (let i = 0; i < Object.keys(loadedData.data).length; i++) {
            if (loadedData.data[i]['k4_co'] < 0) {
                loadedData.data[i]['k4_co'] = 0
            }
            if (loadedData.data[i]['k4_co2'] < 0) {
                loadedData.data[i]['k4_co'] = 0
            }
            if (loadedData.data[i]['k4_co'] > 100) {
                loadedData.data[i]['k4_co'] = 100
            }
            if (loadedData.data[i]['k4_co2'] > 100) {
                loadedData.data[i]['k4_co'] = 100
            }

            data[i] =
                Number(loadedData.data[i]['k4_co']) +
                Number(loadedData.data[i]['k4_co2'])

            if (data[i] > 100) {
                data[i] = 100
            }
        }
        renderCOCO2Chart(data)
    }
}
