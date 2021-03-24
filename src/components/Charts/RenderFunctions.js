import { getRandomColor } from '../../utils/colors'
import { chartOptions } from './DefaultSettings'

export const renderCOCO2Chart = (data) => {
  chartOptions()

  let backgroundColor = getRandomColor()

  window.chart.data.datasets.push({
    data,
    label: 'k4_co + k4_co2',
    fill: false,
    backgroundColor: backgroundColor,
    borderColor: backgroundColor,
    borderWidth: 1,
  })

  // TODO: prist na to, ako vybrat nie len labels ale aj data
  for (let i = 0; i < data.length; i++) {
    window.chart.data.labels.push(i)
  }

  window.chart.update()
}

export function renderChart(chartModel, chart, displayLegend) {
  chart.options.scales.xAxes[0].scaleLabel.display = true
  chart.options.scales.yAxes[0].scaleLabel.display = true
  chart.options.pan.enabled = true
  chart.options.zoom.enabled = true
  chart.options.legend.display = displayLegend || true
  chart.options.title.display = true
  chart.data.datasets = []
  chart.data.labels = []

  let maxLength = 0

  for (let col in chartModel) {
    chart.data.datasets.push({
      data: chartModel[col].data,
      label: chartModel[col].label,
      fill: false,
      backgroundColor: chartModel[col].backgroundColor,
      borderColor: chartModel[col].backgroundColor,
      pointBackgroundColor: 'transparent',
      pointBorderColor: 'transparent',
      borderWidth: 3,
    })

    if (maxLength < chartModel[col].data.length) {
      maxLength = chartModel[col].data.length
    }
  }

  for (let i = 0; i < maxLength; i++) {
    chart.data.labels.push(i)
  }

  chart.update()
}
