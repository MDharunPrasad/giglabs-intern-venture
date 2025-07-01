
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { CheckCircle, Clock, Play, Upload, FileText, Video, ExternalLink } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface Module {
  id: number
  title: string
  description: string
  week: number
  status: 'locked' | 'available' | 'completed'
  type: 'offer_letter' | 'assignment' | 'quiz' | 'project'
  videoUrl?: string
  assignmentDescription?: string
  githubRequired?: boolean
  hostingRequired?: boolean
}

const StudentDashboard = () => {
  const { user, signOut } = useAuth()
  const [enrollment, setEnrollment] = useState<any>(null)
  const [modules, setModules] = useState<Module[]>([])
  const [currentModule, setCurrentModule] = useState<Module | null>(null)
  const [submissions, setSubmissions] = useState<any[]>([])
  const [githubLink, setGithubLink] = useState('')
  const [hostingLink, setHostingLink] = useState('')
  const [submissionText, setSubmissionText] = useState('')

  const defaultModules: Module[] = [
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
  ]

  useEffect(() => {
    fetchEnrollment()
    setModules(defaultModules)
  }, [])

  const fetchEnrollment = async () => {
    const { data } = await supabase
      .from('enrollments')
      .select('*')
      .eq('user_id', user?.id)
      .single()
    
    setEnrollment(data)
  }

  const handleModuleClick = (module: Module) => {
    if (module.status === 'available') {
      setCurrentModule(module)
    }
  }

  const handleSubmission = async () => {
    if (!currentModule) return

    const { error } = await supabase
      .from('submissions')
      .insert({
        user_id: user?.id,
        module_id: currentModule.id,
        github_link: githubLink,
        hosting_link: hostingLink,
        submission_text: submissionText
      })

    if (!error) {
      // Update module status
      const updatedModules = modules.map(m => {
        if (m.id === currentModule.id) {
          return { ...m, status: 'completed' as const }
        }
        if (m.id === currentModule.id + 1) {
          return { ...m, status: 'available' as const }
        }
        return m
      })
      setModules(updatedModules)
      setCurrentModule(null)
      setGithubLink('')
      setHostingLink('')
      setSubmissionText('')
    }
  }

  const getProgressPercentage = () => {
    const completedModules = modules.filter(m => m.status === 'completed').length
    return (completedModules / modules.length) * 100
  }

  if (!enrollment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Student Dashboard</h1>
            <Button onClick={signOut} variant="outline">Sign Out</Button>
          </div>
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">No Active Enrollment</h2>
              <p className="text-gray-600 mb-4">You haven't enrolled in any internship program yet.</p>
              <Button onClick={() => window.location.href = '/'}>Browse Programs</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Student Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.user_metadata?.name}</p>
          </div>
          <Button onClick={signOut} variant="outline">Sign Out</Button>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
            <CardDescription>{enrollment?.package_name} - {enrollment?.mode} Mode</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Overall Progress</span>
                  <span>{Math.round(getProgressPercentage())}%</span>
                </div>
                <Progress value={getProgressPercentage()} className="h-3" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {modules.filter(m => m.status === 'completed').length}
                  </div>
                  <div className="text-sm text-gray-600">Completed Modules</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {modules.filter(m => m.status === 'available').length}
                  </div>
                  <div className="text-sm text-gray-600">Available Modules</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Modules */}
        <div className="grid gap-6">
          {modules.map((module) => (
            <Card 
              key={module.id} 
              className={`cursor-pointer transition-all duration-300 ${
                module.status === 'available' ? 'border-blue-500 hover:shadow-lg' :
                module.status === 'completed' ? 'border-green-500 bg-green-50' :
                'border-gray-300 opacity-60'
              }`}
              onClick={() => handleModuleClick(module)}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {module.status === 'completed' ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : module.status === 'available' ? (
                        <Play className="h-5 w-5 text-blue-600" />
                      ) : (
                        <Clock className="h-5 w-5 text-gray-400" />
                      )}
                      {module.title}
                    </CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                  </div>
                  <Badge variant={
                    module.status === 'completed' ? 'default' :
                    module.status === 'available' ? 'secondary' : 'outline'
                  }>
                    Week {module.week}
                  </Badge>
                </div>
              </CardHeader>
              {module.status === 'available' && (
                <CardContent>
                  <div className="flex gap-2">
                    {module.videoUrl && (
                      <Button size="sm" variant="outline" onClick={(e) => {
                        e.stopPropagation()
                        window.open(module.videoUrl, '_blank')
                      }}>
                        <Video className="h-4 w-4 mr-2" />
                        Watch Tutorial
                      </Button>
                    )}
                    <Button size="sm" onClick={(e) => {
                      e.stopPropagation()
                      setCurrentModule(module)
                    }}>
                      Start Module
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

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
      </div>
    </div>
  )
}

export default StudentDashboard
