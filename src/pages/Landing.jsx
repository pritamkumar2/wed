import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Users, BarChart3, Music, Camera } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Landing = () => {
  const features = [
    {
      icon: Heart,
      title: 'Beautiful Invitations',
      description: 'Create stunning digital wedding invitations with customizable templates and themes.'
    },
    {
      icon: Camera,
      title: 'Photo & Video Gallery',
      description: 'Share your love story with photo galleries and pre-wedding videos.'
    },
    {
      icon: Users,
      title: 'Guest Management',
      description: 'Track RSVPs, meal preferences, and manage your guest list effortlessly.'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Get insights on responses, food preferences, and budget planning.'
    },
    {
      icon: Music,
      title: 'Background Music',
      description: 'Add your favorite songs to create the perfect ambiance for your invitation.'
    },
    {
      icon: Sparkles,
      title: 'Interactive Polls',
      description: 'Engage guests with polls for attendance confirmation and meal choices.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Create Magical
              <span className="block bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
                Wedding Invitations
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Design beautiful digital wedding invitations with photo galleries, videos, 
              RSVP tracking, and interactive features. Make your special day unforgettable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="xl" className="w-full sm:w-auto">
                  Start Creating Free
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" size="xl" className="w-full sm:w-auto">
                  View Demo
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 text-rose-200">
          <Heart className="h-8 w-8 animate-pulse" />
        </div>
        <div className="absolute top-40 right-10 text-pink-200">
          <Sparkles className="h-6 w-6 animate-bounce" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Perfect Invitations
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From design to guest management, we've got all the tools to make your wedding planning seamless.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-rose-100 rounded-lg">
                      <feature.icon className="h-6 w-6 text-rose-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-500 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Create Your Dream Invitation?
            </h2>
            <p className="text-xl text-rose-100 mb-8">
              Join thousands of couples who have created beautiful wedding invitations with us.
            </p>
            <Link to="/register">
              <Button 
                variant="secondary" 
                size="xl"
                className="bg-white text-rose-600 hover:bg-gray-50"
              >
                Get Started Today
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;