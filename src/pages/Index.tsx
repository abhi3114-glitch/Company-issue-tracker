import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Mail, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Index() {
  const { login, signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  if (isAuthenticated) {
    navigate('/dashboard');
    return null;
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const success = await login(email, password);
    setIsLoading(false);

    if (success) {
      toast.success('Welcome back!');
      navigate('/dashboard');
    } else {
      toast.error('Invalid email or password');
    }
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;

    const success = await signup(email, password, name);
    setIsLoading(false);

    if (success) {
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } else {
      toast.error('Email already exists');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-[calc(100vh-4rem)] gap-12">
          {/* Left side - Hero section */}
          <div className="flex-1 text-center lg:text-left space-y-8 animate-in fade-in slide-in-from-left duration-700">
            <div className="inline-block">
              <img 
                src="/assets/logo_variant_2.png" 
                alt="Techie Amigos Logo" 
                className="h-24 w-auto mx-auto lg:mx-0 drop-shadow-2xl"
              />
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                Techie Amigos
              </h1>
              <p className="text-2xl lg:text-3xl font-semibold text-gray-800">
                Issue Tracking & Collaboration
              </p>
              <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
                Empower your team to solve problems together. Report issues, collaborate on solutions, and track progress in real-time.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto lg:mx-0 pt-8">
              <div className="flex flex-col items-center lg:items-start gap-2">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Easy Reporting</h3>
                <p className="text-sm text-gray-600 text-center lg:text-left">Post issues in seconds</p>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-2">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Team Collaboration</h3>
                <p className="text-sm text-gray-600 text-center lg:text-left">Work together on solutions</p>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-2">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Track Progress</h3>
                <p className="text-sm text-gray-600 text-center lg:text-left">Monitor issue resolution</p>
              </div>
            </div>
          </div>

          {/* Right side - Auth forms */}
          <div className="w-full max-w-md animate-in fade-in slide-in-from-right duration-700">
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="space-y-1 pb-6">
                <CardTitle className="text-2xl font-bold text-center">Get Started</CardTitle>
                <CardDescription className="text-center">
                  Sign in to your account or create a new one
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="login" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                      Login
                    </TabsTrigger>
                    <TabsTrigger value="signup" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                      Sign Up
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-email" className="text-sm font-medium">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="login-email"
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            className="pl-10 h-11"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="login-password" className="text-sm font-medium">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="login-password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10 h-11"
                            required
                          />
                        </div>
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full h-11 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium" 
                        disabled={isLoading}
                      >
                        {isLoading ? 'Logging in...' : (
                          <span className="flex items-center justify-center gap-2">
                            Login <ArrowRight className="h-4 w-4" />
                          </span>
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="signup">
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-name" className="text-sm font-medium">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="signup-name"
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            className="pl-10 h-11"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-email" className="text-sm font-medium">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="signup-email"
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            className="pl-10 h-11"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password" className="text-sm font-medium">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="signup-password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10 h-11"
                            required
                            minLength={6}
                          />
                        </div>
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full h-11 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium" 
                        disabled={isLoading}
                      >
                        {isLoading ? 'Creating account...' : (
                          <span className="flex items-center justify-center gap-2">
                            Create Account <ArrowRight className="h-4 w-4" />
                          </span>
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}