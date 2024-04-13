import React from "react";
import { useGetAllReportsQuery } from "../../Features/userfeatures/Admin";
import "./Reports.scss";

const Reports = () => {
  const { data } = useGetAllReportsQuery();
  console.log(data);

  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Format the date as desired (e.g., "YYYY-MM-DD HH:MM:SS")
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div className="Reports">
      <h2>All Reports</h2>
      <table>
        <thead>
          <tr>
            <th>Report ID</th>
            <th>User ID</th>
            <th>Location</th>
            <th>Time of Reporting</th>
            <th>Type</th>
            <th>Description</th>
            <th>Noise Level</th>
            <th>Source of Noise</th>
            <th>Duration of Noise</th>
            <th>Supporting Documents</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.result.map((report) => (
              <tr key={report.ReportID}>
                <td>{report.ReportID}</td>
                <td>{report.UserID}</td>
                <td>{report.Location}</td>
                <td>{formatDate(report.TimeOfReporting)}</td>
                <td>{report.Type}</td>
                <td>{report.Description}</td>
                <td>{report.NoiseLevel}</td>
                <td>{report.SourceOfNoise}</td>
                <td>{report.DurationOfNoise}</td>
                <td>{report.SupportingDocuments}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
