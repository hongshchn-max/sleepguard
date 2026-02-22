'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useStory } from './story-provider';
import { StoryOverlay } from './story-overlay';
import { cn } from '@/lib/utils';
import type { ExplorationNode } from '@/lib/story/constants';

interface NodeState {
  id: ExplorationNode;
  discovered: boolean;
}

export function ExplorationUI() {
  const t = useTranslations('exploration');
  const tStory = useTranslations('story');
  const { refreshStory } = useStory();
  const [nodes, setNodes] = useState<NodeState[]>([]);
  const [selectedNode, setSelectedNode] = useState<ExplorationNode | null>(null);
  const [allDiscovered, setAllDiscovered] = useState(false);
  const [showReveal, setShowReveal] = useState(false);
  const [showChapterComplete, setShowChapterComplete] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/story/exploration');
      if (!res.ok) return;
      const data = await res.json();
      setNodes(data.nodes.map((n: string) => ({
        id: n as ExplorationNode,
        discovered: data.discovered.includes(n),
      })));
      setAllDiscovered(data.allDiscovered);
      setLoading(false);
    }
    load();
  }, []);

  async function discoverNode(node: ExplorationNode) {
    setSelectedNode(node);

    const res = await fetch('/api/story/exploration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ node }),
    });
    if (!res.ok) return;

    const data = await res.json();
    setNodes(prev => prev.map(n => n.id === node ? { ...n, discovered: true } : n));

    if (data.allDiscovered) {
      setAllDiscovered(true);
      // Advance the story
      await fetch('/api/story/advance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trigger: 'exploration_complete' }),
      });
    }
  }

  const nodeConfig: Record<ExplorationNode, { icon: string; titleKey: string; contentKey: string }> = {
    terminal: { icon: '\u25A3', titleKey: 'terminalTitle', contentKey: 'terminalContent' },
    note: { icon: '\u25C8', titleKey: 'noteTitle', contentKey: 'noteContent' },
    orb: { icon: '\u25CE', titleKey: 'orbTitle', contentKey: 'orbContent' },
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-spectral border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg space-y-6 p-4 pt-8">
      <div className="text-center">
        <h1 className="font-display text-2xl font-light">{t('title')}</h1>
        <p className="mt-2 text-sm text-white/45 italic">{t('subtitle')}</p>
      </div>

      <div className="space-y-4">
        {nodes.map(node => {
          const config = nodeConfig[node.id];
          return (
            <button
              key={node.id}
              onClick={() => !node.discovered && discoverNode(node.id)}
              disabled={node.discovered}
              className={cn(
                'dream-glass w-full rounded-xl p-6 text-left transition-all',
                node.discovered ? 'opacity-60' : 'hover:dream-glow cursor-pointer'
              )}
            >
              <div className="flex items-center gap-4">
                <span className={cn(
                  'font-display text-3xl',
                  node.discovered ? 'text-spectral-dim' : 'text-spectral animate-pulse-dot'
                )}>
                  {config.icon}
                </span>
                <div>
                  <h3 className="font-display font-medium">
                    {t(config.titleKey as any)}
                    {node.discovered && (
                      <span className="ml-2 text-xs text-verdant-mist">{t('discovered')}</span>
                    )}
                  </h3>
                  {node.discovered && (
                    <p className="mt-1 text-sm text-white/45 italic">{t(config.contentKey as any)}</p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {allDiscovered && !showReveal && (
        <button
          onClick={() => setShowReveal(true)}
          className="w-full rounded-xl bg-somnia-rose/20 py-4 text-center font-display font-light text-somnia-rose transition-all hover:bg-somnia-rose/30"
        >
          {'\u2727'} Project Somnium {'\u2727'}
        </button>
      )}

      {showReveal && !showChapterComplete && (
        <StoryOverlay
          text={t('reveal')}
          onComplete={() => {
            setShowChapterComplete(true);
            refreshStory();
          }}
        />
      )}

      {showChapterComplete && (
        <div className="dream-glass dream-glow rounded-2xl p-8 text-center">
          <div className="mb-4 font-display text-4xl text-liminal-gold">{'\u2726'}</div>
          <h2 className="font-display text-xl font-light text-liminal-gold">{tStory('chapter1Complete')}</h2>
          <p className="mt-2 text-sm text-white/45">Somnium Sigil unlocked</p>
        </div>
      )}

      {selectedNode && !nodes.find(n => n.id === selectedNode)?.discovered && (
        <StoryOverlay
          text={t(nodeConfig[selectedNode].contentKey as any)}
          onComplete={() => setSelectedNode(null)}
        />
      )}
    </div>
  );
}
