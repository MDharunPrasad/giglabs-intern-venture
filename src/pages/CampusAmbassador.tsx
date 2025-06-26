
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Users, Award, Star, TrendingUp, Target, Gift, ArrowLeft, UserPlus, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const CampusAmbassador = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    year: '',
    experience: '',
    socialMedia: '',
    motivation: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Ambassador Application Submitted!",
      description: "We'll review your application and contact you within 48 hours.",
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      college: '',
      year: '',
      experience: '',
      socialMedia: '',
      motivation: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-700 text-white py-6">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-white hover:text-purple-200 mb-4">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
              🌟 Exclusive Opportunity
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Become a Campus Ambassador
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">
              Lead the change at your college, earn commissions, and build your network while helping fellow students kickstart their careers.
            </p>
            <Button 
              size="lg"
              className="bg-white text-purple-600 hover:bg-purple-50 text-lg px-8 py-6 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
              onClick={() => document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <UserPlus className="mr-2 h-5 w-5" />
              Apply Now
            </Button>
          </div>
        </div>
      </section>

      {/* What is Campus Ambassador */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">What is a Campus Ambassador?</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Campus Ambassadors are student leaders who represent GigLabs at their college, helping fellow students discover 
              internship opportunities while earning rewards for their efforts. You'll be the bridge between GigLabs and your college community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-200">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle className="text-purple-900">Network Builder</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Connect with students across your college and build a strong professional network.</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 border-2 hover:border-pink-200">
              <CardHeader>
                <Award className="h-12 w-12 text-pink-600 mx-auto mb-4" />
                <CardTitle className="text-pink-900">Leadership Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Gain valuable leadership experience that looks great on your resume and interviews.</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 border-2 hover:border-indigo-200">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                <CardTitle className="text-indigo-900">Career Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Fast-track your career with exclusive opportunities and direct access to industry experts.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Commission Structure */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Attractive Commission Structure</h2>
            <p className="text-xl text-gray-600">Earn while you help others succeed</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-green-200 bg-green-50 mb-8">
              <CardHeader className="text-center">
                <Target className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-3xl text-green-900">Commission Tiers</CardTitle>
                <CardDescription className="text-green-700 text-lg">
                  Bring 50+ students from your college with valid proof
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-2xl font-bold text-purple-600 mb-2">5%</h3>
                    <p className="text-gray-700">50-99 Students</p>
                    <p className="text-sm text-gray-500 mt-2">₹15-50 per student</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow border-2 border-purple-300">
                    <h3 className="text-2xl font-bold text-purple-600 mb-2">8%</h3>
                    <p className="text-gray-700">100-199 Students</p>
                    <p className="text-sm text-gray-500 mt-2">₹24-80 per student</p>
                    <Badge className="mt-2 bg-purple-100 text-purple-800">Most Popular</Badge>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-2xl font-bold text-purple-600 mb-2">12%</h3>
                    <p className="text-gray-700">200+ Students</p>
                    <p className="text-sm text-gray-500 mt-2">₹36-120 per student</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <div className="flex items-center space-x-3 mb-3">
                <Gift className="h-6 w-6 text-yellow-600" />
                <h3 className="text-lg font-semibold text-yellow-800">Additional Bonuses</h3>
              </div>
              <ul className="space-y-2 text-yellow-700">
                <li>• Monthly performance bonuses for top ambassadors</li>
                <li>• Special rewards for innovative marketing campaigns</li>
                <li>• Direct internship opportunities at GigLabs</li>
                <li>• Certificate of appreciation and recommendation letters</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Exclusive Ambassador Benefits</h2>
            <p className="text-xl text-gray-600">More than just commissions</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Award, title: "Official Certificate", desc: "GigLabs Ambassador certificate" },
              { icon: Users, title: "Exclusive Events", desc: "Private workshops & meetups" },
              { icon: Star, title: "Priority Support", desc: "Direct line to GigLabs team" },
              { icon: CheckCircle, title: "Resume Boost", desc: "Leadership experience credential" },
              { icon: Target, title: "Job Opportunities", desc: "Fast-track hiring process" },
              { icon: Gift, title: "Swag & Rewards", desc: "Exclusive merchandise" },
              { icon: TrendingUp, title: "Skill Development", desc: "Marketing & communication skills" },
              { icon: Users, title: "Network Access", desc: "Connect with industry professionals" }
            ].map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border hover:border-purple-200 p-4">
                <benefit.icon className="h-10 w-10 mx-auto text-purple-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Ambassador Requirements</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-900">Essential Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Currently enrolled in college/university</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Strong communication skills</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Active on social media platforms</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Passionate about helping peers</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200">
                <CardHeader>
                  <CardTitle className="text-purple-900">Bonus Qualities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center space-x-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span>Previous leadership experience</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span>Part of student organizations</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span>Interest in technology/startups</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span>Creative marketing ideas</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Apply to Become an Ambassador</h2>
              <p className="text-xl text-gray-600">Join our exclusive ambassador program today</p>
            </div>

            <Card className="shadow-xl border-2 border-purple-100">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl text-center">Campus Ambassador Application</CardTitle>
                <CardDescription className="text-purple-100 text-center">
                  Help us reach students at your college and earn rewards!
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email ID *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="year">Year of Study *</Label>
                      <Select onValueChange={(value) => setFormData({...formData, year: value})}>
                        <SelectTrigger className="mt-2">
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
                    <Label htmlFor="college">College/University Name *</Label>
                    <Input
                      id="college"
                      required
                      value={formData.college}
                      onChange={(e) => setFormData({...formData, college: e.target.value})}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="socialMedia">Social Media Handles</Label>
                    <Input
                      id="socialMedia"
                      placeholder="Instagram, LinkedIn, etc."
                      value={formData.socialMedia}
                      onChange={(e) => setFormData({...formData, socialMedia: e.target.value})}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="experience">Previous Leadership/Marketing Experience</Label>
                    <Textarea
                      id="experience"
                      value={formData.experience}
                      onChange={(e) => setFormData({...formData, experience: e.target.value})}
                      className="mt-2"
                      rows={3}
                      placeholder="Student council, club president, event organization, etc."
                    />
                  </div>

                  <div>
                    <Label htmlFor="motivation">Why do you want to be a Campus Ambassador? *</Label>
                    <Textarea
                      id="motivation"
                      required
                      value={formData.motivation}
                      onChange={(e) => setFormData({...formData, motivation: e.target.value})}
                      className="mt-2"
                      rows={4}
                      placeholder="Tell us about your motivation, goals, and how you plan to promote GigLabs..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 text-lg font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Submit Application 🌟
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <Link to="/" className="text-2xl font-bold mb-4 inline-block">GigLabs</Link>
          <p className="text-gray-400 mb-4">Campus Ambassador Program</p>
          <p className="text-sm text-gray-500">© 2024 GigLabs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CampusAmbassador;
