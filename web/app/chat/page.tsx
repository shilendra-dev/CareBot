'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState } from 'react';
import Header from '@/components/header';
import { Send, Bot, User } from 'lucide-react';

export default function Page() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });
  const [input, setInput] = useState('');

  return (
    <div className="flex flex-col h-screen">
      <Header />

      {/* Chat Container */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="flex w-full max-w-6xl h-full flex-col">

          {/* Messages Area */}
          <div className="flex-1 flex flex-col overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <Bot className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Welcome to CareBot</h2>
                  <p className="text-muted-foreground">Your personal healthcare assistant</p>
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-3 ${
                    message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}>
                    {message.role === 'user' ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div className={`max-w-[70%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}>
                    {message.parts.map((part, index) =>
                      part.type === 'text' ? (
                        <p key={index} className="text-sm leading-relaxed">
                          {part.text}
                        </p>
                      ) : null,
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input Form */}
          <div className="border-t p-4">
            <form
              onSubmit={e => {
                e.preventDefault();
                if (input.trim()) {
                  sendMessage({ text: input });
                  setInput('');
                }
              }}
              className="flex space-x-2"
            >
              <Input
                value={input}
                onChange={e => setInput(e.target.value)}
                disabled={status !== 'ready'}
                placeholder="Ask me anything about your health..."
                className="flex-1"
              />
              <Button
                type="submit"
                disabled={status !== 'ready' || !input.trim()}
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}