'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';
import Button from './ui/Button';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your Devine Rituals assistant. How can I help you find peace today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue('');



    // Call Backend API
    try {
      // Add a temporary loading message
      const loadingId = 'loading-' + Date.now();
      setMessages((prev) => [
        ...prev,
        {
          id: loadingId,
          text: 'Thinking...',
          sender: 'ai',
          timestamp: new Date(),
        },
      ]);

      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputValue,
          history: messages.map(m => ({
            text: m.text,
            sender: m.sender
          }))
        }),
      });

      const data = await response.json();

      // Remove loading message and add real response
      setMessages((prev) => {
        const filtered = prev.filter(msg => msg.id !== loadingId);
        if (data.success) {
          return [
            ...filtered,
            {
              id: (Date.now() + 1).toString(),
              text: data.message,
              sender: 'ai',
              timestamp: new Date(),
            },
          ];
        } else {
          return [
            ...filtered,
            {
              id: (Date.now() + 1).toString(),
              text: "I'm having trouble connecting right now. Please try again later.",
              sender: 'ai',
              timestamp: new Date(),
            },
          ];
        }
      });
    } catch (error) {
      console.error('Chat Error:', error);
      setMessages((prev) => {
        const filtered = prev.filter(msg => !msg.id.startsWith('loading-'));
        return [
          ...filtered,
          {
            id: (Date.now() + 1).toString(),
            text: "Sorry, I couldn't reach the server.",
            sender: 'ai',
            timestamp: new Date(),
          },
        ];
      });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto mb-4 w-[350px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-8rem)] bg-gray-900/95 backdrop-blur-xl border border-orange-500/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-orange-500/20 bg-gradient-to-r from-orange-900/20 to-amber-900/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-amber-50 font-medium text-sm">Devine Assistant</h3>
                  <p className="text-amber-500/60 text-xs">Always here to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-amber-500/60 hover:text-amber-50 transition-colors rounded-lg hover:bg-orange-500/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex w-full",
                    msg.sender === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] p-3 rounded-2xl text-sm",
                      msg.sender === 'user'
                        ? "bg-orange-600 text-white rounded-tr-sm"
                        : "bg-gray-800 text-amber-50 border border-orange-500/10 rounded-tl-sm"
                    )}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-orange-500/20 bg-gray-900/50">
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask anything..."
                  className="flex-1 bg-black/40 border border-orange-500/20 rounded-xl px-4 py-2.5 text-sm text-amber-50 placeholder-amber-500/30 focus:outline-none focus:border-orange-500/50 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="p-2.5 bg-orange-600 text-white rounded-xl hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-orange-900/20"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-2xl shadow-orange-900/50 flex items-center justify-center border border-orange-400/50 relative group"
      >
        <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse" />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
