import Chart from 'chart.js/auto'

export const createChart1 = (canvas: HTMLCanvasElement, data, animDuration: number = 1000) => {
  return new Chart(canvas, {
    type: 'doughnut',
    data: {
      datasets: [
        {
          data: data,
          backgroundColor: ['#1abc9c', '#0e816c'],
          hoverOffset: 10,
          spacing: 1,
          borderRadius: 5,
        },
      ],
    },
    options: {
      layout: { padding: 5 },
      animation: {
        duration: animDuration,
      },
    },
  })
}

export const createChart2 = (canvas: HTMLCanvasElement, data, animDuration: number = 1000) => {
  return new Chart(canvas, {
    type: 'doughnut',
    data: {
      datasets: [
        {
          data: data,
          backgroundColor: ['#1A8CBA', '#9fcedd', '#0E4A81'],
          hoverOffset: 10,
          spacing: 1,
          borderRadius: 5,
        },
      ],
    },
    options: {
      layout: { padding: 5 },
      animation: {
        duration: animDuration,
      },
    },
  })
}
