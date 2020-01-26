<script>
  import { _ } from 'global';
  import Chart from 'chart.js';
  import { onMount, onDestroy } from 'svelte';

  let myChartDom;
  let myChart;

  onDestroy(() => {
    if (myChart != null) {
      myChart.destroy();
    }
  });

  onMount(() => {
    myChart = new Chart(myChartDom, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
          }],
        },
      },
    });
  });
  // var myChart = new Chart(ctx, {...});
</script>

<div class="card-body">
  <h5 class="card-title">{$_('Chart tab')}</h5>
  <p class="card-text">{$_('Chart tab description')}</p>
  <canvas width="400" height="200" bind:this={myChartDom}></canvas>
</div>