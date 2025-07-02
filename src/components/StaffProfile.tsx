import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Calendar, Upload, Users, User, ArrowLeft, Clock, CheckCircle, FileText, Video } from 'lucide-react';

interface StaffProfileProps {
  onBack: () => void;
}

const StaffProfile: React.FC<StaffProfileProps> = ({ onBack }) => {
  const { user } = useAuth();
  const [meetings, setMeetings] = useState(JSON.parse(localStorage.getItem('meetings') || '[]'));
  const [assignments, setAssignments] = useState(JSON.parse(localStorage.getItem('assignments') || '[]'));
  const [students] = useState(JSON.parse(localStorage.getItem('students') || '[]'));
  
  const [meetingForm, setMeetingForm] = useState({
    title: '',
    date: '',
    time: '',
    link: '',
    description: ''
  });

  const [assignmentForm, setAssignmentForm] = useState({
    title: '',
    module: '',
    description: '',
    videoLink: '',
    sampleScreenshot: '',
    dueDate: ''
  });

  const scheduleMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    const newMeeting = { 
      id: Date.now(), 
      ...meetingForm,
      createdBy: user?.name,
      createdAt: new Date().toISOString()
    };
    const updatedMeetings = [...meetings, newMeeting];
    setMeetings(updatedMeetings);
    localStorage.setItem('meetings', JSON.stringify(updatedMeetings));
    
    toast({
      title: "Meeting Scheduled!",
      description: `${meetingForm.title} scheduled for ${meetingForm.date} at ${meetingForm.time}`,
    });

    setMeetingForm({ title: '', date: '', time: '', link: '', description: '' });
  };

  const uploadAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    const newAssignment = {
      id: Date.now(),
      ...assignmentForm,
      createdBy: user?.name,
      createdAt: new Date().toISOString()
    };
    const updatedAssignments = [...assignments, newAssignment];
    setAssignments(updatedAssignments);
    localStorage.setItem('assignments', JSON.stringify(updatedAssignments));

    toast({
      title: "Assignment Uploaded!",
      description: `${assignmentForm.title} has been created for Module ${assignmentForm.module}`,
    });

    setAssignmentForm({ title: '', module: '', description: '', videoLink: '', sampleScreenshot: '', dueDate: '' });
  };

  const deleteMeeting = (id: number) => {
    const updatedMeetings = meetings.filter((meeting: any) => meeting.id !== id);
    setMeetings(updatedMeetings);
    localStorage.setItem('meetings', JSON.stringify(updatedMeetings));
    toast({
      title: "Meeting Deleted",
      description: "Meeting has been removed successfully",
    });
  };

  const deleteAssignment = (id: number) => {
    const updatedAssignments = assignments.filter((assignment: any) => assignment.id !== id);
    setAssignments(updatedAssignments);
    localStorage.setItem('assignments', JSON.stringify(updatedAssignments));
    toast({
      title: "Assignment Deleted",
      description: "Assignment has been removed successfully",
    });
  };

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
              <User className="h-5 w-5 text-purple-600" />
              <span className="font-medium">{user?.name}</span>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">Staff</Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Staff Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-purple-600" />
                <span>Staff Dashboard</span>
              </CardTitle>
              <CardDescription>
                Manage meetings, assignments, and monitor student progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-blue-800">Scheduled Meetings</h3>
                  <p className="text-2xl font-bold text-blue-600">{meetings.length}</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <FileText className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-green-800">Active Assignments</h3>
                  <p className="text-2xl font-bold text-green-600">{assignments.length}</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-purple-800">Total Students</h3>
                  <p className="text-2xl font-bold text-purple-600">{students.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Schedule Meeting */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Schedule New Meeting</span>
                </CardTitle>
                <CardDescription>
                  Create Google Meet or Zoom sessions for students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={scheduleMeeting} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Meeting Title</Label>
                    <Input
                      id="title"
                      value={meetingForm.title}
                      onChange={(e) => setMeetingForm({...meetingForm, title: e.target.value})}
                      placeholder="e.g., Module 1 Review Session"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={meetingForm.date}
                        onChange={(e) => setMeetingForm({...meetingForm, date: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={meetingForm.time}
                        onChange={(e) => setMeetingForm({...meetingForm, time: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="link">Meeting Link</Label>
                    <Input
                      id="link"
                      value={meetingForm.link}
                      onChange={(e) => setMeetingForm({...meetingForm, link: e.target.value})}
                      placeholder="https://meet.google.com/..."
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={meetingForm.description}
                      onChange={(e) => setMeetingForm({...meetingForm, description: e.target.value})}
                      placeholder="Meeting agenda and details..."
                      rows={3}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Meeting
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Upload Assignment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>Create Assignment</span>
                </CardTitle>
                <CardDescription>
                  Upload assignments with descriptions, videos, and sample screenshots
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={uploadAssignment} className="space-y-4">
                  <div>
                    <Label htmlFor="assignmentTitle">Assignment Title</Label>
                    <Input
                      id="assignmentTitle"
                      value={assignmentForm.title}
                      onChange={(e) => setAssignmentForm({...assignmentForm, title: e.target.value})}
                      placeholder="e.g., Build a React Component"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="module">Module</Label>
                      <Input
                        id="module"
                        value={assignmentForm.module}
                        onChange={(e) => setAssignmentForm({...assignmentForm, module: e.target.value})}
                        placeholder="1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="dueDate">Due Date</Label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={assignmentForm.dueDate}
                        onChange={(e) => setAssignmentForm({...assignmentForm, dueDate: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="assignmentDescription">Description</Label>
                    <Textarea
                      id="assignmentDescription"
                      value={assignmentForm.description}
                      onChange={(e) => setAssignmentForm({...assignmentForm, description: e.target.value})}
                      placeholder="Detailed assignment instructions and requirements..."
                      rows={3}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="videoLink">Video Tutorial Link</Label>
                    <Input
                      id="videoLink"
                      value={assignmentForm.videoLink}
                      onChange={(e) => setAssignmentForm({...assignmentForm, videoLink: e.target.value})}
                      placeholder="https://youtube.com/watch?v=..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="sampleScreenshot">Sample Screenshot URL</Label>
                    <Input
                      id="sampleScreenshot"
                      value={assignmentForm.sampleScreenshot}
                      onChange={(e) => setAssignmentForm({...assignmentForm, sampleScreenshot: e.target.value})}
                      placeholder="https://example.com/screenshot.png"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-green-600 to-teal-600">
                    <Upload className="h-4 w-4 mr-2" />
                    Create Assignment
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Scheduled Meetings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Scheduled Meetings</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {meetings.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No meetings scheduled yet</p>
              ) : (
                <div className="space-y-4">
                  {meetings.map((meeting: any) => (
                    <div key={meeting.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{meeting.title}</h4>
                        <p className="text-sm text-muted-foreground">{meeting.date} at {meeting.time}</p>
                        {meeting.description && (
                          <p className="text-sm text-gray-600 mt-1">{meeting.description}</p>
                        )}
                        <a 
                          href={meeting.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          {meeting.link}
                        </a>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(meeting.link)}
                        >
                          Join
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteMeeting(meeting.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Assignments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Created Assignments</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {assignments.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No assignments created yet</p>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {assignments.map((assignment: any) => (
                    <div key={assignment.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium">{assignment.title}</h4>
                        <div className="flex space-x-2">
                          <Badge variant="secondary">Module {assignment.module}</Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteAssignment(assignment.id)}
                            className="text-red-600 hover:text-red-700 h-6 w-6 p-0"
                          >
                            ×
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{assignment.description}</p>
                      <p className="text-sm text-gray-600">Due: {assignment.dueDate}</p>
                      {assignment.videoLink && (
                        <a 
                          href={assignment.videoLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-sm text-blue-600 hover:underline mt-2"
                        >
                          <Video className="h-4 w-4 mr-1" />
                          Video Tutorial
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StaffProfile;