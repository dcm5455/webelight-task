import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const CustomChart = (props) => {
  const { title, xAxisCategories, tooltip, series } = props;

  const options = {
    title: {
      text: `${title} Changes`
    },
    chart: {
      borderWidth: 1,
      borderRadius: 2,
      borderColor: "#d5f4e6",
      spacing: [20, 10, 15, 10],
      backgroundColor: "green",
      height: "300px"
    },
    xAxis: {
      categories: xAxisCategories,
      labels: {
        distance: 30,
        rotation: 315,
        step: 2
      }
    },
    yAxis: {
      title: {
        text: "Total Counts"
      }
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle"
    },
    credits: {
      enabled: false
    },
    tooltip: tooltip,
    series: series
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default CustomChart;
