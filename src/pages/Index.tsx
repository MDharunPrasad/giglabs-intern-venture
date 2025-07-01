import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { MessageCircle, CheckCircle, Star, Users, Award, Zap, Globe, Code, Palette, Brain, Database, Monitor, BookOpen, AlertTriangle, UserPlus, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const navigate = useNavigate();

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

  // Progress bar - simulating 59% filled
  const progressValue = 59;

  const calculatePrice = () => {
    if (!formData.internshipMode || !formData.duration) return { base: 0, total: 0 };
    
    const basePrice = formData.internshipMode === 'remote' ? 299 : 999;
    const duration = parseInt(formData.duration);
    
    let totalPrice = basePrice;
    for (let i = 2; i <= duration; i++) {
      totalPrice += basePrice;
    }
    
    // Round to nearest 10
    const roundedTotal = Math.round(totalPrice / 10) * 10;
    
    return {
      base: totalPrice,
      total: roundedTotal
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pricing = calculatePrice();
    
    if (pricing.total === 0) {
      toast({
        title: "Please complete the form",
        description: "Select internship mode and duration to proceed.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Application Submitted!",
      description: `Your application for ₹${pricing.total} has been received. We'll contact you soon!`,
    });
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatMessages(prev => [...prev, { type: 'user', message: chatInput }]);
    
    setTimeout(() => {
      const responses = [
        "Thanks for your question! Our internships are designed to provide real-world experience with industry mentors.",
        "Great question! You'll work on live projects and get direct industry exposure during your internship.",
        "Our support team is available 24/7 to help you throughout your internship journey.",
        "The certificate you receive is industry-recognized and will add value to your career profile.",
        "Yes, we have tie-ups with various companies and some of our top performers get job opportunities!",
        "Students who complete internships get interview opportunities at GigLabs!",
        "We provide comprehensive learning resources including YouTube videos, courses, and project guidelines.",
        "The money back guarantee applies to the first 10 students who successfully complete their internship.",
        "You can switch between remote and in-office modes with prior approval from your mentor.",
        "Regular assignment completion is mandatory for certificate issuance."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setChatMessages(prev => [...prev, { type: 'bot', message: randomResponse }]);
    }, 1000);

    setChatInput('');
  };

  const handleQuestionClick = (question: string) => {
    setChatMessages(prev => [...prev, { type: 'user', message: question }]);
    
    setTimeout(() => {
      let response = "";
      if (question.includes("certificates")) {
        response = "You'll receive an official offer letter and experience certificate upon successful completion of your internship.";
      } else if (question.includes("money back")) {
        response = "The first 10 students who successfully complete their internship program will receive a full refund!";
      } else if (question.includes("resources")) {
        response = "We provide YouTube tutorial videos, coding courses, project documentation, and direct mentorship support.";
      } else if (question.includes("interview process")) {
        response = "Students who complete a 2-month internship get interview opportunities at GigLabs for positions in their internship domain.";
      } else if (question.includes("switch domains")) {
        response = "Domain switching is possible in the first week with mentor approval, subject to availability.";
      } else if (question.includes("working hours")) {
        response = "Flexible working hours with 4-6 hours daily commitment. In-office interns work 10 AM to 4 PM.";
      } else {
        response = "Yes! We provide placement support and have partnerships with various companies for job opportunities.";
      }
      setChatMessages(prev => [...prev, { type: 'bot', message: response }]);
    }, 1000);
  };

  const scrollToForm = () => {
    const element = document.getElementById('application');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
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
            
            {/* Progress Bar */}
            <div className="mb-8 max-w-md mx-auto">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-blue-100">Applications Progress</span>
                <span className="text-sm text-blue-100 font-semibold">{progressValue}%</span>
              </div>
              <div className="relative h-4 bg-white/20 rounded-full overflow-hidden shadow-lg">
                <div 
                  className="h-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-full transition-all duration-2000 ease-out relative overflow-hidden" 
                  style={{ width: `${progressValue}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-300/0 via-green-300/50 to-green-300/0 animate-[shimmer_2s_ease-in-out_infinite]"></div>
                </div>
              </div>
              <p className="text-xs text-blue-200 mt-1">Hurry up! Limited slots remaining</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center z-10 relative">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
                onClick={() => {
                  const el = document.getElementById('application');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.hash = '#application';
                  }
                }}
                type="button"
              >
                Apply Now
              </Button>
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-purple-50 text-lg px-8 py-6 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
                onClick={() => {
                  console.log('Become Campus Ambassador button clicked');
                  navigate('/campus-ambassador');
                }}
                type="button"
              >
                <UserPlus className="mr-2 h-5 w-5" />
                Become Campus Ambassador
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Choose Your Domain</h2>
            <p className="text-xl text-gray-600">Select from our comprehensive range of internship programs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {domains.map((domain, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-blue-300 relative overflow-hidden">
                <div className={`absolute top-0 left-0 right-0 h-2 ${domain.color}`}></div>
                <CardHeader className="text-center pt-6">
                  <domain.icon className="h-16 w-16 mx-auto mb-4 text-blue-600 group-hover:text-purple-600 transition-colors duration-300" />
                  <CardTitle className="text-xl text-gray-900">{domain.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center pb-6">
                  <p className="text-gray-600 mb-4">{domain.description}</p>
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 active:from-blue-800 active:to-purple-800 text-white"
                    onClick={() => {
                      setFormData({...formData, domain: domain.name});
                      scrollToForm();
                    }}
                  >
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pricing Info */}
          <div className="mt-16 max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-8 text-gray-900">Flexible Duration & Pricing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 items-stretch">
              {/* 1 Month Remote */}
              <Card className="flex flex-col items-center border-2 border-blue-200 bg-white rounded-2xl shadow-lg px-8 py-10 min-w-[260px] max-w-[320px] h-full transition-all duration-300 hover:shadow-2xl">
                <div className="flex flex-col items-center mb-4">
                  <svg className="h-12 w-12 text-blue-500 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
                  <span className="text-blue-900 font-bold text-lg">Remote Internship</span>
                  <span className="text-blue-700 text-sm">1 Month • Work from anywhere</span>
                </div>
                <div className="text-4xl font-extrabold text-blue-600 mb-2">₹299</div>
                <div className="text-gray-500 text-sm mb-4 text-center">Best for those who want a quick, flexible remote experience.</div>
                <ul className="text-left space-y-2 text-blue-800 w-full max-w-xs mx-auto mb-4">
                  <li className="flex items-center gap-2"><span className="text-blue-500">✔</span> Online mentorship</li>
                  <li className="flex items-center gap-2"><span className="text-blue-500">✔</span> 24/7 mail support</li>
                  <li className="flex items-center gap-2"><span className="text-blue-500">✔</span> Industry assignments</li>
                  <li className="flex items-center gap-2"><span className="text-blue-500">✔</span> Offer letter & certificate</li>
                  <li className="flex items-center gap-2"><span className="text-blue-500">✔</span> Real-world project experience</li>
                </ul>
              </Card>
              {/* 2 Month Remote */}
              <Card className="flex flex-col items-center border-2 border-blue-400 bg-white rounded-2xl shadow-lg px-8 py-10 min-w-[260px] max-w-[320px] h-full transition-all duration-300 hover:shadow-2xl">
                <div className="flex flex-col items-center mb-4">
                  <svg className="h-12 w-12 text-blue-600 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
                  <span className="text-blue-900 font-bold text-lg">Remote Internship</span>
                  <span className="text-blue-700 text-sm">2 Months • Work from anywhere</span>
                </div>
                <div className="text-4xl font-extrabold text-blue-600 mb-2">₹500</div>
                <div className="text-gray-500 text-sm mb-4 text-center">Extended remote learning with advanced curriculum and workshops.</div>
                <ul className="text-left space-y-2 text-blue-800 w-full max-w-xs mx-auto mb-4">
                  <li className="flex items-center gap-2"><span className="text-blue-500">✔</span> Online mentorship</li>
                  <li className="flex items-center gap-2"><span className="text-blue-500">✔</span> 24/7 mail support</li>
                  <li className="flex items-center gap-2"><span className="text-blue-500">✔</span> Industry assignments</li>
                  <li className="flex items-center gap-2"><span className="text-blue-500">✔</span> Offer letter & certificate</li>
                  <li className="flex items-center gap-2"><span className="text-blue-500">✔</span> Real-world project experience</li>
                  <li className="flex items-center gap-2"><span className="text-blue-500">✔</span> Basics to advanced curriculum</li>
                  <li className="flex items-center gap-2"><span className="text-blue-500">✔</span> Doubt session meetings</li>
                  <li className="flex items-center gap-2"><span className="text-blue-500">✔</span> Free AI tools workshop</li>
                </ul>
              </Card>
              {/* 1 Month Onsite */}
              <Card className="flex flex-col items-center border-2 border-purple-200 bg-white rounded-2xl shadow-lg px-8 py-10 min-w-[260px] max-w-[320px] h-full transition-all duration-300 hover:shadow-2xl">
                <div className="flex flex-col items-center mb-4">
                  <svg className="h-12 w-12 text-purple-500 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" /></svg>
                  <span className="text-purple-900 font-bold text-lg">Onsite Internship</span>
                  <span className="text-purple-700 text-sm">1 Month • Hands-on experience</span>
                </div>
                <div className="text-4xl font-extrabold text-purple-600 mb-2">₹999</div>
                <div className="text-gray-500 text-sm mb-4 text-center">Experience real office culture, mentorship, and networking in person.</div>
                <ul className="text-left space-y-2 text-purple-800 w-full max-w-xs mx-auto mb-4">
                  <li className="flex items-center gap-2"><span className="text-purple-500">✔</span> In-person mentorship</li>
                  <li className="flex items-center gap-2"><span className="text-purple-500">✔</span> 24/7 mail support</li>
                  <li className="flex items-center gap-2"><span className="text-purple-500">✔</span> Industry assignments</li>
                  <li className="flex items-center gap-2"><span className="text-purple-500">✔</span> Offer letter & certificate</li>
                  <li className="flex items-center gap-2"><span className="text-purple-500">✔</span> Work environment experience</li>
                  <li className="flex items-center gap-2"><span className="text-purple-500">✔</span> Networking opportunities</li>
                  <li className="flex items-center gap-2"><span className="text-purple-500">✔</span> Real-world project experience</li>
                </ul>
              </Card>
              {/* 2 Month Onsite */}
              <Card className="flex flex-col items-center border-2 border-purple-400 bg-white rounded-2xl shadow-lg px-8 py-10 min-w-[260px] max-w-[320px] h-full transition-all duration-300 hover:shadow-2xl">
                <div className="flex flex-col items-center mb-4">
                  <svg className="h-12 w-12 text-purple-600 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" /></svg>
                  <span className="text-purple-900 font-bold text-lg">Onsite Internship</span>
                  <span className="text-purple-700 text-sm">2 Months • Hands-on experience</span>
                </div>
                <div className="text-4xl font-extrabold text-purple-600 mb-2">₹1800</div>
                <div className="text-gray-500 text-sm mb-4 text-center">Full onsite immersion with advanced curriculum, workshops, and networking.</div>
                <ul className="text-left space-y-2 text-purple-800 w-full max-w-xs mx-auto mb-4">
                  <li className="flex items-center gap-2"><span className="text-purple-600">✔</span> In-person mentorship</li>
                  <li className="flex items-center gap-2"><span className="text-purple-600">✔</span> 24/7 mail support</li>
                  <li className="flex items-center gap-2"><span className="text-purple-600">✔</span> Industry assignments</li>
                  <li className="flex items-center gap-2"><span className="text-purple-600">✔</span> Offer letter & certificate</li>
                  <li className="flex items-center gap-2"><span className="text-purple-600">✔</span> Work environment experience</li>
                  <li className="flex items-center gap-2"><span className="text-purple-600">✔</span> Networking opportunities</li>
                  <li className="flex items-center gap-2"><span className="text-purple-600">✔</span> Real-world project experience</li>
                  <li className="flex items-center gap-2"><span className="text-purple-600">✔</span> Basics to advanced curriculum</li>
                  <li className="flex items-center gap-2"><span className="text-purple-600">✔</span> Doubt session meetings</li>
                  <li className="flex items-center gap-2"><span className="text-purple-600">✔</span> Free AI tools workshop</li>
                </ul>
              </Card>
            </div>
            <div className="mt-8 text-center">
              <Badge className="bg-green-100 text-green-800 text-lg px-6 py-2">
                All internships include assignments and tasks. Only 1 or 2 month plans available.
              </Badge>
            </div>
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

      {/* Application Form */}
      <section id="application" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Apply Now</h2>
              <p className="text-xl text-gray-600">Take the first step towards your dream career</p>
            </div>

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
                          <div className="flex justify-center space-x-4 mb-4">
                            <div className="flex items-center space-x-2 bg-white px-4 py-3 rounded-lg shadow border">
                              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                                <span className="text-white text-sm font-bold">G</span>
                              </div>
                              <span className="text-sm font-medium">Google Pay</span>
                            </div>
                            <div className="flex items-center space-x-2 bg-white px-4 py-3 rounded-lg shadow border">
                              <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                                <span className="text-white text-sm font-bold">A</span>
                              </div>
                              <span className="text-sm font-medium">Amazon Pay</span>
                            </div>
                            <div className="flex items-center space-x-2 bg-white px-4 py-3 rounded-lg shadow border">
                              <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                                <span className="text-white text-sm font-bold">U</span>
                              </div>
                              <span className="text-sm font-medium">UPI</span>
                            </div>
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
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 active:from-blue-800 active:to-purple-800 text-white py-3 text-lg font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Submit Application
                  </Button>
                </form>
              </CardContent>
            </Card>
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
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 active:from-blue-800 active:to-purple-800 rounded-full p-4 shadow-lg transform hover:scale-110 transition-all duration-300"
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

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .absolute.inset-0.bg-black\/20,
        .absolute.bottom-0.left-0.right-0.h-32.bg-gradient-to-t {
          pointer-events: none !important;
        }
      `}</style>
    </div>
  );
};

export default Index;
