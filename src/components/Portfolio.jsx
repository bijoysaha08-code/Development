import React from "react";
import { Link } from "react-router-dom";

const Portfolio = () => (
  <div style={{ padding: "2rem" }}>
    <h1>Portfolio</h1>
    <ul>
      <li>
        <Link to="/healthcare-crm">Healthcare CRM</Link>
      </li>
      {/* Add more portfolio items here */}
    </ul>
  </div>
);

export default Portfolio;
