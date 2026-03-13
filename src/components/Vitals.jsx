import React from 'react';

function VitalCard({ title, value, note, status, extra }) {
  return (
    <div className="card" style={{ flex: 1, margin: '0 0.5rem' }}>
      <h3>{title}</h3>
      <p style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>{value}</p>
      {status && <small>{status}</small>}
      {note && <p style={{ marginTop: '0.5rem', color: '#666' }}>{note}</p>}
      {extra && <div>{extra}</div>}
    </div>
  );
}

export default function Vitals({ data }) {
  return (
    <div style={{ display: 'flex', marginTop: '1rem', alignItems: 'center' }}>
      {data.map((item) => (
        <VitalCard key={item.title} {...item} />
      ))}
    </div>
  );
}