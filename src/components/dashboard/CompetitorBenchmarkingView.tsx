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
  Users
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
                Ejercicio P{selectedPeriod} ({2025 + selectedPeriod})
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-obsidian-950">
              Benchmarking Multidimensional de la Industria (7 Firmas)
            </h2>
            <p className="text-xs sm:text-sm text-obsidian-600 mt-1 max-w-3xl leading-relaxed">
              Comparativa de cuota de mercado, valoración y solidez económica frente al ecosistema textil Corbatul.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-pastel-100 text-pastel-700 font-bold px-3 py-1.5 rounded-xl border border-pastel-200">
              FashionClub: #2 en Unidades (247k)
            </span>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pastel-200/90 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-pastel-100 pb-3">
          <h3 className="font-extrabold text-base text-obsidian-950">
            Clasificación Oficial y Métricas Clave de la Industria
          </h3>
          <span className="text-[11px] text-obsidian-400">
            Haz clic en los encabezados para ordenar
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
                    <span>Margen %</span>
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
                      {firm.unitsSold.toLocaleString()} uds <span className="text-[10px] text-obsidian-400">({(firm.marketShareUnits * 100).toFixed(1)}%)</span>
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

    </div>
  );
};
