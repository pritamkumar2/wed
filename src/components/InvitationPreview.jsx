import React, { useState } from 'react';
import { Heart, MapPin, Clock, Calendar, Music, Users, Utensils, Smartphone, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInvitation } from '../contexts/InvitationContext';
import Button from './ui/Button';
import Card from './ui/Card';

const InvitationPreview = () => {
  const { invitationData } = useInvitation();
  const [viewMode, setViewMode] = useState('mobile'); // 'mobile' or 'desktop'
  const [selectedResponse, setSelectedResponse] = useState('');
  const [selectedMeal, setSelectedMeal] = useState('');

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const previewClasses = viewMode === 'mobile' 
    ? 'max-w-sm mx-auto' 
    : 'max-w-2xl mx-auto';

  return (
    <div className="space-y-4">
      {/* View Mode Toggle */}
      <div className="flex items-center justify-center space-x-2 mb-4">
        <button
          onClick={() => setViewMode('mobile')}
          className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm transition-colors ${
            viewMode === 'mobile' 
              ? 'bg-rose-500 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Smartphone className="h-4 w-4" />
          <span>Mobile</span>
        </button>
        <button
          onClick={() => setViewMode('desktop')}
          className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm transition-colors ${
            viewMode === 'desktop' 
              ? 'bg-rose-500 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Monitor className="h-4 w-4" />
          <span>Desktop</span>
        </button>
      </div>

      {/* Preview Container */}
      <div className={previewClasses}>
        <Card className="overflow-hidden">
          {/* Header with Background */}
          <div className="relative bg-gradient-to-br from-rose-400 via-pink-500 to-purple-600 text-white p-8 text-center">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="relative z-10">
              <Heart className="h-12 w-12 mx-auto mb-4 text-white" />
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {invitationData.brideName && invitationData.groomName
                  ? `${invitationData.brideName} & ${invitationData.groomName}`
                  : 'Your Names Here'
                }
              </h1>
              <p className="text-rose-100">are getting married!</p>
            </div>
          </div>

          {/* Photo Gallery */}
          {invitationData.photos.length > 0 && (
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Our Story</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {invitationData.photos.slice(0, 6).map((photo, index) => (
                  <motion.img
                    key={photo.id}
                    src={photo.url}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-24 md:h-32 object-cover rounded-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Video Section */}
          {invitationData.videoUrl && (
            <div className="p-6 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Our Journey</h3>
              <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-rose-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                    </svg>
                  </div>
                  <p className="text-gray-600 text-sm">Pre-wedding Video</p>
                </div>
              </div>
            </div>
          )}

          {/* Event Details */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Wedding Details</h3>
            <div className="space-y-4">
              {invitationData.weddingDate && (
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-rose-500" />
                  <span className="text-gray-700">{formatDate(invitationData.weddingDate)}</span>
                </div>
              )}
              
              {invitationData.time && (
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-rose-500" />
                  <span className="text-gray-700">{formatTime(invitationData.time)}</span>
                </div>
              )}
              
              {invitationData.venue && (
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-rose-500 mt-0.5" />
                  <div>
                    <p className="text-gray-700 font-medium">{invitationData.venue}</p>
                    {invitationData.address && (
                      <p className="text-gray-600 text-sm">{invitationData.address}</p>
                    )}
                  </div>
                </div>
              )}
              
              {invitationData.dressCode && (
                <div className="flex items-center space-x-3">
                  <div className="h-5 w-5 bg-rose-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">👔</span>
                  </div>
                  <span className="text-gray-700">Dress Code: {invitationData.dressCode}</span>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Polls */}
          {invitationData.pollsEnabled && (
            <div className="p-6 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Please Respond</h3>
              
              {/* Attendance Poll */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Users className="h-4 w-4 text-gray-600" />
                  <span className="font-medium text-gray-900">Will you be attending?</span>
                </div>
                <div className="space-y-2">
                  {['Yes, I\'ll be there!', 'Sorry, can\'t make it'].map((option) => (
                    <label key={option} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="attendance"
                        value={option}
                        checked={selectedResponse === option}
                        onChange={(e) => setSelectedResponse(e.target.value)}
                        className="text-rose-500 focus:ring-rose-500"
                      />
                      <span className="text-gray-700 text-sm">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Meal Preference Poll */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Utensils className="h-4 w-4 text-gray-600" />
                  <span className="font-medium text-gray-900">Meal preference?</span>
                </div>
                <div className="space-y-2">
                  {invitationData.mealOptions.map((option) => (
                    <label key={option} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="meal"
                        value={option}
                        checked={selectedMeal === option}
                        onChange={(e) => setSelectedMeal(e.target.value)}
                        className="text-rose-500 focus:ring-rose-500"
                      />
                      <span className="text-gray-700 text-sm">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Button size="sm" className="w-full">
                Submit Response
              </Button>
            </div>
          )}

          {/* Music Player */}
          {invitationData.musicUrl && (
            <div className="p-6 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-3">
                <Music className="h-5 w-5 text-rose-500" />
                <span className="text-gray-700 text-sm">Background music playing</span>
                <button className="text-rose-500 hover:text-rose-600">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zM11 8a1 1 0 112 0v4a1 1 0 11-2 0V8z"/>
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="p-6 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-center">
            <p className="text-rose-100 text-sm mb-2">We can't wait to celebrate with you!</p>
            <Heart className="h-6 w-6 mx-auto text-white" />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default InvitationPreview;