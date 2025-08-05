import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { Search, Plus, User, ArrowLeft, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import './App.css';

// Add Source Sans Pro font
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700;900&display=swap';
document.head.appendChild(link);

const UBSLogo = () => (
  <div style={{width: 40, height: 40, background: '#d00000', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 16}}>
    {/* Placeholder for UBS logo, replace with <img src="/path/to/logo.png" ... /> */}
    <span style={{color: '#fff', fontWeight: 900, fontSize: 22}}>UBS</span>
  </div>
);

const divisions = [
  { name: 'Group Functions', key: 'group-functions', icon: '🏢', count: 24, desc: 'Client Portfolio', teams: ['Finance', 'HR', 'Risk', 'Legal'], questions: [
    { id: 1, title: "How to handle large client portfolios?", votes: 15, answers: 3, time: "2h ago" },
    { id: 2, title: "Best practices for quarterly reviews?", votes: 8, answers: 5, time: "4h ago" },
    { id: 3, title: "Compliance workflow questions", votes: 12, answers: 2, time: "1d ago" }
  ]},
  { name: 'IB Tech', key: 'ib-tech', icon: '💻', count: 18, desc: 'Tech & APIs', teams: ['API Team', 'DevOps', 'Backend', 'Frontend'], questions: [
    { id: 4, title: "API integration with legacy systems?", votes: 23, answers: 7, time: "1h ago" },
    { id: 5, title: "Docker deployment issues", votes: 11, answers: 4, time: "3h ago" },
    { id: 6, title: "Database migration strategies", votes: 19, answers: 6, time: "5h ago" }
  ]},
  { name: 'WMA', key: 'wma', icon: '📊', count: 31, desc: 'Wealth Management', teams: ['Advisory', 'Portfolio', 'Client Services'], questions: [
    { id: 7, title: "Portfolio risk assessment tools?", votes: 17, answers: 4, time: "30m ago" },
    { id: 8, title: "Client reporting automation", votes: 14, answers: 3, time: "2h ago" },
    { id: 9, title: "Market analysis frameworks", votes: 21, answers: 8, time: "6h ago" }
  ]},
  { name: 'Asset Management', key: 'asset-management', icon: '💼', count: 15, desc: 'Funds & Assets', teams: ['Equities', 'Fixed Income', 'Real Estate'], questions: [
    { id: 10, title: "Fund performance tracking", votes: 9, answers: 2, time: "1h ago" },
    { id: 11, title: "Regulatory compliance updates", votes: 13, answers: 5, time: "4h ago" }
  ]},
  { name: 'General', key: 'general', icon: '🌐', count: 42, desc: 'General Questions', teams: ['DevOps (General)', 'Support', 'Other'], questions: [
    { id: 12, title: "Office 365 migration timeline?", votes: 25, answers: 9, time: "45m ago" },
    { id: 13, title: "New employee onboarding process", votes: 18, answers: 6, time: "2h ago" }
  ]}
];

// Muted pastel rainbow color palette for tags
const tagColors = [
  '#f8bcbc', // muted red
  '#ffd8b0', // muted orange
  '#fff9b0', // muted yellow
  '#c8e6c9', // muted green
  '#b3d8f8', // muted blue
  '#d1c4e9', // muted indigo
  '#f3c6e8', // muted violet
];
function getTagColor(tag) {
  // Simple hash for color assignment
  let hash = 0;
  for (let i = 0; i < tag.length; i++) hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  return tagColors[Math.abs(hash) % tagColors.length];
}

// Add solid (vibrant) rainbow colors for selected tags
const solidTagColors = [
  '#d00000', // solid red
  '#ff7f00', // solid orange
  '#ffe100', // solid yellow
  '#00b300', // solid green
  '#0070c0', // solid blue
  '#6f42c1', // solid indigo
  '#c2185b', // solid violet
];
function getSolidTagColor(tag) {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  return solidTagColors[Math.abs(hash) % solidTagColors.length];
}

// Add multiple tags to all data
const projects = [
  { id: 1, name: 'Project X', desc: 'Refer to previous', status: 'Active', tags: ['Migration', 'Compliance'] },
  { id: 2, name: 'Project Y', desc: 'Refer to previous', status: 'Planning', tags: ['Compliance', 'Setup'] }
];
const communities = [
  { id: 1, name: 'DevOps', key: 'devops', posts: 2, desc: 'CI/CD, infra, deployment', help: 'This week help...', upvotes: 4, downvotes: 1, tags: ['DevOps', 'Migration'] },
  { id: 2, name: 'Process Improvement', key: 'process', posts: 1, desc: 'Workflow, efficiency', help: 'Need help with...', upvotes: 2, downvotes: 0, tags: ['Process', 'Compliance'] },
  { id: 3, name: 'Frontend', key: 'frontend', posts: 1, desc: 'UI, UX, React', help: 'Need help with...', upvotes: 2, downvotes: 0, tags: ['Frontend', 'Setup'] },
  { id: 4, name: 'Backend', key: 'backend', posts: 1, desc: 'Node, APIs, DB', help: 'Need help with...', upvotes: 2, downvotes: 0, tags: ['Backend', 'Migration'] }
];
const errors = [
  { id: 38, title: 'Repository Migration', status: 'unresolved', tags: ['Migration', 'Setup'] },
  { id: 25, title: 'Init setup', status: 'mistake', tags: ['Setup'] }
];
// Add more questions to hotQuestions with AI answers
const hotQuestions = [
  { id: 1, title: 'How do I migrate from legacy system?', votes: 23, answers: 5, tags: ['Migration', 'Tech'], author: 'Sarah M.', time: '2h ago', resolved: false, aiAnswer: 'Based on our migration patterns, I recommend using the incremental migration approach. Start with non-critical systems, then gradually move core functions. Use the migration toolkit available in our internal repository.' },
  { id: 2, title: 'Best practices for client onboarding?', votes: 18, answers: 3, tags: ['Onboarding', 'Process'], author: 'Mike R.', time: '4h ago', resolved: true, aiAnswer: 'Follow the 3-step onboarding process: 1) Initial setup with compliance checks, 2) Portfolio configuration and risk assessment, 3) Client training and documentation. Use the automated onboarding workflow in the client portal.' },
  { id: 3, title: 'How to handle large client portfolios?', votes: 15, answers: 3, tags: ['Migration', 'Compliance'], author: 'Alice T.', time: '2h ago', resolved: false, aiAnswer: 'For large portfolios, implement batch processing and use the portfolio management tools. Ensure compliance by running automated checks before each batch. Consider using the portfolio optimization algorithm.' },
  { id: 4, title: 'API integration with legacy systems?', votes: 23, answers: 7, tags: ['Tech', 'API'], author: 'John D.', time: '1h ago', resolved: true, aiAnswer: 'Use the API gateway pattern with rate limiting and authentication. Implement the standardized error handling protocol. Reference the API documentation in the developer portal for specific endpoints.' },
  { id: 5, title: 'Docker deployment issues', votes: 11, answers: 4, tags: ['Tech', 'DevOps'], author: 'Priya K.', time: '3h ago', resolved: false, aiAnswer: 'Check the Docker configuration in the deployment pipeline. Common issues include memory limits and network connectivity. Use the troubleshooting guide in the DevOps wiki for specific error codes.' },
  { id: 6, title: 'Database migration strategies', votes: 19, answers: 6, tags: ['Migration', 'Backend'], author: 'Carlos G.', time: '5h ago', resolved: true, aiAnswer: 'Implement blue-green deployment for zero-downtime migrations. Use the database migration toolkit with rollback capabilities. Test thoroughly in staging environment before production.' },
  { id: 7, title: 'Portfolio risk assessment tools?', votes: 17, answers: 4, tags: ['Compliance', 'Risk'], author: 'Emily W.', time: '30m ago', resolved: false, aiAnswer: 'Use the integrated risk assessment platform with real-time monitoring. The system automatically calculates risk scores and generates compliance reports. Access through the risk management dashboard.' },
  { id: 8, title: 'Client reporting automation', votes: 14, answers: 3, tags: ['Process', 'Automation'], author: 'Liam T.', time: '2h ago', resolved: true, aiAnswer: 'Leverage the automated reporting system with customizable templates. Set up scheduled reports and use the data visualization tools. Configure alerts for critical metrics.' },
  { id: 9, title: 'Market analysis frameworks', votes: 21, answers: 8, tags: ['Tech', 'Analysis'], author: 'Olivia F.', time: '6h ago', resolved: false, aiAnswer: 'Use the market analysis toolkit with machine learning models. Implement the standardized analysis framework and leverage historical data patterns. Access through the analytics platform.' },
  { id: 10, title: 'Fund performance tracking', votes: 9, answers: 2, tags: ['Funds', 'Tracking'], author: 'Jane S.', time: '1h ago', resolved: true, aiAnswer: 'Utilize the performance tracking dashboard with real-time metrics. Set up automated alerts for performance thresholds. Use the benchmarking tools for comparison analysis.' },
  { id: 11, title: 'Regulatory compliance updates', votes: 13, answers: 5, tags: ['Compliance', 'Regulatory'], author: 'Mike R.', time: '4h ago', resolved: false, aiAnswer: 'Stay updated through the compliance notification system. Review the regulatory change log and implement required updates. Use the compliance checklist for verification.' },
  { id: 12, title: 'Office 365 migration timeline?', votes: 25, answers: 9, tags: ['Migration', 'Setup'], author: 'Sarah M.', time: '45m ago', resolved: true, aiAnswer: 'Follow the 6-week migration plan: Week 1-2: Planning and preparation, Week 3-4: Pilot migration, Week 5-6: Full rollout. Use the migration checklist and timeline tracker.' },
  { id: 13, title: 'New employee onboarding process', votes: 18, answers: 6, tags: ['Onboarding', 'Process'], author: 'Priya K.', time: '2h ago', resolved: false, aiAnswer: 'Follow the comprehensive onboarding checklist: Day 1: System access and introductions, Week 1: Training modules, Month 1: Mentorship and shadowing. Use the onboarding portal for tracking progress.' },
  { id: 14, title: 'How to automate compliance checks?', votes: 16, answers: 4, tags: ['Compliance', 'Automation'], author: 'Carlos G.', time: '3h ago', resolved: true, aiAnswer: 'Implement automated compliance monitoring using the compliance engine. Set up scheduled checks and configure alert thresholds. Use the compliance dashboard for oversight.' },
  { id: 15, title: 'Best tools for DevOps pipelines?', votes: 20, answers: 7, tags: ['DevOps', 'Tech'], author: 'John D.', time: '1h ago', resolved: false, aiAnswer: 'Use the integrated DevOps platform with CI/CD pipelines. Implement automated testing and deployment strategies. Leverage the monitoring and logging tools for pipeline optimization.' },
  { id: 16, title: 'Frontend performance optimization?', votes: 12, answers: 3, tags: ['Frontend', 'Tech'], author: 'Olivia F.', time: '2h ago', resolved: true, aiAnswer: 'Implement code splitting and lazy loading. Use the performance monitoring tools and optimize bundle sizes. Follow the frontend optimization checklist for best practices.' },
  { id: 17, title: 'Backend API security best practices?', votes: 22, answers: 5, tags: ['Backend', 'API'], author: 'Jane S.', time: '4h ago', resolved: false, aiAnswer: 'Implement OAuth 2.0 authentication and rate limiting. Use HTTPS and input validation. Follow the security checklist and conduct regular security audits.' },
  { id: 18, title: 'How to set up new compliance workflows?', votes: 10, answers: 2, tags: ['Compliance', 'Setup'], author: 'Emily W.', time: '5h ago', resolved: true, aiAnswer: 'Use the workflow builder tool to create custom compliance processes. Configure approval chains and automated notifications. Test workflows in sandbox environment before production.' },
  { id: 19, title: 'Risk management for new projects?', votes: 14, answers: 4, tags: ['Risk', 'Process'], author: 'Liam T.', time: '1h ago', resolved: false, aiAnswer: 'Conduct risk assessment using the risk management framework. Identify and mitigate potential risks early. Use the risk tracking dashboard for ongoing monitoring.' },
  { id: 20, title: 'Automating onboarding with scripts?', votes: 17, answers: 6, tags: ['Onboarding', 'Automation'], author: 'Priya K.', time: '2h ago', resolved: true, aiAnswer: 'Use the onboarding automation toolkit with customizable scripts. Implement role-based automation and integrate with HR systems. Monitor automation success rates and optimize processes.' }
];
const allTags = Array.from(new Set([
  ...projects.flatMap(p => p.tags),
  ...communities.flatMap(c => c.tags),
  ...errors.flatMap(e => e.tags),
  ...hotQuestions.flatMap(q => q.tags)
]));

// Placeholder API for posts (simulate real-time updates)
const mockFetchPosts = (divisionKey, channel) => {
  // Simulate posts for each channel
  return [
    { id: 1, content: "Hi, need help...", upvotes: 2, downvotes: 0, resolved: false, author: "Alice", time: "2h ago", replies: [
      { id: 101, author: "Bob", content: "What have you tried so far?", time: "1h ago" },
      { id: 102, author: "Carol", content: "Check the deployment logs.", time: "45m ago" }
    ] },
    { id: 2, content: "How do I deploy to prod?", upvotes: 1, downvotes: 1, resolved: false, author: "Bob", time: "1h ago", replies: [
      { id: 103, author: "Alice", content: "Use the main branch pipeline.", time: "30m ago" }
    ] },
    { id: 3, content: "Resolved: API bug fix", upvotes: 3, downvotes: 0, resolved: true, author: "Carol", time: "30m ago", replies: [] }
  ];
};

function CommunitiesPage() {
  const { divisionKey } = useParams();
  const navigate = useNavigate();
  const division = divisions.find((d) => d.key === divisionKey);
  const [channels] = useState([
    { name: 'DevOps', key: 'devops' },
    { name: 'Process Improvement', key: 'process' },
    { name: 'Frontend', key: 'frontend' },
    { name: 'Backend', key: 'backend' }
  ]);
  const [selectedChannel, setSelectedChannel] = useState('devops');
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [newPost, setNewPost] = useState('');
  const [replyInputs, setReplyInputs] = useState({});

  // Simulate periodic updates (polling)
  useEffect(() => {
    const fetchPosts = () => {
      setPosts(mockFetchPosts(divisionKey, selectedChannel));
    };
    fetchPosts();
    const interval = setInterval(fetchPosts, 5000); // Poll every 5s
    return () => clearInterval(interval);
  }, [divisionKey, selectedChannel]);

  const handleAddPost = () => {
    if (newPost.trim()) {
      setPosts([{ id: Date.now(), content: newPost, upvotes: 0, downvotes: 0, resolved: false, author: "You", time: "now", replies: [] }, ...posts]);
      setNewPost('');
    }
  };
  const handleUpvote = (id) => setPosts(posts.map(p => p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p));
  const handleDownvote = (id) => setPosts(posts.map(p => p.id === id ? { ...p, downvotes: p.downvotes + 1 } : p));
  const handleResolve = (id) => setPosts(posts.map(p => p.id === id ? { ...p, resolved: true } : p));
  const handleReplyInput = (postId, value) => setReplyInputs(inputs => ({ ...inputs, [postId]: value }));
  const handleAddReply = (postId) => {
    const replyText = replyInputs[postId]?.trim();
    if (replyText) {
      setPosts(posts.map(p => p.id === postId ? {
        ...p,
        replies: [...(p.replies || []), { id: Date.now(), author: "You", content: replyText, time: "now" }]
      } : p));
      setReplyInputs(inputs => ({ ...inputs, [postId]: '' }));
    }
  };
  const filteredPosts = posts.filter(p => p.content.toLowerCase().includes(search.toLowerCase()));

  if (!division) return <div className="p-10 text-center text-red-600">Division not found.</div>;
  return (
    <div style={{display: 'flex', height: 'calc(100vh - 120px)', background: '#fafbfc', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', margin: '2rem auto', maxWidth: '98vw', width: '100%'}}>
      {/* Sidebar: Channels */}
      <div style={{width: 220, background: '#fff', borderRight: '1.5px solid #eee', borderRadius: '16px 0 0 16px', padding: '1.5rem 0.5rem', display: 'flex', flexDirection: 'column'}}>
        <div style={{fontWeight: 700, fontSize: 18, color: '#d00000', marginBottom: 16, textAlign: 'center'}}>Channels</div>
        {channels.map(ch => (
          <div key={ch.key} onClick={() => setSelectedChannel(ch.key)} style={{padding: '0.75rem 1rem', borderRadius: 8, marginBottom: 6, cursor: 'pointer', background: selectedChannel === ch.key ? '#f5f5f5' : 'none', fontWeight: selectedChannel === ch.key ? 700 : 500, color: selectedChannel === ch.key ? '#d00000' : '#222'}}>
            {ch.name}
          </div>
        ))}
      </div>
      {/* Main: Posts */}
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', padding: '2rem 2rem 1rem 2rem'}}>
        <div style={{display: 'flex', alignItems: 'center', marginBottom: 16}}>
          <div style={{fontWeight: 800, fontSize: 24, color: '#111', flex: 1}}>{channels.find(c => c.key === selectedChannel)?.name}</div>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search posts..." style={{border: '1px solid #eee', borderRadius: 8, padding: '0.4rem 1rem', marginRight: 12}} />
          <button style={{background: '#d00000', color: '#fff', border: 'none', borderRadius: 8, padding: '0.4rem 1.2rem', fontWeight: 700, marginRight: 12}} onClick={handleAddPost}>Create</button>
          <div className="ubs-navbar-user" style={{marginLeft: 0}}><User /></div>
        </div>
        <div style={{marginBottom: 16}}>
          <input value={newPost} onChange={e => setNewPost(e.target.value)} placeholder="Add a new post..." style={{width: '100%', border: '1.5px solid #eee', borderRadius: 8, padding: '0.6rem 1rem', marginBottom: 8}} />
        </div>
        <div style={{overflowY: 'auto', flex: 1}}>
          {filteredPosts.map(post => (
            <div key={post.id} style={{background: '#fff', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.03)', marginBottom: 16, padding: '1rem 1.5rem', display: 'flex', alignItems: 'flex-start', gap: 16, borderLeft: post.resolved ? '4px solid #d00000' : '4px solid #eee'}}>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 8}}>
                <button className="ubs-upvote" onClick={() => handleUpvote(post.id)}><ThumbsUp /></button>
                <span style={{fontWeight: 700, color: '#d00000', fontSize: 16}}>{post.upvotes}</span>
                <button className="ubs-downvote" onClick={() => handleDownvote(post.id)}><ThumbsDown /></button>
              </div>
              <div style={{flex: 1}}>
                <div style={{fontWeight: 600, fontSize: 16, color: post.resolved ? '#888' : '#111', textDecoration: post.resolved ? 'line-through' : 'none'}}>{post.content}</div>
                <div style={{fontSize: 13, color: '#888', marginTop: 2}}>{post.author} &middot; {post.time}</div>
                <div style={{marginTop: 8, display: 'flex', gap: 8}}>
                  {!post.resolved && <button onClick={() => handleResolve(post.id)} style={{background: '#d00000', color: '#fff', border: 'none', borderRadius: 8, padding: '2px 12px', fontWeight: 600, cursor: 'pointer'}}>Resolve</button>}
                  {post.resolved && <span style={{color: '#d00000', fontWeight: 700}}>Resolved</span>}
                </div>
                {/* Replies */}
                <div style={{marginTop: 16, marginLeft: 8}}>
                  {post.replies && post.replies.length > 0 && (
                    <div style={{marginBottom: 6, fontWeight: 600, color: '#d00000'}}>Replies</div>
                  )}
                  {post.replies && post.replies.map(reply => (
                    <div key={reply.id} style={{background: '#fafbfc', borderRadius: 8, padding: '0.5rem 1rem', marginBottom: 6, fontSize: 14}}>
                      <span style={{fontWeight: 600, color: '#222'}}>{reply.author}:</span> {reply.content}
                      <span style={{color: '#888', fontSize: 12, marginLeft: 8}}>{reply.time}</span>
                    </div>
                  ))}
                  {/* Add reply input */}
                  <div style={{display: 'flex', gap: 8, marginTop: 8}}>
                    <input
                      value={replyInputs[post.id] || ''}
                      onChange={e => handleReplyInput(post.id, e.target.value)}
                      placeholder="Reply..."
                      style={{flex: 1, border: '1px solid #eee', borderRadius: 8, padding: '0.3rem 0.8rem', fontSize: 14}}
                    />
                    <button onClick={() => handleAddReply(post.id)} style={{background: '#d00000', color: '#fff', border: 'none', borderRadius: 8, padding: '0.3rem 1rem', fontWeight: 600, fontSize: 14}}>Reply</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <header style={{padding: '2rem 0 1.5rem 0', borderBottom: '2px solid #e5e5e5', background: '#fff'}}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 900, margin: '0 auto'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8}}>
          <UBSLogo />
          <Link to="/" style={{textDecoration: 'none'}}>
            <div className="ubs-navbar-logo" style={{fontSize: '2.2rem', fontWeight: 900, color: '#111', letterSpacing: 2, display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
              UBS <span style={{fontWeight: 400, color: '#111', marginLeft: 8}}>ask</span>
            </div>
          </Link>
          <div className="ubs-navbar-user" style={{marginLeft: 32}}>
            <User />
          </div>
        </div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: 600, marginTop: 16}}>
          <div className="ubs-navbar-search" style={{flex: 1, margin: 0, display: 'flex', alignItems: 'center'}}>
            <Search style={{marginRight: 8, color: '#888'}} />
            <input placeholder="Search..." style={{width: '100%'}} />
          </div>
          <Link to="/create-question" style={{textDecoration: 'none'}}>
            <button className="ubs-navbar-create" style={{marginLeft: 16}}>
              <Plus style={{marginRight: 6, marginBottom: -2}} />CREATE
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}

function DivisionGrid() {
  return (
    <div className="ubs-division-grid" style={{minHeight: 'calc(100vh - 64px - 4rem)'}}>
      {divisions.map((division) => (
        <Link key={division.key} to={`/division/${division.key}`} className="ubs-division-card" style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '400px'}}>
          <div>
            <div className="ubs-division-card-icon">{division.icon}</div>
            <div className="ubs-division-card-title">{division.name}</div>
            <div className="ubs-division-card-count">{division.count} Questions</div>
            <div className="ubs-division-card-desc">{division.desc}</div>
          </div>
          <div style={{marginTop: 16}}>
            <div style={{fontWeight: 600, color: '#d00000', fontSize: '1rem', marginBottom: 4}}>Teams</div>
            <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
              {division.teams.map((team) => (
                <li key={team} style={{color: '#222', fontSize: '0.98rem', marginBottom: 2}}>{team}</li>
              ))}
            </ul>
          </div>
        </Link>
      ))}
    </div>
  );
}

function CommunityPage() {
  const { divisionKey, communityKey } = useParams();
  const navigate = useNavigate();
  const division = divisions.find((d) => d.key === divisionKey);
  const community = (division && communities.find(c => c.key === communityKey)) || null;
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [newPost, setNewPost] = useState('');
  const [replyInputs, setReplyInputs] = useState({});

  useEffect(() => {
    setPosts(mockFetchPosts(divisionKey, communityKey));
    const interval = setInterval(() => setPosts(mockFetchPosts(divisionKey, communityKey)), 5000);
    return () => clearInterval(interval);
  }, [divisionKey, communityKey]);

  const handleAddPost = () => {
    if (newPost.trim()) {
      setPosts([{ id: Date.now(), content: newPost, upvotes: 0, downvotes: 0, resolved: false, author: "You", time: "now", replies: [] }, ...posts]);
      setNewPost('');
    }
  };
  const handleUpvote = (id) => setPosts(posts.map(p => p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p));
  const handleDownvote = (id) => setPosts(posts.map(p => p.id === id ? { ...p, downvotes: p.downvotes + 1 } : p));
  const handleResolve = (id) => setPosts(posts.map(p => p.id === id ? { ...p, resolved: true } : p));
  const handleReplyInput = (postId, value) => setReplyInputs(inputs => ({ ...inputs, [postId]: value }));
  const handleAddReply = (postId) => {
    const replyText = replyInputs[postId]?.trim();
    if (replyText) {
      setPosts(posts.map(p => p.id === postId ? {
        ...p,
        replies: [...(p.replies || []), { id: Date.now(), author: "You", content: replyText, time: "now" }]
      } : p));
      setReplyInputs(inputs => ({ ...inputs, [postId]: '' }));
    }
  };
  const filteredPosts = posts.filter(p => p.content.toLowerCase().includes(search.toLowerCase()));

  if (!division || !community) return <div className="p-10 text-center text-red-600">Community not found.</div>;
  return (
    <div style={{maxWidth: '98vw', width: '100%', margin: '2rem auto', display: 'flex', flexDirection: 'row', gap: 32, alignItems: 'flex-start'}}>
      {/* Sidebar: Only the selected community */}
      <div style={{width: 220, background: '#fff', borderRight: '1.5px solid #eee', borderRadius: '16px 0 0 16px', padding: '1.5rem 0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
        <button onClick={() => navigate(-1)} style={{background: 'none', border: 'none', color: '#d00000', fontWeight: 700, marginBottom: 24, cursor: 'pointer', display: 'flex', alignItems: 'center'}}>
          <ArrowLeft style={{marginRight: 6}} /> Back
        </button>
        <div style={{fontWeight: 700, fontSize: 20, color: '#d00000', marginBottom: 8}}>{community.name}</div>
        <div style={{color: '#888', fontSize: 14, marginBottom: 8}}>{community.desc}</div>
      </div>
      {/* Main: Posts */}
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', padding: '2rem 2rem 1rem 2rem'}}>
        <div style={{display: 'flex', alignItems: 'center', marginBottom: 16}}>
          <div style={{fontWeight: 800, fontSize: 24, color: '#111', flex: 1}}>{community.name}</div>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search posts..." style={{border: '1px solid #eee', borderRadius: 8, padding: '0.4rem 1rem', marginRight: 12}} />
          <button style={{background: '#d00000', color: '#fff', border: 'none', borderRadius: 8, padding: '0.4rem 1.2rem', fontWeight: 700, marginRight: 12}} onClick={handleAddPost}>Create</button>
          <div className="ubs-navbar-user" style={{marginLeft: 0}}><User /></div>
        </div>
        <div style={{marginBottom: 16}}>
          <input value={newPost} onChange={e => setNewPost(e.target.value)} placeholder="Add a new post..." style={{width: '100%', border: '1.5px solid #eee', borderRadius: 8, padding: '0.6rem 1rem', marginBottom: 8}} />
        </div>
        <div style={{overflowY: 'auto', flex: 1}}>
          {filteredPosts.map(post => (
            <div key={post.id} style={{background: '#fff', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.03)', marginBottom: 16, padding: '1rem 1.5rem', display: 'flex', alignItems: 'flex-start', gap: 16, borderLeft: post.resolved ? '4px solid #d00000' : '4px solid #eee'}}>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 8}}>
                <button className="ubs-upvote" onClick={() => handleUpvote(post.id)}><ThumbsUp /></button>
                <span style={{fontWeight: 700, color: '#d00000', fontSize: 16}}>{post.upvotes}</span>
                <button className="ubs-downvote" onClick={() => handleDownvote(post.id)}><ThumbsDown /></button>
              </div>
              <div style={{flex: 1}}>
                <div style={{fontWeight: 600, fontSize: 16, color: post.resolved ? '#888' : '#111', textDecoration: post.resolved ? 'line-through' : 'none'}}>{post.content}</div>
                <div style={{fontSize: 13, color: '#888', marginTop: 2}}>{post.author} &middot; {post.time}</div>
                <div style={{marginTop: 8, display: 'flex', gap: 8}}>
                  {!post.resolved && <button onClick={() => handleResolve(post.id)} style={{background: '#d00000', color: '#fff', border: 'none', borderRadius: 8, padding: '2px 12px', fontWeight: 600, cursor: 'pointer'}}>Resolve</button>}
                  {post.resolved && <span style={{color: '#d00000', fontWeight: 700}}>Resolved</span>}
                </div>
                {/* Replies */}
                <div style={{marginTop: 16, marginLeft: 8}}>
                  {post.replies && post.replies.length > 0 && (
                    <div style={{marginBottom: 6, fontWeight: 600, color: '#d00000'}}>Replies</div>
                  )}
                  {post.replies && post.replies.map(reply => (
                    <div key={reply.id} style={{background: '#fafbfc', borderRadius: 8, padding: '0.5rem 1rem', marginBottom: 6, fontSize: 14}}>
                      <span style={{fontWeight: 600, color: '#222'}}>{reply.author}:</span> {reply.content}
                      <span style={{color: '#888', fontSize: 12, marginLeft: 8}}>{reply.time}</span>
                    </div>
                  ))}
                  {/* Add reply input */}
                  <div style={{display: 'flex', gap: 8, marginTop: 8}}>
                    <input
                      value={replyInputs[post.id] || ''}
                      onChange={e => handleReplyInput(post.id, e.target.value)}
                      placeholder="Reply..."
                      style={{flex: 1, border: '1px solid #eee', borderRadius: 8, padding: '0.3rem 0.8rem', fontSize: 14}}
                    />
                    <button onClick={() => handleAddReply(post.id)} style={{background: '#d00000', color: '#fff', border: 'none', borderRadius: 8, padding: '0.3rem 1rem', fontWeight: 600, fontSize: 14}}>Reply</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Filtering logic for all content types
function filterByTag(items, tag) {
  if (!tag) return items;
  return items.filter(item => Array.isArray(item.tags) && item.tags.includes(tag));
}

// Update Home to filter and display tags
function Home({ tagFilter, setTagFilter, tagSearch, setTagSearch, filteredTags }) {
  // No projects/communities/errors on home, just division grid, so no filter needed here
  return (
    <div className="ubs-main-bg" style={{maxWidth: 1200, margin: '2rem auto', padding: '0 1rem'}}>
      <DivisionGrid />
    </div>
  );
}

// Update DivisionPage to filter and display tags
function TagSection({ tagFilter, setTagFilter, tagSearch, setTagSearch, filteredTags }) {
  return (
    <div className="ubs-section">
      <div className="ubs-section-title">Tags</div>
      <input
        value={tagSearch}
        onChange={e => setTagSearch(e.target.value)}
        placeholder="Search tags..."
        style={{width: '100%', border: '1.5px solid #eee', borderRadius: 8, padding: '0.4rem 1rem', marginBottom: 10}}
      />
      <div style={{marginBottom: 16, display: 'flex', flexWrap: 'wrap', gap: 6}}>
        {filteredTags.map(tag => (
          <span
            key={tag}
            className="ubs-tag"
            style={{background: tagFilter === tag ? getSolidTagColor(tag) : getTagColor(tag), color: tagFilter === tag ? '#fff' : getTagColor(tag) === '#fff' ? '#d00000' : '#fff', cursor: 'pointer', border: tagFilter === tag ? '2px solid #111' : 'none', fontSize: '0.85rem', padding: '0.15rem 0.7rem'}}
            onClick={() => setTagFilter(tagFilter === tag ? '' : tag)}
          >
            {tag}
          </span>
        ))}
        {tagFilter && (
          <button onClick={() => setTagFilter('')} style={{marginLeft: 8, background: '#fff', color: '#d00000', border: '1.5px solid #d00000', borderRadius: 8, padding: '0.1rem 0.7rem', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem'}}>Clear</button>
        )}
      </div>
    </div>
  );
}

function DivisionPage({ tagFilter, setTagFilter, tagSearch, setTagSearch, filteredTags }) {
  const { divisionKey } = useParams();
  const navigate = useNavigate();
  const division = divisions.find((d) => d.key === divisionKey);
  if (!division) return <div className="p-10 text-center text-red-600">Division not found.</div>;
  // Filtered data
  const filteredProjects = filterByTag(projects, tagFilter);
  const filteredCommunities = filterByTag(communities, tagFilter);
  const filteredErrors = filterByTag(errors, tagFilter);
  const filteredQuestions = filterByTag(hotQuestions, tagFilter);
  return (
    <div className="ubs-main-bg" style={{maxWidth: 1200, margin: '2rem auto', padding: '0 1rem'}}>
      <button onClick={() => navigate(-1)} style={{background: 'none', border: 'none', color: '#d00000', fontWeight: 700, marginBottom: 16, cursor: 'pointer', display: 'flex', alignItems: 'center'}}>
        <ArrowLeft style={{marginRight: 6}} /> Back to Divisions
      </button>
      <div style={{display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24}}>
        <div className="ubs-division-card-icon">{division.icon}</div>
        <h1 style={{fontSize: '2rem', fontWeight: 800, color: '#111'}}>{division.name}</h1>
      </div>
      <div style={{display: 'flex', gap: 24, marginBottom: 24, alignItems: 'center', justifyContent: 'space-between'}}>
        <span style={{fontWeight: 700, color: '#d00000', fontSize: 18, borderBottom: '2.5px solid #d00000', padding: '0.5rem 1.5rem'}}>Overview</span>
        <Link to="/create-question" style={{textDecoration: 'none'}}>
          <button style={{background: '#d00000', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1.5rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6}}>
            <Plus style={{width: 16, height: 16}} /> Create Question
          </button>
        </Link>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: divisionKey === 'general' ? '1fr' : '2fr 1fr', gap: 32}}>
        <div>
          {divisionKey !== 'general' && (
            <>
              <div className="ubs-section">
                <div className="ubs-section-title">Projects</div>
                {filteredProjects.map((p) => (
                  <div key={p.id} className="ubs-card" style={{marginBottom: 12, cursor: 'pointer'}} onClick={() => navigate(`/project/${p.id}`)}>
                    <div style={{fontWeight: 700, color: '#111'}}>{p.name}</div>
                    <div style={{color: '#888', fontSize: 14}}>{p.desc}</div>
                    <div style={{color: '#d00000', fontWeight: 600, fontSize: 13, marginTop: 4}}>{p.status}</div>
                    <div style={{marginTop: 6, display: 'flex', gap: 6}}>
                      {p.tags.map(tag => (
                        <span key={tag} className="ubs-tag" style={{background: getTagColor(tag), color: getTagColor(tag) === '#fff' ? '#d00000' : '#fff', fontSize: '0.85rem', padding: '0.15rem 0.7rem'}}>{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
                {filteredProjects.length === 0 && <div style={{color: '#888', fontSize: 14}}>No projects for this tag.</div>}
              </div>
              <div className="ubs-section">
                <div className="ubs-section-title">Communities</div>
                {filteredCommunities.map((c) => (
                  <Link to={`/division/${divisionKey}/community/${c.key}`} key={c.key} className="ubs-community-card" style={{textDecoration: 'none', color: 'inherit', cursor: 'pointer'}}>
                    <div className="ubs-community-card-title">{c.name}</div>
                    <div className="ubs-community-card-meta">{c.desc}</div>
                    <div style={{fontSize: 13, color: '#d00000', marginBottom: 4}}>{c.help}</div>
                    <div style={{marginTop: 6, display: 'flex', gap: 6}}>
                      {c.tags.map(tag => (
                        <span key={tag} className="ubs-tag" style={{background: getTagColor(tag), color: getTagColor(tag) === '#fff' ? '#d00000' : '#fff', fontSize: '0.85rem', padding: '0.15rem 0.7rem'}}>{tag}</span>
                      ))}
                    </div>
                    <div className="ubs-community-card-actions">
                      <span className="ubs-upvote"><ThumbsUp /> {c.upvotes}</span>
                      <span className="ubs-downvote"><ThumbsDown /> {c.downvotes}</span>
                      <button style={{background: '#d00000', color: '#fff', border: 'none', borderRadius: 8, padding: '2px 12px', fontWeight: 600, cursor: 'pointer'}}>Add Post</button>
                    </div>
                  </Link>
                ))}
                {filteredCommunities.length === 0 && <div style={{color: '#888', fontSize: 14}}>No communities for this tag.</div>}
              </div>
            </>
          )}
          <div className="ubs-section">
            <div className="ubs-section-title">Common Errors (AI)</div>
            {filteredErrors.map((e) => (
              <div key={e.id} className="ubs-error-card" style={{cursor: 'pointer'}} onClick={() => navigate(`/error/${e.id}`)}>
                <div className="ubs-error-title">{e.title}</div>
                <div className="ubs-error-meta">Error #{e.id} &middot; {e.status}</div>
                <div style={{marginTop: 6, display: 'flex', gap: 6}}>
                  {e.tags.map(tag => (
                    <span key={tag} className="ubs-tag" style={{background: getTagColor(tag), color: getTagColor(tag) === '#fff' ? '#d00000' : '#fff', fontSize: '0.85rem', padding: '0.15rem 0.7rem'}}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
            {filteredErrors.length === 0 && <div style={{color: '#888', fontSize: 14}}>No errors for this tag.</div>}
          </div>
        </div>
        {divisionKey !== 'general' && (
          <div>
            <TagSection tagFilter={tagFilter} setTagFilter={setTagFilter} tagSearch={tagSearch} setTagSearch={setTagSearch} filteredTags={filteredTags} />
            <div className="ubs-section">
              <div className="ubs-section-title">Hot Questions</div>
              {filteredQuestions.map((q) => (
                <div key={q.id} className="ubs-hot-question" style={{cursor: 'pointer'}} onClick={() => navigate(`/question/${q.id}`)}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4}}>
                    <div style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: q.resolved ? '#00b300' : '#d00000',
                      flexShrink: 0
                    }}></div>
                    <div className="ubs-hot-question-title">{q.title}</div>
                  </div>
                  <div className="ubs-hot-question-meta">by {q.author} &middot; {q.time}</div>
                  <div style={{display: 'flex', gap: 12, fontSize: 14, marginBottom: 4}}>
                    <span className="ubs-upvote"><ThumbsUp /> {q.votes}</span>
                    <span className="ubs-downvote"><ThumbsDown /> 0</span>
                    <span style={{color: '#d00000', fontWeight: 600}}><MessageSquare style={{marginRight: 2}} />{q.answers} answers</span>
                  </div>
                  <div style={{marginTop: 6, display: 'flex', gap: 6}}>
                    {q.tags.map(tag => (
                      <span key={tag} className="ubs-tag" style={{background: getTagColor(tag), color: getTagColor(tag) === '#fff' ? '#d00000' : '#fff', fontSize: '0.85rem', padding: '0.15rem 0.7rem'}}>{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
              {filteredQuestions.length === 0 && <div style={{color: '#888', fontSize: 14}}>No questions for this tag.</div>}
            </div>
          </div>
        )}
        {divisionKey === 'general' && (
          <div>
            <TagSection tagFilter={tagFilter} setTagFilter={setTagFilter} tagSearch={tagSearch} setTagSearch={setTagSearch} filteredTags={filteredTags} />
            <div className="ubs-section">
              <div className="ubs-section-title">Hot Questions</div>
              {filteredQuestions.map((q) => (
                <div key={q.id} className="ubs-hot-question" style={{cursor: 'pointer'}} onClick={() => navigate(`/question/${q.id}`)}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4}}>
                    <div style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: q.resolved ? '#00b300' : '#d00000',
                      flexShrink: 0
                    }}></div>
                    <div className="ubs-hot-question-title">{q.title}</div>
                  </div>
                  <div className="ubs-hot-question-meta">by {q.author} &middot; {q.time}</div>
                  <div style={{display: 'flex', gap: 12, fontSize: 14, marginBottom: 4}}>
                    <span className="ubs-upvote"><ThumbsUp /> {q.votes}</span>
                    <span className="ubs-downvote"><ThumbsDown /> 0</span>
                    <span style={{color: '#d00000', fontWeight: 600}}><MessageSquare style={{marginRight: 2}} />{q.answers} answers</span>
                  </div>
                  <div style={{marginTop: 6, display: 'flex', gap: 6}}>
                    {q.tags.map(tag => (
                      <span key={tag} className="ubs-tag" style={{background: getTagColor(tag), color: getTagColor(tag) === '#fff' ? '#d00000' : '#fff', fontSize: '0.85rem', padding: '0.15rem 0.7rem'}}>{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
              {filteredQuestions.length === 0 && <div style={{color: '#888', fontSize: 14}}>No questions for this tag.</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- QuestionPage component ---
function QuestionPage() {
  const { questionId } = useParams();
  const navigate = useNavigate();
  // Find the question from hotQuestions (in a real app, fetch from API)
  const questionData = hotQuestions.find(q => q.id === Number(questionId));
  const [question, setQuestion] = useState(questionData);
  const [voteState, setVoteState] = useState(null); // 'up' | 'down' | null

  // Find related communities by matching tags
  const relatedCommunities = communities.filter(c =>
    c.tags.some(tag => question?.tags.includes(tag))
  );

  // More recommended people
  const recommendedPeople = [
    { name: 'Sarah M.', expertise: ['Migration', 'Tech'], avatar: 'SM' },
    { name: 'Mike R.', expertise: ['Onboarding', 'Process'], avatar: 'MR' },
    { name: 'Alice T.', expertise: ['Compliance', 'Setup'], avatar: 'AT' },
    { name: 'John D.', expertise: ['Tech', 'Backend'], avatar: 'JD' },
    { name: 'Jane S.', expertise: ['Process', 'Frontend'], avatar: 'JS' },
    { name: 'Priya K.', expertise: ['Migration', 'Compliance'], avatar: 'PK' },
    { name: 'Carlos G.', expertise: ['Setup', 'Tech'], avatar: 'CG' },
    { name: 'Emily W.', expertise: ['Onboarding', 'Compliance'], avatar: 'EW' },
    { name: 'Liam T.', expertise: ['Tech', 'Process'], avatar: 'LT' },
    { name: 'Olivia F.', expertise: ['Frontend', 'Setup'], avatar: 'OF' }
  ].filter(person => person.expertise.some(tag => question?.tags.includes(tag)));

  if (!question) return <div className="p-10 text-center text-red-600">Question not found.</div>;

  // Interactive upvote/downvote handlers
  const handleUpvote = () => {
    if (voteState === 'up') return;
    setQuestion(q => ({ ...q, votes: q.votes + (voteState === 'down' ? 2 : 1) }));
    setVoteState('up');
  };
  const handleDownvote = () => {
    if (voteState === 'down') return;
    setQuestion(q => ({ ...q, votes: q.votes - (voteState === 'up' ? 2 : 1) }));
    setVoteState('down');
  };

  return (
    <div style={{maxWidth: '98vw', width: '100%', margin: '1.5rem auto', display: 'flex', flexDirection: 'row', gap: 32, alignItems: 'flex-start', justifyContent: 'center'}}>
      {/* Left: Question and answers */}
      <div style={{flex: '0 1 60%', maxWidth: '60vw', background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: '2rem 2vw', minWidth: 0}}>
        <button onClick={() => navigate(-1)} style={{background: 'none', border: 'none', color: '#d00000', fontWeight: 700, marginBottom: 24, cursor: 'pointer', display: 'flex', alignItems: 'center'}}>
          <ArrowLeft style={{marginRight: 6}} /> Back
        </button>
        <h2 style={{fontSize: '2rem', fontWeight: 800, color: '#111', marginBottom: 8}}>Question</h2>
        <div style={{fontSize: '1.3rem', fontWeight: 600, color: '#222', marginBottom: 8}}>{question.title}</div>
        <div style={{display: 'flex', gap: 16, fontSize: 15, marginBottom: 8, alignItems: 'center'}}>
          <button className="ubs-upvote" onClick={handleUpvote} style={{background: voteState === 'up' ? '#d00000' : '#fafbfc', color: voteState === 'up' ? '#fff' : '#d00000', border: 'none', borderRadius: 8, padding: '4px 10px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center'}}><ThumbsUp style={{marginRight: 4}} /> Upvote</button>
          <span style={{fontWeight: 700, color: '#d00000', fontSize: 17}}>{question.votes}</span>
          <button className="ubs-downvote" onClick={handleDownvote} style={{background: voteState === 'down' ? '#d00000' : '#fafbfc', color: voteState === 'down' ? '#fff' : '#d00000', border: 'none', borderRadius: 8, padding: '4px 10px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center'}}><ThumbsDown style={{marginRight: 4}} /> Downvote</button>
          <span style={{color: '#d00000', fontWeight: 600}}><MessageSquare style={{marginRight: 2}} />{question.answers} answers</span>
          <span style={{color: '#888'}}>{question.time}</span>
        </div>
        <div style={{marginBottom: 16, display: 'flex', gap: 6}}>
          {question.tags.map(tag => (
            <span key={tag} className="ubs-tag" style={{background: getTagColor(tag), color: getTagColor(tag) === '#fff' ? '#d00000' : '#fff', fontSize: '0.95rem', padding: '0.18rem 0.8rem'}}>{tag}</span>
          ))}
        </div>
        <div style={{fontSize: 15, color: '#444', marginBottom: 24}}>
          {/* Placeholder for question body/description */}
          This is a detailed description of the question. (In a real app, this would be the full question body.)
        </div>
        {/* AI Answer */}
        <div style={{marginTop: 32, marginBottom: 32}}>
          <div style={{fontWeight: 700, fontSize: 18, marginBottom: 12, color: '#d00000'}}>🤖 AI Recommended Answer</div>
          <div style={{background: '#f8f9fa', borderRadius: 12, padding: '1.5rem', borderLeft: '4px solid #d00000'}}>
            <div style={{fontSize: 16, color: '#222', lineHeight: 1.6}}>{question.aiAnswer}</div>
            <div style={{marginTop: 12, fontSize: 13, color: '#888'}}>Generated by UBS AI Assistant</div>
          </div>
        </div>
        {/* Answers section (stub) */}
        <div style={{marginTop: 32}}>
          <div style={{fontWeight: 700, fontSize: 18, marginBottom: 12}}>Community Answers</div>
          <div style={{background: '#fafbfc', borderRadius: 10, padding: '1rem 1.5rem', marginBottom: 12}}>
            <div style={{fontWeight: 600, color: '#222'}}>This is a sample answer.</div>
            <div style={{fontSize: 13, color: '#888', marginTop: 2}}>by John D. &middot; 1h ago</div>
          </div>
          <div style={{background: '#fafbfc', borderRadius: 10, padding: '1rem 1.5rem', marginBottom: 12}}>
            <div style={{fontWeight: 600, color: '#222'}}>Another answer goes here.</div>
            <div style={{fontSize: 13, color: '#888', marginTop: 2}}>by Jane S. &middot; 30m ago</div>
          </div>
          {/* Add answer form (stub) */}
          <textarea placeholder="Your answer..." style={{width: '100%', border: '1.5px solid #eee', borderRadius: 8, padding: '0.6rem 1rem', marginBottom: 8}} />
          <button style={{background: '#d00000', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1.5rem', fontWeight: 700}}>Post Answer</button>
        </div>
      </div>
      {/* Right: Related communities and people */}
      <div style={{flex: '0 1 40%', maxWidth: '40vw', minWidth: 220, background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: '2rem 1.5vw', display: 'flex', flexDirection: 'column', gap: 32}}>
        <div style={{background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: '1.5rem'}}>
          <div style={{fontWeight: 700, fontSize: 17, color: '#d00000', marginBottom: 10}}>Related Communities</div>
          {relatedCommunities.length === 0 && <div style={{color: '#888', fontSize: 14}}>No related communities found.</div>}
          {relatedCommunities.map(c => (
            <div key={c.key} style={{marginBottom: 10}}>
              <div style={{fontWeight: 600, color: '#222'}}>{c.name}</div>
              <div style={{fontSize: 13, color: '#888'}}>{c.desc}</div>
              <div style={{marginTop: 4, display: 'flex', gap: 6}}>
                {c.tags.map(tag => (
                  <span key={tag} className="ubs-tag" style={{background: getTagColor(tag), color: getTagColor(tag) === '#fff' ? '#d00000' : '#fff', fontSize: '0.8rem', padding: '0.12rem 0.6rem'}}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: '1.5rem'}}>
          <div style={{fontWeight: 700, fontSize: 17, color: '#d00000', marginBottom: 10}}>Recommended People to Ask</div>
          {recommendedPeople.length === 0 && <div style={{color: '#888', fontSize: 14}}>No recommendations found.</div>}
          {recommendedPeople.map(person => (
            <div key={person.name} style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10}}>
              <div style={{width: 36, height: 36, borderRadius: '50%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#d00000', fontSize: 18}}>{person.avatar}</div>
              <div>
                <div style={{fontWeight: 600, color: '#222'}}>{person.name}</div>
                <div style={{fontSize: 13, color: '#888'}}>Expertise: {person.expertise.join(', ')}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- ProjectPage component ---
function ProjectPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === Number(projectId));
  const [search, setSearch] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const allProjectTags = Array.from(new Set(project?.tags || []));

  // For demo, use hotQuestions that share at least one tag with the project
  const projectQuestions = hotQuestions.filter(q =>
    project?.tags.some(tag => q.tags.includes(tag))
  );
  const filteredQuestions = projectQuestions.filter(q =>
    (!tagFilter || q.tags.includes(tagFilter)) &&
    (!search || q.title.toLowerCase().includes(search.toLowerCase()))
  );

  if (!project) return <div className="p-10 text-center text-red-600">Project not found.</div>;
  return (
    <div style={{maxWidth: 1200, margin: '2rem auto', display: 'flex', flexDirection: 'row', gap: 32, alignItems: 'flex-start'}}>
      {/* Left: Top Questions */}
      <div style={{flex: '0 1 65%', maxWidth: '65vw', background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: '2rem 2vw', minWidth: 0}}>
        <button onClick={() => navigate(-1)} style={{background: 'none', border: 'none', color: '#d00000', fontWeight: 700, marginBottom: 24, cursor: 'pointer', display: 'flex', alignItems: 'center'}}>
          <ArrowLeft style={{marginRight: 6}} /> Back
        </button>
        <h2 style={{fontSize: '2rem', fontWeight: 800, color: '#111', marginBottom: 8}}>{project.name}</h2>
        <div style={{color: '#888', fontSize: 15, marginBottom: 8}}>{project.desc}</div>
        <div style={{color: '#d00000', fontWeight: 600, fontSize: 13, marginBottom: 16}}>{project.status}</div>
        <div style={{fontWeight: 700, fontSize: 18, marginBottom: 10}}>Top Questions</div>
        {filteredQuestions.length === 0 && <div style={{color: '#888', fontSize: 14}}>No questions found for this project.</div>}
        {filteredQuestions.map(q => (
          <div key={q.id} className="ubs-hot-question" style={{marginBottom: 16, background: '#fafbfc', borderRadius: 10, padding: '1rem 1.5rem', cursor: 'pointer'}} onClick={() => navigate(`/question/${q.id}`)}>
            <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4}}>
              <div style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: q.resolved ? '#00b300' : '#d00000',
                flexShrink: 0
              }}></div>
              <div className="ubs-hot-question-title">{q.title}</div>
            </div>
            <div className="ubs-hot-question-meta">by {q.author} &middot; {q.time}</div>
            <div style={{display: 'flex', gap: 12, fontSize: 14, marginBottom: 4}}>
              <span className="ubs-upvote"><ThumbsUp /> {q.votes}</span>
              <span className="ubs-downvote"><ThumbsDown /> 0</span>
              <span style={{color: '#d00000', fontWeight: 600}}><MessageSquare style={{marginRight: 2}} />{q.answers} answers</span>
            </div>
            <div style={{marginTop: 6, display: 'flex', gap: 6}}>
              {q.tags.map(tag => (
                <span key={tag} className="ubs-tag" style={{background: getTagColor(tag), color: getTagColor(tag) === '#fff' ? '#d00000' : '#fff', fontSize: '0.85rem', padding: '0.15rem 0.7rem'}}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Right: Tag filter and search */}
      <div style={{flex: '0 1 35%', maxWidth: '35vw', minWidth: 220, background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: '2rem 1.5vw', display: 'flex', flexDirection: 'column', gap: 18}}>
        <div style={{fontWeight: 700, fontSize: 17, color: '#d00000', marginBottom: 10}}>Filter by Tag</div>
        <div style={{display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16}}>
          {allProjectTags.map(tag => (
            <span
              key={tag}
              className="ubs-tag"
              style={{background: tagFilter === tag ? getSolidTagColor(tag) : getTagColor(tag), color: tagFilter === tag ? '#fff' : getTagColor(tag) === '#fff' ? '#d00000' : '#fff', cursor: 'pointer', border: tagFilter === tag ? '2px solid #111' : 'none', fontSize: '0.85rem', padding: '0.15rem 0.7rem'}}
              onClick={() => setTagFilter(tagFilter === tag ? '' : tag)}
            >
              {tag}
            </span>
          ))}
          {tagFilter && (
            <button onClick={() => setTagFilter('')} style={{marginLeft: 8, background: '#fff', color: '#d00000', border: '1.5px solid #d00000', borderRadius: 8, padding: '0.1rem 0.7rem', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem'}}>Clear</button>
          )}
        </div>
        <div style={{fontWeight: 700, fontSize: 17, color: '#d00000', marginBottom: 10}}>Search Questions</div>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search questions..." style={{border: '1px solid #eee', borderRadius: 8, padding: '0.4rem 1rem', width: '100%'}} />
      </div>
    </div>
  );
}

// --- CreateQuestionPage component ---
function CreateQuestionPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [division, setDivision] = useState('general');

  // Find similar questions based on title and content
  const findSimilarQuestions = (title, content) => {
    if (!title && !content) return [];
    
    const searchText = `${title} ${content}`.toLowerCase();
    return hotQuestions.filter(q => {
      const questionText = `${q.title} ${q.aiAnswer}`.toLowerCase();
      // Simple similarity check - could be improved with more sophisticated algorithms
      const titleWords = title.toLowerCase().split(' ').filter(word => word.length > 2);
      const questionWords = q.title.toLowerCase().split(' ').filter(word => word.length > 2);
      const commonWords = titleWords.filter(word => questionWords.includes(word));
      
      return commonWords.length > 0 || questionText.includes(searchText.split(' ')[0]);
    }).slice(0, 5); // Limit to 5 similar questions
  };

  // Find related communities based on selected tags
  const findRelatedCommunities = () => {
    if (selectedTags.length === 0) return [];
    return communities.filter(c => 
      c.tags.some(tag => selectedTags.includes(tag))
    ).slice(0, 5);
  };

  const handleRemoveTag = (tagToRemove) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    if (title.trim() && question.trim()) {
      // In a real app, this would submit to an API
      const newQuestion = {
        id: Date.now(),
        title: title.trim(),
        question: question.trim(),
        tags: selectedTags,
        author: 'You',
        time: 'now',
        votes: 0,
        answers: 0,
        resolved: false,
        division: division
      };
      
      // For demo purposes, we'll just navigate back
      alert('Question created successfully!');
      navigate(-1);
    }
  };

  const similarQuestions = findSimilarQuestions(title, question);
  const relatedCommunities = findRelatedCommunities();

  return (
    <div style={{maxWidth: 1200, margin: '2rem auto', display: 'flex', flexDirection: 'row', gap: 32, alignItems: 'flex-start'}}>
      {/* Left: Create Question Form */}
      <div style={{flex: '0 1 65%', maxWidth: '65vw', background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: '2rem 2vw', minWidth: 0}}>
        <button onClick={() => navigate(-1)} style={{background: 'none', border: 'none', color: '#d00000', fontWeight: 700, marginBottom: 24, cursor: 'pointer', display: 'flex', alignItems: 'center'}}>
          <ArrowLeft style={{marginRight: 6}} /> Back
        </button>
        <h2 style={{fontSize: '2rem', fontWeight: 800, color: '#111', marginBottom: 24}}>Create New Question</h2>
        
        {/* Division Selection */}
        <div style={{marginBottom: 24}}>
          <label style={{display: 'block', fontWeight: 600, color: '#222', marginBottom: 8}}>Division</label>
          <select 
            value={division} 
            onChange={(e) => setDivision(e.target.value)}
            style={{width: '100%', border: '1.5px solid #eee', borderRadius: 8, padding: '0.6rem 1rem', fontSize: 16}}
          >
            {divisions.map(d => (
              <option key={d.key} value={d.key}>{d.name}</option>
            ))}
          </select>
        </div>

        {/* Title Input */}
        <div style={{marginBottom: 24}}>
          <label style={{display: 'block', fontWeight: 600, color: '#222', marginBottom: 8}}>Question Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What's your question? Be specific..."
            style={{width: '100%', border: '1.5px solid #eee', borderRadius: 8, padding: '0.8rem 1rem', fontSize: 16}}
          />
        </div>

        {/* Question Content */}
        <div style={{marginBottom: 24}}>
          <label style={{display: 'block', fontWeight: 600, color: '#222', marginBottom: 8}}>Question Details *</label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Provide more context about your question. Include any relevant details, error messages, or steps you've already tried..."
            rows={8}
            style={{width: '100%', border: '1.5px solid #eee', borderRadius: 8, padding: '0.8rem 1rem', fontSize: 16, resize: 'vertical'}}
          />
        </div>

        {/* Tags */}
        <div style={{marginBottom: 24}}>
          <label style={{display: 'block', fontWeight: 600, color: '#222', marginBottom: 8}}>Tags</label>
          <div style={{marginBottom: 12}}>
            <div style={{fontSize: 14, color: '#666', marginBottom: 8}}>Select tags for your question:</div>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: 6, maxHeight: 120, overflowY: 'auto', padding: '0.5rem', border: '1px solid #eee', borderRadius: 8}}>
              {allTags.map(tag => (
                <span
                  key={tag}
                  className="ubs-tag"
                  style={{
                    background: selectedTags.includes(tag) ? getSolidTagColor(tag) : getTagColor(tag),
                    color: selectedTags.includes(tag) ? '#fff' : getTagColor(tag) === '#fff' ? '#d00000' : '#fff',
                    cursor: 'pointer',
                    border: selectedTags.includes(tag) ? '2px solid #111' : 'none',
                    fontSize: '0.85rem',
                    padding: '0.15rem 0.7rem',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => {
                    if (selectedTags.includes(tag)) {
                      handleRemoveTag(tag);
                    } else {
                      setSelectedTags([...selectedTags, tag]);
                    }
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          {selectedTags.length > 0 && (
            <div>
              <div style={{fontSize: 14, color: '#666', marginBottom: 8}}>Selected tags:</div>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: 6}}>
                {selectedTags.map(tag => (
                  <span key={tag} className="ubs-tag" style={{background: getSolidTagColor(tag), color: '#fff', fontSize: '0.85rem', padding: '0.15rem 0.7rem', display: 'flex', alignItems: 'center', gap: 4}}>
                    {tag}
                    <button 
                      onClick={() => handleRemoveTag(tag)}
                      style={{background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 12, fontWeight: 700}}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button 
          onClick={handleSubmit}
          disabled={!title.trim() || !question.trim()}
          style={{
            background: (!title.trim() || !question.trim()) ? '#ccc' : '#d00000',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '0.8rem 2rem',
            fontWeight: 700,
            fontSize: 16,
            cursor: (!title.trim() || !question.trim()) ? 'not-allowed' : 'pointer'
          }}
        >
          Create Question
        </button>
      </div>

      {/* Right: Similar Questions and Related Communities */}
      <div style={{flex: '0 1 35%', maxWidth: '35vw', minWidth: 220, background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: '2rem 1.5vw', display: 'flex', flexDirection: 'column', gap: 24}}>
        {/* Similar Questions */}
        <div>
          <div style={{fontWeight: 700, fontSize: 17, color: '#d00000', marginBottom: 12}}>Similar Questions</div>
          {similarQuestions.length === 0 && <div style={{color: '#888', fontSize: 14}}>No similar questions found.</div>}
          {similarQuestions.map(q => (
            <div key={q.id} style={{marginBottom: 12, padding: '0.8rem', background: '#fafbfc', borderRadius: 8, cursor: 'pointer'}} onClick={() => navigate(`/question/${q.id}`)}>
              <div style={{fontWeight: 600, color: '#222', fontSize: 14, marginBottom: 4}}>{q.title}</div>
              <div style={{fontSize: 12, color: '#888'}}>by {q.author} &middot; {q.time}</div>
              <div style={{marginTop: 4, display: 'flex', gap: 4}}>
                {q.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="ubs-tag" style={{background: getTagColor(tag), color: getTagColor(tag) === '#fff' ? '#d00000' : '#fff', fontSize: '0.75rem', padding: '0.1rem 0.5rem'}}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Related Communities */}
        <div>
          <div style={{fontWeight: 700, fontSize: 17, color: '#d00000', marginBottom: 12}}>Related Communities</div>
          {relatedCommunities.length === 0 && <div style={{color: '#888', fontSize: 14}}>Add tags to see related communities.</div>}
          {relatedCommunities.map(c => (
            <div key={c.key} style={{marginBottom: 10, cursor: 'pointer'}} onClick={() => navigate(`/division/${division}/community/${c.key}`)}>
              <div style={{fontWeight: 600, color: '#222', fontSize: 14}}>{c.name}</div>
              <div style={{fontSize: 12, color: '#888'}}>{c.desc}</div>
              <div style={{marginTop: 4, display: 'flex', gap: 4}}>
                {c.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="ubs-tag" style={{background: getTagColor(tag), color: getTagColor(tag) === '#fff' ? '#d00000' : '#fff', fontSize: '0.75rem', padding: '0.1rem 0.5rem'}}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- ErrorPage component ---
function ErrorPage() {
  const { errorId, divisionKey } = useParams();
  const navigate = useNavigate();
  const error = errors.find(e => e.id === Number(errorId));
  // Find questions and communities related to the error by tag
  const relatedQuestions = hotQuestions.filter(q => error?.tags.some(tag => q.tags.includes(tag)));
  const relatedCommunities = communities.filter(c => error?.tags.some(tag => c.tags.includes(tag)));

  if (!error) return <div className="p-10 text-center text-red-600">Error not found.</div>;
  return (
    <div style={{maxWidth: 1200, margin: '2rem auto', display: 'flex', flexDirection: 'row', gap: 32, alignItems: 'flex-start'}}>
      {/* Left: Related Questions */}
      <div style={{flex: '0 1 60%', maxWidth: '60vw', background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: '2rem 2vw', minWidth: 0}}>
        <button onClick={() => navigate(-1)} style={{background: 'none', border: 'none', color: '#d00000', fontWeight: 700, marginBottom: 24, cursor: 'pointer', display: 'flex', alignItems: 'center'}}>
          <ArrowLeft style={{marginRight: 6}} /> Back
        </button>
        <h2 style={{fontSize: '2rem', fontWeight: 800, color: '#111', marginBottom: 8}}>Error: {error.title}</h2>
        <div style={{color: '#888', fontSize: 15, marginBottom: 8}}>Status: {error.status}</div>
        <div style={{marginBottom: 16, display: 'flex', gap: 6}}>
          {error.tags.map(tag => (
            <span key={tag} className="ubs-tag" style={{background: getTagColor(tag), color: getTagColor(tag) === '#fff' ? '#d00000' : '#fff', fontSize: '0.95rem', padding: '0.18rem 0.8rem'}}>{tag}</span>
          ))}
        </div>
        <div style={{fontWeight: 700, fontSize: 18, marginBottom: 10}}>Related Questions</div>
        {relatedQuestions.length === 0 && <div style={{color: '#888', fontSize: 14}}>No questions found for this error.</div>}
        {relatedQuestions.map(q => (
          <div key={q.id} className="ubs-hot-question" style={{marginBottom: 16, background: '#fafbfc', borderRadius: 10, padding: '1rem 1.5rem', cursor: 'pointer'}} onClick={() => navigate(`/question/${q.id}`)}>
            <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4}}>
              <div style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: q.resolved ? '#00b300' : '#d00000',
                flexShrink: 0
              }}></div>
              <div className="ubs-hot-question-title">{q.title}</div>
            </div>
            <div className="ubs-hot-question-meta">by {q.author} &middot; {q.time}</div>
            <div style={{display: 'flex', gap: 12, fontSize: 14, marginBottom: 4}}>
              <span className="ubs-upvote"><ThumbsUp /> {q.votes}</span>
              <span className="ubs-downvote"><ThumbsDown /> 0</span>
              <span style={{color: '#d00000', fontWeight: 600}}><MessageSquare style={{marginRight: 2}} />{q.answers} answers</span>
            </div>
            <div style={{marginTop: 6, display: 'flex', gap: 6}}>
              {q.tags.map(tag => (
                <span key={tag} className="ubs-tag" style={{background: getTagColor(tag), color: getTagColor(tag) === '#fff' ? '#d00000' : '#fff', fontSize: '0.85rem', padding: '0.15rem 0.7rem'}}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Right: Related Communities */}
      <div style={{flex: '0 1 40%', maxWidth: '40vw', minWidth: 220, background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: '2rem 1.5vw', display: 'flex', flexDirection: 'column', gap: 18}}>
        <div style={{fontWeight: 700, fontSize: 17, color: '#d00000', marginBottom: 10}}>Related Communities</div>
        {relatedCommunities.length === 0 && <div style={{color: '#888', fontSize: 14}}>No related communities found.</div>}
        {relatedCommunities.map(c => (
          <div key={c.key} style={{marginBottom: 10, cursor: 'pointer'}} onClick={() => navigate(`/division/${divisionKey || 'general'}/community/${c.key}`)}>
            <div style={{fontWeight: 600, color: '#222'}}>{c.name}</div>
            <div style={{fontSize: 13, color: '#888'}}>{c.desc}</div>
            <div style={{marginTop: 4, display: 'flex', gap: 6}}>
              {c.tags.map(tag => (
                <span key={tag} className="ubs-tag" style={{background: getTagColor(tag), color: getTagColor(tag) === '#fff' ? '#d00000' : '#fff', fontSize: '0.8rem', padding: '0.12rem 0.6rem'}}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [tagFilter, setTagFilter] = useState('');
  const [tagSearch, setTagSearch] = useState('');
  const filteredTags = allTags.filter(t => t.toLowerCase().includes(tagSearch.toLowerCase()));

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home tagFilter={tagFilter} setTagFilter={setTagFilter} tagSearch={tagSearch} setTagSearch={setTagSearch} filteredTags={filteredTags} />} />
        <Route path="/division/:divisionKey" element={<DivisionPage tagFilter={tagFilter} setTagFilter={setTagFilter} tagSearch={tagSearch} setTagSearch={setTagSearch} filteredTags={filteredTags} />} />
        <Route path="/division/:divisionKey/community/:communityKey" element={<CommunityPage tagFilter={tagFilter} setTagFilter={setTagFilter} />} />
        <Route path="/question/:questionId" element={<QuestionPage />} />
        <Route path="/project/:projectId" element={<ProjectPage />} />
        <Route path="/error/:errorId" element={<ErrorPage />} />
        <Route path="/create-question" element={<CreateQuestionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
