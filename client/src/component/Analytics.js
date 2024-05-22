import { Grid, Paper, Typography } from '@mui/material';
import Chart from 'react-apexcharts';
import AnalyticsCard from './AnalyticsCard';

function Analytics({ data }) {

  const filetypeChartOptions = {
    chart: {
      type: 'pie',
    },
    labels: Object.keys(data.fileTypes),
    theme: {
      palette: 'palette6',
    },
    legend: {
      show:true,
      position: 'bottom'
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        },
      }
    }]
  };

  const riskChartOption = {
    chart: {
      height: 280,
      type: "radialBar",
    },
    colors: ["#20E647"],
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: "70%",
          background: "#293450"
        },
        dataLabels: {
          name: {
            offsetY: -10,
            color: "#fff",
            fontSize: "15px"
          },
          value: {
            color: "#fff",
            fontSize: "30px",
            show: true
          }
        }
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        gradientToColors: ["#87D4F9"],
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: "round"
    },
    labels: ["Risk Score"]
  };

  const chartSeries = Object.values(data.fileTypes);

  const riskPercentage = ((data.publicFiles?.length + data.sharedFiles?.length) / data.totalFiles) * 100;

  return (
    <Grid container spacing={1}>
      <Grid item  xs={12} md={4} xl={3}>
        <Paper variant='outlined' sx={{ p: '1rem', height: '21rem', marginY: '1rem !important' }}>
          <Typography variant="h5">Risk Chart</Typography>
          <Chart options={riskChartOption} series={[riskPercentage]} type="radialBar" width="300" />
          <Typography variant='body2' textAlign='center'>Risk calculated based on publicly accessible files and externally shared files </Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} md={2} xl={2}>
        <AnalyticsCard count={data.publicFiles?.length || 0} title="Public files" description="Files that are available to anyone over the web via link sharing." />
      </Grid>

      <Grid item xs={12} md={2} xl={2}>
        <AnalyticsCard count={data.sharedFiles?.length || 0} title="Files shared externally" description="Files that have been shared directly with other people." />
      </Grid>

      <Grid item xs={12} md={2} xl={2}>
        <AnalyticsCard count={data.peopleCount} title="People with access" description="People who have access to files in your Google Drive." />
      </Grid>

      <Grid item xs={12} md={4} xl={3}>
        <Paper variant='outlined' sx={{ p: '1rem', height: '21rem', marginY: '1rem !important' }}>
          <Typography variant="h5" mb="1rem">File Type Chart</Typography>
          <Chart options={filetypeChartOptions} series={chartSeries} type="pie" width="360" />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Analytics