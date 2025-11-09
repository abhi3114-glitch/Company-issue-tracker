# Techie Amigos Issue Tracker - Development Plan

## MVP Features
1. User Authentication (Sign up, Login, Logout)
2. Issue Posting System
3. Issue Viewing (All employees can see)
4. Simple commenting/help system
5. Company branding with logo

## Files to Create/Modify

### 1. index.html
- Update title and meta tags for Techie Amigos

### 2. src/pages/Index.tsx
- Landing page with company branding
- Login/Sign up forms
- Redirect to dashboard after login

### 3. src/pages/Dashboard.tsx
- Main issue board view
- Display all posted issues
- Button to create new issue

### 4. src/pages/CreateIssue.tsx
- Form to create new issue
- Title, description, category fields

### 5. src/pages/IssueDetail.tsx
- View individual issue details
- Comments/responses section
- Add response functionality

### 6. src/lib/auth.ts
- Authentication context and utilities
- Local storage for user session (MVP - no backend)

### 7. src/lib/storage.ts
- Local storage utilities for issues and users
- CRUD operations for issues

### 8. src/components/Navbar.tsx
- Navigation bar with logo
- User profile/logout button

### 9. src/components/IssueCard.tsx
- Reusable issue card component
- Display issue preview

### 10. src/App.tsx
- Update routing for all pages
- Add authentication context provider

## Tech Stack
- React + TypeScript
- Shadcn-ui components
- Tailwind CSS
- Local Storage (for MVP - no backend required)

## Implementation Notes
- Using localStorage for MVP (users, issues, comments)
- Simple authentication without backend
- Reddit-style issue board layout
- Responsive design for all devices