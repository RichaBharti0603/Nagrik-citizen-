import React from 'react';
import ReportIssueForm from '../components/ReportIssueForm';
import LocalRepresentatives from '../components/LocalRepresentatives';
import PollsSection from '../components/PollsSection';

const Home = () => {
  return (
    <div>
      <ReportIssueForm />
      <LocalRepresentatives />
      <PollsSection />
    </div>
  );
};

export default Home;
