
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { AlertTriangle } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'student' | 'staff'>('student');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, isConfigured } = useAuth();

  if (!isConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <AlertTriangle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <CardTitle>Configuration Required</CardTitle>
            <CardDescription>
              Please configure your Supabase environment variables:
              <br />
              <code className="text-sm bg-gray-100 px-2 py-1 rounded mt-2 block">
                VITE_SUPABASE_URL<br />
                VITE_SUPABASE_ANON_KEY
              </code>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => window.location.reload()} 
              className="w-full"
            >
              Refresh Page
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await signIn(email, password, role);
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
      } else {
        await signUp(email, password, role, name);
        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </CardTitle>
          <CardDescription className="text-blue-100">
            {isLogin ? 'Sign in to your account' : 'Join GigLabs today'}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1"
                />
              </div>
            )}
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label>I am a:</Label>
              <RadioGroup value={role} onValueChange={(value) => setRole(value as 'student' | 'staff')} className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="student" />
                  <Label htmlFor="student">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="staff" id="staff" />
                  <Label htmlFor="staff">Staff</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={loading}
            >
              {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
