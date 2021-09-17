import Chart from 'chart.js'

export const defaultSettings = () => {
    Chart.defaults.global.defaultFontFamily = 'Georgia'
    Chart.defaults.global.defaultFontSize = 18
    Chart.defaults.global.defaultFontColor = 'black'
    Chart.defaults.global.defaultFontStyle = 'normal'
    Chart.defaults.global.responsive = true
}

export const chartOptions = () => {
    window.chart.options.scales.xAxes[0].scaleLabel.display = true
    window.chart.options.scales.yAxes[0].scaleLabel.display = true
    window.chart.options.pan.enabled = true
    window.chart.options.zoom.enabled = true
    window.chart.options.legend.display = true
    // window.chart.options.title.display = false;
    window.chart.data.datasets = []
    window.chart.data.labels = []
}
