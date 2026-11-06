'use client';

import React from 'react';
import { 
  Compass, 
  DollarSign, 
  ShoppingBag, 
  GitFork, 
  BarChart2,
} from 'lucide-react';

export type TabKey = 'overview' | 'pnl' | 'products' | 'decisions' | 'benchmark';

interface NavigationTabsProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs = [
    {
      id: 'overview' as TabKey,
      label: 'Visión Ejecutiva & Valor',
      icon: Compass,
      desc: 'Evolución y componentes de valor',
    },
    {
      id: 'pnl' as TabKey,
      label: 'P&L & Diagnóstico Financiero',
      icon: DollarSign,
      desc: 'Cuenta de resultados y crédito extraordinario',
    },
    {
      id: 'products' as TabKey,
      label: 'Mix de Producto & Rentabilidad',
      icon: ShoppingBag,
      desc: 'Bufandas estrella, corbatas y calcetines',
    },
    {
      id: 'decisions' as TabKey,
      label: 'Triada Causal & Decisiones',
      icon: GitFork,
      desc: 'Auditoría cronológica 2026-2029',
    },
    {
      id: 'benchmark' as TabKey,
      label: 'Radar Competitivo (7 Firmas)',
      icon: BarChart2,
      desc: 'Benchmarking transversal de la industria',
    },
  ];

  return (
    <div className="bg-white border-b border-pastel-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2.5 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`group flex items-center space-x-2.5 px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-pastel-100/90 text-pastel-700 border border-pastel-300/80 shadow-sm font-bold'
                    : 'text-obsidian-600 hover:text-obsidian-900 hover:bg-pastel-50/70 border border-transparent'
                }`}
              >
                <div className={`p-1.5 rounded-xl transition-colors ${
                  isActive 
                    ? 'bg-pastel-500 text-white shadow-sunset' 
                    : 'bg-obsidian-100 text-obsidian-600 group-hover:bg-pastel-200/60 group-hover:text-pastel-700'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="leading-tight">{tab.label}</div>
                  <div className="text-[10px] text-obsidian-400 font-normal hidden lg:block">{tab.desc}</div>
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
