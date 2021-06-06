import {Chart} from 'chart.js';

export const getChart = (id, data = []) => {
    new Chart(document.getElementById(id), {
        type: 'horizontalBar',
        data: {
          labels: ["Протеїн", "Жири", "Волога", "Клітковина"],
          datasets: [
            {
                label: "Вмiст у вiдсотках",
                backgroundColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 205, 86, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                hoverBorderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 205, 86, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 2,
                minBarLength: 30,
                data
                
            }
          ]
        },
        options: {
            legend: { display: false },
            title: {
                display: true,
                text: 'Показники'
            },
            scales: {
                xAxes: [{ 
                    gridLines : {
                        color: '#999999',
                        drawOnChartArea: true,
                        drawTicks: true,
                        zeroLineColor: '#999999'
                    },
                    scaleLabel: {
                    display: true,
                    labelString: "%",
                    fontColor: '#999999'
                    
                  }
                }],
                yAxes: [{
                    gridLines : {
                        display: false,
                    },
                }]
            }
        }
    });
}