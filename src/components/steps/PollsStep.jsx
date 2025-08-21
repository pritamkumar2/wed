import React from 'react';
import { CheckCircle, Users, Utensils } from 'lucide-react';
import { useInvitation } from '../../contexts/InvitationContext';
import Button from '../ui/Button';
import Card from '../ui/Card';

const PollsStep = () => {
  const { invitationData, updateInvitationData, nextStep, prevStep } = useInvitation();

  const togglePolls = () => {
    updateInvitationData({
      pollsEnabled: !invitationData.pollsEnabled
    });
  };

  const updateMealOptions = (options) => {
    updateInvitationData({
      mealOptions: options
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Interactive Polls</h2>
      
      <div className="space-y-6">
        {/* Enable Polls Toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Users className="h-5 w-5 text-gray-600" />
            <div>
              <h3 className="font-medium text-gray-900">Enable Guest Polls</h3>
              <p className="text-sm text-gray-600">Allow guests to respond to polls and questions</p>
            </div>
          </div>
          <button
            onClick={togglePolls}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              invitationData.pollsEnabled ? 'bg-rose-500' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                invitationData.pollsEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {invitationData.pollsEnabled && (
          <>
            {/* Attendance Confirmation */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <h3 className="font-medium text-gray-900">Attendance Confirmation</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Guests will be asked to confirm their attendance
              </p>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm font-medium text-gray-900 mb-2">Poll Question:</p>
                <p className="text-sm text-gray-700">"Will you be attending our wedding?"</p>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">Yes, I'll be there!</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">Sorry, can't make it</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Meal Preferences */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Utensils className="h-5 w-5 text-orange-600" />
                <h3 className="font-medium text-gray-900">Meal Preferences</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Help plan the menu by asking about dietary preferences
              </p>
              
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm font-medium text-gray-900 mb-2">Poll Question:</p>
                  <p className="text-sm text-gray-700">"What's your meal preference?"</p>
                  <div className="mt-2 space-y-1">
                    {invitationData.mealOptions.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                        <span className="text-xs text-gray-600">{option}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customize Meal Options
                  </label>
                  <div className="space-y-2">
                    {invitationData.mealOptions.map((option, index) => (
                      <input
                        key={index}
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...invitationData.mealOptions];
                          newOptions[index] = e.target.value;
                          updateMealOptions(newOptions);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-sm"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="bg-rose-50 border border-rose-200 rounded-lg p-4">
              <h4 className="font-medium text-rose-900 mb-2">Poll Preview</h4>
              <p className="text-sm text-rose-700">
                Guests will see these polls when they open your invitation. 
                Responses will be tracked in your dashboard for easy planning.
              </p>
            </div>
          </>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep}>
            Previous
          </Button>
          <Button onClick={nextStep}>
            Next Step
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PollsStep;