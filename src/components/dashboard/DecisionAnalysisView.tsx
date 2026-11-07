'use client';

import React, { useState, useEffect } from 'react';
import { SimulationDataset, RoundDecisionStory } from '../../types/corbatul';
import { 
  Play, 
  RotateCcw, 
  Compass, 
  Layers, 
  TrendingUp, 
  AlertTriangle,
  Lightbulb,
  Factory,
  Landmark,
  BarChart3,
  ShoppingBag
} from 'lucide-react';

interface DecisionAnalysisViewProps {
  dataset: SimulationDataset;
  selectedPeriod: number;
  onSelectPeriod: (period: number) => void;
}

type ImpactTab = 'operations' | 'finance' | 'market' | 'lessons';

export const DecisionAnalysisView: React.FC<DecisionAnalysisViewProps> = ({
  dataset,
  selectedPeriod,
  onSelectPeriod
}) => {
  const [viewMode, setViewMode] = useState<'canvas' | 'timeline'>('canvas');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);
  const [isExecuted, setIsExecuted] = useState<boolean>(false);
  const [activeImpactTab, setActiveImpactTab] = useState<ImpactTab>('operations');

  useEffect(() => {
    setIsSimulating(false);
    setSimStep(0);
    setIsExecuted(false);
  }, [selectedPeriod]);

  const currentStory: RoundDecisionStory | undefined = dataset.decisionStories?.find(
    s => s.period === selectedPeriod
  );

  const formatCurrency = (val: number) => `${Math.round(val).toLocaleString('es-ES')} €`;

  if (!currentStory) return null;

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setIsExecuted(false);
    setSimStep(1);

    const s1 = setTimeout(() => setSimStep(2), 350);
    const s2 = setTimeout(() => setSimStep(3), 700);
    const s3 = setTimeout(() => setSimStep(4), 1050);
    const sDone = setTimeout(() => {
      setIsSimulating(false);
      setIsExecuted(true);
    }, 1350);

    return () => {
      clearTimeout(s1);
      clearTimeout(s2);
      clearTimeout(s3);
      clearTimeout(sDone);
    };
  };

  const simSteps = [
    { num: 1, label: 'Parámetros Comerciales' },
    { num: 2, label: 'Absorción de Mercado' },
    { num: 3, label: 'Cálculo Fabril & P&L' },
    { num: 4, label: 'Valor de Empresa' },
  ];

  return (
    <div className="space-y-6 w-full animate-fadeIn">
      
      {/* 1. TOP STRATEGIC DOSSIER HEADER */}
      <div className="bg-white border border-pastel-200/90 rounded-3xl p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wider uppercase font-extrabold bg-pastel-100 text-pastel-800 border border-pastel-200">
                FashionClub · FINNOVA
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-obsidian-100 text-obsidian-700">
                Ronda {selectedPeriod} de {dataset.periods.length} (Ejercicio {2025 + selectedPeriod})
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-obsidian-950">
              {currentStory.roundTitle}
            </h2>
            <div className="flex items-center gap-2 text-xs font-medium text-obsidian-600 pt-0.5">
              <span className="w-2 h-2 rounded-full bg-pastel-500 shrink-0" />
              <span>Eje Estratégico: <strong>&ldquo;{currentStory.strategicTheme}&rdquo;</strong></span>
            </div>
          </div>

          {/* View Mode Toggle: Interactive Canvas vs 4-Year Timeline */}
          <div className="flex items-center gap-1 bg-pastel-100/70 p-1 rounded-2xl border border-pastel-200">
            <button
              onClick={() => setViewMode('canvas')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'canvas'
                  ? 'bg-pastel-500 text-white shadow-sunset'
                  : 'text-obsidian-600 hover:text-obsidian-900'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Canvas Causal</span>
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'timeline'
                  ? 'bg-pastel-500 text-white shadow-sunset'
                  : 'text-obsidian-600 hover:text-obsidian-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Matriz 4 Años</span>
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'canvas' ? (
        <>
          {/* ========================================================
              FASE 1: DIAGNÓSTICO INICIAL & PUNTO DE PARTIDA
             ======================================================== */}
          <div className="bg-gradient-to-br from-pastel-50/80 via-white to-white border border-pastel-200/90 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-pastel-200/60 pb-3">
              <div className="flex items-center gap-2 text-xs font-extrabold text-pastel-800 uppercase tracking-wider">
                <span className="w-6 h-6 rounded-lg bg-pastel-500 text-white flex items-center justify-center text-xs font-black shadow-xs">
                  01
                </span>
                <span>Punto de Partida · Situación Inicial Heredada ({2025 + selectedPeriod})</span>
              </div>
              <span className="text-xs font-semibold text-obsidian-500">
                Punto de arranque antes de formalizar decisiones
              </span>
            </div>

            {/* Quick Metrics Bar con separación estricta de unidades (Correcciones 19, 28, 36, 42) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="bg-white p-3.5 rounded-2xl border border-pastel-200/80 shadow-xs">
                <span className="text-[10px] font-bold uppercase text-obsidian-400 block tracking-wider">Tesorería Inicial</span>
                <span className="text-base font-black text-obsidian-900 font-mono">
                  {formatCurrency(currentStory.initialState.cashStarting)}
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-pastel-200/80 shadow-xs">
                <span className="text-[10px] font-bold uppercase text-obsidian-400 block tracking-wider">Inventario Bodega</span>
                <span className="text-base font-black text-obsidian-900 font-mono">
                  {formatCurrency(currentStory.initialState.inventoryStartingValue)}
                </span>
                <span className="text-[9px] text-obsidian-400 block font-normal">(valor contable)</span>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-pastel-200/80 shadow-xs">
                <span className="text-[10px] font-bold uppercase text-obsidian-400 block tracking-wider">Capacidad Fabril</span>
                <span className="text-base font-black text-obsidian-900 font-mono">
                  {currentStory.initialState.nominalCapacity.toLocaleString('es-ES')} uds
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-pastel-200/80 shadow-xs">
                <span className="text-[10px] font-bold uppercase text-obsidian-400 block tracking-wider">Cotización Acción</span>
                <span className="text-base font-black text-pastel-600 font-mono">
                  {currentStory.initialState.inheritedSharePrice.toFixed(1)} pts
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-pastel-200/80 shadow-xs">
                <span className="text-[10px] font-bold uppercase text-obsidian-400 block tracking-wider">Ranking Inicial</span>
                <span className="text-base font-black text-obsidian-900 font-mono">
                  #{currentStory.initialState.inheritedRank} de 7
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-pastel-200/80 shadow-xs">
                <span className="text-[10px] font-bold uppercase text-obsidian-400 block tracking-wider">Cuota de Mercado</span>
                <span className="text-base font-black text-obsidian-900 font-mono">
                  {currentStory.initialState.inheritedMarketShare.toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Context & Critical Challenge */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 text-xs">
              <div className="bg-white/90 p-4 rounded-2xl border border-pastel-100 space-y-1">
                <span className="font-bold text-obsidian-900 flex items-center gap-1.5 text-xs">
                  <Compass className="w-4 h-4 text-pastel-600" />
                  Diagnóstico del Entorno:
                </span>
                <p className="text-obsidian-600 leading-relaxed">
                  {currentStory.initialState.diagnosticContext}
                </p>
              </div>

              <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/80 space-y-1">
                <span className="font-bold text-amber-900 flex items-center gap-1.5 text-xs">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Reto Crítico a Resolver:
                </span>
                <p className="text-amber-900/90 leading-relaxed font-medium">
                  {currentStory.initialState.criticalChallenge}
                </p>
              </div>
            </div>
          </div>

          {/* ========================================================
              FASE 2: MOTOR CAUSAL (PANTALLA DIVIDIDA 50% / 50%)
             ======================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* PANEL IZQUIERDO (50%): DECISIONES ADOPTADAS */}
            <div className="lg:col-span-6 bg-white border border-pastel-200/90 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center justify-between border-b border-pastel-200/80 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-pastel-500 text-white flex items-center justify-center text-xs font-black shadow-xs">
                      02
                    </span>
                    <span className="text-xs font-extrabold text-obsidian-950 uppercase tracking-wider">
                      Decisiones Estratégicas en los 4 Ejes
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-pastel-700 bg-pastel-100 px-2 py-0.5 rounded-full border border-pastel-200">
                    Auditadas {currentStory.year}
                  </span>
                </div>

                <div className="space-y-4 text-xs">
                  
                  {/* Eje 1: Comercial */}
                  <div className="bg-pastel-50/50 p-4 rounded-2xl border border-pastel-100 space-y-2">
                    <div className="flex items-center justify-between font-extrabold text-obsidian-900 text-xs">
                      <span className="flex items-center gap-1.5">
                        <ShoppingBag className="w-4 h-4 text-pastel-600" />
                        1. Eje Comercial & Precios
                      </span>
                      <span className="font-mono text-pastel-700">Dcto Canal: {currentStory.decisions.commercial.channelDiscount}%</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center py-1">
                      <div className="bg-white p-2 rounded-xl border border-pastel-100">
                        <span className="text-[10px] text-obsidian-400 block font-semibold">Corbatas</span>
                        <span className="font-mono font-bold text-obsidian-900">{currentStory.decisions.commercial.priceStandard.toFixed(2)} €</span>
                      </div>
                      <div className="bg-white p-2 rounded-xl border border-pastel-100">
                        <span className="text-[10px] text-obsidian-400 block font-semibold">Bufandas</span>
                        <span className="font-mono font-bold text-emerald-700">{currentStory.decisions.commercial.pricePremium.toFixed(2)} €</span>
                      </div>
                      <div className="bg-white p-2 rounded-xl border border-pastel-100">
                        <span className="text-[10px] text-obsidian-400 block font-semibold">Calcetines</span>
                        <span className="font-mono font-bold text-obsidian-900">{currentStory.decisions.commercial.priceSocks.toFixed(2)} €</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-[11px] text-obsidian-600 pt-1">
                      <span>Mkt: <strong>{formatCurrency(currentStory.decisions.commercial.marketingBudget)}</strong></span>
                      <span>Incentivos: <strong>{currentStory.decisions.commercial.salesIncentivesSummary || 'No consta'}</strong></span>
                    </div>
                    <p className="text-[11px] text-obsidian-500 italic pt-1 border-t border-pastel-100/60">
                      &ldquo;{currentStory.decisions.commercial.commercialRationale}&rdquo;
                    </p>
                  </div>

                  {/* Eje 2: Producción */}
                  <div className="bg-pastel-50/50 p-4 rounded-2xl border border-pastel-100 space-y-2">
                    <div className="flex items-center justify-between font-extrabold text-obsidian-900 text-xs">
                      <span className="flex items-center gap-1.5">
                        <Factory className="w-4 h-4 text-pastel-600" />
                        2. Eje Producción & Fabricación
                      </span>
                      <span className="font-mono text-obsidian-600">Turnos: {currentStory.decisions.production.plantShifts}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center py-1">
                      <div className="bg-white p-2 rounded-xl border border-pastel-100">
                        <span className="text-[10px] text-obsidian-400 block font-semibold">Corbatas</span>
                        <span className="font-mono font-bold text-obsidian-900">{(currentStory.decisions.production.ordersStandard / 1000).toFixed(0)}k uds</span>
                      </div>
                      <div className="bg-white p-2 rounded-xl border border-pastel-100">
                        <span className="text-[10px] text-obsidian-400 block font-semibold">Bufandas</span>
                        <span className="font-mono font-bold text-obsidian-900">{(currentStory.decisions.production.ordersPremium / 1000).toFixed(1)}k uds</span>
                      </div>
                      <div className="bg-white p-2 rounded-xl border border-pastel-100">
                        <span className="text-[10px] text-obsidian-400 block font-semibold">Calcetines</span>
                        <span className="font-mono font-bold text-obsidian-900">{(currentStory.decisions.production.ordersSocks / 1000).toFixed(0)}k uds</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-obsidian-500 italic pt-1 border-t border-pastel-100/60">
                      &ldquo;{currentStory.decisions.production.productionRationale}&rdquo;
                    </p>
                  </div>

                  {/* Eje 3: Surtido & Gama */}
                  <div className="bg-pastel-50/50 p-4 rounded-2xl border border-pastel-100 space-y-1.5">
                    <div className="flex items-center justify-between font-extrabold text-obsidian-900 text-xs">
                      <span className="flex items-center gap-1.5">
                        <Layers className="w-4 h-4 text-pastel-600" />
                        3. Eje Gama & Surtido
                      </span>
                      <span className="font-mono text-obsidian-600">{currentStory.decisions.sourcing.catalogRangeSummary || '12/7/5'}</span>
                    </div>
                    <p className="text-[11px] text-obsidian-500 italic">
                      &ldquo;{currentStory.decisions.sourcing.sourcingRationale}&rdquo;
                    </p>
                  </div>

                  {/* Eje 4: Finanzas & Deuda */}
                  <div className="bg-pastel-50/50 p-4 rounded-2xl border border-pastel-100 space-y-1.5">
                    <div className="flex items-center justify-between font-extrabold text-obsidian-900 text-xs">
                      <span className="flex items-center gap-1.5">
                        <Landmark className="w-4 h-4 text-pastel-600" />
                        4. Eje Financiero & Balance
                      </span>
                      <span className="font-mono font-bold text-rose-600">
                        Crédito: {formatCurrency(currentStory.decisions.finance.extraordinaryCreditImpact || 0)}
                      </span>
                    </div>
                    <p className="text-[11px] text-obsidian-500 italic">
                      &ldquo;{currentStory.decisions.finance.financeRationale}&rdquo;
                    </p>
                  </div>

                </div>
              </div>

              {/* Botón Central de Simulación Cinemática */}
              <div className="pt-4 border-t border-pastel-200">
                <button
                  onClick={handleRunSimulation}
                  disabled={isSimulating}
                  className={`w-full py-3.5 px-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isSimulating
                      ? 'bg-obsidian-800 text-white cursor-wait'
                      : isExecuted
                        ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-md hover:opacity-95'
                        : 'bg-gradient-to-r from-pastel-500 to-pastel-600 text-white shadow-sunset hover:opacity-95 scale-101'
                  }`}
                >
                  {isSimulating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0" />
                      <span>Procesando Algoritmo Corbatul (Paso {simStep}/4)...</span>
                    </>
                  ) : isExecuted ? (
                    <>
                      <RotateCcw className="w-4 h-4" />
                      <span>Re-ejecutar Simulación Cinemática</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-white" />
                      <span>Ejecutar Algoritmo de Simulación Causal</span>
                    </>
                  )}
                </button>

                {/* Simulation Step Bar */}
                {isSimulating && (
                  <div className="mt-3 grid grid-cols-4 gap-1.5">
                    {simSteps.map((step) => (
                      <div
                        key={step.num}
                        className={`text-[10px] text-center py-1 rounded font-mono font-bold ${
                          simStep >= step.num
                            ? 'bg-pastel-500 text-white'
                            : 'bg-pastel-100 text-obsidian-400'
                        }`}
                      >
                        {step.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* PANEL DERECHO (50%): CONSECUENCIAS REALES E IMPACTO */}
            <div className="lg:col-span-6 bg-white border border-pastel-200/90 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between border-b border-pastel-200/80 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-black shadow-xs">
                      03
                    </span>
                    <span className="text-xs font-extrabold text-obsidian-950 uppercase tracking-wider">
                      Resultados e Impacto Causal ({currentStory.year})
                    </span>
                  </div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    isExecuted ? 'bg-emerald-100 text-emerald-800' : 'bg-pastel-100 text-pastel-700'
                  }`}>
                    {isExecuted ? 'Ejecutado' : 'Listo para auditar'}
                  </span>
                </div>

                {/* Sub-tabs for Consequences */}
                <div className="grid grid-cols-4 gap-1 bg-pastel-100/70 p-1 rounded-2xl mb-4 text-xs font-bold">
                  <button
                    onClick={() => setActiveImpactTab('operations')}
                    className={`py-1.5 rounded-xl transition-all ${
                      activeImpactTab === 'operations'
                        ? 'bg-white text-obsidian-950 shadow-xs'
                        : 'text-obsidian-500 hover:text-obsidian-900'
                    }`}
                  >
                    Operaciones
                  </button>
                  <button
                    onClick={() => setActiveImpactTab('finance')}
                    className={`py-1.5 rounded-xl transition-all ${
                      activeImpactTab === 'finance'
                        ? 'bg-white text-obsidian-950 shadow-xs'
                        : 'text-obsidian-500 hover:text-obsidian-900'
                    }`}
                  >
                    P&L / Deuda
                  </button>
                  <button
                    onClick={() => setActiveImpactTab('market')}
                    className={`py-1.5 rounded-xl transition-all ${
                      activeImpactTab === 'market'
                        ? 'bg-white text-obsidian-950 shadow-xs'
                        : 'text-obsidian-500 hover:text-obsidian-900'
                    }`}
                  >
                    Mercado
                  </button>
                  <button
                    onClick={() => setActiveImpactTab('lessons')}
                    className={`py-1.5 rounded-xl transition-all ${
                      activeImpactTab === 'lessons'
                        ? 'bg-white text-obsidian-950 shadow-xs'
                        : 'text-obsidian-500 hover:text-obsidian-900'
                    }`}
                  >
                    Lecciones
                  </button>
                </div>

                {/* Tab 1: Operaciones */}
                {activeImpactTab === 'operations' && (
                  <div className="space-y-3 animate-fadeIn text-xs">
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="bg-pastel-50/60 p-3.5 rounded-2xl border border-pastel-100">
                        <span className="text-[10px] uppercase font-bold text-obsidian-400 block">Ventas Reales Totales</span>
                        <span className="text-xl font-black text-obsidian-950 font-mono">
                          {currentStory.consequences.operationalImpact.unitsSold.toLocaleString('es-ES')} uds
                        </span>
                        <span className="text-[10px] text-pastel-700 block font-semibold mt-0.5">
                          Producción: {currentStory.consequences.operationalImpact.unitsProduced.toLocaleString('es-ES')} uds
                        </span>
                      </div>

                      <div className="bg-pastel-50/60 p-3.5 rounded-2xl border border-pastel-100">
                        <span className="text-[10px] uppercase font-bold text-obsidian-400 block">Ocupación Fábrica</span>
                        <span className="text-xl font-black text-emerald-700 font-mono">
                          {currentStory.consequences.operationalImpact.utilizationRate.toFixed(1)}%
                        </span>
                        <span className="text-[10px] text-emerald-800 block font-semibold mt-0.5">
                          Sin incidencias técnicas
                        </span>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-pastel-200 space-y-1.5">
                      <span className="font-bold text-obsidian-900 block text-xs">
                        Dictamen de Eficiencia Operativa:
                      </span>
                      <p className="text-obsidian-600 leading-relaxed text-xs">
                        {currentStory.consequences.operationalImpact.operationalVerdict}
                      </p>
                    </div>
                  </div>
                )}

                {/* Tab 2: Finanzas */}
                {activeImpactTab === 'finance' && (
                  <div className="space-y-3 animate-fadeIn text-xs">
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="bg-pastel-50/60 p-3.5 rounded-2xl border border-pastel-100">
                        <span className="text-[10px] uppercase font-bold text-obsidian-400 block">Facturación Neta</span>
                        <span className="text-xl font-black text-obsidian-950 font-mono">
                          {formatCurrency(currentStory.consequences.financialImpact.totalRevenue)}
                        </span>
                      </div>

                      <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-200">
                        <span className="text-[10px] uppercase font-bold text-emerald-800 block">Margen Bruto</span>
                        <span className="text-xl font-black text-emerald-800 font-mono">
                          {currentStory.consequences.financialImpact.grossMargin.toFixed(1)}%
                        </span>
                        <span className="text-[10px] text-emerald-900 block font-semibold mt-0.5">
                          {formatCurrency(currentStory.consequences.financialImpact.grossProfit)}
                        </span>
                      </div>
                    </div>

                    <div className="bg-rose-50/60 p-4 rounded-2xl border border-rose-200 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-rose-800 text-xs">Crédito Extraordinario al Cierre:</span>
                        <span className="font-mono font-black text-rose-700 text-sm">
                          {formatCurrency(currentStory.consequences.financialImpact.extraordinaryCredit)}
                        </span>
                      </div>
                      <p className="text-[11px] text-rose-950 mt-1">
                        {currentStory.consequences.financialImpact.financialVerdict}
                      </p>
                    </div>
                  </div>
                )}

                {/* Tab 3: Mercado */}
                {activeImpactTab === 'market' && (
                  <div className="space-y-3 animate-fadeIn text-xs">
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="bg-pastel-50/60 p-3.5 rounded-2xl border border-pastel-100">
                        <span className="text-[10px] uppercase font-bold text-obsidian-400 block">Valor Acción</span>
                        <span className="text-xl font-black text-obsidian-950 font-mono">
                          {currentStory.consequences.competitiveImpact.endingSharePrice.toFixed(1)} pts
                        </span>
                        <span className={`text-[10px] font-bold block mt-0.5 ${
                          currentStory.consequences.competitiveImpact.sharePriceDelta >= 0 ? 'text-emerald-700' : 'text-rose-600'
                        }`}>
                          {currentStory.consequences.competitiveImpact.sharePriceDelta >= 0 ? '+' : ''}
                          {currentStory.consequences.competitiveImpact.sharePriceDelta.toFixed(1)} pts en la ronda
                        </span>
                      </div>

                      <div className="bg-pastel-50/60 p-3.5 rounded-2xl border border-pastel-100">
                        <span className="text-[10px] uppercase font-bold text-obsidian-400 block">Ranking por Valor</span>
                        <span className="text-xl font-black text-pastel-700 font-mono">
                          #{currentStory.consequences.competitiveImpact.marketRank} de 7
                        </span>
                        <span className="text-[10px] text-obsidian-500 block font-semibold mt-0.5">
                          Cuota: {currentStory.consequences.competitiveImpact.marketShare.toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-pastel-200 space-y-1">
                      <span className="font-bold text-obsidian-900 block text-xs">Movimientos en el Mercado:</span>
                      <p className="text-obsidian-600 leading-relaxed text-xs">
                        {currentStory.consequences.competitiveImpact.competitorMovements}
                      </p>
                    </div>
                  </div>
                )}

                {/* Tab 4: Lecciones */}
                {activeImpactTab === 'lessons' && (
                  <div className="space-y-3 animate-fadeIn text-xs">
                    <div className="bg-amber-50/80 p-5 rounded-2xl border border-amber-200/90 space-y-2">
                      <div className="flex items-center gap-2 font-extrabold text-amber-900 text-xs">
                        <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>Reflexión Directiva & Auditoría para el Comité ({currentStory.year})</span>
                      </div>
                      <p className="text-amber-950 leading-relaxed text-xs">
                        {currentStory.consequences.lessonsLearned}
                      </p>
                    </div>
                  </div>
                )}

              </div>

              {/* Navigation Footer for next/prev period */}
              <div className="pt-3 border-t border-pastel-100 flex items-center justify-between text-xs">
                <button
                  onClick={() => onSelectPeriod(Math.max(1, selectedPeriod - 1))}
                  disabled={selectedPeriod <= 1}
                  className="px-3 py-1.5 rounded-xl border border-pastel-200 text-obsidian-600 hover:bg-pastel-50 disabled:opacity-40 disabled:cursor-not-allowed font-semibold"
                >
                  ← Ronda Anterior
                </button>
                <span className="font-mono text-obsidian-400 text-[11px]">
                  Ronda {selectedPeriod} de {dataset.periods.length} ({currentStory.year})
                </span>
                <button
                  onClick={() => onSelectPeriod(Math.min(dataset.periods.length, selectedPeriod + 1))}
                  disabled={selectedPeriod >= dataset.periods.length}
                  className="px-3 py-1.5 rounded-xl bg-pastel-500 text-white font-bold hover:bg-pastel-600 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
                >
                  Siguiente Ronda →
                </button>
              </div>

            </div>

          </div>
        </>
      ) : (
        /* ========================================================
            MODO MATRIZ COMPARATIVA DE 4 AÑOS (2026 - 2029)
           ======================================================== */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pastel-200/90 shadow-sm space-y-4">
          <div className="border-b border-pastel-100 pb-3">
            <h3 className="font-extrabold text-base text-obsidian-950">
              Matriz Comparativa Transversal de Decisiones (2026–2029)
            </h3>
            <p className="text-xs text-obsidian-500">
              Auditoría cronológica lado a lado de la evolución de precios, canal, incentivos, balance y resultados de FashionClub.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-pastel-200 text-obsidian-400 uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4 font-bold">Variable Decisional / Métrica</th>
                  <th className="py-3 px-4 font-bold">2026 (Ronda 1)</th>
                  <th className="py-3 px-4 font-bold">2027 (Ronda 2)</th>
                  <th className="py-3 px-4 font-bold">2028 (Ronda 3)</th>
                  <th className="py-3 px-4 font-bold">2029 (Cierre)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pastel-100 text-obsidian-800">
                <tr className="bg-pastel-50/50 font-bold text-obsidian-950">
                  <td colSpan={5} className="py-2 px-4 text-pastel-800 uppercase text-[10px] tracking-wider">
                    Eje Comercial & Precios
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-medium">Precio Corbatas (Estándar)</td>
                  <td className="py-2.5 px-4 font-mono">16,20 €</td>
                  <td className="py-2.5 px-4 font-mono">16,30 €</td>
                  <td className="py-2.5 px-4 font-mono font-bold text-pastel-700">16,50 €</td>
                  <td className="py-2.5 px-4 font-mono font-bold text-pastel-700">16,50 €</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-medium">Precio Bufandas (Premium)</td>
                  <td className="py-2.5 px-4 font-mono">27,90 €</td>
                  <td className="py-2.5 px-4 font-mono font-bold text-emerald-700">28,10 €</td>
                  <td className="py-2.5 px-4 font-mono font-bold text-emerald-700">28,10 €</td>
                  <td className="py-2.5 px-4 font-mono font-bold text-emerald-700">28,10 €</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-medium">Precio Calcetines</td>
                  <td className="py-2.5 px-4 font-mono">2,90 €</td>
                  <td className="py-2.5 px-4 font-mono">3,00 €</td>
                  <td className="py-2.5 px-4 font-mono">3,00 €</td>
                  <td className="py-2.5 px-4 font-mono">3,00 €</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-medium">Descuento al Canal Comercial</td>
                  <td className="py-2.5 px-4 font-mono">13,0%</td>
                  <td className="py-2.5 px-4 font-mono">13,0%</td>
                  <td className="py-2.5 px-4 font-mono font-bold text-emerald-700">12,0%</td>
                  <td className="py-2.5 px-4 font-mono font-bold text-emerald-700">12,0%</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-medium">Incentivos Ventas (Comisiones)</td>
                  <td className="py-2.5 px-4 font-mono text-obsidian-400">0%</td>
                  <td className="py-2.5 px-4 font-mono text-obsidian-400">0%</td>
                  <td className="py-2.5 px-4 font-mono font-bold text-pastel-700">3,5% / 4% / 2,5%</td>
                  <td className="py-2.5 px-4 font-mono font-bold text-pastel-700">3,5% / 4% / 2,5%</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-medium">Presupuesto de Marketing</td>
                  <td className="py-2.5 px-4 font-mono">185.000 €</td>
                  <td className="py-2.5 px-4 font-mono">110.000 €</td>
                  <td className="py-2.5 px-4 font-mono">120.000 €</td>
                  <td className="py-2.5 px-4 font-mono">120.000 €</td>
                </tr>

                <tr className="bg-pastel-50/50 font-bold text-obsidian-950">
                  <td colSpan={5} className="py-2 px-4 text-pastel-800 uppercase text-[10px] tracking-wider">
                    Eje Producción & Gama
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-medium">Catálogo Corbatas / Bufandas / Calcetines</td>
                  <td className="py-2.5 px-4 font-mono">15 / 7 / 5</td>
                  <td className="py-2.5 px-4 font-mono">13 / 7 / 5</td>
                  <td className="py-2.5 px-4 font-mono font-bold text-pastel-700">12 / 7 / 5</td>
                  <td className="py-2.5 px-4 font-mono font-bold text-pastel-700">12 / 7 / 5</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-medium">Ocupación de Bufandas</td>
                  <td className="py-2.5 px-4 font-mono">90,0%</td>
                  <td className="py-2.5 px-4 font-mono">90,0%</td>
                  <td className="py-2.5 px-4 font-mono font-bold text-emerald-700">91,7%</td>
                  <td className="py-2.5 px-4 font-mono font-bold text-emerald-700">91,7%</td>
                </tr>

                <tr className="bg-pastel-50/50 font-bold text-obsidian-950">
                  <td colSpan={5} className="py-2 px-4 text-pastel-800 uppercase text-[10px] tracking-wider">
                    Consecuencias Financieras & Competitivas
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-medium">Facturación Neta Anual</td>
                  <td className="py-2.5 px-4 font-mono">3.404.863 €</td>
                  <td className="py-2.5 px-4 font-mono">3.450.661 €</td>
                  <td className="py-2.5 px-4 font-mono">3.532.401 €</td>
                  <td className="py-2.5 px-4 font-mono font-black text-obsidian-950">3.561.899 €</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-medium">Margen Bruto Comercial</td>
                  <td className="py-2.5 px-4 font-mono">33,7%</td>
                  <td className="py-2.5 px-4 font-mono">32,0%</td>
                  <td className="py-2.5 px-4 font-mono font-bold text-emerald-700">35,8%</td>
                  <td className="py-2.5 px-4 font-mono font-black text-emerald-700">39,5% (Récord)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-medium">Unidades Vendidas Exactas</td>
                  <td className="py-2.5 px-4 font-mono">244.434 uds</td>
                  <td className="py-2.5 px-4 font-mono">245.245 uds</td>
                  <td className="py-2.5 px-4 font-mono">244.018 uds</td>
                  <td className="py-2.5 px-4 font-mono font-black text-obsidian-950">247.270 uds</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-medium text-rose-700 font-bold">Crédito Extraordinario Acumulado</td>
                  <td className="py-2.5 px-4 font-mono text-rose-700">1.327.680 €</td>
                  <td className="py-2.5 px-4 font-mono text-rose-700">1.612.439 €</td>
                  <td className="py-2.5 px-4 font-mono text-rose-700">2.499.420 €</td>
                  <td className="py-2.5 px-4 font-mono font-black text-rose-700">5.518.020 €</td>
                </tr>
                <tr className="bg-pastel-100/70 font-extrabold text-obsidian-950">
                  <td className="py-3 px-4">Valor de la Compañía (Puntos)</td>
                  <td className="py-3 px-4 font-mono">2.360,3 (#4)</td>
                  <td className="py-3 px-4 font-mono text-pastel-700">2.373,1 (#4 Pico)</td>
                  <td className="py-3 px-4 font-mono">2.288,2 (#3)</td>
                  <td className="py-3 px-4 font-mono font-black">2.231,9 (#4)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
