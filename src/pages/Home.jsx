import React from 'react';
import ReportIssueForm from '../components/ReportIssueForm';
import SubmittedIssues from '../components/SubmittedIssues';
import LocalRepresentatives from '../components/LocalRepresentatives';
import PollsSection from '../components/PollsSection';
import MapView from "../components/MapView";
import FeedbackForm from "../components/FeedbackForm";
import PublicInputEmbed from "../components/PublicInputEmbed";

const Home = () => {
  return (
    <div>
      <ReportIssueForm />
      <SubmittedIssues />
      <LocalRepresentatives />
      <PollsSection />
       <MapView />
       <FeedbackForm />
       <PublicInputEmbed url="https://publicinput.com/example-survey-page" />
    </div>
    
  );
};

export default Home;
