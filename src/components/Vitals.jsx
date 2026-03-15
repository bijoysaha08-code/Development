import React from 'react';

function VitalCard({ title, value, badge, note }) {
  return (
    <div className="card vital-card">
      <h4>{title}</h4>
      <div className="big-value">{value}</div>
      {badge && <span className="badge">{badge}</span>}
      {note && <div className="note">{note}</div>}
    </div>
  );
}

export default function Vitals({ data }) {
  return (
    <div className="vitals">
      {data.map((item) => (
        <VitalCard key={item.title} {...item} />
      ))}
    </div>
  );
}