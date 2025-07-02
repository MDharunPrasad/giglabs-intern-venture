import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { CheckCircle, Clock, Play, Award, User, ArrowLeft, Calendar, Star } from 'lucide-react';

interface StudentProfileProps {
  onBack: () => void;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ onBack }) => {
  const { user } = useAuth();
  const [enrolledPackage, setEnrolledPackage] = useState<string | null>(localStorage.getItem('enrolledPackage'));
  const [currentModule, setCurrentModule] = useState(parseInt(localStorage.getItem('currentModule') || '0'));
  const [moduleProgress, setModuleProgress] = useState(JSON.parse(localStorage.getItem('moduleProgress') || '{}'));
  const [meetings, setMeetings] = useState(JSON.parse(localStorage.getItem('meetings') || '[]'));
  const [submissions, setSubmissions] = useState(JSON.parse(localStorage.getItem('submissions') || '{}'));

  const packages = [
    { name: 'Basic Internship', price: 499, modules: 6 },
    { name: 'Advanced Internship', price: 899, modules: 6 },
    { name: 'Summer Internship', price: 1000, modules: 6 },
    { name: 'Professional Internship', price: 3000, modules: 6 },
    { name: 'Elite Program', price: 5000, modules: 6 }
  ];

  const completeModule = (moduleNum: number) => {
    const newProgress = { ...moduleProgress, [moduleNum]: true };
    setModuleProgress(newProgress);
    localStorage.setItem('moduleProgress', JSON.stringify(newProgress));
    
    if (moduleNum < 6) {
      setCurrentModule(moduleNum + 1);
      localStorage.setItem('currentModule', (moduleNum + 1).toString());
    }
    
    toast({
      title: "Module Completed!",
      description: `Great job completing Module ${moduleNum}!`,
    });
  };

  const handleSubmission = (moduleNum: number, type: string, value: string) => {
    const newSubmissions = {
      ...submissions,
      [moduleNum]: { ...submissions[moduleNum], [type]: value }
    };
    setSubmissions(newSubmissions);
    localStorage.setItem('submissions', JSON.stringify(newSubmissions));
  };

  const currentPackage = packages.find(p => p.name === enrolledPackage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Button>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-blue-600" />
              <span className="font-medium">{user?.name}</span>
              <Badge variant="secondary">Student</Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!enrolledPackage ? (
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Welcome to Your Student Profile</CardTitle>
              <CardDescription>
                You haven't enrolled in any program yet. Please go back and apply for an internship program.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button onClick={onBack} className="bg-gradient-to-r from-blue-600 to-purple-600">
                Browse Internship Programs
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Profile Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-6 w-6 text-yellow-600" />
                  <span>Your Internship Journey</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Enrolled Program</h3>
                    <Badge className="text-base px-3 py-1">{enrolledPackage}</Badge>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Progress</h3>
                    <div className="space-y-2">
                      <Progress value={(Object.keys(moduleProgress).length / 6) * 100} />
                      <p className="text-sm text-muted-foreground">
                        {Object.keys(moduleProgress).length} of 6 modules completed
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Current Week</h3>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>Week {currentModule}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Meetings */}
            {meetings.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Upcoming Meetings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {meetings.map((meeting: any) => (
                      <div key={meeting.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium">{meeting.title}</h4>
                          <p className="text-sm text-muted-foreground">{meeting.date} at {meeting.time}</p>
                        </div>
                        <Button onClick={() => window.open(meeting.link)} className="bg-green-600 hover:bg-green-700">
                          Join Meeting
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Module Progress */}
            <Card>
              <CardHeader>
                <CardTitle>6-Module Learning Journey</CardTitle>
                <CardDescription>Complete each module to progress through your internship</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Offer Letter */}
                  <div className={`p-6 rounded-lg border-2 transition-all ${
                    moduleProgress[0] ? 'bg-green-50 border-green-200' : 
                    currentModule === 1 ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {moduleProgress[0] ? <CheckCircle className="h-6 w-6 text-green-600" /> : <Clock className="h-6 w-6" />}
                        <h3 className="text-lg font-semibold">📄 Offer Letter</h3>
                      </div>
                      {moduleProgress[0] && <Badge className="bg-green-600">Completed</Badge>}
                    </div>
                    <p className="text-muted-foreground mb-4">Welcome to your internship journey! Your official offer letter awaits.</p>
                    {currentModule === 1 && !moduleProgress[0] && (
                      <Button onClick={() => completeModule(0)} className="bg-gradient-to-r from-blue-500 to-purple-500">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Accept Offer Letter
                      </Button>
                    )}
                  </div>

                  {/* Module 1 */}
                  <div className={`p-6 rounded-lg border-2 transition-all ${
                    moduleProgress[1] ? 'bg-green-50 border-green-200' : 
                    currentModule === 2 ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {moduleProgress[1] ? <CheckCircle className="h-6 w-6 text-green-600" /> : <Clock className="h-6 w-6" />}
                        <h3 className="text-lg font-semibold">🏗️ Module 1: Foundations (Week 1)</h3>
                      </div>
                      {moduleProgress[1] && <Badge className="bg-green-600">Completed</Badge>}
                    </div>
                    <p className="text-muted-foreground mb-4">Learn the fundamentals with hands-on assignments, screenshots, and video tutorials</p>
                    
                    {currentModule >= 2 && (
                      <div className="space-y-4">
                        <Button variant="outline" className="w-full justify-start">
                          <Play className="h-4 w-4 mr-2" />
                          Watch How-to Video Tutorial
                        </Button>
                        <div className="grid grid-cols-2 gap-4">
                          <Input 
                            placeholder="GitHub Repository Link" 
                            value={submissions[1]?.github || ''}
                            onChange={(e) => handleSubmission(1, 'github', e.target.value)}
                          />
                          <Input 
                            placeholder="Hosted Project Link" 
                            value={submissions[1]?.hosted || ''}
                            onChange={(e) => handleSubmission(1, 'hosted', e.target.value)}
                          />
                        </div>
                        <Textarea 
                          placeholder="Describe your assignment and attach screenshots..." 
                          rows={3}
                          value={submissions[1]?.description || ''}
                          onChange={(e) => handleSubmission(1, 'description', e.target.value)}
                        />
                        {currentModule === 2 && !moduleProgress[1] && (
                          <Button onClick={() => completeModule(1)} className="bg-gradient-to-r from-green-500 to-teal-500">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Submit Assignment
                          </Button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Module 2 */}
                  <div className={`p-6 rounded-lg border-2 transition-all ${
                    moduleProgress[2] ? 'bg-green-50 border-green-200' : 
                    currentModule === 3 ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {moduleProgress[2] ? <CheckCircle className="h-6 w-6 text-green-600" /> : <Clock className="h-6 w-6" />}
                        <h3 className="text-lg font-semibold">⚡ Module 2: Intermediate Skills (Week 2)</h3>
                      </div>
                      {moduleProgress[2] && <Badge className="bg-green-600">Completed</Badge>}
                    </div>
                    <p className="text-muted-foreground mb-4">Advanced concepts unlocked! Complete quiz and assignment to progress.</p>
                    
                    {currentModule >= 3 && (
                      <div className="space-y-4">
                        <Button variant="outline" className="w-full justify-start">
                          🧠 Take Interactive Quiz
                        </Button>
                        <Textarea 
                          placeholder="Assignment submission with detailed explanations..." 
                          rows={3}
                          value={submissions[2]?.quiz || ''}
                          onChange={(e) => handleSubmission(2, 'quiz', e.target.value)}
                        />
                        {currentModule === 3 && !moduleProgress[2] && (
                          <Button onClick={() => completeModule(2)} className="bg-gradient-to-r from-purple-500 to-pink-500">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Complete Module 2
                          </Button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Module 3 */}
                  <div className={`p-6 rounded-lg border-2 transition-all ${
                    moduleProgress[3] ? 'bg-green-50 border-green-200' : 
                    currentModule === 4 ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {moduleProgress[3] ? <CheckCircle className="h-6 w-6 text-green-600" /> : <Clock className="h-6 w-6" />}
                        <h3 className="text-lg font-semibold">🚀 Module 3: Project Phase 1 (Week 3)</h3>
                      </div>
                      {moduleProgress[3] && <Badge className="bg-green-600">Completed</Badge>}
                    </div>
                    <p className="text-muted-foreground mb-4">Build your first real-world project with guidance and mentorship</p>
                    
                    {currentModule >= 4 && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <Input 
                            placeholder="Project GitHub Link" 
                            value={submissions[3]?.github || ''}
                            onChange={(e) => handleSubmission(3, 'github', e.target.value)}
                          />
                          <Input 
                            placeholder="Live Demo Link" 
                            value={submissions[3]?.demo || ''}
                            onChange={(e) => handleSubmission(3, 'demo', e.target.value)}
                          />
                        </div>
                        <Textarea 
                          placeholder="Project description and key features implemented..." 
                          rows={3}
                          value={submissions[3]?.description || ''}
                          onChange={(e) => handleSubmission(3, 'description', e.target.value)}
                        />
                        {currentModule === 4 && !moduleProgress[3] && (
                          <Button onClick={() => completeModule(3)} className="bg-gradient-to-r from-orange-500 to-red-500">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Submit Project Phase 1
                          </Button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Module 4 */}
                  <div className={`p-6 rounded-lg border-2 transition-all ${
                    moduleProgress[4] ? 'bg-green-50 border-green-200' : 
                    currentModule === 5 ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {moduleProgress[4] ? <CheckCircle className="h-6 w-6 text-green-600" /> : <Clock className="h-6 w-6" />}
                        <h3 className="text-lg font-semibold">✨ Module 4: Project Phase 2 (Week 4)</h3>
                      </div>
                      {moduleProgress[4] && <Badge className="bg-green-600">Completed</Badge>}
                    </div>
                    <p className="text-muted-foreground mb-4">Complete and deploy your project with advanced features</p>
                    
                    {currentModule >= 5 && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <Input 
                            placeholder="Final GitHub Repository" 
                            value={submissions[4]?.github || ''}
                            onChange={(e) => handleSubmission(4, 'github', e.target.value)}
                          />
                          <Input 
                            placeholder="Production Deployment Link" 
                            value={submissions[4]?.production || ''}
                            onChange={(e) => handleSubmission(4, 'production', e.target.value)}
                          />
                        </div>
                        <Textarea 
                          placeholder="Final project report and reflection..." 
                          rows={3}
                          value={submissions[4]?.report || ''}
                          onChange={(e) => handleSubmission(4, 'report', e.target.value)}
                        />
                        {currentModule === 5 && !moduleProgress[4] && (
                          <Button onClick={() => completeModule(4)} className="bg-gradient-to-r from-green-500 to-teal-500">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Final Project Submission
                          </Button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Module 5 */}
                  <div className={`p-6 rounded-lg border-2 transition-all ${
                    moduleProgress[5] ? 'bg-green-50 border-green-200' : 
                    currentModule === 6 ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {moduleProgress[5] ? <CheckCircle className="h-6 w-6 text-green-600" /> : <Clock className="h-6 w-6" />}
                        <h3 className="text-lg font-semibold">🎯 Module 5: Professional Presentation (Week 5)</h3>
                      </div>
                      {moduleProgress[5] && <Badge className="bg-green-600">Completed</Badge>}
                    </div>
                    <p className="text-muted-foreground mb-4">Present your work and prepare for industry readiness</p>
                    
                    {currentModule === 6 && !moduleProgress[5] && (
                      <Button onClick={() => completeModule(5)} className="bg-gradient-to-r from-yellow-500 to-orange-500">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Complete Presentation
                      </Button>
                    )}
                  </div>

                  {/* Certificate */}
                  {Object.keys(moduleProgress).length >= 6 && (
                    <div className="p-8 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300">
                      <div className="text-center">
                        <Award className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">🏆 Congratulations!</h3>
                        <div className="bg-white p-6 rounded-lg border-2 border-yellow-400 max-w-md mx-auto">
                          <h4 className="text-xl font-bold mb-2">Certificate of Completion</h4>
                          <p className="mb-2">This is to certify that</p>
                          <p className="text-lg font-bold text-blue-600 mb-2">{user?.name}</p>
                          <p className="mb-2">has successfully completed the</p>
                          <p className="font-semibold text-purple-600 mb-2">{enrolledPackage}</p>
                          <p className="text-sm text-gray-600">at GigLabs</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;