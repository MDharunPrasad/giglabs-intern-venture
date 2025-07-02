
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, User, Mail, Lock, UserCheck } from 'lucide-react';

interface LoginProps {
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'student' | 'staff'>('student');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

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
          description: "Your account has been created successfully.",
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 relative">
      {/* Back Button */}
      <Button
        variant="outline"
        onClick={onClose}
        className="absolute top-6 left-6 flex items-center space-x-2 hover:bg-white/80 backdrop-blur-sm"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Home</span>
      </Button>

      <Card className="w-full max-w-md shadow-2xl border-0 overflow-hidden">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">
            {isLogin ? 'Welcome Back!' : 'Join GigLabs'}
          </CardTitle>
          <CardDescription className="text-blue-100 text-lg">
            {isLogin ? 'Sign in to continue your journey' : 'Start your tech career today'}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Full Name</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>Email Address</span>
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                placeholder="Enter your email"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium flex items-center space-x-2">
                <Lock className="h-4 w-4" />
                <span>Password</span>
              </Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                placeholder="Enter your password"
              />
            </div>
            
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center space-x-2">
                <UserCheck className="h-4 w-4" />
                <span>I am a:</span>
              </Label>
              <RadioGroup 
                value={role} 
                onValueChange={(value) => setRole(value as 'student' | 'staff')} 
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                  <RadioGroupItem value="student" id="student" />
                  <Label htmlFor="student" className="font-medium cursor-pointer">🎓 Student</Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                  <RadioGroupItem value="staff" id="staff" />
                  <Label htmlFor="staff" className="font-medium cursor-pointer">👨‍🏫 Staff</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Please wait...</span>
                </div>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {isLogin ? "Don't have an account? Sign up here" : "Already have an account? Sign in here"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
