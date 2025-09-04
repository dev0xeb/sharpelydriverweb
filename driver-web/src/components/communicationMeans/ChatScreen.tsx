import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import icons from '../../assets/icon';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'contact';
  timestamp: Date;
}

interface ChatScreenProps {
  contactName?: string;
  contactAvatar?: string;
  onBack?: () => void;
  onCall?: () => void;
}

const ChatScreen: React.FC<ChatScreenProps> = ({
  contactName = 'Sunday Ode',
  contactAvatar,
  onBack,
  onCall
}) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Where are you?',
      sender: 'user',
      timestamp: new Date(Date.now() - 300000) // 5 minutes ago
    },
    {
      id: '2',
      text: "I'm outside",
      sender: 'contact',
      timestamp: new Date(Date.now() - 120000) // 2 minutes ago
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage.trim(),
        sender: 'user',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const handleCall = () => {
    if (onCall) {
      onCall();
    } else {
      console.log('Calling', contactName);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 lg:px-6 lg:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <img src={icons.arrowBack} alt="Back" className="w-5 h-5" />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gray-200 overflow-hidden">
                {contactAvatar ? (
                  <img src={contactAvatar} alt={contactName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {contactName.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <h1 className="font-semibold text-gray-900 text-lg lg:text-xl">{contactName}</h1>
                <p className="text-sm text-gray-500">
                  {isTyping ? 'typing...' : 'online'}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleCall}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-6 lg:px-8 lg:py-8">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-900 border border-gray-200'
              }`}>
                <p className="text-sm lg:text-base">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-red-100' : 'text-gray-500'
                }`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 px-4 py-4 lg:px-6 lg:py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Message"
                className="w-full px-4 py-3 lg:py-4 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                rows={1}
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className={`p-3 lg:p-4 rounded-full transition-colors ${
                newMessage.trim()
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
