import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, CheckCircle, Star, Users, Award, Zap, Globe, Code, Palette, Brain, Database, Monitor, BookOpen, UserPlus, Phone, Mail, MapPin, ExternalLink, LogIn, User, Calendar, Clock, Video, Play, Upload, FileText, ArrowLeft, Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import Login from '@/components/Login';

const Index = () => {
  const navigate = useNavigate();
  const { user, userRole, loading, signOut } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [enrollment, setEnrollment] = useState(null);
  const [modules, setModules] = useState([]);
  const [currentModule, setCurrentModule] = useState(null);
  const [githubLink, setGithubLink] = useState('');
  const [hostingLink, setHostingLink] = useState('');
  const [submissionText, setSubmissionText] = useState('');
  const [meetings, setMeetings] = useState([]);
  const [students, setStudents] = useState([]);
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    meetingLink: ''
  });
  const [showCreateMeeting, setShowCreateMeeting] = useState(false);

  const [formData, setFormData] = useState({
    studentName: '',
    state: '',
    phoneNumber: '',
    collegeName: '',
    yearOfStudying: '',
    emailId: '',
    secondaryEmailId: '',
    internshipMode: '',
    duration: '',
    domain: ''
  });

  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', message: 'Hi! I\'m here to help you with any questions about GigLabs internships. How can I assist you today?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
    'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Chandigarh', 
    'Dadra and Nagar Haveli and Daman and Diu', 'Lakshadweep', 'Puducherry'
  ];

  const domains = [
    { name: 'Frontend Development', icon: Monitor, description: 'React, Vue, Angular, and modern web technologies', color: 'bg-blue-500' },
    { name: 'Backend Development', icon: Database, description: 'Node.js, Python, Java, and server-side technologies', color: 'bg-green-500' },
    { name: 'Fullstack Development', icon: Code, description: 'Complete web application development', color: 'bg-purple-500' },
    { name: 'UI/UX Design', icon: Palette, description: 'User interface and experience design', color: 'bg-pink-500' },
    { name: 'AI/ML', icon: Brain, description: 'Artificial Intelligence and Machine Learning', color: 'bg-orange-500' }
  ];

  const predefinedQuestions = [
    "What certificates will I receive?",
    "How do I get the money back guarantee?",
    "What resources are provided?",
    "How does the internship interview process work?",
    "Can I switch domains mid-internship?",
    "What are the working hours?",
    "Is there any placement support?"
  ];

  // Chat functions
  const handleQuestionClick = (question: string) => {
    setChatMessages(prev => [...prev, { type: 'user', message: question }]);
    
    // Simple bot responses based on question
    setTimeout(() => {
      let botResponse = '';
      switch (question) {
        case "What certificates will I receive?":
          botResponse = "You'll receive an official offer letter at the start and an experience certificate upon completion of your internship.";
          break;
        case "How do I get the money back guarantee?":
          botResponse = "The first 10 students to complete their internship successfully will receive a full refund as part of our money-back guarantee.";
          break;
        case "What resources are provided?":
          botResponse = "You'll get access to YouTube tutorials, course materials, live Zoom sessions, and direct mentorship from industry experts.";
          break;
        default:
          botResponse = "That's a great question! Please contact our support team at info@giglabs.tech for detailed information.";
      }
      setChatMessages(prev => [...prev, { type: 'bot', message: botResponse }]);
    }, 1000);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    setChatMessages(prev => [...prev, { type: 'user', message: chatInput }]);
    setChatInput('');
    
    // Simple bot response
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        type: 'bot', 
        message: "Thank you for your question! For detailed assistance, please contact us at info@giglabs.tech or call +91 824 3539291." 
      }]);
    }, 1000);
  };

  const calculatePrice = () => {
    if (!formData.internshipMode || !formData.duration) return { base: 0, total: 0 };
    
    let basePrice = 0;
    if (formData.internshipMode === 'remote') {
      basePrice = formData.duration === '1' ? 499 : 899;
    } else if (formData.internshipMode === 'in-office') {
      basePrice = formData.duration === '1' ? 3000 : 1000;
    }
    
    return {
      base: basePrice,
      total: basePrice
    };
  };

  const defaultModules = [
    {
      id: 1,
      title: 'Offer Letter & Welcome',
      description: 'Download your official offer letter and get started with your internship',
      week: 1,
      status: 'available',
      type: 'offer_letter'
    },
    {
      id: 2,
      title: 'Module 1: Foundation',
      description: 'Learn the basics of your chosen domain with hands-on assignments',
      week: 1,
      status: 'locked',
      type: 'assignment',
      videoUrl: 'https://youtube.com/watch?v=example',
      assignmentDescription: 'Create a basic project demonstrating fundamental concepts',
      githubRequired: true,
      hostingRequired: true
    },
    {
      id: 3,
      title: 'Module 2: Intermediate Concepts',
      description: 'Dive deeper into advanced topics with practical implementation',
      week: 2,
      status: 'locked',
      type: 'assignment',
      videoUrl: 'https://youtube.com/watch?v=example2',
      assignmentDescription: 'Build upon your foundation project with advanced features',
      githubRequired: true,
      hostingRequired: true
    },
    {
      id: 4,
      title: 'Module 3: Project Phase 1',
      description: 'Start working on your capstone project',
      week: 3,
      status: 'locked',
      type: 'project',
      videoUrl: 'https://youtube.com/watch?v=example3',
      assignmentDescription: 'Plan and implement the first phase of your final project',
      githubRequired: true,
      hostingRequired: true
    },
    {
      id: 5,
      title: 'Module 4: Project Phase 2 & Completion',
      description: 'Complete your project and receive your certificate',
      week: 4,
      status: 'locked',
      type: 'project',
      videoUrl: 'https://youtube.com/watch?v=example4',
      assignmentDescription: 'Finalize your project and prepare for presentation',
      githubRequired: true,
      hostingRequired: true
    }
  ];

  useEffect(() => {
    if (user) {
      // Load enrollment from localStorage
      const savedEnrollment = localStorage.getItem(`enrollment_${user.id}`);
      if (savedEnrollment) {
        setEnrollment(JSON.parse(savedEnrollment));
      }
      
      // Load module progress
      const savedModules = localStorage.getItem(`modules_${user.id}`);
      if (savedModules) {
        setModules(JSON.parse(savedModules));
      } else {
        setModules(defaultModules);
      }

      if (userRole === 'staff') {
        // Load staff data
        const mockMeetings = JSON.parse(localStorage.getItem('staff_meetings') || '[]');
        const mockStudents = JSON.parse(localStorage.getItem('enrolled_students') || '[]');
        setMeetings(mockMeetings);
        setStudents(mockStudents);
      }
    }
  }, [user, userRole]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setShowLogin(true);
      return;
    }
    
    const pricing = calculatePrice();
    
    if (pricing.total === 0) {
      toast({
        title: "Please complete the form",
        description: "Select internship mode and duration to proceed.",
        variant: "destructive"
      });
      return;
    }

    // Create enrollment
    const enrollmentData = {
      ...formData,
      amount: pricing.total,
      package_name: `${formData.internshipMode} - ${formData.duration} month(s)`,
      mode: formData.internshipMode,
      user_id: user.id,
      enrolled_at: new Date().toISOString()
    };

    // Save enrollment
    localStorage.setItem(`enrollment_${user.id}`, JSON.stringify(enrollmentData));
    localStorage.setItem(`modules_${user.id}`, JSON.stringify(defaultModules));
    
    // Add to enrolled students list for staff
    const currentStudents = JSON.parse(localStorage.getItem('enrolled_students') || '[]');
    currentStudents.push({
      id: user.id,
      name: user.name,
      email: user.email,
      ...enrollmentData
    });
    localStorage.setItem('enrolled_students', JSON.stringify(currentStudents));

    setEnrollment(enrollmentData);
    setModules(defaultModules);

    toast({
      title: "Enrollment Successful!",
      description: `Welcome to your ${enrollmentData.package_name} program! Check your profile to start learning.`,
    });

    // Reset form
    setFormData({
      studentName: '',
      state: '',
      phoneNumber: '',
      collegeName: '',
      yearOfStudying: '',
      emailId: '',
      secondaryEmailId: '',
      internshipMode: '',
      duration: '',
      domain: ''
    });
  };

  const handleModuleClick = (module) => {
    if (module.status === 'available') {
      setCurrentModule(module);
    }
  };

  const handleSubmission = async () => {
    if (!currentModule) return;

    // Save submission to localStorage
    const submission = {
      user_id: user?.id,
      module_id: currentModule.id,
      github_link: githubLink,
      hosting_link: hostingLink,
      submission_text: submissionText,
      submitted_at: new Date().toISOString()
    };
    
    const currentSubmissions = JSON.parse(localStorage.getItem(`submissions_${user?.id}`) || '[]');
    currentSubmissions.push(submission);
    localStorage.setItem(`submissions_${user?.id}`, JSON.stringify(currentSubmissions));

    // Update module status
    const updatedModules = modules.map(m => {
      if (m.id === currentModule.id) {
        return { ...m, status: 'completed' };
      }
      if (m.id === currentModule.id + 1) {
        return { ...m, status: 'available' };
      }
      return m;
    });
    
    setModules(updatedModules);
    localStorage.setItem(`modules_${user?.id}`, JSON.stringify(updatedModules));
    setCurrentModule(null);
    setGithubLink('');
    setHostingLink('');
    setSubmissionText('');

    toast({
      title: "Assignment Submitted!",
      description: "Your assignment has been submitted successfully. Next module unlocked!",
    });
  };

  const handleCreateMeeting = async (e) => {
    e.preventDefault();
    
    const meeting = {
      id: Date.now(),
      staff_id: user?.id,
      title: newMeeting.title,
      description: newMeeting.description,
      date: newMeeting.date,
      time: newMeeting.time,
      meeting_link: newMeeting.meetingLink
    };

    const currentMeetings = JSON.parse(localStorage.getItem('staff_meetings') || '[]');
    const updatedMeetings = [...currentMeetings, meeting];
    localStorage.setItem('staff_meetings', JSON.stringify(updatedMeetings));
    setMeetings(updatedMeetings);
    
    setNewMeeting({ title: '', description: '', date: '', time: '', meetingLink: '' });
    setShowCreateMeeting(false);

    toast({
      title: "Meeting Scheduled!",
      description: "Meeting has been scheduled successfully.",
    });
  };

  const getProgressPercentage = () => {
    const completedModules = modules.filter(m => m.status === 'completed').length;
    return (completedModules / modules.length) * 100;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (showLogin) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Profile Button */}
      {user && (
        <div className="fixed top-4 right-4 z-50">
          <Button
            onClick={() => setShowProfile(!showProfile)}
            className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg"
            size="sm"
          >
            <User className="h-4 w-4 mr-2" />
            {user.name} ({userRole})
          </Button>
        </div>
      )}

      {/* Profile Panel */}
      {user && showProfile && (
        <div className="fixed top-16 right-4 w-96 max-h-[80vh] overflow-y-auto bg-white rounded-lg shadow-xl border z-50">
          <div className="p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm opacity-90">{user.email}</p>
                <Badge className="mt-1 bg-white/20">{userRole}</Badge>
              </div>
              <Button
                onClick={signOut}
                variant="outline"
                size="sm"
                className="text-white border-white/20 hover:bg-white/10"
              >
                Sign Out
              </Button>
            </div>
          </div>

          <div className="p-4">
            {userRole === 'student' ? (
              <div className="space-y-4">
                {enrollment ? (
                  <>
                    {/* Student Progress */}
                    <div>
                      <h4 className="font-semibold mb-2">Your Program</h4>
                      <Card className="border-blue-200">
                        <CardContent className="p-3">
                          <p className="font-medium">{enrollment.package_name}</p>
                          <p className="text-sm text-gray-600">{enrollment.mode} • ₹{enrollment.amount}</p>
                          <p className="text-sm text-gray-600">{enrollment.domain}</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Progress Overview */}
                    <div>
                      <h4 className="font-semibold mb-2">Progress</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Overall Progress</span>
                          <span>{Math.round(getProgressPercentage())}%</span>
                        </div>
                        <Progress value={getProgressPercentage()} className="h-2" />
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>{modules.filter(m => m.status === 'completed').length} completed</span>
                          <span>{modules.filter(m => m.status === 'available').length} available</span>
                        </div>
                      </div>
                    </div>

                    {/* Modules */}
                    <div>
                      <h4 className="font-semibold mb-2">Learning Modules</h4>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {modules.map((module) => (
                          <Card 
                            key={module.id} 
                            className={`cursor-pointer transition-all ${
                              module.status === 'available' ? 'border-blue-500 hover:shadow-md' :
                              module.status === 'completed' ? 'border-green-500 bg-green-50' :
                              'border-gray-300 opacity-60'
                            }`}
                            onClick={() => handleModuleClick(module)}
                          >
                            <CardContent className="p-3">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    {module.status === 'completed' ? (
                                      <CheckCircle className="h-4 w-4 text-green-600" />
                                    ) : module.status === 'available' ? (
                                      <Play className="h-4 w-4 text-blue-600" />
                                    ) : (
                                      <Clock className="h-4 w-4 text-gray-400" />
                                    )}
                                    <p className="font-medium text-sm">{module.title}</p>
                                  </div>
                                  <p className="text-xs text-gray-600">{module.description}</p>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  Week {module.week}
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Upcoming Meetings */}
                    <div>
                      <h4 className="font-semibold mb-2">Upcoming Meetings</h4>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {meetings.map((meeting) => (
                          <Card key={meeting.id} className="border-purple-200">
                            <CardContent className="p-3">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <p className="font-medium text-sm">{meeting.title}</p>
                                  <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                                    <Calendar className="h-3 w-3" />
                                    {meeting.date}
                                    <Clock className="h-3 w-3" />
                                    {meeting.time}
                                  </div>
                                </div>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="text-xs px-2 py-1 h-auto"
                                  onClick={() => window.open(meeting.meeting_link, '_blank')}
                                >
                                  <Video className="h-3 w-3 mr-1" />
                                  Join
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        {meetings.length === 0 && (
                          <p className="text-sm text-gray-500 text-center py-4">No upcoming meetings</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-600 mb-3">You haven't enrolled in any program yet.</p>
                    <Button 
                      size="sm" 
                      onClick={() => {
                        setShowProfile(false);
                        const el = document.getElementById('application');
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      Browse Programs
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              /* Staff Dashboard in Profile */
              <div className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-2">
                  <Card>
                    <CardContent className="p-3 text-center">
                      <div className="text-lg font-bold text-blue-600">{students.length}</div>
                      <div className="text-xs text-gray-600">Students</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-3 text-center">
                      <div className="text-lg font-bold text-purple-600">{meetings.length}</div>
                      <div className="text-xs text-gray-600">Meetings</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <div>
                  <Button 
                    className="w-full mb-2" 
                    onClick={() => setShowCreateMeeting(true)}
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Schedule Meeting
                  </Button>
                </div>

                {/* Recent Students */}
                <div>
                  <h4 className="font-semibold mb-2">Recent Enrollments</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {students.slice(-3).map((student) => (
                      <Card key={student.id} className="border-green-200">
                        <CardContent className="p-3">
                          <p className="font-medium text-sm">{student.name}</p>
                          <p className="text-xs text-gray-600">{student.package_name} - ₹{student.amount}</p>
                        </CardContent>
                      </Card>
                    ))}
                    {students.length === 0 && (
                      <p className="text-sm text-gray-500 text-center py-4">No enrollments yet</p>
                    )}
                  </div>
                </div>

                {/* Upcoming Meetings */}
                <div>
                  <h4 className="font-semibold mb-2">Scheduled Meetings</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {meetings.map((meeting) => (
                      <Card key={meeting.id} className="border-blue-200">
                        <CardContent className="p-3">
                          <p className="font-medium text-sm">{meeting.title}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                            <Calendar className="h-3 w-3" />
                            {meeting.date}
                            <Clock className="h-3 w-3" />
                            {meeting.time}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {meetings.length === 0 && (
                      <p className="text-sm text-gray-500 text-center py-4">No meetings scheduled</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
              First 10 people to complete internship will receive cashback!
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Not an Ordinary Internship
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Start your real-world journey with GigLabs today. Get industry exposure, work on live projects, and kickstart your career.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center z-10 relative">
              {user ? (
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
                  onClick={() => {
                    const el = document.getElementById('application');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Apply Now
                </Button>
              ) : (
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
                  onClick={() => setShowLogin(true)}
                >
                  <LogIn className="mr-2 h-5 w-5" />
                  Login to Apply
                </Button>
              )}
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-purple-50 text-lg px-8 py-6 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
                onClick={() => navigate('/campus-ambassador')}
              >
                <UserPlus className="mr-2 h-5 w-5" />
                Become Campus Ambassador
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About GigLabs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">About GigLabs</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-4">
              GigLabs is a cutting-edge technology company based in Mangalore, Karnataka, focused on providing real-world experience to aspiring developers and designers. 
              We bridge the gap between academic learning and industry requirements through hands-on projects, mentorship, and direct industry exposure.
            </p>
            <div className="flex justify-center space-x-4">
              <Button 
                variant="outline" 
                className="hover:bg-blue-50 active:bg-blue-100"
                onClick={() => window.open('https://www.giglabs.tech/', '_blank')}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Visit Website
              </Button>
              <Button 
                variant="outline" 
                className="hover:bg-blue-50 active:bg-blue-100"
                onClick={() => window.open('https://www.linkedin.com/company/thegiglabs/posts/?feedView=all', '_blank')}
              >
                LinkedIn
              </Button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center">
                <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-blue-900">Industry Tie-ups</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">Direct partnerships with leading tech companies providing real project exposure and potential job opportunities.</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-purple-200 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center">
                <Zap className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle className="text-purple-900">Modern Tech Stack</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">Work with latest technologies including AI/ML, cloud platforms, and cutting-edge development frameworks.</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-green-200 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-green-900">Expert Mentorship</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">Learn from industry experts with years of experience in top tech companies and startups.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Internship Domains */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Choose Your Program</h2>
            <p className="text-xl text-gray-600">Select from our comprehensive range of internship programs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
            {/* Remote 1 Month - ₹499 */}
            <Card className="text-center border-2 border-blue-200 hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-lg">Remote Basic</CardTitle>
                <div className="text-3xl font-bold text-blue-600">₹499</div>
                <CardDescription>1 Month • Remote</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-2 text-sm">
                  <li>✓ Online mentorship</li>
                  <li>✓ Basic curriculum</li>
                  <li>✓ Certificate</li>
                  <li>✓ 24/7 support</li>
                </ul>
              </CardContent>
            </Card>

            {/* Remote 2 Month - ₹899 */}
            <Card className="text-center border-2 border-blue-400 hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-blue-100">
                <CardTitle className="text-lg">Remote Advanced</CardTitle>
                <div className="text-3xl font-bold text-blue-600">₹899</div>
                <CardDescription>2 Months • Remote</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-2 text-sm">
                  <li>✓ Online mentorship</li>
                  <li>✓ Advanced curriculum</li>
                  <li>✓ Certificate</li>
                  <li>✓ AI tools workshop</li>
                  <li>✓ Doubt sessions</li>
                </ul>
              </CardContent>
            </Card>

            {/* Summer Internship - ₹1000 */}
            <Card className="text-center border-2 border-green-400 hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-green-100">
                <CardTitle className="text-lg">Summer Special</CardTitle>
                <div className="text-3xl font-bold text-green-600">₹1000</div>
                <CardDescription>2 Months • Onsite</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-2 text-sm">
                  <li>✓ In-person mentorship</li>
                  <li>✓ Full curriculum</li>
                  <li>✓ Work experience</li>
                  <li>✓ Networking</li>
                  <li>✓ Certificate</li>
                </ul>
              </CardContent>
            </Card>

            {/* Onsite 1 Month - ₹3000 */}
            <Card className="text-center border-2 border-purple-400 hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-purple-100">
                <CardTitle className="text-lg">Onsite Premium</CardTitle>
                <div className="text-3xl font-bold text-purple-600">₹3000</div>
                <CardDescription>1 Month • Onsite</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-2 text-sm">
                  <li>✓ In-person mentorship</li>
                  <li>✓ Intensive training</li>
                  <li>✓ Real projects</li>
                  <li>✓ Certificate</li>
                  <li>✓ Job referrals</li>
                </ul>
              </CardContent>
            </Card>

            {/* Elite Package - ₹5000 */}
            <Card className="text-center border-2 border-yellow-400 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-1 text-xs font-bold">
                MOST POPULAR
              </div>
              <CardHeader className="bg-gradient-to-br from-yellow-50 to-orange-50 pt-8">
                <CardTitle className="text-lg">Elite Package</CardTitle>
                <div className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">₹5000</div>
                <CardDescription>Complete Program</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-2 text-sm">
                  <li>✓ All remote benefits</li>
                  <li>✓ Direct interview at GigLabs</li>
                  <li>✓ Job placement support</li>
                  <li>✓ Stipend opportunity</li>
                  <li>✓ Premium certificate</li>
                  <li>✓ 1-on-1 mentoring</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Perks Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose GigLabs?</h2>
            <p className="text-xl text-gray-600">Exclusive benefits that make this internship extraordinary</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Award, title: "Official Certificates", desc: "Offer letter & experience certificate" },
              { icon: CheckCircle, title: "Job Opportunity", desc: "Direct interviews at GigLabs" },
              { icon: Star, title: "Money Back Guarantee", desc: "First 10 completers get refund" },
              { icon: Users, title: "Live Learning", desc: "Zoom classes & real projects" },
              { icon: Globe, title: "Industry Exposure", desc: "Direct meetings & assignments" },
              { icon: BookOpen, title: "Learning Resources", desc: "YouTube videos, courses & websites" },
              { icon: Zap, title: "24/7 Support", desc: "Round-the-clock assistance" },
              { icon: Monitor, title: "Stipend Possibility", desc: "Some roles offer stipends" }
            ].map((perk, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border hover:border-green-200 p-4">
                <perk.icon className="h-10 w-10 mx-auto text-green-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">{perk.title}</h3>
                <p className="text-gray-600 text-sm">{perk.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form - Updated for frontend only */}
      <section id="application" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Apply Now</h2>
              <p className="text-xl text-gray-600">Take the first step towards your dream career</p>
              {!user && (
                <div className="mt-6">
                  <Button 
                    onClick={() => setShowLogin(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
                  >
                    <LogIn className="mr-2 h-5 w-5" />
                    Login Required to Apply
                  </Button>
                </div>
              )}
            </div>

            {user && (
              <Card className="shadow-xl border-2 border-blue-100">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                  <CardTitle className="text-2xl text-center">Internship Application</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="studentName">Student Name *</Label>
                        <Input
                          id="studentName"
                          required
                          value={formData.studentName}
                          onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Select value={formData.state} onValueChange={(value) => setFormData({...formData, state: value})}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select your state" />
                          </SelectTrigger>
                          <SelectContent>
                            {indianStates.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="phoneNumber">Phone Number *</Label>
                        <Input
                          id="phoneNumber"
                          type="tel"
                          required
                          value={formData.phoneNumber}
                          onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="collegeName">College Name *</Label>
                        <Input
                          id="collegeName"
                          required
                          value={formData.collegeName}
                          onChange={(e) => setFormData({...formData, collegeName: e.target.value})}
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="yearOfStudying">Year of Studying *</Label>
                      <Select onValueChange={(value) => setFormData({...formData, yearOfStudying: value})}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select your year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1st">1st Year</SelectItem>
                          <SelectItem value="2nd">2nd Year</SelectItem>
                          <SelectItem value="3rd">3rd Year</SelectItem>
                          <SelectItem value="4th">4th Year</SelectItem>
                          <SelectItem value="graduate">Graduate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="emailId">Email ID *</Label>
                        <Input
                          id="emailId"
                          type="email"
                          required
                          value={formData.emailId}
                          onChange={(e) => setFormData({...formData, emailId: e.target.value})}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="secondaryEmailId">Secondary Email ID</Label>
                        <Input
                          id="secondaryEmailId"
                          type="email"
                          value={formData.secondaryEmailId}
                          onChange={(e) => setFormData({...formData, secondaryEmailId: e.target.value})}
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="domain">Internship Domain *</Label>
                      <Select value={formData.domain} onValueChange={(value) => setFormData({...formData, domain: value})}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select your domain" />
                        </SelectTrigger>
                        <SelectContent>
                          {domains.map((domain) => (
                            <SelectItem key={domain.name} value={domain.name}>
                              {domain.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="internshipMode">Internship Mode *</Label>
                        <Select onValueChange={(value) => setFormData({...formData, internshipMode: value})}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select mode" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="remote">Remote</SelectItem>
                            <SelectItem value="in-office">In-Office</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="duration">Duration *</Label>
                        <Select onValueChange={(value) => setFormData({...formData, duration: value})}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Month</SelectItem>
                            <SelectItem value="2">2 Months</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {formData.internshipMode && formData.duration && (
                      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
                        <CardContent className="p-6">
                          <div className="text-center">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Payment Details</h3>
                            <div className="flex justify-between text-2xl font-bold text-green-600 mb-6">
                              <span>Total Amount:</span>
                              <span>₹{calculatePrice().total}</span>
                            </div>
                            <p className="text-sm text-gray-600">
                              Mode: {formData.internshipMode} • Duration: {formData.duration} month(s)
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      Submit Application
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* AI Chat Assistant */}
      <div className="fixed bottom-6 right-6 z-50">
        {showChat && (
          <Card className="w-80 h-96 mb-4 shadow-2xl border-2 border-blue-200">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
              <CardTitle className="flex items-center justify-between text-lg">
                <span>GigLabs Assistant</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowChat(false)}
                  className="text-white hover:bg-white/20 p-1"
                >
                  ✕
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex flex-col h-80">
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs p-3 rounded-lg text-sm ${
                      msg.type === 'user' 
                        ? 'bg-blue-600 text-white ml-4' 
                        : 'bg-gray-100 text-gray-800 mr-4'
                    }`}>
                      {msg.message}
                    </div>
                  </div>
                ))}
                
                {/* Predefined Questions - Show after each bot response */}
                {chatMessages.length > 1 && chatMessages[chatMessages.length - 1].type === 'bot' && (
                  <div className="space-y-2">
                    <p className="text-xs text-gray-500 text-center">Quick questions:</p>
                    {predefinedQuestions.slice(0, 3).map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuestionClick(question)}
                        className="w-full text-left p-2 text-xs bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-800 transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <form onSubmit={handleChatSubmit} className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask anything..."
                    className="flex-1"
                  />
                  <Button type="submit" size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Send
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
        
        <Button
          onClick={() => setShowChat(!showChat)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full p-4 shadow-lg transform hover:scale-110 transition-all duration-300"
          size="lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">GigLabs</h3>
              <p className="text-gray-400 mb-4">Transforming careers through real-world experience</p>
              <p className="text-sm text-gray-500">Software Company</p>
              <p className="text-sm text-gray-500">Mangalore, Karnataka</p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">+91 824 3539291</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">info@giglabs.tech</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">Mangalore, Karnataka</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <div><a href="https://www.giglabs.tech/" className="text-sm text-gray-400 hover:text-white">Main Website</a></div>
                <div><a href="#application" className="text-sm text-gray-400 hover:text-white">Apply Now</a></div>
                <div><a href="/campus-ambassador" className="text-sm text-gray-400 hover:text-white">Campus Ambassador</a></div>
                <div><a href="mailto:info@giglabs.tech" className="text-sm text-gray-400 hover:text-white">Contact Us</a></div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => window.open('https://www.linkedin.com/company/thegiglabs/posts/?feedView=all', '_blank')}
                  className="text-gray-400 hover:text-white p-2"
                >
                  LinkedIn
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-500">© 2024 GigLabs. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Module Details Modal */}
      {currentModule && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>{currentModule.title}</CardTitle>
              <CardDescription>{currentModule.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentModule.videoUrl && (
                <div>
                  <Label>Tutorial Video</Label>
                  <Button 
                    className="w-full mt-2" 
                    variant="outline"
                    onClick={() => window.open(currentModule.videoUrl, '_blank')}
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Watch Tutorial Video
                  </Button>
                </div>
              )}

              {currentModule.assignmentDescription && (
                <div>
                  <Label>Assignment Description</Label>
                  <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                    <p>{currentModule.assignmentDescription}</p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <Label htmlFor="submission">Submission Details</Label>
                  <Textarea
                    id="submission"
                    placeholder="Describe your work and what you've learned..."
                    value={submissionText}
                    onChange={(e) => setSubmissionText(e.target.value)}
                    className="mt-2"
                  />
                </div>

                {currentModule.githubRequired && (
                  <div>
                    <Label htmlFor="github">GitHub Repository Link</Label>
                    <Input
                      id="github"
                      type="url"
                      placeholder="https://github.com/username/project"
                      value={githubLink}
                      onChange={(e) => setGithubLink(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                )}

                {currentModule.hostingRequired && (
                  <div>
                    <Label htmlFor="hosting">Live Project Link</Label>
                    <Input
                      id="hosting"
                      type="url"
                      placeholder="https://yourproject.vercel.app"
                      value={hostingLink}
                      onChange={(e) => setHostingLink(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleSubmission} className="flex-1">
                  <Upload className="h-4 w-4 mr-2" />
                  Submit Assignment
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentModule(null)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Create Meeting Modal */}
      {showCreateMeeting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Schedule New Meeting</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateMeeting} className="space-y-4">
                <div>
                  <Label htmlFor="title">Meeting Title</Label>
                  <Input
                    id="title"
                    value={newMeeting.title}
                    onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newMeeting.description}
                    onChange={(e) => setNewMeeting({...newMeeting, description: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newMeeting.date}
                    onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newMeeting.time}
                    onChange={(e) => setNewMeeting({...newMeeting, time: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="meetingLink">Meeting Link (Google Meet/Zoom)</Label>
                  <Input
                    id="meetingLink"
                    type="url"
                    value={newMeeting.meetingLink}
                    onChange={(e) => setNewMeeting({...newMeeting, meetingLink: e.target.value})}
                    placeholder="https://meet.google.com/xxx-xxxx-xxx"
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">Create Meeting</Button>
                  <Button type="button" variant="outline" onClick={() => setShowCreateMeeting(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Index;
