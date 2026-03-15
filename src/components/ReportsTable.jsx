import React from 'react';

export default function ReportsTable({ reports }) {
  return (
    <div>
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
              <td className="status">{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ textAlign: 'right', marginTop: '1rem' }}>
        <button className="button">Add Investigations</button>
      </div>
    </div>
  );
}