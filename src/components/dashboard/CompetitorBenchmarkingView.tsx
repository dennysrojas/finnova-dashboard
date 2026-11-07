'use client';

import React, { useState } from 'react';
import { SimulationDataset } from '../../types/corbatul';
import { calculateBenchmarkingMetrics } from '../../lib/analytics';
import { 
  Target, 
  Award, 
  BarChart2, 
  TrendingUp, 
  ArrowUpDown,
  CheckCircle2,
  Users,
  ShieldCheck,
  Percent,
  Layers
} from 'lucide-react';

interface CompetitorBenchmarkingViewProps {
  dataset: SimulationDataset;
  selectedPeriod: number;
}

type SortField = 'sharePrice' | 'unitsSold' | 'totalRevenue' | 'grossMargin' | 'liquidityRatio';

export const CompetitorBenchmarkingView: React.FC<CompetitorBenchmarkingViewProps> = ({
  dataset,
  selectedPeriod,
}) => {
  const [sortField, setSortField] = useState<SortField>('sharePrice');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  const competitorsWithMetrics = calculateBenchmarkingMetrics(dataset.competitors, selectedPeriod);

  const sortedList = [...competitorsWithMetrics].sort((a, b) => {
    const valA = (a as any)[sortField] || 0;
    const valB = (b as any)[sortField] || 0;
    return sortAsc ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const formatCurrency = (val: number) => `${Math.round(val).toLocaleString('es-ES')} €`;

  const year = 2025 + selectedPeriod;

  // Exact rankings per period strictly satisfying Correction 41
  const rankingsByYear: Record<number, {
    valueRank: string;
    unitsRank: string;
    marginRank: string;
    headerBanner: string;
    conclusion: React.ReactNode;
  }> = {
    1: {
      valueRank: '#4 (2.360,3 pts)',
      unitsRank: '#4 (244.434 uds)',
      marginRank: '#4 (33,7 %)',
      headerBanner: 'FashionClub: 4.º lugar en Valor de Compañía (2.360,3 pts) y 244.434 unidades vendidas',
      conclusion: (
        <p className="leading-relaxed">
          En 2026, FashionClub se posicionó en el <strong>cuarto lugar</strong> en valor de compañía (2.360,3 puntos), por detrás de Spain10 (2.514,3 pts), Stuart20 (2.416,2 pts) y Roura1940 (2.387,6 pts). En volumen de ventas alcanzó <strong>244.434 unidades</strong> con una facturación de <strong>3.404.863 €</strong> y un margen bruto del <strong>33,7 %</strong>.
        </p>
      )
    },
    2: {
      valueRank: '#4 (2.373,1 pts)',
      unitsRank: '#4 (245.245 uds)',
      marginRank: '#4 (32,0 %)',
      headerBanner: 'FashionClub: 4.º lugar en Valor de Compañía (2.373,1 pts) con 245.245 uds y 16,6 % cuota',
      conclusion: (
        <p className="leading-relaxed">
          En 2027, FashionClub mantuvo el <strong>cuarto lugar</strong> en valor de compañía con 2.373,1 puntos. Las ventas ascendieron a <strong>245.245 unidades</strong> (16,6 % de cuota de mercado en volumen) y los ingresos a <strong>3.450.661 €</strong> con un margen bruto comercial del <strong>32,0 %</strong>.
        </p>
      )
    },
    3: {
      valueRank: '#3 (2.288,2 pts)',
      unitsRank: '#4 (244.018 uds)',
      marginRank: '#4 (35,8 %)',
      headerBanner: 'FashionClub: 3.º lugar en Valor de Compañía (2.288,2 pts) con 244.018 uds y 35,8 % margen',
      conclusion: (
        <p className="leading-relaxed">
          En 2028, FashionClub avanzó al <strong>tercer lugar</strong> en valor de compañía (2.288,2 puntos). Registró unas ventas de <strong>244.018 unidades</strong> con una facturación de <strong>3.532.401 €</strong> y elevó su margen bruto al <strong>35,8 %</strong>.
        </p>
      )
    },
    4: {
      valueRank: '#4 (2.231,9 pts)',
      unitsRank: '#4 (247.270 uds)',
      marginRank: '#4 (39,5 %)',
      headerBanner: 'FashionClub: 4.º lugar en Unidades Vendidas (247.270 uds) y 4.º lugar en Margen Bruto (39,5 %)',
      conclusion: (
        <div className="space-y-2">
          <p className="leading-relaxed">
            FashionClub ocupa el <strong>cuarto lugar en ventas por unidades</strong> dentro del mercado general (247.270 unidades), situándose por detrás de: 1. PuntoOne (397.841 uds), 2. SmartOne (333.869 uds) y 3. Stuart20 (269.527 uds), y por delante de Roura1940 (239.536 uds), Spain10 (178.259 uds) y RealMan (64.504 uds).
          </p>
          <p className="leading-relaxed">
            FashionClub alcanzó su <strong>mejor margen bruto histórico, situándolo en 39,5 %</strong>. Sin embargo, dentro de la comparación de las siete empresas, ocupa el <strong>cuarto lugar en margen bruto</strong>, por detrás de Stuart20 (53,2 %), PuntoOne (46,6 %) y Roura1940 (44,2 %).
          </p>
        </div>
      )
    }
  };

  const currentInfo = rankingsByYear[selectedPeriod] || rankingsByYear[4];

  return (
    <div className="space-y-6 w-full animate-fadeIn">
      
      {/* Top Banner */}
      <div className="bg-white border border-pastel-200/90 rounded-3xl p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wider uppercase font-extrabold bg-pastel-100 text-pastel-800 border border-pastel-200">
                Radar de Mercado & Competidores
              </span>
              <span className="text-xs text-obsidian-500 font-mono">
                Ejercicio P{selectedPeriod} ({year})
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-obsidian-950">
              Benchmarking Multidimensional de la Industria (7 Firmas)
            </h2>
            <p className="text-xs sm:text-sm text-obsidian-600 mt-1 max-w-3xl leading-relaxed">
              Comparativa con tres clasificaciones diferenciadas: Valor de compañía, Volumen de unidades vendidas y Margen bruto porcentual.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-pastel-100 text-pastel-800 font-bold px-3 py-1.5 rounded-xl border border-pastel-200">
              {currentInfo.headerBanner}
            </span>
          </div>
        </div>
      </div>

      {/* Differentiated Rankings Triple Badges (Correction 41) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-pastel-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-pastel-100 flex items-center justify-center text-pastel-700 shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-obsidian-400 block">
              1. Por Valor de Compañía
            </span>
            <span className="text-sm font-extrabold text-obsidian-950">
              {currentInfo.valueRank}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-pastel-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-obsidian-400 block">
              2. Por Unidades Vendidas
            </span>
            <span className="text-sm font-extrabold text-obsidian-950">
              {currentInfo.unitsRank}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-pastel-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700 shrink-0">
            <Percent className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-obsidian-400 block">
              3. Por Margen Bruto
            </span>
            <span className="text-sm font-extrabold text-obsidian-950">
              {currentInfo.marginRank}
            </span>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pastel-200/90 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-pastel-100 pb-3">
          <h3 className="font-extrabold text-base text-obsidian-950">
            Clasificación Oficial y Métricas Clave de la Industria ({year})
          </h3>
          <span className="text-[11px] text-obsidian-400">
            Haz clic en los encabezados de columna para reordenar
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-pastel-200 text-obsidian-400 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 font-bold">Firma Competidora</th>
                <th 
                  onClick={() => handleSort('sharePrice')}
                  className="py-3 px-4 font-bold cursor-pointer hover:text-pastel-600 transition-colors"
                >
                  <div className="flex items-center space-x-1">
                    <span>Valor Compañía</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('unitsSold')}
                  className="py-3 px-4 font-bold cursor-pointer hover:text-pastel-600 transition-colors"
                >
                  <div className="flex items-center space-x-1">
                    <span>Unidades Vendidas</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('totalRevenue')}
                  className="py-3 px-4 font-bold cursor-pointer hover:text-pastel-600 transition-colors"
                >
                  <div className="flex items-center space-x-1">
                    <span>Facturación</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('grossMargin')}
                  className="py-3 px-4 font-bold cursor-pointer hover:text-pastel-600 transition-colors"
                >
                  <div className="flex items-center space-x-1">
                    <span>Margen Bruto %</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('liquidityRatio')}
                  className="py-3 px-4 font-bold cursor-pointer hover:text-pastel-600 transition-colors"
                >
                  <div className="flex items-center space-x-1">
                    <span>Ratio Liquidez</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pastel-100 text-obsidian-800">
              {sortedList.map((firm) => {
                const isOur = firm.isOurFirm;
                return (
                  <tr 
                    key={firm.firmId}
                    className={`transition-colors ${
                      isOur 
                        ? 'bg-pastel-100/80 font-bold border-l-4 border-l-pastel-500' 
                        : 'hover:bg-pastel-50/50'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-extrabold text-obsidian-950 flex items-center space-x-2.5">
                      <span className={`w-2.5 h-2.5 rounded-full ${isOur ? 'bg-pastel-500 ring-2 ring-pastel-300' : 'bg-obsidian-300'}`}></span>
                      <span>{firm.firmName}</span>
                      {isOur && (
                        <span className="text-[10px] bg-pastel-500 text-white px-2 py-0.5 rounded-full font-bold ml-2">
                          Finnova
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-black text-sm text-obsidian-950">
                      {firm.sharePrice.toFixed(1)} pts
                    </td>
                    <td className="py-3.5 px-4 font-mono">
                      {firm.unitsSold.toLocaleString('es-ES')} uds <span className="text-[10px] text-obsidian-400">({(firm.marketShareUnits * 100).toFixed(1)}%)</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold">
                      {formatCurrency(firm.totalRevenue)}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold">
                      <span className={`px-2 py-0.5 rounded-full ${
                        firm.grossMargin >= 0.4 
                          ? 'bg-emerald-50 text-emerald-700' 
                          : firm.grossMargin >= 0.2 
                            ? 'bg-pastel-50 text-pastel-700' 
                            : 'bg-rose-50 text-rose-700'
                      }`}>
                        {(firm.grossMargin * 100).toFixed(1)}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono">
                      {firm.liquidityRatio?.toFixed(1) || '0.0'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Benchmarking Narrative / Conclusiones Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-pastel-200/90 shadow-sm space-y-3">
        <div className="flex items-center gap-2 border-b border-pastel-100 pb-2.5 text-obsidian-950">
          <Target className="w-5 h-5 text-pastel-600" />
          <h4 className="font-extrabold text-sm">
            Conclusiones del Benchmarking Competitivo ({year})
          </h4>
        </div>
        <div className="text-xs text-obsidian-700">
          {currentInfo.conclusion}
        </div>
      </div>

    </div>
  );
};
