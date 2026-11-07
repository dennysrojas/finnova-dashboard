'use client';

import React from 'react';
import { SimulationDataset } from '../../types/corbatul';
import { getExecutiveScorecard } from '../../lib/analytics';
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownRight,
  AlertTriangle,
  Award,
  Sparkles,
  BarChart3,
  Layers,
  Target,
  ShieldAlert,
  Wallet,
  Landmark
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
  const currentYear = scorecard.year;

  const formatCurrency = (val: number) => `${Math.round(val).toLocaleString('es-ES')} €`;
  const formatDelta = (val: number, isPercent = true) => {
    const sign = val > 0 ? '+' : '';
    return `${sign}${val.toFixed(1)}${isPercent ? '%' : ''}`;
  };

  // 7 Componentes específicos y reactivos al año seleccionado (Correcciones 5, 14, 20, 39)
  const components7 = dataset.valuationComponentsByYear?.[currentYear] || [
    { parameter: "Resultados Económicos", score: 705, industryMean: 873, status: "Ajustado por costes" },
    { parameter: "Patrimonio - Solvencia", score: 173, industryMean: 212, status: "Presión de deuda" },
    { parameter: "Valor de Marca", score: 206, industryMean: 219, status: "Posicionamiento estable" },
    { parameter: "Valor Producto + Distribución", score: 342, industryMean: 331, status: "Superior a la media", isTop: true },
    { parameter: "Presupuestación - Resultados", score: 426, industryMean: 311, status: "Precisión destacada", isTop: true },
    { parameter: "Presupuestación - Balance", score: 281, industryMean: 231, status: "Alta disciplina", isTop: true },
    { parameter: "Participación de Mercado", score: 100, industryMean: 106, status: "Cuota sectorial" }
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
                Ejercicio P{selectedPeriod} ({currentYear})
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                Simulación Corbatul
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-obsidian-950">
              Sala de Juntas Directiva & Creación de Valor
            </h2>
            <p className="text-xs sm:text-sm text-obsidian-600 mt-1 max-w-3xl leading-relaxed">
              Auditoría y balance directivo de la firma FashionClub frente a los 6 competidores en la simulación Corbatul (Ejercicio {currentYear}).
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

      {/* KPI Cards Grid - Reactivo al año seleccionado (Correcciones 3, 12, 38) */}
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
            <strong className="text-obsidian-800">{scorecard.marketShare.toFixed(1)}%</strong>
          </div>
        </div>

        {/* Card 2: Margen Bruto */}
        <div className="bg-white border border-pastel-200/90 rounded-2xl p-5 shadow-xs hover:shadow-sunset transition-all">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-obsidian-400">Margen Comercial Bruto</span>
            <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              {currentYear}
            </span>
          </div>
          <div className="text-2xl font-black text-emerald-700 font-mono tabular-nums">
            {scorecard.grossMargin.toFixed(1)}%
          </div>
          <div className="text-[11px] text-obsidian-500 mt-2 flex items-center justify-between">
            <span>Margen monetario:</span>
            <strong className="text-emerald-700 font-mono font-bold">{formatCurrency(scorecard.grossProfit)}</strong>
          </div>
        </div>

        {/* Card 3: Unidades Vendidas */}
        <div className="bg-white border border-pastel-200/90 rounded-2xl p-5 shadow-xs hover:shadow-sunset transition-all">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-obsidian-400">Volumen de Ventas</span>
            <span className="text-[11px] font-mono font-bold text-pastel-700 bg-pastel-100 px-1.5 py-0.5 rounded border border-pastel-200">
              Exactas
            </span>
          </div>
          <div className="text-2xl font-black text-obsidian-950 font-mono tabular-nums">
            {scorecard.unitsSold.toLocaleString('es-ES')} <span className="text-xs font-normal text-obsidian-400">uds</span>
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
              Pasivo
            </span>
          </div>
          <div className="text-2xl font-black text-rose-700 font-mono tabular-nums">
            {formatCurrency(scorecard.extraordinaryCredit)}
          </div>
          <div className="text-[11px] text-rose-900 mt-2 flex items-center justify-between">
            <span>Tesorería disponible:</span>
            <strong className="text-rose-800 font-mono">{formatCurrency(scorecard.cashPosition)}</strong>
          </div>
        </div>
      </div>

      {/* CORRECCIÓN 37: Visibilidad de los riesgos financieros de 2029 */}
      {selectedPeriod === 4 && (
        <div className="bg-gradient-to-br from-rose-50/90 via-white to-amber-50/50 border-2 border-rose-200 rounded-3xl p-6 shadow-sm space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-rose-200/80 pb-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
              <h3 className="text-sm font-extrabold text-rose-950 uppercase tracking-wider">
                Auditoría Especial: Visibilidad de Riesgos Financieros al Cierre (2029)
              </h3>
            </div>
            <span className="text-xs font-bold text-rose-800 bg-rose-100 px-3 py-1 rounded-full border border-rose-300">
              Alerta de Balance Crítica
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            <div className="bg-white p-4 rounded-2xl border border-rose-200 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-rose-700 block tracking-wider mb-1">
                Crédito Extraordinario al Cierre
              </span>
              <div className="text-2xl font-black text-rose-700 font-mono tabular-nums">
                5.518.020 €
              </div>
              <p className="text-[11px] text-rose-900/80 mt-1">
                Deuda automática activada por falta de liquidez en cuenta corriente.
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-rose-200 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-rose-700 block tracking-wider mb-1">
                Tesorería Líquida Disponible
              </span>
              <div className="text-2xl font-black text-rose-700 font-mono tabular-nums">
                0 €
              </div>
              <p className="text-[11px] text-rose-900/80 mt-1">
                Saldo de caja en cero desde la inversión en planta de 2026.
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-rose-200 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-rose-700 block tracking-wider mb-1">
                Patrimonio Neto Publicado
              </span>
              <div className="text-2xl font-black text-rose-700 font-mono tabular-nums">
                -2.085.073 €
              </div>
              <p className="text-[11px] text-rose-900/80 mt-1">
                Fondos propios negativos tras absorber las pérdidas acumuladas.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 7 Value Drivers Breakdown Table - Totalmente Reactivo (Correcciones 5, 14, 20, 39) */}
      <div className="bg-white border border-pastel-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
        <div className="border-b border-pastel-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-extrabold text-obsidian-950 flex items-center gap-2">
              <Target className="w-5 h-5 text-pastel-500" />
              Desglose de los 7 Componentes del Algoritmo de Valoración CORBATUL ({currentYear})
            </h3>
            <p className="text-xs text-obsidian-500">
              Valores auditados específicos del ejercicio {currentYear} frente a la media ponderada de la industria.
            </p>
          </div>
          <span className="text-xs bg-pastel-100 text-pastel-800 font-bold px-3 py-1 rounded-full border border-pastel-200 self-start sm:self-auto">
            Datos Oficiales {currentYear}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {components7.map((item, idx) => {
            const isAbove = item.score >= item.industryMean;
            return (
              <div 
                key={item.parameter}
                className="bg-pastel-50/50 p-4 rounded-2xl border border-pastel-100 hover:bg-white hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-obsidian-400">Pilar 0{idx + 1}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isAbove ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {isAbove ? `+${item.score - item.industryMean} vs media` : `${item.score - item.industryMean} vs media`}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-xs text-obsidian-900 mb-1">{item.parameter}</h4>
                  <div className="flex items-baseline space-x-2 my-2">
                    <span className="text-2xl font-black text-obsidian-950 font-mono">{item.score}</span>
                    <span className="text-xs text-obsidian-400">pts (Media: {item.industryMean})</span>
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
