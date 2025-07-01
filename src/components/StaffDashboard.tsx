
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Calendar, Clock, Users, Video, FileText, Plus } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'

const StaffDashboard = () => {
  const { user, signOut } = useAuth()
  const [meetings, setMeetings] = useState<any[]>([])
  const [students, setStudents] = useState<any[]>([])
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    meetingLink: ''
  })
  const [showCreateMeeting, setShowCreateMeeting] = useState(false)

  useEffect(() => {
    fetchMeetings()
    fetchStudents()
  }, [])

  const fetchMeetings = async () => {
    const { data } = await supabase
      .from('meetings')
      .select('*')
      .eq('staff_id', user?.id)
      .order('date', { ascending: true })
    
    setMeetings(data || [])
  }

  const fetchStudents = async () => {
    const { data } = await supabase
      .from('enrollments')
      .select(`
        *,
        profiles (name, email)
      `)
    
    setStudents(data || [])
  }

  const handleCreateMeeting = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const { error } = await supabase
      .from('meetings')
      .insert({
        staff_id: user?.id,
        title: newMeeting.title,
        description: newMeeting.description,
        date: newMeeting.date,
        time: newMeeting.time,
        meeting_link: newMeeting.meetingLink
      })

    if (!error) {
      setNewMeeting({ title: '', description: '', date: '', time: '', meetingLink: '' })
      setShowCreateMeeting(false)
      fetchMeetings()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Staff Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.user_metadata?.name}</p>
          </div>
          <Button onClick={signOut} variant="outline">Sign Out</Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{students.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scheduled Meetings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{meetings.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
            </CardContent>
          </Card>
        </div>

        {/* Meeting Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Scheduled Meetings</CardTitle>
                <Button onClick={() => setShowCreateMeeting(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Meeting
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {meetings.map((meeting) => (
                  <div key={meeting.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{meeting.title}</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {meeting.date}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{meeting.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {meeting.time}
                      </div>
                      <Button size="sm" variant="outline" onClick={() => window.open(meeting.meeting_link, '_blank')}>
                        <Video className="h-4 w-4 mr-2" />
                        Join Meeting
                      </Button>
                    </div>
                  </div>
                ))}
                {meetings.length === 0 && (
                  <p className="text-gray-500 text-center py-8">No meetings scheduled</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Student Management */}
          <Card>
            <CardHeader>
              <CardTitle>Student Enrollments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {students.map((student) => (
                  <div key={student.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{student.profiles?.name}</h3>
                        <p className="text-sm text-gray-600">{student.profiles?.email}</p>
                        <p className="text-sm text-blue-600">{student.package_name} - {student.mode}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">₹{student.amount}</p>
                        <p className="text-xs text-gray-500">{student.domain}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {students.length === 0 && (
                  <p className="text-gray-500 text-center py-8">No student enrollments</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

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
    </div>
  )
}

export default StaffDashboard
