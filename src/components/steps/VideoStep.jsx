import React, { useRef } from 'react';
import { Upload, Video, Link as LinkIcon } from 'lucide-react';
import { useInvitation } from '../../contexts/InvitationContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

const VideoStep = () => {
  const { invitationData, updateInvitationData, nextStep, prevStep } = useInvitation();
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    updateInvitationData({
      [e.target.name]: e.target.value
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateInvitationData({
        videoFile: file,
        videoUrl: URL.createObjectURL(file)
      });
    }
  };

  const addSampleVideo = () => {
    updateInvitationData({
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      videoFile: null
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Pre-Wedding Video</h2>
      
      <div className="space-y-6">
        {/* Video URL Input */}
        <div>
          <Input
            label="Video URL (YouTube, Vimeo, etc.)"
            name="videoUrl"
            value={invitationData.videoUrl}
            onChange={handleChange}
            placeholder="https://youtube.com/watch?v=..."
            className="mb-4"
          />
          <p className="text-sm text-gray-600">
            Paste a link to your video from YouTube, Vimeo, or any other platform
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
            accept="video/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          
          <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Video File</h3>
          <p className="text-gray-600 mb-4">Upload your pre-wedding video directly</p>
          
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Choose Video
            </Button>
            <Button variant="outline" onClick={addSampleVideo}>
              Use Sample Video
            </Button>
          </div>
        </div>

        {/* Video Preview */}
        {invitationData.videoUrl && (
          <div className="bg-gray-100 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Video Preview</h4>
            <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
              <div className="text-center">
                <Video className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Video will be displayed here</p>
                <p className="text-sm text-gray-500 mt-1">
                  {invitationData.videoFile ? invitationData.videoFile.name : 'External video link'}
                </p>
              </div>
            </div>
          </div>
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

export default VideoStep;