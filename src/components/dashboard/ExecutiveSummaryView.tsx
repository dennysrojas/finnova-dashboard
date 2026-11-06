'use client';

import React from 'react';
import { SimulationDataset } from '../../types/corbatul';
import { getExecutiveScorecard } from '../../lib/analytics';
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownRight,
  Activity,
  Zap,
  Award,
  Sparkles,
  BarChart3,
  Layers,
  Target
} from 'lucide-react';

interface ExecutiveSummaryViewProps {
  dataset: SimulationDataset;
  selectedPeriod: number;
}

export const ExecutiveSummaryView: React.FC<ExecutiveSummaryViewProps> = ({
  dataset,
  selectedPeriod
}) => {
  const scorecard = getExecutiveScorecard(dataset, selectedPeriod);
  const currentFin = dataset.financials.find(f => f.period === selectedPeriod && f.firmId === dataset.meta.primaryFirmId);
  const currentComp = dataset.competitors.find(c => c.period === selectedPeriod && c.firmId === dataset.meta.primaryFirmId);

  const formatCurrency = (val: number) => `${Math.round(val).toLocaleString('es-ES')} €`;
  const formatPercent = (val: number) => `${val.toFixed(1)}%`;
  const formatDelta = (val: number, isPercent = true) => {
    const sign = val > 0 ? '+' : '';
    return `${sign}${val.toFixed(1)}${isPercent ? '%' : ''}`;
  };

  const components7 = [
    { name: "Resultados Económicos", score: 705, mean: 873, status: "Ajustado por gastos de estructura" },
    { name: "Patrimonio - Solvencia", score: 173, mean: 212, status: "Impactado por crédito extraordinario" },
    { name: "Valor de Marca", score: 206, mean: 219, status: "Posicionamiento estable en canal retail" },
    { name: "Valor Producto + Distribución", score: 342, mean: 331, status: "Superior a la media del mercado", isTop: true },
    { name: "Presupuestación - Resultados", score: 426, mean: 311, status: "Excelente precisión en previsión", isTop: true },
    { name: "Presupuestación - Balance", score: 281, mean: 231, status: "Alta disciplina de balance", isTop: true },
    { name: "Participación de Mercado", score: 100, mean: 106, status: "14.3% de cuota global (#2 en unidades)" }
  ];

  return (
    <div className="space-y-6 w-full animate-fadeIn">
      
      {/* Top Banner / Minimalist Executive Card */}
      <div className="bg-white border border-pastel-200/90 rounded-3xl p-6 sm:p-7 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wider uppercase font-extrabold bg-pastel-100 text-pastel-800 border border-pastel-200">
                FashionClub · FINNOVA
              </span>
              <span className="text-xs text-obsidian-500 font-mono">
                Ejercicio P{selectedPeriod} ({2025 + selectedPeriod})
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                Simulación Corbatul
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-obsidian-950">
              Sala de Juntas Directiva & Creación de Valor
            </h2>
            <p className="text-xs sm:text-sm text-obsidian-600 mt-1 max-w-3xl leading-relaxed">
              Auditoría y balance directivo de la firma FashionClub frente a los 6 competidores en la simulación Corbatul.
            </p>
          </div>

          <div className="flex items-center gap-5 bg-pastel-50/70 px-5 py-4 rounded-2xl border border-pastel-200">
            <div className="text-right">
              <div className="text-[10px] text-obsidian-400 uppercase tracking-wider font-bold">Valor Firma</div>
              <div className="text-2xl sm:text-3xl font-mono font-black text-pastel-600 tabular-nums">
                {scorecard.sharePrice.toFixed(1)} <span className="text-xs text-obsidian-400 font-normal">pts</span>
              </div>
            </div>
            <div className="h-9 w-px bg-pastel-200" />
            <div className="text-left">
              <div className="text-[10px] text-obsidian-400 uppercase tracking-wider font-bold">Posición</div>
              <div className="text-2xl sm:text-3xl font-mono font-black text-obsidian-950 tabular-nums">
                #{scorecard.rankBySharePrice} <span className="text-xs text-obsidian-400 font-normal">de 7</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {/* Card 1: Ingresos */}
        <div className="bg-white border border-pastel-200/90 rounded-2xl p-5 shadow-xs hover:shadow-sunset transition-all">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-obsidian-400">Facturación Anual</span>
            <span className={`text-[11px] font-mono font-bold flex items-center ${
              scorecard.revenueGrowth >= 0 ? 'text-emerald-700' : 'text-rose-600'
            }`}>
              {scorecard.revenueGrowth >= 0 ? <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
              {formatDelta(scorecard.revenueGrowth)}
            </span>
          </div>
          <div className="text-2xl font-black text-obsidian-950 font-mono tabular-nums">
            {formatCurrency(scorecard.totalRevenue)}
          </div>
          <div className="text-[11px] text-obsidian-500 mt-2 flex items-center justify-between">
            <span>Cuota de mercado:</span>
            <strong className="text-obsidian-800">{scorecard.marketShare.toFixed(1)}% (#2 uds)</strong>
          </div>
        </div>

        {/* Card 2: Margen Bruto */}
        <div className="bg-white border border-pastel-200/90 rounded-2xl p-5 shadow-xs hover:shadow-sunset transition-all">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-obsidian-400">Margen Comercial Bruto</span>
            <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              Récord
            </span>
          </div>
          <div className="text-2xl font-black text-emerald-700 font-mono tabular-nums">
            {scorecard.grossMargin.toFixed(1)}%
          </div>
          <div className="text-[11px] text-obsidian-500 mt-2 flex items-center justify-between">
            <span>Bufandas (estrella):</span>
            <strong className="text-emerald-700 font-bold">52.3% mg</strong>
          </div>
        </div>

        {/* Card 3: Unidades Vendidas */}
        <div className="bg-white border border-pastel-200/90 rounded-2xl p-5 shadow-xs hover:shadow-sunset transition-all">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-obsidian-400">Volumen de Producción</span>
            <span className="text-[11px] font-mono font-bold text-pastel-700 bg-pastel-100 px-1.5 py-0.5 rounded border border-pastel-200">
              #2 Industria
            </span>
          </div>
          <div className="text-2xl font-black text-obsidian-950 font-mono tabular-nums">
            247,270 <span className="text-xs font-normal text-obsidian-400">uds</span>
          </div>
          <div className="text-[11px] text-obsidian-500 mt-2 flex items-center justify-between">
            <span>Ocupación de planta:</span>
            <strong className="text-obsidian-800">{scorecard.capacityUtilization.toFixed(1)}%</strong>
          </div>
        </div>

        {/* Card 4: Crédito Extraordinario */}
        <div className="bg-white border border-pastel-200/90 rounded-2xl p-5 shadow-xs hover:shadow-sunset transition-all">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">Crédito Extraordinario</span>
            <span className="text-[11px] font-mono font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
              Alerta
            </span>
          </div>
          <div className="text-2xl font-black text-rose-700 font-mono tabular-nums">
            {formatCurrency(scorecard.extraordinaryCredit)}
          </div>
          <div className="text-[11px] text-rose-900 mt-2 flex items-center justify-between">
            <span>Saldo pasivo corriente:</span>
            <strong className="text-rose-800 font-mono">Drenaje de tesorería</strong>
          </div>
        </div>
      </div>

      {/* 7 Value Drivers Breakdown Table */}
      <div className="bg-white border border-pastel-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
        <div className="border-b border-pastel-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-extrabold text-obsidian-950 flex items-center gap-2">
              <Target className="w-5 h-5 text-pastel-500" />
              Desglose de los 7 Componentes del Algoritmo de Valoración Corbatul
            </h3>
            <p className="text-xs text-obsidian-500">
              Comparativa de la puntuación de FashionClub frente a la media ponderada del mercado.
            </p>
          </div>
          <span className="text-xs bg-pastel-100 text-pastel-800 font-bold px-3 py-1 rounded-full border border-pastel-200 self-start sm:self-auto">
            Auditoría Oficial
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {components7.map((item, idx) => {
            const isAbove = item.score >= item.mean;
            return (
              <div 
                key={item.name}
                className="bg-pastel-50/50 p-4 rounded-2xl border border-pastel-100 hover:bg-white hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-obsidian-400">Pilar 0{idx + 1}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isAbove ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {isAbove ? `+${item.score - item.mean} vs media` : `${item.score - item.mean} vs media`}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-xs text-obsidian-900 mb-1">{item.name}</h4>
                  <div className="flex items-baseline space-x-2 my-2">
                    <span className="text-2xl font-black text-obsidian-950 font-mono">{item.score}</span>
                    <span className="text-xs text-obsidian-400">pts (Media: {item.mean})</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-pastel-100 text-[11px] text-obsidian-500">
                  {item.status}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
