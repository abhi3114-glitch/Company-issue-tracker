import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';
import { createIssue } from '@/lib/storage';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { ArrowLeft, FileText, Tag, MessageSquare } from 'lucide-react';

export default function CreateIssue() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [category, setCategory] = useState('');

  if (!isAuthenticated) {
    navigate('/');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    if (!category) {
      toast.error('Please select a category');
      setIsSubmitting(false);
      return;
    }

    try {
      createIssue({
        title,
        description,
        category,
        authorId: user!.id,
        authorName: user!.name,
        status: 'open',
      });

      toast.success('Issue created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to create issue');
      setIsSubmitting(false);
    }
  };

  const categories = [
    { value: 'bug', label: 'Bug', icon: '🐛' },
    { value: 'feature', label: 'Feature Request', icon: '✨' },
    { value: 'question', label: 'Question', icon: '❓' },
    { value: 'documentation', label: 'Documentation', icon: '📚' },
    { value: 'infrastructure', label: 'Infrastructure', icon: '🏗️' },
    { value: 'other', label: 'Other', icon: '📌' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="mb-6 flex items-center gap-2 hover:bg-indigo-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>

        <Card className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="space-y-1 pb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">Create New Issue</CardTitle>
                <CardDescription className="text-base">
                  Report a problem or request assistance from the team
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-semibold flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Issue Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Brief, descriptive title of the issue"
                  required
                  maxLength={100}
                  className="h-12 bg-white border-gray-200"
                />
                <p className="text-xs text-gray-500">Keep it clear and concise</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-semibold flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Category
                </Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger className="h-12 bg-white border-gray-200">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>
                        <span className="flex items-center gap-2">
                          <span>{cat.icon}</span>
                          <span>{cat.label}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-semibold flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Provide detailed information about the issue. Include steps to reproduce, expected behavior, and any relevant context..."
                  required
                  rows={10}
                  className="resize-none bg-white border-gray-200"
                />
                <p className="text-xs text-gray-500">Be as detailed as possible to help the team understand and resolve the issue</p>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                  className="flex-1 h-12 border-gray-200 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="flex-1 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  {isSubmitting ? 'Creating...' : 'Create Issue'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}