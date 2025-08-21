import React from 'react';
import { MapPin, Clock, Shirt } from 'lucide-react';
import { useInvitation } from '../../contexts/InvitationContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

const EventDetailsStep = () => {
  const { invitationData, updateInvitationData, nextStep, prevStep } = useInvitation();

  const handleChange = (e) => {
    updateInvitationData({
      [e.target.name]: e.target.value
    });
  };

  const dressCodeOptions = [
    'Formal',
    'Semi-Formal',
    'Cocktail',
    'Traditional',
    'Beach Casual',
    'Black Tie',
    'White Tie'
  ];

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Details</h2>
      
      <div className="space-y-6">
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            label="Venue Name"
            name="venue"
            value={invitationData.venue}
            onChange={handleChange}
            placeholder="Enter venue name"
            className="pl-10"
            required
          />
        </div>

        <Input
          label="Full Address"
          name="address"
          value={invitationData.address}
          onChange={handleChange}
          placeholder="Enter complete address"
          required
        />

        <div className="relative">
          <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            label="Event Time"
            name="time"
            type="time"
            value={invitationData.time}
            onChange={handleChange}
            className="pl-10"
            required
          />
        </div>

        <div className="relative">
          <Shirt className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <div className="pl-10">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dress Code
            </label>
            <select
              name="dressCode"
              value={invitationData.dressCode}
              onChange={handleChange}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
            >
              <option value="">Select dress code</option>
              {dressCodeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sample Data Button */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Quick Fill</h4>
          <p className="text-sm text-blue-700 mb-3">Use sample data to see how it looks</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateInvitationData({
              venue: 'Grand Ballroom Hotel',
              address: '123 Wedding Street, Love City, LC 12345',
              time: '18:00',
              dressCode: 'Formal'
            })}
          >
            Fill Sample Data
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep}>
            Previous
          </Button>
          <Button 
            onClick={nextStep}
            disabled={!invitationData.venue || !invitationData.address || !invitationData.time}
          >
            Next Step
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default EventDetailsStep;