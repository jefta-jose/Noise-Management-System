import React from "react";
import {
  useSumOfAllUsersQuery,
  useSumOfAllReportsQuery,
  useReportsPerDayQuery,
} from "../../Features/userfeatures/Admin";
import users from "../../assets/Rectangle 19.png";
import reports from "../../assets/Rectangle 21.png";
import Chart from "react-apexcharts";
import "./adminLayout.scss";

const AdminLayout = () => {
  const FirstName = localStorage.getItem("FirstName");
  const {
    data: usersData,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
  } = useSumOfAllUsersQuery();
  const {
    data: reportsData,
    isLoading: isLoadingReports,
    isError: isErrorReports,
  } = useSumOfAllReportsQuery();
  const {
    data: reportsPerDayData,
    isLoading: isLoadingReportsPerDay,
    isError: isErrorReportsPerDay,
  } = useReportsPerDayQuery();

  if (isLoadingUsers || isLoadingReports || isLoadingReportsPerDay)
    return <div>Loading...</div>;
  if (isErrorUsers || isErrorReports || isErrorReportsPerDay)
    return <div>Error fetching data</div>;

  // Assuming usersData and reportsData are arrays with at least one object
  const numberOfUsers = usersData[0].count;
  const numberOfReports = reportsData[0].count;

  const reportData = reportsPerDayData.numberOfReports;

  // Extracting data for rendering in the chart
  const chartData = reportData.map((day) => ({
    x: ` ${day.dayOfWeek}`,
    y: day.numberOfReports,
  }));

  const series = [
    {
      name: "Number of Reports",
      data: chartData,
    },
  ];

  const options = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: "category",
    },
    yaxis: {
      title: {
        text: "Number of Reports",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  };

  return (
    <div className="adminLayout">
      <div className="welcome">
        <p className="FirstName">Welcome back {FirstName}</p>
        <p>Dashboard Overview</p>
      </div>
      <div className="numbers">
        <div className="users">
          <div className="digits">
            <p>Users</p>
            <p>{numberOfUsers}</p>
          </div>
          <div className="numbers-icon">
            <img src={users} alt="" />
          </div>
        </div>

        <div className="reports">
          <div className="digits">
            <p>Reports</p>
            <p>{numberOfReports}</p>
          </div>
          <div className="numbers-icon">
            <img src={reports} alt="" />
          </div>
        </div>
      </div>

      <div
        className="chart-container"
        style={{
          width: "100%",
          margin: "auto",
          marginTop: "20px",
          border: "1px solid #ddd",
          borderRadius: "5px",
          padding: "20px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Add drop shadow
        }}
      >
        <Chart options={options} series={series} type="bar" height={350} />
      </div>
    </div>
  );
};

export default AdminLayout;
