'use client';

import React from 'react';
import { SimulationDataset } from '../../types/corbatul';
import { getExecutiveScorecard } from '../../lib/analytics';
import { 
  Compass, 
  BarChart3, 
  FileSpreadsheet, 
  Layers, 
  Target, 
  ChevronLeft, 
  ChevronRight,
  Award,
  AlertTriangle,
  TrendingUp
} from 'lucide-react';

export type DashboardTab = 'decisions' | 'board' | 'pnl' | 'operations' | 'benchmark' | 'report';

interface SidebarProps {
  dataset: SimulationDataset;
  selectedPeriod: number;
  onSelectPeriod: (period: number) => void;
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  dataset,
  selectedPeriod,
  onSelectPeriod,
  activeTab,
  onSelectTab,
  isCollapsed,
  onToggleCollapse,
}) => {
  const scorecard = getExecutiveScorecard(dataset, selectedPeriod);

  const menuItems: { id: DashboardTab; label: string; sublabel: string; icon: React.ReactNode }[] = [
    {
      id: 'decisions',
      label: 'Bitácora Estratégica',
      sublabel: 'Punto Partida → Decisión → Resultados',
      icon: <Compass className="w-4 h-4" />,
    },
    {
      id: 'board',
      label: 'Sala de Juntas',
      sublabel: 'Creación de Valor & Scorecard',
      icon: <BarChart3 className="w-4 h-4" />,
    },
    {
      id: 'pnl',
      label: 'P&L y Finanzas',
      sublabel: 'Costes, Margen & Crédito Ext.',
      icon: <FileSpreadsheet className="w-4 h-4" />,
    },
    {
      id: 'operations',
      label: 'Taller & Existencias',
      sublabel: 'Bufandas estrella, Corbatas & Calcetines',
      icon: <Layers className="w-4 h-4" />,
    },
    {
      id: 'benchmark',
      label: 'Radar de Mercado',
      sublabel: 'Comparativa de las 7 Firmas',
      icon: <Target className="w-4 h-4" />,
    },
    {
      id: 'report',
      label: 'Informe de Gestión',
      sublabel: 'Plantilla Oficial (Slides 4, 12–16)',
      icon: <Award className="w-4 h-4" />,
    },
  ];

  return (
    <aside
      className={`${
        isCollapsed ? 'w-20' : 'w-72'
      } bg-white border-r border-pastel-200/90 text-obsidian-900 flex flex-col h-screen sticky top-0 select-none z-40 transition-all duration-300 ease-in-out shrink-0`}
    >
      {/* Brand Header */}
      {isCollapsed ? (
        <div className="py-3 px-2 border-b border-pastel-200 flex flex-col items-center gap-2 bg-pastel-50/50">
          <button
            onClick={onToggleCollapse}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-pastel-500 to-pastel-600 text-white flex items-center justify-center font-mono font-bold text-sm tracking-wider shadow-sunset hover:opacity-95 transition-all cursor-pointer"
            title="FINNOVA · FashionClub (Clic para expandir)"
          >
            FC
          </button>
          <button
            onClick={onToggleCollapse}
            className="w-7 h-7 rounded-lg text-obsidian-600 hover:text-obsidian-900 hover:bg-pastel-100 transition-colors flex items-center justify-center border border-pastel-200 bg-white shadow-xs"
            title="Expandir barra lateral"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="p-4 border-b border-pastel-200 flex items-center justify-between bg-pastel-50/60">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pastel-500 to-pastel-600 text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-sunset shrink-0">
              FC
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-sm text-obsidian-900 tracking-tight">FINNOVA</span>
                <span className="text-[10px] font-bold bg-pastel-200 text-pastel-800 px-1.5 py-0.2 rounded border border-pastel-300">
                  FashionClub
                </span>
              </div>
              <p className="text-[11px] text-obsidian-500 truncate mt-0.5">
                Simulación Corbatul
              </p>
            </div>
          </div>

          <button
            onClick={onToggleCollapse}
            className="w-7 h-7 rounded-lg text-obsidian-500 hover:text-obsidian-900 hover:bg-pastel-100 transition-colors flex items-center justify-center border border-pastel-200 bg-white"
            title="Colapsar barra lateral"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Period Quick Selector */}
      <div className={`p-3 border-b border-pastel-200/80 bg-pastel-50/30 ${isCollapsed ? 'px-2' : ''}`}>
        {!isCollapsed && (
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-[10px] uppercase font-bold text-obsidian-400 tracking-wider">
              Ejercicio / Ronda
            </span>
            <span className="text-[10px] font-mono font-bold text-pastel-700 bg-pastel-100 px-1.5 py-0.5 rounded">
              P{selectedPeriod} ({2025 + selectedPeriod})
            </span>
          </div>
        )}

        <div className={`grid ${isCollapsed ? 'grid-cols-1 gap-1.5' : 'grid-cols-4 gap-1'}`}>
          {dataset.periods.map((p) => {
            const isSelected = selectedPeriod === p;
            return (
              <button
                key={p}
                onClick={() => onSelectPeriod(p)}
                className={`py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-pastel-500 to-pastel-600 text-white shadow-sunset scale-102'
                    : 'bg-white text-obsidian-600 hover:bg-pastel-100 border border-pastel-200/80 hover:text-obsidian-950'
                }`}
                title={`Ronda ${p} (Año ${2025 + p})`}
              >
                {isCollapsed ? `P${p}` : `${2025 + p}`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center rounded-2xl transition-all duration-200 ${
                isCollapsed ? 'justify-center p-3' : 'px-3.5 py-2.5 text-left'
              } ${
                isActive
                  ? 'bg-gradient-to-r from-pastel-100 to-pastel-50/90 text-pastel-800 font-bold border border-pastel-300 shadow-xs'
                  : 'text-obsidian-600 hover:bg-pastel-50 hover:text-obsidian-900 border border-transparent'
              }`}
              title={isCollapsed ? `${item.label} — ${item.sublabel}` : undefined}
            >
              <div
                className={`rounded-xl p-2 shrink-0 transition-colors ${
                  isActive
                    ? 'bg-pastel-500 text-white shadow-sunset'
                    : 'bg-pastel-100/70 text-obsidian-700 group-hover:text-pastel-700'
                }`}
              >
                {item.icon}
              </div>

              {!isCollapsed && (
                <div className="ml-3 min-w-0 flex-1">
                  <div className="text-xs font-bold truncate leading-tight text-obsidian-950">
                    {item.label}
                  </div>
                  <div className="text-[10px] text-obsidian-400 truncate mt-0.5 font-normal">
                    {item.sublabel}
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Scorecard Widget Footer */}
      {!isCollapsed && (
        <div className="p-3 border-t border-pastel-200 bg-pastel-50/40">
          <div className="bg-white rounded-2xl p-3 border border-pastel-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[10px] uppercase font-bold text-obsidian-400 tracking-wider">
                Valor Acción
              </span>
              <span className="font-extrabold text-xs bg-pastel-100 text-pastel-700 px-2 py-0.5 rounded-full border border-pastel-200">
                Rank #{scorecard.rankBySharePrice}
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-xl font-black text-obsidian-950 font-mono">
                {scorecard.sharePrice.toFixed(1)}
              </span>
              <span className="text-xs font-bold text-emerald-700 flex items-center">
                <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
                {scorecard.grossMargin.toFixed(1)}% mg
              </span>
            </div>

            <div className="pt-2 border-t border-pastel-100 flex items-center justify-between text-[11px]">
              <span className="text-obsidian-500">Crédito Ext.:</span>
              <span className="font-mono font-bold text-rose-600">
                {(scorecard.extraordinaryCredit / 1000000).toFixed(2)}M €
              </span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
