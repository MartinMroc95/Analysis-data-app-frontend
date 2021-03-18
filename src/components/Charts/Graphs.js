import Chart from 'chart.js'

import { defaultSettings } from './DefaultSettings'
import { renderCOCO2Chart } from './RenderFunctions'

export const createNewChart = (element, text, yAxesLabel, xAxesLabel, displayLegend) => {
  const defaultElementChart = element.cloneNode()
  const chartContainer = element.parentElement
  chartContainer.removeChild(element)
  chartContainer.appendChild(defaultElementChart)

  defaultSettings()

  let targetElement = defaultElementChart.getContext('2d')
  return new Chart(targetElement, {
    type: 'line',
    data: {
      labels: [],
      datasets: [],
    },
    options: {
      responsive: true,
      title: {
        display: false,
        text: text,
        fontSize: 25,
        fontColor: 'blue',
        fontStyle: 'bold',
        padding: 5,
      },

      legend: {
        position: 'top',
        display: displayLegend,
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
              labelString: yAxesLabel,
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
              labelString: xAxesLabel,
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
}

export const initMainGraf = (loadedData) => {
  /* var lang = localStorage.getItem('lang') */

  window.chartModel = {}
  window.uploadedData = {}

  /* $('#save-btn').click(function () {
    $('#myChart')
      .get(0)
      .toBlob(function (blob) {
        var subor = $('input[name="subor"]').val()
        saveAs(blob, subor + '.png')
      })
  }) */

  let yAxesText = 'Hodnoty'
  let xAxesText = 'Čas (s)'

  /*  if (lang === 'sk') {
    yAxesText = 'Hodnoty'
    xAxesText = 'Čas (s)'
  } else {
    yAxesText = 'Values'
    xAxesText = 'Time (s)'
  } */

  // Global option
  defaultSettings()

  let ctx = document.getElementById('myChart').getContext('2d')
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
        text: '',
        fontSize: 25,
        fontColor: 'blue',
        fontStyle: 'bold',
        padding: 5,
      },

      legend: {
        position: 'top',
        display: false,
        fontStyle: 'bold',
      },

      layout: {
        padding: {
          left: 20,
          top: 20,
          right: 0,
          bottom: 0,
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
}
