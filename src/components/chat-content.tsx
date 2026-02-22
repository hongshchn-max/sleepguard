'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { createClient } from '@/lib/supabase/client';
import { Link } from '@/i18n/navigation';
import { getSessionDate, cn } from '@/lib/utils';
import { FREE_MESSAGES_PER_NIGHT } from '@/lib/types';
import { useStory } from '@/components/story/story-provider';
import { LunaDelayedEntry } from '@/components/story/luna-delayed-entry';

interface Message { id: string; role: 'user' | 'assistant'; content: string; }

export function ChatContent() {
  const t = useTranslations('chat');
  const tStory = useTranslations('story');
  const { phase, refreshStory } = useStory();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [userMessageCount, setUserMessageCount] = useState(0);
  const [limitReached, setLimitReached] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function loadHistory() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: profile } = await supabase.from('user_profiles').select('timezone, is_premium').eq('id', user.id).single();
      if (!profile) return;
      setIsPremium(profile.is_premium);
      const sessionDate = getSessionDate(profile.timezone);
      const { data: history } = await supabase.from('chat_messages').select('id, role, content').eq('user_id', user.id).eq('session_date', sessionDate).order('created_at', { ascending: true });
      if (history) {
        setMessages(history);
        const userMsgs = history.filter(m => m.role === 'user').length;
        setUserMessageCount(userMsgs);
        if (!profile.is_premium && userMsgs >= FREE_MESSAGES_PER_NIGHT) setLimitReached(true);
      }
    }
    loadHistory();
  }, []);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading || limitReached) return;

    const userMessage: Message = { id: `user-${Date.now()}`, role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setUserMessageCount(c => c + 1);

    const assistantId = `assistant-${Date.now()}`;
    setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.content }),
      });

      if (res.status === 429) {
        setLimitReached(true);
        setMessages(prev => prev.filter(m => m.id !== assistantId));
        setLoading(false);
        return;
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error('No reader');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        for (const line of chunk.split('\n')) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') break;
            try {
              const { text } = JSON.parse(data);
              setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: m.content + text } : m));
            } catch {}
          }
        }
      }
    } catch (error) { console.error('Chat error:', error); }

    setLoading(false);
    if (!isPremium && userMessageCount + 1 >= FREE_MESSAGES_PER_NIGHT) setLimitReached(true);
    inputRef.current?.focus();
  }

  const remaining = isPremium ? Infinity : FREE_MESSAGES_PER_NIGHT - userMessageCount;

  return (
    <div className="flex h-screen flex-col">
      <div className="border-b border-spectral/8 bg-void/90 px-4 py-3 backdrop-blur-lg">
        <h1 className="font-display text-lg font-light">{t('title')}</h1>
        <p className="text-xs text-white/45">{t('subtitle')}</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-32">
        {/* Phase 3: Luna is absent */}
        {phase === 3 && (
          <div className="flex h-full items-center justify-center text-center">
            <div>
              <div className="mb-4 font-display text-5xl text-somnia-rose/40">{'\u25CE'}</div>
              <p className="text-white/45 italic">{tStory('phase3Absent')}</p>
              <p className="mt-2 text-xs text-white/25">{tStory('phase3Empty')}</p>
              <Link href="/explore" className="mt-6 inline-block rounded-lg bg-somnia-rose/20 px-6 py-3 font-display text-sm text-somnia-rose transition-all hover:bg-somnia-rose/30">
                {tStory('phase3Explore')}
              </Link>
            </div>
          </div>
        )}
        {phase !== 3 && messages.length === 0 && (
          <div className="flex h-full items-center justify-center text-center">
            <div><div className="mb-4 font-display text-5xl text-spectral">{'\u25CE'}</div><p className="text-white/45">{t('subtitle')}</p></div>
          </div>
        )}
        <div className="mx-auto max-w-lg space-y-4">
          {/* Phase 1: Luna's delayed slip */}
          {phase === 1 && (
            <LunaDelayedEntry onSlipSeen={async () => {
              await fetch('/api/story/advance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ trigger: 'luna_slip_seen' }),
              });
              refreshStory();
            }} />
          )}
          {messages.map(msg => (
            <div key={msg.id} className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
              <div className={cn('max-w-[80%] rounded-2xl px-4 py-2.5',
                msg.role === 'user' ? 'bg-spectral text-void' : 'dream-glass text-white/90')}>
                {msg.content || (
                  <span className="inline-flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-white/45" style={{ animationDelay: '0ms' }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-white/45" style={{ animationDelay: '150ms' }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-white/45" style={{ animationDelay: '300ms' }} />
                  </span>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="fixed bottom-16 left-0 right-0 border-t border-spectral/8 bg-void/90 p-4 backdrop-blur-lg">
        {limitReached ? (
          <div className="text-center">
            <p className="mb-2 text-sm text-white/45">{t('limitReached')}</p>
            <Link href="/premium" className="inline-block rounded-lg bg-spectral px-4 py-2 text-sm font-semibold text-void">{t('upgradeCta')}</Link>
          </div>
        ) : (
          <>
            {!isPremium && remaining <= FREE_MESSAGES_PER_NIGHT && (
              <p className="mb-2 text-center text-xs text-white/35">{t('messagesLeft', { count: remaining })}</p>
            )}
            <form onSubmit={sendMessage} className="mx-auto flex max-w-lg gap-2">
              <input ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value)} placeholder={t('placeholder')}
                className="flex-1 rounded-full border border-spectral/8 bg-void-light px-4 py-3 text-white placeholder-white/25 focus:border-spectral-dim focus:outline-none" disabled={loading} />
              <button type="submit" disabled={loading || !input.trim()}
                className="rounded-full bg-spectral px-5 py-3 font-semibold text-void transition-colors hover:bg-spectral-light disabled:opacity-50">
                {t('send')}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
