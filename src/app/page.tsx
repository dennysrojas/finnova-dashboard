'use client';

import React, { useState } from 'react';
import datasetJson from '../../data/processed/finnova_analytics.json';
import { SimulationDataset } from '../types/corbatul';
import { Sidebar, DashboardTab } from '../components/dashboard/Sidebar';
import { DecisionAnalysisView } from '../components/dashboard/DecisionAnalysisView';
import { ExecutiveSummaryView } from '../components/dashboard/ExecutiveSummaryView';
import { PnLDetailView } from '../components/dashboard/PnLDetailView';
import { OperationsInventoryView } from '../components/dashboard/OperationsInventoryView';
import { CompetitorBenchmarkingView } from '../components/dashboard/CompetitorBenchmarkingView';
import { 
  Award, 
  Compass, 
  BarChart3, 
  FileSpreadsheet, 
  Layers, 
  Target, 
  ChevronRight,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

export default function FinnovaDashboardPage() {
  const dataset = datasetJson as unknown as SimulationDataset;
  const [selectedPeriod, setSelectedPeriod] = useState<number>(4); // Default to Period 4 (2029)
  const [activeTab, setActiveTab] = useState<DashboardTab>('decisions');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  const tabTitles: Record<DashboardTab, { title: string; subtitle: string; icon: React.ReactNode }> = {
    decisions: {
      icon: <Compass className="w-5 h-5 text-pastel-600" />,
      title: 'Bitácora Estratégica Causal',
      subtitle: 'Punto Inicial → Decisión Paramétrica en 4 Ejes → Resultados Reales (2026–2029)',
    },
    board: {
      icon: <BarChart3 className="w-5 h-5 text-obsidian-900" />,
      title: 'Sala de Juntas Directiva',
      subtitle: 'Scorecard Ejecutivo & Creación de Valor (FashionClub · Finnova)',
    },
    pnl: {
      icon: <FileSpreadsheet className="w-5 h-5 text-obsidian-900" />,
      title: 'Cuenta de Resultados y Finanzas',
      subtitle: 'Auditoría Contable Textil, P&L, Balance General y Crédito Extraordinario (€)',
    },
    operations: {
      icon: <Layers className="w-5 h-5 text-obsidian-900" />,
      title: 'Taller, Operaciones & Existencias',
      subtitle: 'Bufandas estrella, Corbatas y Calcetines (Capacidad, Ocupación y Suministro)',
    },
    benchmark: {
      icon: <Target className="w-5 h-5 text-pastel-600" />,
      title: 'Radar de Mercado y Competidores',
      subtitle: 'Benchmarking Multidimensional de la Industria (Las 7 Firmas Textiles)',
    },
  };

  return (
    <div className="min-h-screen bg-pastel-50/70 text-obsidian-900 font-sans flex antialiased">
      
      {/* 1. Sidebar */}
      <Sidebar
        dataset={dataset}
        selectedPeriod={selectedPeriod}
        onSelectPeriod={setSelectedPeriod}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(prev => !prev)}
      />

      {/* 2. Main Executive Content Column */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto h-screen">
        
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-pastel-200/80 px-6 py-3.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            {isSidebarCollapsed && (
              <button
                onClick={() => setIsSidebarCollapsed(false)}
                className="p-1 rounded-md text-obsidian-500 hover:text-obsidian-900 hover:bg-pastel-100 transition-colors"
                title="Expandir barra lateral"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-obsidian-400 font-bold flex items-center gap-1.5">
                <span className="text-pastel-600 font-black">FASHIONCLUB</span>
                <span>•</span>
                <span>Equipo FINNOVA</span>
                <span>•</span>
                <span>Simulación Corbatul</span>
              </div>
              <h1 className="text-base sm:text-lg font-extrabold text-obsidian-950 flex items-center gap-2">
                <span className="shrink-0">{tabTitles[activeTab].icon}</span>
                <span>{tabTitles[activeTab].title}</span>
                <span className="hidden md:inline font-normal text-xs text-obsidian-500">
                  — {tabTitles[activeTab].subtitle}
                </span>
              </h1>
            </div>
          </div>

          {/* Quick Period & Status Indicators */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-pastel-100/80 px-3 py-1.5 rounded-xl border border-pastel-200 text-xs font-mono">
              <span className="text-obsidian-500 uppercase text-[10px] font-bold">Ronda:</span>
              <strong className="text-pastel-800 font-black">
                P{selectedPeriod} ({2025 + selectedPeriod})
              </strong>
            </div>

            <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs font-mono font-bold">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>39.5% mg</span>
            </div>
          </div>
        </header>

        {/* Dynamic Views */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {activeTab === 'decisions' && (
            <DecisionAnalysisView
              dataset={dataset}
              selectedPeriod={selectedPeriod}
              onSelectPeriod={setSelectedPeriod}
            />
          )}

          {activeTab === 'board' && (
            <ExecutiveSummaryView
              dataset={dataset}
              selectedPeriod={selectedPeriod}
            />
          )}

          {activeTab === 'pnl' && (
            <PnLDetailView
              dataset={dataset}
              selectedPeriod={selectedPeriod}
            />
          )}

          {activeTab === 'operations' && (
            <OperationsInventoryView
              dataset={dataset}
              selectedPeriod={selectedPeriod}
            />
          )}

          {activeTab === 'benchmark' && (
            <CompetitorBenchmarkingView
              dataset={dataset}
              selectedPeriod={selectedPeriod}
            />
          )}
        </main>

        {/* Reimagined Footer */}
        <footer className="border-t border-pastel-200/80 bg-white/60 py-4 px-6 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-obsidian-500">
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-obsidian-800">FINNOVA</span>
              <span>·</span>
              <span>FashionClub Executive Suite</span>
              <span>·</span>
              <span className="text-pastel-600 font-semibold">Simulación Corbatul (2025–2029)</span>
            </div>
            <div className="text-[11px] text-obsidian-400">
              Arquitectura 100% Local-First · Metodología Spec-Driven Development (SDD)
            </div>
          </div>
        </footer>

      </div>

    </div>
  );
}
