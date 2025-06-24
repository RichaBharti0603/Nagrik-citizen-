import React from "react";
import NewsFeed from "../components/NewsFeed";
import AirQuality from "../components/AirQuality";
import EmergencyDirectory from "../components/EmergencyDirectory";
import SchemesResources from "../components/SchemesResources";
import ImpactStories from "../components/ImpactStories";
import "./CivicDashboard.css";
import CivicNewsMap from "../components/CivicNewsMap";


function CivicDashboard() {
  return (
    <div className="dashboard-container">
      <h1>📊 Civic Dashboard</h1>
      <CivicNewsMap />
      <AirQuality />
      <NewsFeed />
      <EmergencyDirectory />
      <SchemesResources />
      <ImpactStories />
    </div>
  );
}

export default CivicDashboard;
