
import React, { useState } from 'react';
import { ViewState, Property, Roommate } from './types';
import { PROPERTIES, ROOMMATES, ARRIVAL_TASKS, COMMUNITY_GROUPS, QUIZ_QUESTIONS, AMBER_RED, DEMO_MESSAGES } from './constants';
import AICopilot from './components/AICopilot';

const App: React.FC = () => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [activeView, setActiveView] = useState<ViewState>('discovery');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [selectedRoommateId, setSelectedRoommateId] = useState<string | null>(null);
  const [expandedSafetyId, setExpandedSafetyId] = useState<string | null>(null);
  
  // Onboarding & Profile States
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [userName, setUserName] = useState('');
  const [userUni, setUserUni] = useState('');
  const [userBudget, setUserBudget] = useState(1000);

  // UI States
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isBookingDetailOpen, setIsBookingDetailOpen] = useState(false);
  const [communityTab, setCommunityTab] = useState<'Featured' | 'Groups' | 'Events' | 'Jobs'>('Featured');

  const selectedProperty = PROPERTIES.find(p => p.id === selectedPropertyId);
  const selectedRoommate = ROOMMATES.find(r => r.id === selectedRoommateId);

  const toggleSafety = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedSafetyId(expandedSafetyId === id ? null : id);
  };

  const openPropertyDetail = (id: string) => {
    setSelectedPropertyId(id);
    setActiveView('listing-detail');
  };

  const openMessaging = (id: string) => {
    setSelectedRoommateId(id);
    setActiveView('messaging');
  };

  const renderOnboarding = () => (
    <div className="flex-1 bg-white p-8 flex flex-col animate-in fade-in duration-500">
      <div className="flex-1 space-y-8">
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-[#E52D2D] rounded-2xl flex items-center justify-center shadow-xl shadow-red-100">
            <span className="text-white text-3xl font-black italic">a</span>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-black text-gray-900 tracking-tighter">Welcome to amber</h1>
            <p className="text-sm text-gray-400">Let's set up your student profile</p>
          </div>
        </div>

        <div className="flex gap-2">
          {[1, 2, 3].map(i => (
            <div key={i} className={`flex-1 h-1.5 rounded-full transition-all ${onboardingStep >= i ? 'bg-[#E52D2D]' : 'bg-gray-100'}`}></div>
          ))}
        </div>

        {onboardingStep === 1 && (
          <div className="space-y-6 animate-in slide-in-from-right-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Full Name</label>
              <input 
                type="text" 
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="e.g. Alex Thompson"
                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 focus:border-[#E52D2D] focus:outline-none transition-all font-medium"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Your University</label>
              <input 
                type="text" 
                value={userUni}
                onChange={(e) => setUserUni(e.target.value)}
                placeholder="e.g. London School of Economics"
                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 focus:border-[#E52D2D] focus:outline-none transition-all font-medium"
              />
            </div>
          </div>
        )}

        {onboardingStep === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right-4">
            <div className="space-y-4">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Monthly Budget: £{userBudget}</label>
              <input 
                type="range" 
                min="500" 
                max="3000" 
                step="50"
                value={userBudget}
                onChange={(e) => setUserBudget(parseInt(e.target.value))}
                className="w-full accent-[#E52D2D] h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                <span>Budget Friendly</span>
                <span>Premium Living</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Preferred Area</label>
              <div className="grid grid-cols-2 gap-2">
                {['Canary Wharf', 'Camden', 'Greenwich', 'King\'s Cross'].map(area => (
                  <button key={area} className="py-3 px-2 rounded-xl border-2 border-gray-100 text-xs font-bold text-gray-600 hover:border-[#E52D2D] hover:text-[#E52D2D] transition-all">
                    {area}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {onboardingStep === 3 && (
          <div className="space-y-6 text-center animate-in slide-in-from-right-4">
            <div className="relative inline-block group cursor-pointer">
              <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center border-4 border-dashed border-gray-200 group-hover:border-[#E52D2D] transition-all overflow-hidden">
                <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              </div>
              <div className="absolute bottom-0 right-0 bg-[#E52D2D] p-2 rounded-full text-white shadow-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /></svg>
              </div>
            </div>
            <p className="text-sm font-bold text-gray-700">Upload Profile Photo</p>
            <p className="text-[10px] text-gray-400 max-w-[200px] mx-auto uppercase tracking-widest leading-tight">Recommended to help roommates find you faster</p>
          </div>
        )}
      </div>

      <div className="pt-8 space-y-3">
        <button 
          onClick={() => {
            if (onboardingStep < 3) {
              setOnboardingStep(onboardingStep + 1);
            } else {
              setHasCompletedOnboarding(true);
            }
          }}
          disabled={onboardingStep === 1 && (!userName || !userUni)}
          className="w-full bg-[#E52D2D] text-white font-bold py-5 rounded-2xl shadow-xl shadow-red-200 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale"
        >
          {onboardingStep === 3 ? "Complete My Profile" : "Continue"}
        </button>
        {onboardingStep > 1 && (
          <button onClick={() => setOnboardingStep(onboardingStep - 1)} className="w-full py-2 text-gray-400 text-xs font-bold uppercase tracking-widest">Go Back</button>
        )}
      </div>
    </div>
  );

  const renderDiscovery = () => (
    <div className="p-4 pb-32 space-y-6">
      <div className="bg-white rounded-2xl p-6 border-l-4 border-[#E52D2D] shadow-sm space-y-2">
        <h2 className="text-[#E52D2D] font-bold flex items-center gap-2">
          ✨ Your AI-Powered Top Match
        </h2>
        <p className="text-sm text-gray-600">
          Based on your university (LSE) and budget, we recommend <strong>The Collective Canary Wharf</strong>.
        </p>
        <p className="text-xs text-gray-500 italic">Why? It's a 12-min commute and has the best social score.</p>
      </div>

      <div className="relative">
        <input 
          type="text" 
          placeholder="Search for properties..." 
          className="w-full bg-gray-100 rounded-xl px-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E52D2D]"
        />
        <svg className="w-5 h-5 absolute left-3 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </div>

      <div className="space-y-4">
        {PROPERTIES.map(p => (
          <div 
            key={p.id} 
            onClick={() => openPropertyDetail(p.id)}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 cursor-pointer group"
          >
            <div className="relative h-48">
              <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#E52D2D]">
                Price Dropped - £{p.price}/wk
              </div>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-800">{p.name}</h3>
                  <p className="text-xs text-gray-500">{p.location}</p>
                </div>
                <div className="bg-red-50 px-2 py-1 rounded text-[10px] text-[#E52D2D] font-bold uppercase tracking-wide">AI Verified</div>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                <div className="flex items-center gap-1 text-[10px] text-gray-500 font-medium">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                  {p.commuteTime}-min commute
                </div>
                <div className="text-[10px] font-bold text-[#E52D2D]">
                  {p.confidenceScore}/10 Confidence
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPropertyDetail = (property: Property) => (
    <div className="animate-in fade-in duration-300 pb-32 h-full overflow-y-auto">
      <div className="relative h-72">
        <img src={property.imageUrl} className="w-full h-full object-cover" alt={property.name} />
        <button 
          onClick={() => setActiveView('discovery')}
          className="absolute top-4 left-4 p-2 bg-black/30 backdrop-blur-md rounded-full text-white shadow-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
          <h2 className="text-3xl font-black text-white leading-tight">{property.name}</h2>
          <p className="text-white/80 font-medium">{property.location}</p>
        </div>
      </div>

      <div className="p-6 bg-white space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-gray-800 text-lg">Move-in Confidence Score</h3>
          <button className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-4xl font-black text-[#E52D2D] leading-none">{property.confidenceScore}/10</div>
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#E52D2D] rounded-full" 
              style={{ width: `${property.confidenceScore * 10}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <h3 className="font-bold text-gray-800">Video Tours by Students</h3>
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {property.studentTours.map(tour => (
            <div key={tour.id} className="flex flex-col items-center gap-2 shrink-0">
              <div className="relative">
                <img src={tour.avatarUrl} className="w-20 h-20 rounded-full object-cover ring-2 ring-gray-100 shadow-sm" alt={tour.studentName} />
                <div className="absolute bottom-0 right-0 p-1.5 bg-[#E52D2D] rounded-full border-2 border-white shadow-md">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M10 9v6l5-3-5-3z"/></svg>
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-gray-800">{tour.studentName}'s Room</p>
                <p className="text-[10px] text-gray-400">{tour.tourName}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 space-y-6">
        <h3 className="font-bold text-gray-800 text-lg">Location & Insights</h3>
        <div className="rounded-3xl overflow-hidden h-48 bg-blue-100 relative border border-gray-100 shadow-inner">
          <div className="absolute inset-0 opacity-40 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-0.118092,51.509865,13,0/400x200?access_token=none')] bg-cover"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-[#E52D2D] rounded-full border-2 border-white shadow-lg animate-pulse"></div>
          </div>
        </div>

        <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm space-y-6">
          <h4 className="font-bold text-gray-800">Area Insights</h4>
          <div className="space-y-4">
            {property.areaInsights.map(insight => (
              <div key={insight.label} className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-lg ${insight.color}`}>
                  {insight.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-800">{insight.label}</p>
                  <p className="text-xs text-gray-400 font-medium">{insight.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-6 z-40 max-w-md mx-auto flex gap-4">
        <button className="flex-1 py-4 bg-gray-50 text-gray-800 font-bold rounded-2xl border border-gray-200 active:scale-95 transition-transform">
          Request Video Call
        </button>
        <button className="flex-1 py-4 bg-[#E52D2D] text-white font-bold rounded-2xl shadow-lg shadow-red-200 active:scale-95 transition-transform">
          Reserve
        </button>
      </div>
    </div>
  );

  const renderQuiz = () => (
    <div className="p-6 space-y-8 animate-in slide-in-from-right-10">
      <div className="flex items-center justify-between">
        <button onClick={() => setIsQuizActive(false)} className="text-gray-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <span className="text-sm font-bold text-gray-400">Step {quizStep + 1} of {QUIZ_QUESTIONS.length}</span>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 leading-tight">
          {QUIZ_QUESTIONS[quizStep].question}
        </h2>
        <div className="space-y-3">
          {QUIZ_QUESTIONS[quizStep].options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (quizStep < QUIZ_QUESTIONS.length - 1) {
                  setQuizStep(quizStep + 1);
                } else {
                  setIsQuizActive(false);
                  setQuizStep(0);
                  alert("Quiz completed! We've updated your matches.");
                }
              }}
              className="w-full text-left p-4 rounded-2xl border-2 border-gray-100 hover:border-[#E52D2D] hover:bg-red-50 transition-all font-medium text-gray-700"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRoommates = () => (
    isQuizActive ? renderQuiz() : (
      <div className="p-4 pb-32 space-y-6">
        <div className="text-center bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
          <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center mx-auto text-2xl">📋</div>
          <div className="space-y-1">
            <h2 className="font-bold text-gray-800">Find your future flatmates</h2>
            <p className="text-sm text-gray-500 px-4">Our AI matches you based on your habits, personality, and budget.</p>
          </div>
          <button 
            onClick={() => setIsQuizActive(true)}
            className="w-full bg-[#E52D2D] text-white font-bold py-3 rounded-xl shadow-lg shadow-red-200 hover:bg-red-700"
          >
            Start Quiz
          </button>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-gray-800 px-1">Highly Compatible</h3>
          {ROOMMATES.map(r => (
            <div key={r.id} className="bg-white rounded-2xl p-4 shadow-sm space-y-4 border border-gray-100">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img src={r.imageUrl} alt={r.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-red-50" />
                  <div>
                    <h4 className="font-bold text-sm text-gray-800">{r.name}</h4>
                    <p className="text-[10px] text-gray-500">{r.university}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[#E52D2D] font-bold text-lg leading-none">{r.matchScore}%</div>
                  <div className="text-[10px] text-gray-400">Match</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-1 px-2 py-1 bg-red-50 text-[#E52D2D] rounded text-[10px] font-semibold">
                  ✨ {r.habitType}
                </div>
                {r.traits.map(t => (
                  <div key={t} className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-[10px]">{t}</div>
                ))}
              </div>

              <button 
                onClick={() => openMessaging(r.id)}
                className="w-full py-2 bg-red-50 text-[#E52D2D] font-bold text-sm rounded-xl hover:bg-red-100 transition-colors"
              >
                Say Hi
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  );

  const renderMessaging = (roommate: Roommate) => (
    <div className="flex flex-col h-full bg-white animate-in slide-in-from-right-10 z-50">
      {/* Messaging Header */}
      <div className="p-4 border-b flex items-center gap-4 bg-white sticky top-0 z-10">
        <button onClick={() => setActiveView('roommates')} className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="flex items-center gap-3">
          <img src={roommate.imageUrl} className="w-10 h-10 rounded-full object-cover" alt={roommate.name} />
          <div>
            <h3 className="font-bold text-gray-800 leading-none">{roommate.name}</h3>
            <p className="text-[10px] text-green-500 font-bold mt-1 uppercase tracking-widest">Online</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30">
        <div className="text-center py-4">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-3 py-1 rounded-full">Today</span>
        </div>
        {(DEMO_MESSAGES[roommate.id] || []).map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl shadow-sm text-sm ${
              msg.sender === 'me' 
                ? 'bg-[#E52D2D] text-white rounded-tr-none' 
                : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
            }`}>
              {msg.text}
              <p className={`text-[8px] mt-1 ${msg.sender === 'me' ? 'text-white/70' : 'text-gray-400'}`}>{msg.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t bg-white">
        <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2">
          <input 
            type="text" 
            placeholder="Type a message..." 
            className="flex-1 bg-transparent text-sm focus:outline-none py-1"
          />
          <button className="text-[#E52D2D]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </div>
      </div>
    </div>
  );

  const renderArrival = () => (
    <div className="p-4 pb-32 space-y-6">
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider">Booking Confirmed</span>
          </div>
          <h3 className="font-bold text-gray-800 text-sm leading-tight">Modern Studio, London E14</h3>
          <p className="text-[10px] text-gray-500">Contract ID: AMBR-99021</p>
        </div>
        <button 
          onClick={() => setIsBookingDetailOpen(true)}
          className="text-[#E52D2D] text-[10px] font-bold underline"
        >
          View Details
        </button>
      </div>

      <div className="bg-gradient-to-br from-red-600 to-rose-700 rounded-2xl p-5 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="relative z-10 flex gap-4">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-xl shrink-0">🛡️</div>
          <div>
            <h3 className="font-bold mb-1">Need help with your arrival?</h3>
            <p className="text-xs text-red-100 mb-4 opacity-90 leading-relaxed">Talk to your specialized Arrival Concierge AI.</p>
            <button className="w-full bg-white text-[#E52D2D] py-2 rounded-lg text-xs font-bold hover:bg-red-50">Start Chat</button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-gray-800">Your Checklist</h3>
        <div className="grid gap-3">
          {ARRIVAL_TASKS.map(t => (
            <div key={t.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${
                  t.status === 'completed' ? 'bg-green-50' : 'bg-red-50'
                }`}>
                  {t.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800">{t.title}</h4>
                  <p className="text-[10px] text-gray-500">Guide updated today</p>
                </div>
              </div>
              <div className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                t.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {t.status.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCommunity = () => (
    <div className="p-4 pb-32 space-y-6 animate-in fade-in">
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Your Hub</h2>
          <button className="text-[10px] font-bold text-[#E52D2D] bg-red-50 px-3 py-1 rounded-full">Explore AI Suggestions</button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {['Featured', 'Groups', 'Events', 'Jobs'].map(tab => (
            <button 
              key={tab} 
              onClick={() => setCommunityTab(tab as any)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all ${communityTab === tab ? 'bg-[#E52D2D] text-white shadow-lg shadow-red-100' : 'bg-gray-100 text-gray-500'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {communityTab === 'Featured' && (
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 px-1">Upcoming Events</h3>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
               {[
                 { title: 'Welcome Mixer', date: 'Sep 18', type: 'Social', color: 'bg-rose-500' },
                 { title: 'CV Workshop', date: 'Sep 22', type: 'Career', color: 'bg-indigo-500' },
                 { title: 'Pub Quiz Night', date: 'Sep 25', type: 'Social', color: 'bg-orange-500' }
               ].map((event, i) => (
                 <div key={i} className={`${event.color} min-w-[200px] h-32 rounded-3xl p-4 text-white flex flex-col justify-between shadow-lg`}>
                   <div className="text-[10px] font-bold uppercase tracking-widest bg-white/20 w-fit px-2 py-1 rounded-lg">{event.type}</div>
                   <div>
                     <h4 className="font-black text-sm">{event.title}</h4>
                     <p className="text-[10px] opacity-80">{event.date} • Free entry</p>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        )}

        {(communityTab === 'Featured' || communityTab === 'Groups') && (
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 px-1">{communityTab === 'Featured' ? 'Top Groups' : 'All Groups'}</h3>
            {COMMUNITY_GROUPS.filter(g => communityTab === 'Featured' ? g.members > 500 : true).map(group => (
              <div key={group.id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner ring-1 ring-gray-100">
                      {group.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm">{group.name}</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-bold text-[#E52D2D] uppercase tracking-wider">{group.category}</span>
                        <span className="text-[10px] text-gray-400">• {group.members} members</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{group.description}</p>
                <button className="w-full py-2.5 bg-gray-50 text-gray-800 font-bold text-xs rounded-xl border border-gray-200 hover:bg-[#E52D2D] hover:text-white hover:border-[#E52D2D] transition-all">
                  Join Group
                </button>
              </div>
            ))}
          </div>
        )}

        {communityTab === 'Jobs' && (
          <div className="space-y-4">
             <h3 className="font-bold text-gray-800 px-1">Student-Friendly Jobs</h3>
             {[
               { title: 'Cafe Assistant', pay: '£12.50/hr', type: 'Part-time', loc: 'Canary Wharf' },
               { title: 'Research Helper', pay: '£15.00/hr', type: 'Casual', loc: 'LSE Campus' }
             ].map((job, i) => (
               <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
                 <div>
                   <h4 className="font-bold text-gray-800 text-sm">{job.title}</h4>
                   <p className="text-[10px] text-gray-400">{job.loc} • {job.type}</p>
                 </div>
                 <div className="text-right">
                   <div className="text-[#E52D2D] font-black text-sm">{job.pay}</div>
                   <button className="text-[10px] font-bold text-gray-500 underline">Apply</button>
                 </div>
               </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="fixed inset-0 z-50 bg-white animate-in slide-in-from-bottom duration-300">
      <div className="p-6 space-y-8 h-full overflow-y-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Your Profile</h2>
          <button onClick={() => setIsProfileOpen(false)} className="p-2 bg-gray-100 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex flex-col items-center gap-4 py-4">
          <div className="relative">
            <img src="https://picsum.photos/seed/user/200/200" alt="Avatar" className="w-24 h-24 rounded-full ring-4 ring-red-50 shadow-xl" />
            <div className="absolute bottom-0 right-0 bg-[#E52D2D] p-2 rounded-full border-2 border-white shadow-lg">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-800">{userName || 'Alex Thompson'}</h3>
            <p className="text-sm text-gray-500">{userUni || 'LSE • Master of Finance'}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-3xl border border-gray-100">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Preferences</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Monthly Budget</span>
                <span className="font-bold">£{userBudget}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Preferred Area</span>
                <span className="font-bold">Canary Wharf</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Move-in Date</span>
                <span className="font-bold">Sep 15, 2024</span>
              </div>
            </div>
          </div>
          
          <button className="w-full py-4 bg-gray-800 text-white font-bold rounded-2xl">Edit Profile</button>
          <button onClick={() => setHasCompletedOnboarding(false)} className="w-full py-4 text-red-600 font-bold border border-red-100 rounded-2xl">Logout</button>
        </div>
      </div>
    </div>
  );

  const renderBookingDetail = () => (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md mx-auto rounded-t-[40px] p-8 space-y-6 animate-in slide-in-from-bottom duration-300">
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-2" onClick={() => setIsBookingDetailOpen(false)}></div>
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Booking Details</h2>
            <p className="text-sm text-gray-500">Confirmed on Aug 12, 2024</p>
          </div>
          <button onClick={() => setIsBookingDetailOpen(false)} className="bg-gray-100 p-2 rounded-full">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <img src={PROPERTIES[0].imageUrl} className="w-16 h-16 rounded-xl object-cover shadow-sm" alt="Prop" />
            <div>
              <h4 className="font-bold text-sm text-gray-800">{PROPERTIES[0].name}</h4>
              <p className="text-[10px] text-gray-500">{PROPERTIES[0].location}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
              <span className="text-[10px] font-bold text-red-400 uppercase">Rent</span>
              <p className="text-lg font-bold text-[#E52D2D]">£250/wk</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Deposit</span>
              <p className="text-lg font-bold text-gray-800">£1,000</p>
            </div>
          </div>
        </div>

        <button className="w-full bg-[#E52D2D] text-white font-bold py-4 rounded-2xl shadow-lg shadow-red-200">
          Complete Payment
        </button>
      </div>
    </div>
  );

  const getContext = () => {
    if (!hasCompletedOnboarding) return "User is in the onboarding flow. Support them with profile creation advice.";
    switch (activeView) {
      case 'discovery': return "User is browsing properties. Confidence scores help establish trust.";
      case 'listing-detail': return `User is looking at ${selectedProperty?.name}. Mention the ${selectedProperty?.confidenceScore}/10 confidence score and student tours.`;
      case 'roommates': return "User is matching with roommates. Highlight compatibility scores.";
      case 'messaging': return `User is messaging with ${selectedRoommate?.name} about potential shared housing.`;
      case 'arrival': return "User has a confirmed booking. Help with SIM cards and Bank accounts.";
      case 'community': return `User is exploring the Community Hub. Currently looking at ${communityTab}.`;
      default: return "General housing support for international students.";
    }
  };

  const showNavbarAndHeader = activeView !== 'listing-detail' && activeView !== 'messaging';

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 flex flex-col relative border-x border-gray-200 shadow-2xl overflow-hidden selection:bg-red-100">
      
      {!hasCompletedOnboarding ? (
        renderOnboarding()
      ) : (
        <>
          {/* Header */}
          {showNavbarAndHeader && (
            <header className="bg-white px-4 pt-8 pb-4 flex justify-between items-center sticky top-0 z-30 shadow-sm border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#E52D2D] rounded-xl flex items-center justify-center shadow-lg shadow-red-200">
                  <span className="text-white text-sm font-black italic">a</span>
                </div>
                <h1 className="font-bold text-gray-900 tracking-tighter text-xl">amber</h1>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-50 rounded-full text-gray-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                </button>
                <button 
                  onClick={() => setIsProfileOpen(true)}
                  className="w-10 h-10 rounded-full border-2 border-red-500 overflow-hidden shadow-md active:scale-95 transition-transform"
                >
                  <img src="https://picsum.photos/seed/user/100/100" alt="Profile" className="w-full h-full object-cover" />
                </button>
              </div>
            </header>
          )}

          {/* Main Content Area */}
          <main className={`flex-1 overflow-y-auto scroll-smooth ${activeView === 'listing-detail' || activeView === 'messaging' ? '' : 'bg-gray-50/50'}`}>
            {activeView === 'discovery' && renderDiscovery()}
            {activeView === 'listing-detail' && selectedProperty && renderPropertyDetail(selectedProperty)}
            {activeView === 'roommates' && renderRoommates()}
            {activeView === 'messaging' && selectedRoommate && renderMessaging(selectedRoommate)}
            {activeView === 'arrival' && renderArrival()}
            {activeView === 'community' && renderCommunity()}
          </main>

          {/* Bottom Navigation */}
          {showNavbarAndHeader && (
            <nav className="bg-white/95 backdrop-blur-xl border-t border-gray-100 px-6 py-4 flex justify-between items-center sticky bottom-0 z-40">
              <button onClick={() => { setActiveView('discovery'); setIsQuizActive(false); }} className={`flex flex-col items-center gap-1 transition-all ${activeView === 'discovery' ? 'text-[#E52D2D] scale-110' : 'text-gray-400'}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                <span className="text-[9px] font-black uppercase tracking-widest">Discover</span>
              </button>
              <button onClick={() => { setActiveView('roommates'); setIsQuizActive(false); }} className={`flex flex-col items-center gap-1 transition-all ${activeView === 'roommates' ? 'text-[#E52D2D] scale-110' : 'text-gray-400'}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                <span className="text-[9px] font-black uppercase tracking-widest">Roomies</span>
              </button>
              <button onClick={() => { setActiveView('arrival'); setIsQuizActive(false); }} className={`flex flex-col items-center gap-1 transition-all ${activeView === 'arrival' ? 'text-[#E52D2D] scale-110' : 'text-gray-400'}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                <span className="text-[9px] font-black uppercase tracking-widest">Journey</span>
              </button>
              <button onClick={() => { setActiveView('community'); setIsQuizActive(false); }} className={`flex flex-col items-center gap-1 transition-all ${activeView === 'community' ? 'text-[#E52D2D] scale-110' : 'text-gray-400'}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                <span className="text-[9px] font-black uppercase tracking-widest">Hub</span>
              </button>
            </nav>
          )}
        </>
      )}

      {isProfileOpen && renderProfile()}
      {isBookingDetailOpen && renderBookingDetail()}
      <AICopilot context={getContext()} />
    </div>
  );
};

export default App;
