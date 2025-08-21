import React, { createContext, useContext, useState } from 'react';

const InvitationContext = createContext();

export const useInvitation = () => {
  const context = useContext(InvitationContext);
  if (!context) {
    throw new Error('useInvitation must be used within an InvitationProvider');
  }
  return context;
};

export const InvitationProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [invitationData, setInvitationData] = useState({
    // Step 1: Couple Details
    brideName: '',
    groomName: '',
    weddingDate: '',
    
    // Step 2: Photos
    photos: [],
    
    // Step 3: Video
    videoUrl: '',
    videoFile: null,
    
    // Step 4: Event Details
    venue: '',
    address: '',
    time: '',
    dressCode: '',
    
    // Step 5: Polls
    pollsEnabled: true,
    mealOptions: ['Vegetarian', 'Non-Vegetarian'],
    
    // Step 6: Music
    backgroundMusic: null,
    musicUrl: ''
  });

  const [invitations, setInvitations] = useState([]);
  const [responses, setResponses] = useState({});

  const updateInvitationData = (data) => {
    setInvitationData(prev => ({ ...prev, ...data }));
  };

  const saveInvitation = () => {
    const newInvitation = {
      id: Date.now().toString(),
      ...invitationData,
      createdAt: new Date().toISOString(),
      status: 'draft'
    };
    
    setInvitations(prev => [...prev, newInvitation]);
    
    // Generate sample responses for demo
    const sampleResponses = {
      [newInvitation.id]: {
        totalInvited: 150,
        confirmed: 120,
        declined: 15,
        pending: 15,
        vegetarian: 80,
        nonVegetarian: 40
      }
    };
    
    setResponses(prev => ({ ...prev, ...sampleResponses }));
    
    return newInvitation;
  };

  const nextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step) => {
    if (step >= 1 && step <= 6) {
      setCurrentStep(step);
    }
  };

  const value = {
    currentStep,
    invitationData,
    invitations,
    responses,
    updateInvitationData,
    saveInvitation,
    nextStep,
    prevStep,
    goToStep,
    setCurrentStep
  };

  return (
    <InvitationContext.Provider value={value}>
      {children}
    </InvitationContext.Provider>
  );
};