import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Issue } from '@/lib/storage';
import { MessageSquare, Clock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface IssueCardProps {
  issue: Issue;
}

export default function IssueCard({ issue }: IssueCardProps) {
  const navigate = useNavigate();

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <Card 
      className="hover:shadow-xl transition-all duration-300 cursor-pointer bg-white/80 backdrop-blur-sm border-0 shadow-md hover:scale-[1.02] group"
      onClick={() => navigate(`/issue/${issue.id}`)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-lg font-semibold group-hover:text-indigo-600 transition-colors line-clamp-2">
            {issue.title}
          </CardTitle>
          <Badge className={`${getStatusColor(issue.status)} text-white shrink-0`}>
            {issue.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 line-clamp-3">
          {issue.description}
        </p>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-xs font-medium border-indigo-200 text-indigo-700 bg-indigo-50">
              {issue.category}
            </Badge>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <MessageSquare className="h-3.5 w-3.5" />
              {issue.comments.length}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <User className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{issue.authorName}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {formatDate(issue.createdAt)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}