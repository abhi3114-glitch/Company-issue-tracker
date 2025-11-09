import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';
import { getIssues, Issue } from '@/lib/storage';
import Navbar from '@/components/Navbar';
import IssueCard from '@/components/IssueCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Search, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function Dashboard() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }
    loadIssues();
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    filterIssues();
  }, [issues, searchTerm, statusFilter]);

  const loadIssues = () => {
    const allIssues = getIssues();
    setIssues(allIssues);
  };

  const filterIssues = () => {
    let filtered = issues;

    if (searchTerm) {
      filtered = filtered.filter(
        issue =>
          issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          issue.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(issue => issue.status === statusFilter);
    }

    setFilteredIssues(filtered);
  };

  const getStats = () => {
    const open = issues.filter(i => i.status === 'open').length;
    const inProgress = issues.filter(i => i.status === 'in-progress').length;
    const resolved = issues.filter(i => i.status === 'resolved').length;
    return { open, inProgress, resolved, total: issues.length };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Issue Board</h1>
              <p className="text-gray-600">Track and manage all employee issues</p>
            </div>
            <Button 
              onClick={() => navigate('/create-issue')} 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all"
              size="lg"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Create Issue
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Issues</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Open</p>
                    <p className="text-2xl font-bold text-blue-600 mt-1">{stats.open}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">In Progress</p>
                    <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.inProgress}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Resolved</p>
                    <p className="text-2xl font-bold text-green-600 mt-1">{stats.resolved}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search issues by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-11 h-12 bg-white/80 backdrop-blur-sm border-gray-200 shadow-sm"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-56 h-12 bg-white/80 backdrop-blur-sm border-gray-200 shadow-sm">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Issues Grid */}
        {filteredIssues.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-12 w-12 text-indigo-600" />
            </div>
            <p className="text-gray-500 text-lg mb-2">No issues found</p>
            <p className="text-gray-400 mb-6">Create your first issue to get started</p>
            <Button 
              onClick={() => navigate('/create-issue')} 
              variant="outline"
              className="border-indigo-200 hover:bg-indigo-50"
            >
              Create the first issue
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredIssues.map(issue => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}