import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Login from '@/components/Login';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { CheckCircle, Clock, Play, Upload, Calendar, Users, Award, User, LogOut, Star, MessageCircle, Code, Palette, Brain, Database, Monitor } from 'lucide-react';

const Index = () => {
  const { user, userRole, signOut } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [enrolledPackage, setEnrolledPackage] = useState<string | null>(localStorage.getItem('enrolledPackage'));
  const [currentModule, setCurrentModule] = useState(parseInt(localStorage.getItem('currentModule') || '0'));
  const [moduleProgress, setModuleProgress] = useState(JSON.parse(localStorage.getItem('moduleProgress') || '{}'));
  const [meetings, setMeetings] = useState(JSON.parse(localStorage.getItem('meetings') || '[]'));
  const [assignments, setAssignments] = useState(JSON.parse(localStorage.getItem('assignments') || '[]'));
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', message: 'Hi! I\'m here to help you with any questions about GigLabs internships. How can I assist you today?' }
  ]);
  const [chatInput, setChatInput] = useState('');

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

  const packages = [
    { name: 'Basic Internship', price: 499, type: 'remote', duration: '4 weeks', modules: 4 },
    { name: 'Advanced Internship', price: 899, type: 'remote', duration: '6 weeks', modules: 6 },
    { name: 'Summer Internship', price: 1000, type: 'remote', duration: '8 weeks', modules: 8 },
    { name: 'Professional Internship', price: 3000, type: 'onsite', duration: '12 weeks', modules: 12 },
    { name: 'Elite Program', price: 5000, type: 'hybrid', duration: '16 weeks', modules: 16, benefits: 'Direct interview opportunity at GigLabs' }
  ];

  const domains = [
    { name: 'Frontend Development', icon: Monitor, description: 'React, Vue, Angular, and modern web technologies', color: 'bg-blue-500' },
    { name: 'Backend Development', icon: Database, description: 'Node.js, Python, Java, and server-side technologies', color: 'bg-green-500' },
    { name: 'Fullstack Development', icon: Code, description: 'Complete web application development', color: 'bg-purple-500' },
    { name: 'UI/UX Design', icon: Palette, description: 'User interface and experience design', color: 'bg-pink-500' },
    { name: 'AI/ML', icon: Brain, description: 'Artificial Intelligence and Machine Learning', color: 'bg-orange-500' }
  ];

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
    'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Chandigarh', 
    'Dadra and Nagar Haveli and Daman and Diu', 'Lakshadweep', 'Puducherry'
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

  if (showLogin) {
    return <Login />;
  }

  const handleEnroll = (packageName: string, price: number) => {
    if (!user) {
      setShowLogin(true);
      return;
    }
    setEnrolledPackage(packageName);
    localStorage.setItem('enrolledPackage', packageName);
    setCurrentModule(1);
    localStorage.setItem('currentModule', '1');
    toast({
      title: "Enrollment Successful!",
      description: `You've enrolled in ${packageName} for ₹${price}`,
    });
  };

  const completeModule = (moduleNum: number) => {
    const newProgress = { ...moduleProgress, [moduleNum]: true };
    setModuleProgress(newProgress);
    localStorage.setItem('moduleProgress', JSON.stringify(newProgress));
    
    if (moduleNum < packages.find(p => p.name === enrolledPackage)?.modules!) {
      setCurrentModule(moduleNum + 1);
      localStorage.setItem('currentModule', (moduleNum + 1).toString());
    }
    
    toast({
      title: "Module Completed!",
      description: `Great job completing Module ${moduleNum}`,
    });
  };

  const scheduleMeeting = (title: string, date: string, time: string, link: string) => {
    const newMeeting = { id: Date.now(), title, date, time, link };
    const updatedMeetings = [...meetings, newMeeting];
    setMeetings(updatedMeetings);
    localStorage.setItem('meetings', JSON.stringify(updatedMeetings));
    
    toast({
      title: "Meeting Scheduled!",
      description: `${title} scheduled for ${date} at ${time}`,
    });
  };

  const handleQuestionClick = (question: string) => {
    setChatMessages(prev => [...prev, { type: 'user', message: question }]);
    
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
    
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        type: 'bot', 
        message: "Thank you for your question! For detailed assistance, please contact us at info@giglabs.tech or call +91 824 3539291." 
      }]);
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setShowLogin(true);
      return;
    }

    toast({
      title: "Application Submitted!",
      description: "Your internship application has been submitted successfully.",
    });

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              GigLabs
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => setShowProfile(!showProfile)}
                  className="flex items-center space-x-2"
                >
                  <User className="h-4 w-4" />
                  <span>{user.name}</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={signOut}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <Button 
                onClick={() => setShowLogin(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Profile Panel */}
      {user && showProfile && (
        <div className="fixed top-16 right-4 w-80 bg-white shadow-xl rounded-lg border z-50 max-h-96 overflow-y-auto">
          <div className="p-4 border-b">
            <h3 className="font-semibold flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>{userRole === 'student' ? 'Student' : 'Staff'} Profile</span>
            </h3>
          </div>
          
          {userRole === 'student' && (
            <div className="p-4 space-y-4">
              {enrolledPackage ? (
                <>
                  <div>
                    <Badge variant="secondary">{enrolledPackage}</Badge>
                    <p className="text-sm text-muted-foreground mt-1">Module {currentModule} of {packages.find(p => p.name === enrolledPackage)?.modules}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Progress</h4>
                    <Progress value={(Object.keys(moduleProgress).length / (packages.find(p => p.name === enrolledPackage)?.modules || 1)) * 100} />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Upcoming Meetings</h4>
                    {meetings.length > 0 ? (
                      meetings.slice(0, 2).map((meeting: any) => (
                        <div key={meeting.id} className="p-2 bg-gray-50 rounded text-sm">
                          <p className="font-medium">{meeting.title}</p>
                          <p className="text-muted-foreground">{meeting.date} at {meeting.time}</p>
                          <Button size="sm" className="mt-1" onClick={() => window.open(meeting.link)}>
                            Join Meeting
                          </Button>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No upcoming meetings</p>
                    )}
                  </div>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">No active enrollment</p>
              )}
            </div>
          )}
          
          {userRole === 'staff' && (
            <div className="p-4 space-y-4">
              <div>
                <h4 className="font-medium mb-2">Quick Actions</h4>
                <div className="space-y-2">
                  <Button size="sm" className="w-full" onClick={() => {
                    const title = prompt('Meeting Title:');
                    const date = prompt('Date (YYYY-MM-DD):');
                    const time = prompt('Time (HH:MM):');
                    const link = prompt('Meeting Link:');
                    if (title && date && time && link) {
                      scheduleMeeting(title, date, time, link);
                    }
                  }}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Meeting
                  </Button>
                  <Button size="sm" variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Assignment
                  </Button>
                  <Button size="sm" variant="outline" className="w-full">
                    <Users className="h-4 w-4 mr-2" />
                    View Students
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Launch Your Tech Career with
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                GigLabs Internships
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Get real-world experience, build industry-ready projects, and receive certificates that matter. 
              Join thousands of students who've accelerated their careers with GigLabs.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge className="bg-green-100 text-green-800 px-4 py-2">
                <CheckCircle className="h-4 w-4 mr-2" />
                Money Back Guarantee
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 px-4 py-2">
                <Award className="h-4 w-4 mr-2" />
                Industry Certificates
              </Badge>
              <Badge className="bg-purple-100 text-purple-800 px-4 py-2">
                <Users className="h-4 w-4 mr-2" />
                Expert Mentorship
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Internship Packages */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Internship Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our comprehensive internship packages designed to accelerate your career growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <div key={index} className={`bg-white rounded-xl shadow-lg border p-8 hover:shadow-xl transition-all duration-300 ${
                pkg.price === 899 ? 'border-2 border-purple-500 relative' : 'border-gray-200'
              }`}>
                {pkg.price === 899 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <div className={`text-4xl font-bold mb-4 ${
                    pkg.price === 499 ? 'text-blue-600' :
                    pkg.price === 899 ? 'text-purple-600' :
                    pkg.price === 1000 ? 'text-orange-600' :
                    pkg.price === 3000 ? 'text-green-600' : 'text-red-600'
                  }`}>₹{pkg.price}</div>
                  <p className="text-gray-600 mb-6">{pkg.duration} • {pkg.type}</p>
                  
                  <ul className="text-left space-y-3 mb-8">
                    <li className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-3 ${
                        pkg.price === 499 ? 'bg-blue-600' :
                        pkg.price === 899 ? 'bg-purple-600' :
                        pkg.price === 1000 ? 'bg-orange-600' :
                        pkg.price === 3000 ? 'bg-green-600' : 'bg-red-600'
                      }`}></div>
                      {pkg.modules} modules
                    </li>
                    <li className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-3 ${
                        pkg.price === 499 ? 'bg-blue-600' :
                        pkg.price === 899 ? 'bg-purple-600' :
                        pkg.price === 1000 ? 'bg-orange-600' :
                        pkg.price === 3000 ? 'bg-green-600' : 'bg-red-600'
                      }`}></div>
                      {pkg.type} internship
                    </li>
                    <li className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-3 ${
                        pkg.price === 499 ? 'bg-blue-600' :
                        pkg.price === 899 ? 'bg-purple-600' :
                        pkg.price === 1000 ? 'bg-orange-600' :
                        pkg.price === 3000 ? 'bg-green-600' : 'bg-red-600'
                      }`}></div>
                      Certificate included
                    </li>
                    <li className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-3 ${
                        pkg.price === 499 ? 'bg-blue-600' :
                        pkg.price === 899 ? 'bg-purple-600' :
                        pkg.price === 1000 ? 'bg-orange-600' :
                        pkg.price === 3000 ? 'bg-green-600' : 'bg-red-600'
                      }`}></div>
                      Mentor support
                    </li>
                    {pkg.benefits && (
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                        {pkg.benefits}
                      </li>
                    )}
                  </ul>
                  
                  <Button
                    onClick={() => handleEnroll(pkg.name, pkg.price)}
                    className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                      pkg.price === 499 ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800' :
                      pkg.price === 899 ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' :
                      pkg.price === 1000 ? 'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800' :
                      pkg.price === 3000 ? 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700' :
                      'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
                    }`}
                  >
                    {enrolledPackage === pkg.name ? 'Enrolled' : 'Apply Now'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Module Progress */}
      {user && userRole === 'student' && enrolledPackage && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Your Learning Journey</h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-2">
                  <Award className="h-6 w-6 text-yellow-600" />
                  <span className="font-medium">Enrolled in: {enrolledPackage}</span>
                </div>
                <Badge variant="secondary">Module {currentModule} of {packages.find(p => p.name === enrolledPackage)?.modules}</Badge>
              </div>

              <div className="grid gap-6">
                {/* Offer Letter */}
                <Card className={`${moduleProgress[0] ? 'bg-green-50 border-green-200' : currentModule === 1 ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'}`}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      {moduleProgress[0] ? <CheckCircle className="h-5 w-5 text-green-600" /> : <Clock className="h-5 w-5" />}
                      <span>Offer Letter</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Welcome to your internship journey!</p>
                    {currentModule === 1 && !moduleProgress[0] && (
                      <Button onClick={() => completeModule(0)} size="sm">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark Complete
                      </Button>
                    )}
                  </CardContent>
                </Card>

                {/* Module 1 */}
                <Card className={`${moduleProgress[1] ? 'bg-green-50 border-green-200' : currentModule === 2 ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'}`}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      {moduleProgress[1] ? <CheckCircle className="h-5 w-5 text-green-600" /> : <Clock className="h-5 w-5" />}
                      <span>Module 1: Foundations</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Learn the fundamentals with hands-on assignments</p>
                    <div className="space-y-2 mb-4">
                      <Button variant="outline" size="sm">
                        <Play className="h-4 w-4 mr-2" />
                        Watch Tutorial
                      </Button>
                      <div className="grid grid-cols-2 gap-2">
                        <Input placeholder="GitHub Link" className="text-sm" />
                        <Input placeholder="Hosted Link" className="text-sm" />
                      </div>
                    </div>
                    {currentModule === 2 && !moduleProgress[1] && (
                      <Button onClick={() => completeModule(1)} size="sm">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Submit Assignment
                      </Button>
                    )}
                  </CardContent>
                </Card>

                {/* Module 2 */}
                <Card className={`${moduleProgress[2] ? 'bg-green-50 border-green-200' : currentModule === 3 ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'}`}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      {moduleProgress[2] ? <CheckCircle className="h-5 w-5 text-green-600" /> : <Clock className="h-5 w-5" />}
                      <span>Module 2: Intermediate Skills</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Week 2: Advanced concepts with quiz and assignment</p>
                    {currentModule >= 3 && (
                      <div className="space-y-2 mb-4">
                        <Button variant="outline" size="sm">Take Quiz</Button>
                        <Textarea placeholder="Assignment submission..." className="text-sm" />
                      </div>
                    )}
                    {currentModule === 3 && !moduleProgress[2] && (
                      <Button onClick={() => completeModule(2)} size="sm">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Complete Module
                      </Button>
                    )}
                  </CardContent>
                </Card>

                {/* Module 3 & 4 */}
                <Card className={`${moduleProgress[3] ? 'bg-green-50 border-green-200' : currentModule === 4 ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'}`}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      {moduleProgress[3] ? <CheckCircle className="h-5 w-5 text-green-600" /> : <Clock className="h-5 w-5" />}
                      <span>Module 3: Project Phase 1</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Week 3: Build your first real project</p>
                    {currentModule === 4 && !moduleProgress[3] && (
                      <Button onClick={() => completeModule(3)} size="sm">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Submit Project
                      </Button>
                    )}
                  </CardContent>
                </Card>

                <Card className={`${moduleProgress[4] ? 'bg-green-50 border-green-200' : currentModule === 5 ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'}`}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      {moduleProgress[4] ? <CheckCircle className="h-5 w-5 text-green-600" /> : <Clock className="h-5 w-5" />}
                      <span>Module 4: Project Phase 2</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Week 4: Complete and deploy your project</p>
                    {currentModule === 5 && !moduleProgress[4] && (
                      <Button onClick={() => completeModule(4)} size="sm">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Final Submission
                      </Button>
                    )}
                  </CardContent>
                </Card>

                {/* Certificate */}
                {Object.keys(moduleProgress).length >= 4 && (
                  <Card className="bg-yellow-50 border-yellow-200">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Award className="h-5 w-5 text-yellow-600" />
                        <span>Internship Certificate</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-white p-6 rounded-lg border-2 border-yellow-400">
                        <div className="text-center">
                          <h3 className="text-2xl font-bold mb-4">Certificate of Completion</h3>
                          <p className="mb-2">This is to certify that</p>
                          <p className="text-xl font-bold text-blue-600 mb-2">{user.name}</p>
                          <p className="mb-2">has successfully completed the</p>
                          <p className="text-lg font-semibold mb-2">{enrolledPackage}</p>
                          <p className="mb-4">at GigLabs ({packages.find(p => p.name === enrolledPackage)?.type} internship)</p>
                          <div className="flex justify-center">
                            <Award className="h-8 w-8 text-yellow-600" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Domains Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Domain</h2>
            <p className="text-xl text-gray-600">Specialize in the technology stack that matches your career goals</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {domains.map((domain, index) => {
              const IconComponent = domain.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-lg ${domain.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{domain.name}</h3>
                    <p className="text-gray-600 text-sm">{domain.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-xl">
              <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl">Apply for Internship</CardTitle>
                <CardDescription className="text-blue-100">
                  {!user && "Please login first to submit your application"}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="studentName">Full Name</Label>
                      <Input
                        id="studentName"
                        value={formData.studentName}
                        onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="emailId">Email ID</Label>
                      <Input
                        id="emailId"
                        type="email"
                        value={formData.emailId}
                        onChange={(e) => setFormData({...formData, emailId: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Select value={formData.state} onValueChange={(value) => setFormData({...formData, state: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your state" />
                        </SelectTrigger>
                        <SelectContent>
                          {indianStates.map((state) => (
                            <SelectItem key={state} value={state}>{state}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="collegeName">College Name</Label>
                      <Input
                        id="collegeName"
                        value={formData.collegeName}
                        onChange={(e) => setFormData({...formData, collegeName: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="yearOfStudying">Year of Study</Label>
                      <Select value={formData.yearOfStudying} onValueChange={(value) => setFormData({...formData, yearOfStudying: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select year" />
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
                  </div>

                  <div>
                    <Label htmlFor="domain">Preferred Domain</Label>
                    <Select value={formData.domain} onValueChange={(value) => setFormData({...formData, domain: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your domain" />
                      </SelectTrigger>
                      <SelectContent>
                        {domains.map((domain) => (
                          <SelectItem key={domain.name} value={domain.name}>{domain.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="internshipMode">Internship Mode</Label>
                      <Select value={formData.internshipMode} onValueChange={(value) => setFormData({...formData, internshipMode: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="remote">Remote</SelectItem>
                          <SelectItem value="onsite">Onsite</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="duration">Duration</Label>
                      <Select value={formData.duration} onValueChange={(value) => setFormData({...formData, duration: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="4 weeks">4 weeks</SelectItem>
                          <SelectItem value="6 weeks">6 weeks</SelectItem>
                          <SelectItem value="8 weeks">8 weeks</SelectItem>
                          <SelectItem value="12 weeks">12 weeks</SelectItem>
                          <SelectItem value="16 weeks">16 weeks</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={!user}
                  >
                    {!user ? 'Login Required' : 'Submit Application'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Chat Widget */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setShowChat(!showChat)}
          className="rounded-full w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>

        {showChat && (
          <div className="absolute bottom-16 right-0 w-80 h-96 bg-white rounded-lg shadow-xl border">
            <div className="p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <h3 className="font-semibold">GigLabs Assistant</h3>
              <p className="text-sm opacity-90">Ask me anything about internships!</p>
            </div>
            
            <div className="p-4 h-64 overflow-y-auto space-y-3">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg max-w-xs ${
                    msg.type === 'bot' ? 'bg-gray-100 text-gray-800' : 'bg-blue-600 text-white ml-auto'
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                </div>
              ))}
            </div>

            <div className="p-4 border-t">
              <div className="mb-2 flex flex-wrap gap-1">
                {predefinedQuestions.slice(0, 3).map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => handleQuestionClick(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
              
              <form onSubmit={handleChatSubmit} className="flex space-x-2">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type your question..."
                  className="text-sm"
                />
                <Button type="submit" size="sm">Send</Button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
                <h3 className="text-xl font-bold">GigLabs</h3>
              </div>
              <p className="text-gray-400">Empowering the next generation of tech professionals through hands-on internships.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Programs</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Frontend Development</li>
                <li>Backend Development</li>
                <li>Full Stack Development</li>
                <li>UI/UX Design</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Contact</li>
                <li>Careers</li>
                <li>Blog</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>info@giglabs.tech</li>
                <li>+91 824 3539291</li>
                <li>Campus Ambassador Program</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 GigLabs. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;