'use client';

import React, { useState } from 'react';
import { 
  BarChart2, 
  Award, 
  Layers, 
  TrendingUp, 
  Users, 
  DollarSign, 
  ArrowUpDown,
  CheckCircle2
} from 'lucide-react';
import { FinnovaAnalyticsData, CompetitorBenchmark } from '../../types';
import { formatCurrency, formatNumber } from '../../lib/data';

interface BenchmarkViewProps {
  data: FinnovaAnalyticsData;
}

type SortField = 'companyValue' | 'units' | 'revenue' | 'marginPct' | 'liquidity';

export const BenchmarkView: React.FC<BenchmarkViewProps> = ({ data }) => {
  const { benchmarking2029 } = data;
  const [sortField, setSortField] = useState<SortField>('companyValue');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  const sortedList = [...benchmarking2029].sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];
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

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-pastel-200 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-obsidian-900 tracking-tight flex items-center gap-2">
            <BarChart2 className="w-6 h-6 text-pastel-500" />
            Radar Competitivo del Mercado (Las 7 Firmas Textiles · 2029)
          </h2>
          <p className="text-xs text-obsidian-500">
            Comparativa transversal de desempeño frente a todo el ecosistema de la simulación Corbatul.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs bg-pastel-100 text-pastel-700 font-bold px-3 py-1.5 rounded-xl border border-pastel-200">
            Cuota FashionClub: 14.3% (#2 en Unidades)
          </span>
        </div>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-pastel-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-obsidian-400 block tracking-wider mb-1">
            Volumen Industrial
          </span>
          <div className="text-2xl font-black text-obsidian-900 tabular-nums">
            #2 en la Industria
          </div>
          <p className="text-xs text-obsidian-500 mt-1">
            247,270 unidades vendidas, superando a Roura1940 (239k) y Spain10 (178k).
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-pastel-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-obsidian-400 block tracking-wider mb-1">
            Margen Comercial
          </span>
          <div className="text-2xl font-black text-emerald-700 tabular-nums">
            39.50%
          </div>
          <p className="text-xs text-obsidian-500 mt-1">
            Supera ampliamente a SmartOne (25.0%) y RealMan (5.6%).
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-pastel-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-obsidian-400 block tracking-wider mb-1">
            Facturación Neta
          </span>
          <div className="text-2xl font-black text-obsidian-900 tabular-nums">
            3.56M €
          </div>
          <p className="text-xs text-obsidian-500 mt-1">
            Consolidada en el pelotón superior del mercado textil.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-pastel-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-obsidian-400 block tracking-wider mb-1">
            Valoración Final
          </span>
          <div className="text-2xl font-black text-pastel-600 tabular-nums">
            2,231.9 pts
          </div>
          <p className="text-xs text-obsidian-500 mt-1">
            4ª posición en la clasificación global acumulada.
          </p>
        </div>
      </div>

      {/* Main Comparative Interactive Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pastel-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-pastel-100 pb-3">
          <h3 className="font-extrabold text-base text-obsidian-900">
            Tabla Comparativa de Resultados Oficiales (Ronda de Cierre 2029)
          </h3>
          <span className="text-[11px] text-obsidian-400">
            Haz clic en los encabezados para ordenar por columna
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-pastel-200 text-obsidian-400 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 font-bold">Firma Competidora</th>
                <th 
                  onClick={() => handleSort('companyValue')}
                  className="py-3 px-4 font-bold cursor-pointer hover:text-pastel-600 transition-colors"
                >
                  <div className="flex items-center space-x-1">
                    <span>Valor Compañía</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('units')}
                  className="py-3 px-4 font-bold cursor-pointer hover:text-pastel-600 transition-colors"
                >
                  <div className="flex items-center space-x-1">
                    <span>Unidades Vendidas</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('revenue')}
                  className="py-3 px-4 font-bold cursor-pointer hover:text-pastel-600 transition-colors"
                >
                  <div className="flex items-center space-x-1">
                    <span>Ingresos</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('marginPct')}
                  className="py-3 px-4 font-bold cursor-pointer hover:text-pastel-600 transition-colors"
                >
                  <div className="flex items-center space-x-1">
                    <span>Margen %</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('liquidity')}
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
                      <span className={`w-2 h-2 rounded-full ${isOur ? 'bg-pastel-500 ring-2 ring-pastel-300' : 'bg-obsidian-300'}`}></span>
                      <span>{firm.name}</span>
                      {isOur && (
                        <span className="text-[10px] bg-pastel-500 text-white px-2 py-0.5 rounded-full font-bold ml-2">
                          Finnova
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-black text-sm text-obsidian-950">
                      {firm.companyValue.toFixed(1)}
                    </td>
                    <td className="py-3.5 px-4 font-mono">
                      {formatNumber(firm.units)} uds <span className="text-[10px] text-obsidian-400">({firm.marketShare}%)</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold">
                      {formatCurrency(firm.revenue)}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold">
                      <span className={`px-2 py-0.5 rounded-full ${
                        firm.marginPct >= 40 
                          ? 'bg-emerald-50 text-emerald-700' 
                          : firm.marginPct >= 20 
                            ? 'bg-pastel-50 text-pastel-700' 
                            : 'bg-rose-50 text-rose-700'
                      }`}>
                        {firm.marginPct.toFixed(1)}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono">
                      {firm.liquidity.toFixed(1)}
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
