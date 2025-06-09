import React, { useState } from 'react';
import JobCard from '../components/JobCard';
import { QuotationForm } from '../components/QuotationForm';
import Modal from '../components/Modal';
import Button from '../components/Button';
import UserLayout from '../layout/UserLayout';
import { UpdateProfile } from './UpdateProfile'; // Import the new component

const JobSeekerDashboard = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Web Developer Needed',
      description: 'Looking for an experienced web developer to build a modern e-commerce website.',
      budget: '$2000 - $3000',
      duration: '2-3 weeks',
      postedDate: '2025-05-01',
      status: 'Open',
      skills: ['React', 'Node.js', 'MongoDB']
    },
    {
      id: 2,
      title: 'Mobile App Developer',
      description: 'Need a mobile app developer to create an iOS and Android app for our fitness tracking platform.',
      budget: '$4000 - $5000',
      duration: '4-6 weeks',
      postedDate: '2025-05-02',
      status: 'Open',
      skills: ['React Native', 'Firebase', 'REST API']
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      description: 'Seeking a talented UI/UX designer to create modern and user-friendly interfaces for our new SaaS product.',
      budget: '$1500 - $2500',
      duration: '3-4 weeks',
      postedDate: '2025-05-03',
      status: 'Open',
      skills: ['Figma', 'Adobe XD', 'User Research']
    },
    {
      id: 4,
      title: 'Backend Developer',
      description: 'Looking for a skilled backend developer to work on our cloud-based enterprise solution.',
      budget: '$3000 - $4000',
      duration: '3-5 weeks',
      postedDate: '2025-05-04',
      status: 'Open',
      skills: ['Python', 'Django', 'AWS']
    },
    {
      id: 5,
      title: 'Full Stack Developer',
      description: 'Need a full stack developer to build a complete web application for our new startup.',
      budget: '$5000 - $7000',
      duration: '6-8 weeks',
      postedDate: '2025-05-05',
      status: 'Open',
      skills: ['MERN Stack', 'REST API', 'Microservices']
    }
  ]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false); // New state for profile modal
  const [quotations, setQuotations] = useState([
    {
      id: 1,
      jobId: 'WEB-001',
      jobTitle: 'Web Developer Needed',
      bidAmount: 2500,
      completionTime: 2,
      description: 'I can deliver a modern, responsive e-commerce website using React and Node.js within 2 weeks.',
      status: 'Pending',
      submittedDate: '2025-05-06'
    },
    {
      id: 2,
      jobId: 'MOB-002',
      jobTitle: 'Mobile App Developer',
      bidAmount: 4200,
      completionTime: 5,
      description: 'I have experience in building cross-platform mobile apps using React Native and Firebase.',
      status: 'Accepted',
      submittedDate: '2025-05-07'
    }
  ]);

  const handleSubmitQuote = (quoteData) => {
    setQuotations(prev => [...prev, quoteData]);
    setSelectedJob(null);
  };

  const handleOpenUpdateProfileModal = () => {
    setShowUpdateProfileModal(true);
  };

  const handleCloseUpdateProfileModal = () => {
    setShowUpdateProfileModal(false);
  };

  return (
    <UserLayout userRole="jobseeker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Jobseeker Dashboard</h1>
          <div className="flex space-x-4">
            <Button variant="primary">Submit New Portfolio</Button>
            <Button variant="secondary" onClick={handleOpenUpdateProfileModal}>Update Profile</Button> {/* Add onClick handler */}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Active Bids</h3>
            <p className="text-3xl font-bold text-blue-600">2</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Pending Bids</h3>
            <p className="text-3xl font-bold text-yellow-600">1</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Accepted Bids</h3>
            <p className="text-3xl font-bold text-green-600">1</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Total Earnings</h3>
            <p className="text-3xl font-bold text-gray-900">$6,700</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map(job => (
              <JobCard
                key={job.id}
                job={job}
                onQuote={() => setSelectedJob(job)}
              />
            ))}
          </div>
        </div>

        {/* Modal for submitting quotation */}
        <Modal isOpen={selectedJob !== null} onClose={() => setSelectedJob(null)}>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6">Submit Quotation</h2>
            <QuotationForm
              job={selectedJob}
              onSubmit={handleSubmitQuote}
            />
          </div>
        </Modal>

        {/* Modal for updating profile */}
        <Modal isOpen={showUpdateProfileModal} onClose={handleCloseUpdateProfileModal}>
          <UpdateProfile onClose={handleCloseUpdateProfileModal} />
        </Modal>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Quotations</h2>
          <div className="space-y-4">
            {quotations.map((quote, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{quote.jobTitle}</h3>
                    <p className="text-gray-600 mt-2">Bid Amount: ${quote.bidAmount}</p>
                    <p className="text-gray-600">Completion Time: {quote.completionTime} days</p>
                    <p className="text-gray-600 mt-2">Status: <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      quote.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                      quote.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {quote.status}
                    </span></p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Button variant="secondary" onClick={() => {}}>View Details</Button>
                    <Button variant="danger" onClick={() => {}}>Cancel Bid</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default JobSeekerDashboard;













// import React, { useState } from 'react';
// import JobCard from '../components/JobCard';
// import { QuotationForm } from '../components/QuotationForm';
// import Modal from '../components/Modal';
// import Button from '../components/Button';
// import UserLayout from '../layout/UserLayout';

// const JobSeekerDashboard = () => {
//   const [jobs, setJobs] = useState([
//     {
//       id: 1,
//       title: 'Web Developer Needed',
//       description: 'Looking for an experienced web developer to build a modern e-commerce website.',
//       budget: '$2000 - $3000',
//       duration: '2-3 weeks',
//       postedDate: '2025-05-01',
//       status: 'Open',
//       skills: ['React', 'Node.js', 'MongoDB']
//     },
//     {
//       id: 2,
//       title: 'Mobile App Developer',
//       description: 'Need a mobile app developer to create an iOS and Android app for our fitness tracking platform.',
//       budget: '$4000 - $5000',
//       duration: '4-6 weeks',
//       postedDate: '2025-05-02',
//       status: 'Open',
//       skills: ['React Native', 'Firebase', 'REST API']
//     },
//     {
//       id: 3,
//       title: 'UI/UX Designer',
//       description: 'Seeking a talented UI/UX designer to create modern and user-friendly interfaces for our new SaaS product.',
//       budget: '$1500 - $2500',
//       duration: '3-4 weeks',
//       postedDate: '2025-05-03',
//       status: 'Open',
//       skills: ['Figma', 'Adobe XD', 'User Research']
//     },
//     {
//       id: 4,
//       title: 'Backend Developer',
//       description: 'Looking for a skilled backend developer to work on our cloud-based enterprise solution.',
//       budget: '$3000 - $4000',
//       duration: '3-5 weeks',
//       postedDate: '2025-05-04',
//       status: 'Open',
//       skills: ['Python', 'Django', 'AWS']
//     },
//     {
//       id: 5,
//       title: 'Full Stack Developer',
//       description: 'Need a full stack developer to build a complete web application for our new startup.',
//       budget: '$5000 - $7000',
//       duration: '6-8 weeks',
//       postedDate: '2025-05-05',
//       status: 'Open',
//       skills: ['MERN Stack', 'REST API', 'Microservices']
//     }
//   ]);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [quotations, setQuotations] = useState([
//     {
//       id: 1,
//       jobId: 'WEB-001',
//       jobTitle: 'Web Developer Needed',
//       bidAmount: 2500,
//       completionTime: 2,
//       description: 'I can deliver a modern, responsive e-commerce website using React and Node.js within 2 weeks.',
//       status: 'Pending',
//       submittedDate: '2025-05-06'
//     },
//     {
//       id: 2,
//       jobId: 'MOB-002',
//       jobTitle: 'Mobile App Developer',
//       bidAmount: 4200,
//       completionTime: 5,
//       description: 'I have experience in building cross-platform mobile apps using React Native and Firebase.',
//       status: 'Accepted',
//       submittedDate: '2025-05-07'
//     }
//   ]);

//   const handleSubmitQuote = (quoteData) => {
//     setQuotations(prev => [...prev, quoteData]);
//     setSelectedJob(null);
//   };

//   return (
//     <UserLayout userRole="jobseeker">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Jobseeker Dashboard</h1>
//           <div className="flex space-x-4">
//             <Button variant="primary">Submit New Portfolio</Button>
//             <Button variant="secondary">Update Profile</Button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white rounded-lg shadow p-6">
//             <h3 className="text-lg font-semibold mb-2">Active Bids</h3>
//             <p className="text-3xl font-bold text-blue-600">2</p>
//           </div>
//           <div className="bg-white rounded-lg shadow p-6">
//             <h3 className="text-lg font-semibold mb-2">Pending Bids</h3>
//             <p className="text-3xl font-bold text-yellow-600">1</p>
//           </div>
//           <div className="bg-white rounded-lg shadow p-6">
//             <h3 className="text-lg font-semibold mb-2">Accepted Bids</h3>
//             <p className="text-3xl font-bold text-green-600">1</p>
//           </div>
//           <div className="bg-white rounded-lg shadow p-6">
//             <h3 className="text-lg font-semibold mb-2">Total Earnings</h3>
//             <p className="text-3xl font-bold text-gray-900">$6,700</p>
//           </div>
//         </div>

//         <div className="mb-8">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Jobs</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {jobs.map(job => (
//               <JobCard
//                 key={job.id}
//                 job={job}
//                 onQuote={() => setSelectedJob(job)}
//               />
//             ))}
//           </div>
//         </div>

//         <Modal isOpen={selectedJob !== null} onClose={() => setSelectedJob(null)}>
//           <div className="p-6">
//             <h2 className="text-xl font-bold mb-6">Submit Quotation</h2>
//             <QuotationForm
//               job={selectedJob}
//               onSubmit={handleSubmitQuote}
//             />
//           </div>
//         </Modal>

//         <div className="mt-12">
//           <h2 className="text-2xl font-bold text-gray-900 mb-6">My Quotations</h2>
//           <div className="space-y-4">
//             {quotations.map((quote, index) => (
//               <div key={index} className="bg-white rounded-lg shadow p-6">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h3 className="font-semibold text-lg">{quote.jobTitle}</h3>
//                     <p className="text-gray-600 mt-2">Bid Amount: ${quote.bidAmount}</p>
//                     <p className="text-gray-600">Completion Time: {quote.completionTime} days</p>
//                     <p className="text-gray-600 mt-2">Status: <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                       quote.status === 'Accepted' ? 'bg-green-100 text-green-800' :
//                       quote.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
//                       'bg-gray-100 text-gray-800'
//                     }`}>
//                       {quote.status}
//                     </span></p>
//                   </div>
//                   <div className="flex flex-col space-y-2">
//                     <Button variant="secondary" onClick={() => {}}>View Details</Button>
//                     <Button variant="danger" onClick={() => {}}>Cancel Bid</Button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </UserLayout>
//   );
// };

// export default JobSeekerDashboard;
