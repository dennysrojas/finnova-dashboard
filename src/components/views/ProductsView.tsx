'use client';

import React from 'react';
import { 
  ShoppingBag, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  Layers, 
  Sliders, 
  Target,
  BarChart,
  Percent
} from 'lucide-react';
import { FinnovaAnalyticsData } from '../../types';
import { formatCurrency, formatNumber } from '../../lib/data';

interface ProductsViewProps {
  data: FinnovaAnalyticsData;
}

export const ProductsView: React.FC<ProductsViewProps> = ({ data }) => {
  const { products } = data;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-pastel-200 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-obsidian-900 tracking-tight flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-pastel-500" />
            Portafolio de Productos, Márgenes & Eficiencia Fabril
          </h2>
          <p className="text-xs text-obsidian-500">
            Análisis de las 3 líneas de negocio: el motor de ingresos (Corbatas), la estrella de rentabilidad (Bufandas) y el desafío operativo (Calcetines).
          </p>
        </div>
        <span className="text-xs bg-pastel-100 text-pastel-700 font-bold px-3 py-1.5 rounded-xl border border-pastel-200 self-start sm:self-auto">
          Mix Comercial 2029
        </span>
      </div>

      {/* 3 Product Deep-Dive Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {products.map((prod) => {
          const isStar = prod.id === 'bufandas';
          const isVolume = prod.id === 'corbatas';
          const isTurnaround = prod.id === 'calcetines';

          return (
            <div 
              key={prod.id}
              className={`rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between ${
                isStar 
                  ? 'bg-gradient-to-br from-emerald-50/70 via-white to-white border-emerald-200 shadow-md hover:shadow-lg' 
                  : isVolume 
                    ? 'bg-gradient-to-br from-pastel-100/60 via-white to-white border-pastel-300 shadow-sunset hover:shadow-lg' 
                    : 'bg-gradient-to-br from-rose-50/50 via-white to-white border-rose-200 shadow-sm hover:shadow-md'
              }`}
            >
              <div>
                
                {/* Header Tag */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
                    isStar 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : isVolume 
                        ? 'bg-pastel-200 text-pastel-800' 
                        : 'bg-rose-100 text-rose-800'
                  }`}>
                    {prod.role}
                  </span>
                  <span className="text-xs font-bold text-obsidian-400">
                    PVP: {prod.stats2029.price.toFixed(2)} €
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-obsidian-950 mb-1">
                  {prod.name}
                </h3>

                <p className="text-xs text-obsidian-600 mb-4 leading-relaxed">
                  {prod.insight}
                </p>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-2.5 my-4">
                  <div className="bg-white/80 p-3 rounded-2xl border border-pastel-100 shadow-sm">
                    <span className="text-[10px] text-obsidian-400 uppercase font-semibold block">Margen Bruto</span>
                    <span className={`text-xl font-black tabular-nums ${
                      prod.stats2029.marginPct >= 0 ? 'text-emerald-700' : 'text-rose-600'
                    }`}>
                      {prod.stats2029.marginPct > 0 ? `+${prod.stats2029.marginPct}%` : `${prod.stats2029.marginPct}%`}
                    </span>
                  </div>

                  <div className="bg-white/80 p-3 rounded-2xl border border-pastel-100 shadow-sm">
                    <span className="text-[10px] text-obsidian-400 uppercase font-semibold block">Facturación</span>
                    <span className="text-base font-black text-obsidian-950 tabular-nums">
                      {formatCurrency(prod.stats2029.revenue)}
                    </span>
                  </div>

                  <div className="bg-white/80 p-3 rounded-2xl border border-pastel-100 shadow-sm">
                    <span className="text-[10px] text-obsidian-400 uppercase font-semibold block">Ventas</span>
                    <span className="text-base font-bold text-obsidian-900 tabular-nums">
                      {formatNumber(prod.stats2029.salesUnits)} uds
                    </span>
                  </div>

                  <div className="bg-white/80 p-3 rounded-2xl border border-pastel-100 shadow-sm">
                    <span className="text-[10px] text-obsidian-400 uppercase font-semibold block">Ocupación Planta</span>
                    <span className="text-base font-bold text-obsidian-900 tabular-nums">
                      {prod.stats2029.utilization}%
                    </span>
                  </div>
                </div>

                {/* Margin Evolution Sparkline Bar */}
                <div className="bg-white/90 p-4 rounded-2xl border border-pastel-100 mt-4 space-y-2">
                  <span className="text-[11px] font-bold text-obsidian-700 block">
                    Evolución del Margen (2025–2029)
                  </span>

                  <div className="grid grid-cols-5 gap-1.5 text-center">
                    {prod.marginEvolution.map((m) => {
                      const isPositive = m.margin >= 0;
                      return (
                        <div key={m.year} className="flex flex-col items-center">
                          <span className={`text-[10px] font-mono font-bold mb-1 ${
                            isPositive ? 'text-emerald-700' : 'text-rose-600'
                          }`}>
                            {m.margin.toFixed(0)}%
                          </span>
                          <div className="w-full bg-pastel-100 h-8 rounded-md flex items-end p-0.5">
                            <div 
                              className={`w-full rounded ${isPositive ? 'bg-emerald-500' : 'bg-rose-400'}`}
                              style={{ 
                                height: `${Math.min(100, Math.max(15, isPositive ? (m.margin / 60) * 100 : (Math.abs(m.margin) / 60) * 100))}%` 
                              }}
                            ></div>
                          </div>
                          <span className="text-[9px] text-obsidian-400 mt-1 font-semibold">{m.year}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Footer Parameters */}
              <div className="mt-5 pt-3 border-t border-pastel-100 text-xs text-obsidian-500 flex justify-between items-center">
                <span>Catálogo: <strong>{prod.stats2029.catalogRange} modelos</strong></span>
                <span>Incentivo: <strong>{prod.stats2029.salesIncentive}%</strong></span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparative Strategic Matrix Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pastel-200 shadow-sm space-y-4">
        <div className="border-b border-pastel-100 pb-3">
          <h3 className="font-extrabold text-base text-obsidian-900">
            Matriz de Calibración Operativa y Comercial (Cierre 2029)
          </h3>
          <p className="text-xs text-obsidian-500">
            Parámetros aplicados por el equipo Finnova en la ronda de cierre para balancear rentabilidad y rotación.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-pastel-200 text-obsidian-400 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 font-bold">Línea de Producto</th>
                <th className="py-3 px-4 font-bold">Precio Unitario</th>
                <th className="py-3 px-4 font-bold">Ingresos Generados</th>
                <th className="py-3 px-4 font-bold">Margen Comercial</th>
                <th className="py-3 px-4 font-bold">Capacidad Fabril</th>
                <th className="py-3 px-4 font-bold">Ocupación %</th>
                <th className="py-3 px-4 font-bold">Amplitud Gama</th>
                <th className="py-3 px-4 font-bold">Presupuesto Mkt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pastel-100 text-obsidian-800">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-pastel-50/50 transition-colors">
                  <td className="py-3 px-4 font-extrabold text-obsidian-950 flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-pastel-500"></span>
                    <span>{p.name}</span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold">{p.stats2029.price.toFixed(2)} €</td>
                  <td className="py-3 px-4 font-mono font-bold text-obsidian-900">{formatCurrency(p.stats2029.revenue)}</td>
                  <td className="py-3 px-4 font-bold">
                    <span className={`px-2 py-0.5 rounded-full ${
                      p.stats2029.marginPct >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                    }`}>
                      {p.stats2029.marginPct > 0 ? `+${p.stats2029.marginPct}%` : `${p.stats2029.marginPct}%`}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono">{formatNumber(p.stats2029.capacity)} uds</td>
                  <td className="py-3 px-4 font-mono">{p.stats2029.utilization}%</td>
                  <td className="py-3 px-4">{p.stats2029.catalogRange} opciones</td>
                  <td className="py-3 px-4 font-mono">{formatCurrency(p.stats2029.marketingBudget)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
