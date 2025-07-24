import React, { useState } from 'react';
import { Search, Plus, MessageCircle, Users, FileText, TrendingUp, User, ChevronRight, ArrowLeft, Star, MessageSquare, ThumbsUp } from 'lucide-react';

const UBSAskPlatform = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedDivision, setSelectedDivision] = useState(null);

  const divisions = [
    { name: 'Group Five', icon: '🏢', count: 24, questions: [
      { id: 1, title: "How to handle large client portfolios?", votes: 15, answers: 3, time: "2h ago" },
      { id: 2, title: "Best practices for quarterly reviews?", votes: 8, answers: 5, time: "4h ago" },
      { id: 3, title: "Compliance workflow questions", votes: 12, answers: 2, time: "1d ago" }
    ]},
    { name: '1B Tech', icon: '💻', count: 18, questions: [
      { id: 4, title: "API integration with legacy systems?", votes: 23, answers: 7, time: "1h ago" },
      { id: 5, title: "Docker deployment issues", votes: 11, answers: 4, time: "3h ago" },
      { id: 6, title: "Database migration strategies", votes: 19, answers: 6, time: "5h ago" }
    ]},
    { name: 'WMA', icon: '📊', count: 31, questions: [
      { id: 7, title: "Portfolio risk assessment tools?", votes: 17, answers: 4, time: "30m ago" },
      { id: 8, title: "Client reporting automation", votes: 14, answers: 3, time: "2h ago" },
      { id: 9, title: "Market analysis frameworks", votes: 21, answers: 8, time: "6h ago" }
    ]},
    { name: 'Asset Man.', icon: '💼', count: 15, questions: [
      { id: 10, title: "Fund performance tracking", votes: 9, answers: 2, time: "1h ago" },
      { id: 11, title: "Regulatory compliance updates", votes: 13, answers: 5, time: "4h ago" }
    ]},
    { name: 'General', icon: '🌐', count: 42, questions: [
      { id: 12, title: "Office 365 migration timeline?", votes: 25, answers: 9, time: "45m ago" },
      { id: 13, title: "New employee onboarding process", votes: 18, answers: 6, time: "2h ago" }
    ]}
  ];

  const hotQuestions = [
    { id: 1, title: "How do I migrate from legacy system?", votes: 23, answers: 5, tags: ['migration', 'tech'], author: "Sarah M.", time: "2h ago" },
    { id: 2, title: "Best practices for client onboarding?", votes: 18, answers: 3, tags: ['process', 'client'], author: "Mike R.", time: "4h ago" },
    { id: 3, title: "Repository access issues", votes: 15, answers: 7, tags: ['access', 'repo'], author: "Alex K.", time: "1d ago" },
    { id: 4, title: "API rate limiting strategies", votes: 12, answers: 4, tags: ['api', 'performance'], author: "Lisa T.", time: "3h ago" },
    { id: 5, title: "Compliance workflow automation", votes: 20, answers: 6, tags: ['compliance', 'automation'], author: "David P.", time: "5h ago" }
  ];

  const communities = [
    { 
      name: 'DevOps', 
      members: 156, 
      posts: 89, 
      type: 'Technical',
      description: 'CI/CD, infrastructure, and deployment discussions',
      recentPosts: [
        { title: "Kubernetes deployment best practices", author: "John D.", replies: 12, time: "2h ago" },
        { title: "Azure DevOps pipeline optimization", author: "Emma S.", replies: 8, time: "4h ago" },
        { title: "Docker container security", author: "Carlos M.", replies: 15, time: "1d ago" }
      ]
    },
    { 
      name: 'Process Improvement', 
      members: 203, 
      posts: 134, 
      type: 'Business',
      description: 'Streamlining workflows and operational efficiency',
      recentPosts: [
        { title: "Automating client onboarding", author: "Maria L.", replies: 18, time: "1h ago" },
        { title: "Reducing manual reporting tasks", author: "Steve W.", replies: 22, time: "3h ago" },
        { title: "Cross-team collaboration tools", author: "Nina P.", replies: 9, time: "6h ago" }
      ]
    },
    { 
      name: 'New Joiners', 
      members: 67, 
      posts: 45, 
      type: 'General',
      description: 'Support and guidance for new team members',
      recentPosts: [
        { title: "First week survival guide", author: "Tom H.", replies: 25, time: "30m ago" },
        { title: "Understanding UBS systems", author: "Rachel K.", replies: 14, time: "2h ago" },
        { title: "Networking tips for newcomers", author: "James F.", replies: 11, time: "5h ago" }
      ]
    }
  ];

  const projects = [
    { name: "Client Portal Redesign", status: "In Progress", progress: 65, team: "UI/UX Team", deadline: "Q2 2025" },
    { name: "API Gateway Migration", status: "Planning", progress: 20, team: "Backend Team", deadline: "Q3 2025" },
    { name: "Compliance Dashboard", status: "Testing", progress: 85, team: "Compliance Tech", deadline: "Q1 2025" },
    { name: "Mobile App V2", status: "In Progress", progress: 45, team: "Mobile Team", deadline: "Q2 2025" }
  ];

  const commonErrors = [
    { id: 28, title: 'Repository Migration', status: 'unresolved', votes: 12, description: 'Issues with migrating legacy repositories to new system', solutions: 3 },
    { id: 25, title: 'Init Setup', status: 'resolved', votes: 8, description: 'Initial setup configuration problems', solutions: 5 },
    { id: 31, title: 'Authentication Timeout', status: 'investigating', votes: 18, description: 'Users experiencing timeout issues during login', solutions: 2 },
    { id: 19, title: 'Database Connection', status: 'resolved', votes: 22, description: 'Connection pool exhaustion in production', solutions: 7 }
  ];

  // Navigation functions
  const goToHome = () => {
    setCurrentPage('home');
    setSelectedDivision(null);
  };

  const goToDivision = (division) => {
    setSelectedDivision(division);
    setCurrentPage('division');
  };

  const goToSection = (section) => {
    setCurrentPage(section);
  };

  // Render different pages
  const renderHomePage = () => (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {divisions.map((division, index) => (
          <div 
            key={index}
            onClick={() => goToDivision(division)}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer border hover:border-blue-300"
          >
            <div className="text-center mb-4">
              <div className="text-4xl mb-3">{division.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{division.name}</h3>
              <div className="text-sm text-gray-600">{division.count} active questions</div>
            </div>
            
            <div className="space-y-3 mt-4">
              <h4 className="font-medium text-sm text-gray-700">Recent Questions:</h4>
              {division.questions.slice(0, 3).map(question => (
                <div key={question.id} className="p-3 bg-gray-50 rounded text-sm">
                  <div className="font-medium text-gray-800 mb-1">{question.title}</div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>{question.votes} votes • {question.answers} answers</span>
                    <span>{question.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDivisionPage = () => (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Projects Card */}
        <div 
          onClick={() => goToSection('projects')}
          className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer border hover:border-blue-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-blue-600" />
            <h3 className="font-semibold text-lg">Projects</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">Active projects and initiatives</p>
          <div className="text-2xl font-bold text-blue-600">{projects.length}</div>
          <div className="text-sm text-gray-500">Active projects</div>
        </div>

        {/* Communities Card */}
        <div 
          onClick={() => goToSection('communities')}
          className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer border hover:border-green-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-green-600" />
            <h3 className="font-semibold text-lg">Communities</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">Join discussions and share knowledge</p>
          <div className="text-2xl font-bold text-green-600">{communities.length}</div>
          <div className="text-sm text-gray-500">Active communities</div>
        </div>

        {/* Hot Questions Card */}
        <div 
          onClick={() => goToSection('hotQuestions')}
          className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer border hover:border-orange-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-orange-600" />
            <h3 className="font-semibold text-lg">Hot Questions</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">Trending questions and discussions</p>
          <div className="text-2xl font-bold text-orange-600">{hotQuestions.length}</div>
          <div className="text-sm text-gray-500">Trending now</div>
        </div>
      </div>

      {/* Quick Preview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div 
          onClick={() => goToSection('commonErrors')}
          className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer border hover:border-red-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <MessageCircle className="w-6 h-6 text-red-600" />
            <h3 className="font-semibold text-lg">Common Errors (AI)</h3>
          </div>
          <div className="space-y-3">
            {commonErrors.slice(0, 2).map(error => (
              <div key={error.id} className="p-3 bg-gray-50 rounded">
                <div className="font-medium text-sm">#{error.id} {error.title}</div>
                <div className="text-xs text-gray-600 mt-1">{error.votes} votes • {error.solutions} solutions</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-semibold text-lg mb-4">Quick Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded">
              <div className="text-2xl font-bold text-blue-600">156</div>
              <div className="text-sm text-gray-600">Total Members</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded">
              <div className="text-2xl font-bold text-green-600">89</div>
              <div className="text-sm text-gray-600">Active Posts</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCommunitiesPage = () => (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Communities</h2>
        <p className="text-gray-600">Connect with colleagues and share knowledge across different areas</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {communities.map((community, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg text-gray-900">{community.name}</h3>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{community.type}</span>
              </div>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Join</button>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">{community.description}</p>
            
            <div className="flex gap-4 text-sm text-gray-600 mb-4">
              <span>{community.members} members</span>
              <span>{community.posts} posts</span>
            </div>
            
            <div>
              <h4 className="font-medium text-sm text-gray-700 mb-2">Recent Posts:</h4>
              <div className="space-y-2">
                {community.recentPosts.map((post, j) => (
                  <div key={j} className="text-xs bg-gray-50 p-2 rounded">
                    <div className="font-medium">{post.title}</div>
                    <div className="text-gray-600 mt-1">by {post.author} • {post.replies} replies • {post.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderHotQuestionsPage = () => (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Hot Questions</h2>
        <p className="text-gray-600">Trending questions across all divisions</p>
      </div>
      
      <div className="space-y-4">
        {hotQuestions.map(question => (
          <div key={question.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center gap-2">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <ThumbsUp className="w-4 h-4 text-gray-600" />
                </button>
                <span className="font-medium text-lg">{question.votes}</span>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <ThumbsUp className="w-4 h-4 text-gray-600 rotate-180" />
                </button>
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{question.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span>by {question.author}</span>
                  <span>{question.time}</span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    {question.answers} answers
                  </span>
                </div>
                <div className="flex gap-2">
                  {question.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProjectsPage = () => (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Projects</h2>
        <p className="text-gray-600">Track active projects and initiatives</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-lg text-gray-900">{project.name}</h3>
              <span className={`text-xs px-2 py-1 rounded ${
                project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                project.status === 'Testing' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {project.status}
              </span>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Team:</span>
                <div className="font-medium">{project.team}</div>
              </div>
              <div>
                <span className="text-gray-600">Deadline:</span>
                <div className="font-medium">{project.deadline}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCommonErrorsPage = () => (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Common Errors (AI)</h2>
        <p className="text-gray-600">AI-powered error tracking and solutions</p>
      </div>
      
      <div className="space-y-4">
        {commonErrors.map(error => (
          <div key={error.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900">#{error.id} {error.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{error.description}</p>
              </div>
              <span className={`text-xs px-3 py-1 rounded ml-4 ${
                error.status === 'resolved' ? 'bg-green-100 text-green-800' :
                error.status === 'investigating' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {error.status}
              </span>
            </div>
            
            <div className="flex gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <ThumbsUp className="w-4 h-4" />
                {error.votes} votes
              </span>
              <span>{error.solutions} solutions</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={goToHome}
                className="text-2xl font-bold text-gray-900 hover:text-blue-600"
              >
                UBS Ask
              </button>
              {currentPage !== 'home' && (
                <>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                  {selectedDivision && currentPage === 'division' && (
                    <span className="font-medium text-gray-700">{selectedDivision.name}</span>
                  )}
                  {selectedDivision && currentPage !== 'division' && (
                    <>
                      <button 
                        onClick={() => goToDivision(selectedDivision)}
                        className="font-medium text-gray-700 hover:text-blue-600"
                      >
                        {selectedDivision.name}
                      </button>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-700 capitalize">{currentPage.replace(/([A-Z])/g, ' $1').trim()}</span>
                    </>
                  )}
                </>
              )}
            </div>
            <div className="flex items-center gap-4">
              {currentPage !== 'home' && (
                <button 
                  onClick={() => currentPage === 'division' ? goToHome() : goToDivision(selectedDivision)}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              )}
              <User className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              CREATE
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Content */}
      {currentPage === 'home' && renderHomePage()}
      {currentPage === 'division' && renderDivisionPage()}
      {currentPage === 'communities' && renderCommunitiesPage()}
      {currentPage === 'hotQuestions' && renderHotQuestionsPage()}
      {currentPage === 'projects' && renderProjectsPage()}
      {currentPage === 'commonErrors' && renderCommonErrorsPage()}
    </div>
  );
};

export default UBSAskPlatform;