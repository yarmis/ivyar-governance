/**
 * IVYAR AI Advisor Component
 * @version 1.0.0
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Mic, ChevronDown, AlertTriangle, CheckCircle, Search, Wrench, FileText } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  warnings?: { type: string; message: string }[];
  actions?: { id: string; label: string; action: string }[];
}

interface AIAdvisorProps {
  userRole: 'operator' | 'technician' | 'logistics' | 'analyst' | 'manager' | 'executive';
  context?: { platform?: string; repair_level?: string; domain?: string };
  onAction?: (action: any) => void;
  className?: string;
}

const QUICK_ACTIONS: Record<string, { id: string; label: string; prompt: string }[]> = {
  operator: [
    { id: 'find-part', label: 'Find Part', prompt: 'Find part ' },
    { id: 'repair-help', label: 'Repair Help', prompt: 'How to repair ' },
  ],
  technician: [
    { id: 'find-analog', label: 'Find Analog', prompt: 'Find analog for ' },
    { id: 'repair-procedure', label: 'Procedure', prompt: 'Show procedure for ' },
    { id: 'check-fitment', label: 'Check Fitment', prompt: 'Check if fits ' },
  ],
  logistics: [
    { id: 'cross-ref', label: 'Cross Reference', prompt: 'Cross reference NSN ' },
    { id: 'availability', label: 'Availability', prompt: 'Check availability of ' },
  ],
  analyst: [
    { id: 'coverage', label: 'Coverage Report', prompt: 'Coverage report for ' },
    { id: 'gaps', label: 'Gap Analysis', prompt: 'Analyze gaps in ' },
  ],
  manager: [
    { id: 'status', label: 'Fleet Status', prompt: 'Show fleet status ' },
    { id: 'queue', label: 'Repair Queue', prompt: 'Show repair queue ' },
  ],
  executive: [
    { id: 'summary', label: 'Summary', prompt: 'Executive summary of ' },
    { id: 'kpis', label: 'Key Metrics', prompt: 'Show key metrics ' },
  ],
};

export const AIAdvisor: React.FC<AIAdvisorProps> = ({ userRole, context, onAction, className = '' }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const greetings: Record<string, string> = {
      operator: "👋 Hello! I can help you find parts and repair procedures. What do you need?",
      technician: "👋 Welcome! I can help with parts, analogs, and procedures. What are you working on?",
      logistics: "👋 Hi! I'm here to help with cross-references and availability. How can I assist?",
      analyst: "👋 Hello! I can generate reports and analyze coverage. What would you like to explore?",
      manager: "👋 Welcome! I can provide fleet status and repair insights. What do you need?",
      executive: "👋 Good day! Ready to provide summaries and key metrics. How may I help?",
    };
    setMessages([{ id: 'greeting', role: 'assistant', content: greetings[userRole], timestamp: new Date() }]);
  }, [userRole]);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage: Message = { id: `user-${Date.now()}`, role: 'user', content: input.trim(), timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const response: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: `Processing your request: "${userMessage.content}"\n\nI'm searching the catalog...`,
        timestamp: new Date(),
        actions: [{ id: 'search', label: 'Search Catalog', action: 'search' }]
      };
      setMessages(prev => [...prev, response]);
      setIsLoading(false);
    }, 1000);
  }, [input, isLoading]);

  const quickActions = QUICK_ACTIONS[userRole] || QUICK_ACTIONS.operator;

  return (
    <div className={`ai-advisor ${className}`} style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '480px', height: '600px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 24px rgba(0,0,0,0.12)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'linear-gradient(135deg, #1a365d, #2c5282)', color: 'white', cursor: 'pointer' }} onClick={() => setIsExpanded(!isExpanded)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 600 }}>
          <span>🤖</span> AI Advisor {isLoading && <span style={{ animation: 'pulse 1s infinite' }}>●</span>}
        </div>
        <ChevronDown size={20} style={{ transform: isExpanded ? 'rotate(0)' : 'rotate(180deg)' }} />
      </div>
      
      {isExpanded && (
        <>
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', background: '#f7fafc' }}>
            {messages.map(msg => (
              <div key={msg.id} style={{ maxWidth: '85%', padding: '12px 16px', borderRadius: '16px', alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', background: msg.role === 'user' ? '#2c5282' : 'white', color: msg.role === 'user' ? 'white' : '#2d3748', boxShadow: msg.role === 'assistant' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none' }}>
                <div style={{ fontSize: '14px', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{msg.content}</div>
                {msg.actions && (
                  <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                    {msg.actions.map(action => (
                      <button key={action.id} onClick={() => onAction?.(action)} style={{ padding: '6px 12px', background: '#edf2f7', border: '1px solid #e2e8f0', borderRadius: '16px', fontSize: '12px', cursor: 'pointer' }}>{action.label}</button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isLoading && <div style={{ alignSelf: 'flex-start', padding: '16px', background: 'white', borderRadius: '16px' }}>...</div>}
            <div ref={messagesEndRef} />
          </div>
          
          {messages.length <= 1 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '12px 16px', background: '#f7fafc', borderTop: '1px solid #e2e8f0' }}>
              {quickActions.map(action => (
                <button key={action.id} onClick={() => setInput(action.prompt)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '20px', fontSize: '13px', cursor: 'pointer' }}>{action.label}</button>
              ))}
            </div>
          )}
          
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', padding: '16px', background: 'white', borderTop: '1px solid #e2e8f0' }}>
            <textarea value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())} placeholder="Ask me anything..." rows={1} style={{ flex: 1, padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: '20px', fontSize: '14px', resize: 'none', outline: 'none' }} disabled={isLoading} />
            <button onClick={handleSend} disabled={!input.trim() || isLoading} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', border: 'none', background: input.trim() ? '#2c5282' : '#cbd5e0', color: 'white', cursor: input.trim() ? 'pointer' : 'not-allowed' }}>
              <Send size={18} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AIAdvisor;
