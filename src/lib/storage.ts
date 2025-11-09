export interface Issue {
  id: string;
  title: string;
  description: string;
  category: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  status: 'open' | 'in-progress' | 'resolved';
  comments: Comment[];
}

export interface Comment {
  id: string;
  issueId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
}

export const getIssues = (): Issue[] => {
  const issues = localStorage.getItem('issues');
  return issues ? JSON.parse(issues) : [];
};

export const getIssueById = (id: string): Issue | undefined => {
  const issues = getIssues();
  return issues.find(issue => issue.id === id);
};

export const createIssue = (issue: Omit<Issue, 'id' | 'createdAt' | 'comments'>): Issue => {
  const issues = getIssues();
  const newIssue: Issue = {
    ...issue,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    comments: [],
  };
  issues.unshift(newIssue);
  localStorage.setItem('issues', JSON.stringify(issues));
  return newIssue;
};

export const updateIssueStatus = (id: string, status: Issue['status']): void => {
  const issues = getIssues();
  const issueIndex = issues.findIndex(issue => issue.id === id);
  if (issueIndex !== -1) {
    issues[issueIndex].status = status;
    localStorage.setItem('issues', JSON.stringify(issues));
  }
};

export const addComment = (issueId: string, comment: Omit<Comment, 'id' | 'createdAt' | 'issueId'>): void => {
  const issues = getIssues();
  const issueIndex = issues.findIndex(issue => issue.id === issueId);
  
  if (issueIndex !== -1) {
    const newComment: Comment = {
      ...comment,
      id: Date.now().toString(),
      issueId,
      createdAt: new Date().toISOString(),
    };
    issues[issueIndex].comments.push(newComment);
    localStorage.setItem('issues', JSON.stringify(issues));
  }
};