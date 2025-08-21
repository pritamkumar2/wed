import React, { useRef, useState } from 'react';
import { Music, Upload, Play, Pause, Volume2 } from 'lucide-react';
import { useInvitation } from '../../contexts/InvitationContext';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

const MusicStep = () => {
  const { invitationData, updateInvitationData, prevStep, saveInvitation } = useInvitation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    updateInvitationData({
      [e.target.name]: e.target.value
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateInvitationData({
        backgroundMusic: file,
        musicUrl: URL.createObjectURL(file)
      });
    }
  };

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const addSampleMusic = () => {
    updateInvitationData({
      musicUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      backgroundMusic: null
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const savedInvitation = saveInvitation();
      // Simulate save delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving invitation:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Background Music</h2>
      
      <div className="space-y-6">
        {/* Music URL Input */}
        <div>
          <Input
            label="Music URL"
            name="musicUrl"
            value={invitationData.musicUrl}
            onChange={handleChange}
            placeholder="https://example.com/your-song.mp3"
            className="mb-4"
          />
          <p className="text-sm text-gray-600">
            Add a link to your favorite song that will play in the background
          </p>
        </div>

        <div className="flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* File Upload */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-rose-400 transition-colors">
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          
          <Music className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Audio File</h3>
          <p className="text-gray-600 mb-4">Upload your favorite song for background music</p>
          
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Choose Audio
            </Button>
            <Button variant="outline" onClick={addSampleMusic}>
              Use Sample Music
            </Button>
          </div>
        </div>

        {/* Music Player */}
        {invitationData.musicUrl && (
          <div className="bg-gray-100 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Music Preview</h4>
            <div className="flex items-center space-x-4">
              <button
                onClick={togglePlayback}
                className="flex items-center justify-center w-12 h-12 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-1" />}
              </button>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <Volume2 className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-600">
                    {invitationData.backgroundMusic ? invitationData.backgroundMusic.name : 'External audio link'}
                  </span>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
                  <div className="bg-rose-500 h-2 rounded-full w-1/3"></div>
                </div>
              </div>
            </div>
            
            <audio
              ref={audioRef}
              src={invitationData.musicUrl}
              onEnded={() => setIsPlaying(false)}
              className="hidden"
            />
          </div>
        )}

        {/* Music Settings */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Music Settings</h4>
          <div className="space-y-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                defaultChecked
                className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
              />
              <span className="text-sm text-blue-800">Auto-play when invitation opens</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                defaultChecked
                className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
              />
              <span className="text-sm text-blue-800">Loop music continuously</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                defaultChecked
                className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
              />
              <span className="text-sm text-blue-800">Show music controls to guests</span>
            </label>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep}>
            Previous
          </Button>
          <Button onClick={handleSave} loading={loading}>
            Save Invitation
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default MusicStep;