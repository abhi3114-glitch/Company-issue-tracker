import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { LogOut, Home, PlusCircle, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="border-b bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <img 
              src="/assets/logo.png" 
              alt="Techie Amigos Logo" 
              className="h-10 w-auto drop-shadow-lg"
            />
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Techie Amigos
              </h1>
              <p className="text-xs text-gray-500">Issue Tracker</p>
            </div>
          </div>
          
          {user && (
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="hidden sm:flex items-center gap-2 hover:bg-indigo-50 hover:text-indigo-600"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Button>
              <Button
                size="sm"
                onClick={() => navigate('/create-issue')}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
              >
                <PlusCircle className="h-4 w-4" />
                <span className="hidden sm:inline">New Issue</span>
              </Button>
              <div className="flex items-center gap-3 pl-3 border-l">
                <Avatar className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-purple-500">
                  <AvatarFallback className="bg-transparent text-white text-xs font-semibold">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-gray-700 hidden md:inline">{user.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}