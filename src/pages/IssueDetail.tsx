import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { getIssueById, addComment, updateIssueStatus, Issue } from '@/lib/storage';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { ArrowLeft, Clock, User, MessageSquare, Send } from 'lucide-react';

export default function IssueDetail() {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [issue, setIssue] = useState<Issue | null>(null);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }
    loadIssue();
  }, [id, isAuthenticated, navigate]);

  const loadIssue = () => {
    if (id) {
      const foundIssue = getIssueById(id);
      setIssue(foundIssue || null);
    }
  };

  const handleStatusChange = (newStatus: Issue['status']) => {
    if (id) {
      updateIssueStatus(id, newStatus);
      toast.success('Status updated successfully');
      loadIssue();
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !id || !user) return;

    setIsSubmitting(true);
    addComment(id, {
      authorId: user.id,
      authorName: user.name,
      content: comment,
    });
    
    toast.success('Comment added successfully');
    setComment('');
    setIsSubmitting(false);
    loadIssue();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatusColor = (status: Issue['status']) => {
    switch (status) {
      case 'open':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'in-progress':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'resolved':
        return 'bg-green-500 hover:bg-green-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  if (!issue) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-gray-500">Issue not found</p>
        </div>
      </div>
    );
  }

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

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Issue Details Card */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-2xl md:text-3xl mb-3 break-words">{issue.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
                    <Badge variant="outline" className="text-xs font-medium border-indigo-200 text-indigo-700 bg-indigo-50">
                      {issue.category}
                    </Badge>
                    <span className="flex items-center gap-1.5">
                      <User className="h-4 w-4" />
                      <span className="font-medium">{issue.authorName}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      {formatDate(issue.createdAt)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={`${getStatusColor(issue.status)} text-white`}>
                    {issue.status}
                  </Badge>
                  <Select
                    value={issue.status}
                    onValueChange={(value) => handleStatusChange(value as Issue['status'])}
                  >
                    <SelectTrigger className="w-40 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{issue.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Comments ({issue.comments.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {issue.comments.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-lg mb-1">No comments yet</p>
                  <p className="text-gray-400 text-sm">Be the first to help with this issue!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {issue.comments.map(comment => (
                    <div key={comment.id} className="flex gap-4">
                      <Avatar className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-500 shrink-0">
                        <AvatarFallback className="bg-transparent text-white text-sm font-semibold">
                          {getInitials(comment.authorName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className="font-semibold text-sm text-gray-900">{comment.authorName}</span>
                            <span className="text-xs text-gray-500">{formatDate(comment.createdAt)}</span>
                          </div>
                          <p className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed break-words">{comment.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Comment Form */}
              <form onSubmit={handleCommentSubmit} className="space-y-4 pt-6 border-t">
                <div className="flex gap-4">
                  <Avatar className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-500 shrink-0">
                    <AvatarFallback className="bg-transparent text-white text-sm font-semibold">
                      {user && getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Share your thoughts, solutions, or ask for clarification..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={4}
                      className="resize-none bg-white border-gray-200 mb-3"
                    />
                    <Button 
                      type="submit" 
                      disabled={isSubmitting || !comment.trim()}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                    >
                      {isSubmitting ? 'Posting...' : (
                        <span className="flex items-center gap-2">
                          <Send className="h-4 w-4" />
                          Post Comment
                        </span>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}