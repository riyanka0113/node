import { Paper, Stack, Typography } from '@mui/material';
import Chart from 'react-apexcharts';
import AnalyticsCard from './AnalyticsCrad';

function Analytics({data}) {
    
    const filetypeChartOptions = {
        chart: {
            type: 'pie',
        },
        labels: Object.keys(data.fileTypes),
        theme: {
            palette: 'palette6',
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

    const riskChartOption =  {
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

   const riskPercentage = ((data.publicFilesCount + data.sharedFilesCount) / data.totalFiles) * 100;

  return (
    <Stack direction='row' spacing={1} alignItems='center' flexWrap='wrap'>
        <Paper variant='outlined' sx={{width: '20rem', p: '1rem', height: '21rem', marginY: '1rem !important'}}>
            <Typography variant="h5">Risk Chart</Typography>
            <Chart options={riskChartOption} series={[riskPercentage]} type="radialBar" width="300"  />
            <Typography variant='body2' textAlign='center'>Risk calculated based on publicly accessible files and externally shared files </Typography>
        </Paper>
        <AnalyticsCard count={data.publicFilesCount} title="Public files" description="Files that are available to anyone over the web via link sharing." />
        <AnalyticsCard count={data.sharedFilesCount} title="Files shared externally" description="Files that have been shared directly with other people." />
        <AnalyticsCard count={data.peopleCount} title="People with access" description="People who have access to files in your Google Drive." />
        <Paper variant='outlined' sx={{p: '1rem', height: '21rem',marginY: '1rem !important'}}>
            <Typography variant="h5" mb="1rem">File Type Chart</Typography>
            <Chart options={filetypeChartOptions} series={chartSeries} type="pie" width="360" />
        </Paper>
    </Stack>
  )
}

export default Analytics