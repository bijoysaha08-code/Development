import React from 'react';

export default function ReportsTable({ reports }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Investigation</th>
          <th>Result</th>
          <th>Date</th>
          <th>Priority</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {reports.map((r, idx) => (
          <tr key={idx}>
            <td>{r.name}</td>
            <td>{r.result}</td>
            <td>{r.date}</td>
            <td>{r.priority}</td>
            <td>{r.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}