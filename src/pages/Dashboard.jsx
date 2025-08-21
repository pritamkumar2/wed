import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Eye, Users, Calendar, DollarSign, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useInvitation } from '../contexts/InvitationContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Dashboard = () => {
  const { invitations, responses } = useInvitation();

  // Sample data for charts
  const responseData = [
    { name: 'Confirmed', value: 120, color: '#10b981' },
    { name: 'Declined', value: 15, color: '#ef4444' },
    { name: 'Pending', value: 15, color: '#f59e0b' }
  ];

  const mealData = [
    { name: 'Vegetarian', count: 80 },
    { name: 'Non-Vegetarian', count: 40 }
  ];

  const stats = [
    {
      title: 'Total Invitations',
      value: invitations.length,
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Total Guests',
      value: '150',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Response Rate',
      value: '90%',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Estimated Cost',
      value: '$12,000',
      icon: DollarSign,
      color: 'text-rose-600',
      bgColor: 'bg-rose-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Manage your wedding invitations and track responses</p>
          </div>
          <Link to="/create">
            <Button className="flex items-center space-x-2 mt-4 sm:mt-0">
              <Plus className="h-4 w-4" />
              <span>Create New Invitation</span>
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Response Chart */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Guest Responses</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={responseData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {responseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              {responseData.map((entry, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm text-gray-600">{entry.name}: {entry.value}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Meal Preferences Chart */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Meal Preferences</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mealData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Invitations List */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Your Invitations</h3>
          </div>

          {invitations.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">No invitations yet</h4>
              <p className="text-gray-600 mb-6">Create your first wedding invitation to get started</p>
              <Link to="/create">
                <Button>Create Your First Invitation</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {invitations.map((invitation) => (
                <div
                  key={invitation.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      {invitation.brideName} & {invitation.groomName}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {invitation.weddingDate} • {invitation.venue}
                    </p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        120 Confirmed
                      </span>
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                        15 Pending
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Cost Management Section */}
        <Card className="p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Cost Management</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Per Plate Cost</h4>
              <p className="text-2xl font-bold text-gray-900">$80</p>
              <p className="text-sm text-gray-600">Average cost per guest</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Confirmed Guests</h4>
              <p className="text-2xl font-bold text-green-600">120</p>
              <p className="text-sm text-gray-600">Total confirmed attendees</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Total Estimate</h4>
              <p className="text-2xl font-bold text-rose-600">$9,600</p>
              <p className="text-sm text-gray-600">Based on confirmed guests</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Food Quantity Recommendations</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-blue-800"><strong>Vegetarian meals:</strong> 80 portions</p>
                <p className="text-blue-600">Recommended: 85 portions (5% buffer)</p>
              </div>
              <div>
                <p className="text-blue-800"><strong>Non-vegetarian meals:</strong> 40 portions</p>
                <p className="text-blue-600">Recommended: 42 portions (5% buffer)</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;