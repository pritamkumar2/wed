import React from 'react';
import { motion } from 'framer-motion';
import { useInvitation } from '../contexts/InvitationContext';
import ProgressBar from '../components/ui/ProgressBar';
import CoupleDetailsStep from '../components/steps/CoupleDetailsStep';
import PhotoGalleryStep from '../components/steps/PhotoGalleryStep';
import VideoStep from '../components/steps/VideoStep';
import EventDetailsStep from '../components/steps/EventDetailsStep';
import PollsStep from '../components/steps/PollsStep';
import MusicStep from '../components/steps/MusicStep';
import InvitationPreview from '../components/InvitationPreview';

const InvitationCreator = () => {
  const { currentStep } = useInvitation();

  const steps = [
    'Couple',
    'Photos',
    'Video',
    'Details',
    'Polls',
    'Music'
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <CoupleDetailsStep />;
      case 2:
        return <PhotoGalleryStep />;
      case 3:
        return <VideoStep />;
      case 4:
        return <EventDetailsStep />;
      case 5:
        return <PollsStep />;
      case 6:
        return <MusicStep />;
      default:
        return <CoupleDetailsStep />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Wedding Invitation</h1>
          <p className="text-gray-600">Follow the steps to create a beautiful digital invitation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <ProgressBar 
              currentStep={currentStep} 
              totalSteps={6} 
              steps={steps}
            />
            
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-8">
            <InvitationPreview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationCreator;