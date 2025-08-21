import React from 'react';
import { useInvitation } from '../../contexts/InvitationContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

const CoupleDetailsStep = () => {
  const { invitationData, updateInvitationData, nextStep } = useInvitation();

  const handleChange = (e) => {
    updateInvitationData({
      [e.target.name]: e.target.value
    });
  };

  const handleNext = () => {
    if (invitationData.brideName && invitationData.groomName && invitationData.weddingDate) {
      nextStep();
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Couple Details</h2>
      
      <div className="space-y-6">
        <Input
          label="Bride's Name"
          name="brideName"
          value={invitationData.brideName}
          onChange={handleChange}
          placeholder="Enter bride's name"
          required
        />

        <Input
          label="Groom's Name"
          name="groomName"
          value={invitationData.groomName}
          onChange={handleChange}
          placeholder="Enter groom's name"
          required
        />

        <Input
          label="Wedding Date"
          name="weddingDate"
          type="date"
          value={invitationData.weddingDate}
          onChange={handleChange}
          required
        />

        <div className="flex justify-end">
          <Button 
            onClick={handleNext}
            disabled={!invitationData.brideName || !invitationData.groomName || !invitationData.weddingDate}
          >
            Next Step
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CoupleDetailsStep;