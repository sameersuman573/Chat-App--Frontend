import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  Tooltip,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
} from "chart.js";
import { getlast7Days } from "../../lib/features";
import zIndex from "@mui/material/styles/zIndex";



// First register yourself

ChartJS.register(
  CategoryScale,
  Tooltip,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend
);

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
    title: {
      display: false,
    },
  },

  scales: {
    x: {
      grid: {
        display: true,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: true,
      },
    },
  },
};

const labels = getlast7Days();

const LineChart = ({ value = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        label: "Message",
        fill: false,
        backgroundColor: "#088395",
        borderColor: "#FFDB00",
      },
      // {
      //   data: value,
      //   label: "Revenue2",
      //   fill: false,
      //   backgroundColor: "#EE4E4E",
      //   borderColor: "#36C2CE",
      // },
    ],
  };

  return <Line data={data} options={lineChartOptions} />;
};

const DoughnutChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  cutout: 120,
};

const DoughtnutChart = ({ value = [], labels = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        label: "Total Chats vs GroupChats ",
        fill: false,
        backgroundColor: ["#088395", "#AF47D2"],
        borderColor: ["#FAFFAF", "#AF47D2"],
        offset: 30,
      },
    ],
  };

  return (
    <Doughnut
      style={{ zIndex: 20 }}
      data={data}
      options={DoughnutChartOptions}
    />
  );
};

export { LineChart, DoughtnutChart };
