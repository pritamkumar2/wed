import React, { useRef } from 'react';
import { Upload, X, Image } from 'lucide-react';
import { useInvitation } from '../../contexts/InvitationContext';
import Button from '../ui/Button';
import Card from '../ui/Card';

const PhotoGalleryStep = () => {
  const { invitationData, updateInvitationData, nextStep, prevStep } = useInvitation();
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file),
      name: file.name
    }));

    updateInvitationData({
      photos: [...invitationData.photos, ...newPhotos]
    });
  };

  const removePhoto = (photoId) => {
    const updatedPhotos = invitationData.photos.filter(photo => photo.id !== photoId);
    updateInvitationData({ photos: updatedPhotos });
  };

  const addSamplePhotos = () => {
    const samplePhotos = [
      {
        id: 'sample1',
        url: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400',
        name: 'Couple Photo 1'
      },
      {
        id: 'sample2',
        url: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
        name: 'Couple Photo 2'
      },
      {
        id: 'sample3',
        url: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=400',
        name: 'Couple Photo 3'
      }
    ];

    updateInvitationData({
      photos: [...invitationData.photos, ...samplePhotos]
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Photo Gallery</h2>
      
      <div className="space-y-6">
        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-rose-400 transition-colors">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          
          <Image className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Photos</h3>
          <p className="text-gray-600 mb-4">Add beautiful photos of you and your partner</p>
          
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Choose Files
            </Button>
            <Button variant="outline" onClick={addSamplePhotos}>
              Add Sample Photos
            </Button>
          </div>
        </div>

        {/* Photo Grid */}
        {invitationData.photos.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {invitationData.photos.map((photo) => (
              <div key={photo.id} className="relative group">
                <img
                  src={photo.url}
                  alt={photo.name}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() => removePhoto(photo.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
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

export default PhotoGalleryStep;