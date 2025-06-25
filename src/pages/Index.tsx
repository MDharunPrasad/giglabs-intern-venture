
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, CheckCircle, Star, Users, Award, Zap, Globe, Code, Palette, Brain, Database, Monitor } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    location: '',
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

  const domains = [
    { name: 'Frontend Development', icon: Monitor, description: 'React, Vue, Angular, and modern web technologies' },
    { name: 'Backend Development', icon: Database, description: 'Node.js, Python, Java, and server-side technologies' },
    { name: 'Fullstack Development', icon: Code, description: 'Complete web application development' },
    { name: 'UI/UX Design', icon: Palette, description: 'User interface and experience design' },
    { name: 'AI/ML', icon: Brain, description: 'Artificial Intelligence and Machine Learning' }
  ];

  const calculatePrice = () => {
    if (!formData.internshipMode || !formData.duration) return 0;
    
    const basePrice = formData.internshipMode === 'remote' ? 299 : 999;
    const duration = parseInt(formData.duration);
    
    let totalPrice = basePrice;
    for (let i = 2; i <= duration; i++) {
      totalPrice += basePrice * Math.pow(1.9, i - 1);
    }
    
    return Math.round(totalPrice);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalAmount = calculatePrice();
    
    if (totalAmount === 0) {
      toast({
        title: "Please complete the form",
        description: "Select internship mode and duration to proceed.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Application Submitted!",
      description: `Your application for ₹${totalAmount} has been received. We'll contact you soon!`,
    });
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatMessages(prev => [...prev, { type: 'user', message: chatInput }]);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Thanks for your question! Our internships are designed to provide real-world experience with industry mentors.",
        "Great question! You'll work on live projects and get direct industry exposure during your internship.",
        "Our support team is available 24/7 to help you throughout your internship journey.",
        "The certificate you receive is industry-recognized and will add value to your career profile.",
        "Yes, we have tie-ups with various companies and some of our top performers get job opportunities!"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setChatMessages(prev => [...prev, { type: 'bot', message: randomResponse }]);
    }, 1000);

    setChatInput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
              🚀 Limited Time Offer - First 10 Get Money Back!
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Not an Ordinary Internship
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Start your real-world journey with GigLabs today. Get industry exposure, work on live projects, and kickstart your career.
            </p>
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
              onClick={() => document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Apply Now 🎯
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* About GigLabs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">About GigLabs</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              GigLabs is a cutting-edge technology company focused on providing real-world experience to aspiring developers and designers. 
              We bridge the gap between academic learning and industry requirements through hands-on projects, mentorship, and direct industry exposure.
            </p>
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
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-blue-300">
                <CardHeader className="text-center">
                  <domain.icon className="h-16 w-16 mx-auto mb-4 text-blue-600 group-hover:text-purple-600 transition-colors duration-300" />
                  <CardTitle className="text-xl text-gray-900">{domain.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">{domain.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pricing Info */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-8 text-gray-900">Flexible Duration & Pricing</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 border-blue-200 bg-blue-50">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-blue-900">Remote Internship</CardTitle>
                  <CardDescription className="text-blue-700">Work from anywhere</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-4">₹299</div>
                  <p className="text-sm text-blue-700 mb-4">First month • 90% increase per additional month</p>
                  <ul className="text-left space-y-2 text-blue-800">
                    <li>• Online mentorship</li>
                    <li>• Live Zoom classes</li>
                    <li>• 24/7 online support</li>
                    <li>• Industry assignments</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200 bg-purple-50">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-purple-900">In-Office Internship</CardTitle>
                  <CardDescription className="text-purple-700">Hands-on experience</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-4">₹999</div>
                  <p className="text-sm text-purple-700 mb-4">First month • 90% increase per additional month</p>
                  <ul className="text-left space-y-2 text-purple-800">
                    <li>• In-person mentorship</li>
                    <li>• Direct industry meetings</li>
                    <li>• Collaborative environment</li>
                    <li>• Networking opportunities</li>
                  </ul>
                </CardContent>
              </Card>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[
              { icon: Award, title: "Offer Letter", desc: "Official internship offer letter" },
              { icon: CheckCircle, title: "Experience Certificate", desc: "Industry-recognized certificate" },
              { icon: Star, title: "Job Opportunity", desc: "Possible job at GigLabs" },
              { icon: Users, title: "Money Back", desc: "First 10 completers get refund" },
              { icon: Monitor, title: "Live Classes", desc: "Interactive Zoom sessions" },
              { icon: Code, title: "Real Projects", desc: "Work on live development projects" },
              { icon: Globe, title: "Industry Meetings", desc: "Direct industry exposure" },
              { icon: Zap, title: "24/7 Support", desc: "Round-the-clock assistance" }
            ].map((perk, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-2 hover:border-green-200">
                <CardHeader>
                  <perk.icon className="h-12 w-12 mx-auto text-green-600 mb-4" />
                  <CardTitle className="text-lg text-gray-900">{perk.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{perk.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Badge className="bg-yellow-100 text-yellow-800 text-lg px-6 py-2">
              💰 Some internships may be stipend-based for exceptional candidates
            </Badge>
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
                      <Label htmlFor="location">Location *</Label>
                      <Input
                        id="location"
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        className="mt-2"
                      />
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
                    <Select onValueChange={(value) => setFormData({...formData, domain: value})}>
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
                          <SelectItem value="3">3 Months</SelectItem>
                          <SelectItem value="4">4 Months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {formData.internshipMode && formData.duration && (
                    <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">Total Amount</h3>
                          <div className="text-4xl font-bold text-green-600 mb-4">₹{calculatePrice()}</div>
                          <div className="flex justify-center space-x-4 mb-4">
                            <Badge className="bg-blue-100 text-blue-800">Google Pay</Badge>
                            <Badge className="bg-orange-100 text-orange-800">Amazon Pay</Badge>
                            <Badge className="bg-purple-100 text-purple-800">UPI</Badge>
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
                    Submit Application 🚀
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
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">GigLabs</h3>
          <p className="text-gray-400 mb-6">Transforming careers through real-world experience</p>
          <p className="text-sm text-gray-500">© 2024 GigLabs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
