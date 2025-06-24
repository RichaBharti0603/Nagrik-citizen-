import React from 'react';
import ReportIssueForm from '../components/ReportIssueForm';
import SubmittedIssues from '../components/SubmittedIssues';
import LocalRepresentatives from '../components/LocalRepresentatives';
import PollsSection from '../components/PollsSection';

const Home = () => {
  return (
    <div>
      <ReportIssueForm />
      <SubmittedIssues />
      <LocalRepresentatives />
      <PollsSection />
    </div>
  );
};

export default Home;
