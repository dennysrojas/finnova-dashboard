'use client';

import React from 'react';
import { SimulationDataset } from '../../types/corbatul';
import { 
  Layers, 
  ShoppingBag, 
  Factory, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle,
  Package,
  Sliders
} from 'lucide-react';

interface OperationsInventoryViewProps {
  dataset: SimulationDataset;
  selectedPeriod: number;
}

export const OperationsInventoryView: React.FC<OperationsInventoryViewProps> = ({
  dataset,
  selectedPeriod
}) => {
  const currentOps = dataset.operations.find(o => o.period === selectedPeriod && o.firmId === dataset.meta.primaryFirmId);
  const products = currentOps?.products;

  const formatCurrency = (val: number) => `${Math.round(val).toLocaleString('es-ES')} €`;

  if (!currentOps) return null;

  return (
    <div className="space-y-6 w-full animate-fadeIn">
      
      {/* Top Banner */}
      <div className="bg-white border border-pastel-200/90 rounded-3xl p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wider uppercase font-extrabold bg-pastel-100 text-pastel-800 border border-pastel-200">
                Operaciones, Taller & Existencias
              </span>
              <span className="text-xs text-obsidian-500 font-mono">
                Ejercicio P{selectedPeriod} ({currentOps.year || 2025 + selectedPeriod})
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-obsidian-950">
              Gestión Industrial y Rendimiento por Línea de Producto
            </h2>
            <p className="text-xs sm:text-sm text-obsidian-600 mt-1 max-w-3xl leading-relaxed">
              Capacidad nominal, tasa de ocupación de telares y calibración del surtido (Corbatas, Bufandas y Calcetines).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-pastel-50 px-4 py-2.5 rounded-2xl border border-pastel-200 text-right">
              <span className="text-[10px] uppercase font-bold text-obsidian-400 block">Ocupación Planta</span>
              <span className="text-lg font-black text-obsidian-950 font-mono">
                {(currentOps.capacityUtilizationRate * 100).toFixed(1)}%
              </span>
            </div>
            <div className="bg-emerald-50 px-4 py-2.5 rounded-2xl border border-emerald-200 text-right">
              <span className="text-[10px] uppercase font-bold text-emerald-800 block">Ventas Totales</span>
              <span className="text-lg font-black text-emerald-800 font-mono">
                {currentOps.unitsSold.toLocaleString()} uds
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Products Deep-Dive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Bufandas */}
        <div className="bg-gradient-to-br from-emerald-50/70 via-white to-white rounded-3xl p-6 border border-emerald-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
              Joya de Rentabilidad
            </span>
            <span className="text-xs font-mono font-bold text-obsidian-500">
              PVP: {products?.premium.price.toFixed(2) || '28.10'} €
            </span>
          </div>

          <div>
            <h3 className="text-xl font-black text-obsidian-950">Bufandas (Línea Premium)</h3>
            <p className="text-xs text-obsidian-600 mt-1">
              La línea con mayor rentabilidad de Finnova. Se alcanzó un <strong>52.3% de margen</strong> y 91.7% de ocupación fabril.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <div className="bg-white p-3 rounded-2xl border border-emerald-100">
              <span className="text-[10px] text-obsidian-400 block uppercase font-bold">Margen</span>
              <span className="text-xl font-black text-emerald-700 font-mono">+{products?.premium.margin || 52.3}%</span>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-emerald-100">
              <span className="text-[10px] text-obsidian-400 block uppercase font-bold">Ventas</span>
              <span className="text-xl font-black text-obsidian-900 font-mono">{products?.premium.unitsSold.toLocaleString() || '27,500'}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-emerald-100 text-[11px] text-obsidian-500 flex justify-between">
            <span>Catálogo: <strong>7 modelos</strong></span>
            <span>Ocupación: <strong>91.7%</strong></span>
          </div>
        </div>

        {/* Corbatas */}
        <div className="bg-gradient-to-br from-pastel-100/60 via-white to-white rounded-3xl p-6 border border-pastel-300 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black uppercase tracking-wider bg-pastel-200 text-pastel-800 px-2.5 py-0.5 rounded-full">
              Volumen y Cobertura
            </span>
            <span className="text-xs font-mono font-bold text-obsidian-500">
              PVP: {products?.standard.price.toFixed(2) || '16.50'} €
            </span>
          </div>

          <div>
            <h3 className="text-xl font-black text-obsidian-950">Corbatas (Línea Estándar)</h3>
            <p className="text-xs text-obsidian-600 mt-1">
              El motor de facturación (79% de los ingresos). Margen consolidado en <strong>38.1%</strong> con 193.7k unidades vendidas.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <div className="bg-white p-3 rounded-2xl border border-pastel-100">
              <span className="text-[10px] text-obsidian-400 block uppercase font-bold">Margen</span>
              <span className="text-xl font-black text-pastel-700 font-mono">+{products?.standard.margin || 38.1}%</span>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-pastel-100">
              <span className="text-[10px] text-obsidian-400 block uppercase font-bold">Ventas</span>
              <span className="text-xl font-black text-obsidian-900 font-mono">{products?.standard.unitsSold.toLocaleString() || '193,740'}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-pastel-100 text-[11px] text-obsidian-500 flex justify-between">
            <span>Catálogo: <strong>12 modelos</strong></span>
            <span>Facturación: <strong>2.81M €</strong></span>
          </div>
        </div>

        {/* Calcetines */}
        <div className="bg-gradient-to-br from-rose-50/50 via-white to-white rounded-3xl p-6 border border-rose-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-800 px-2.5 py-0.5 rounded-full">
              Recuperación Eficiente
            </span>
            <span className="text-xs font-mono font-bold text-obsidian-500">
              PVP: {products?.socks.price.toFixed(2) || '3.00'} €
            </span>
          </div>

          <div>
            <h3 className="text-xl font-black text-obsidian-950">Calcetines (Línea Accesoria)</h3>
            <p className="text-xs text-obsidian-600 mt-1">
              Reducción drástica de pérdidas: de <strong>-57.3% a -30.9%</strong> al ajustar precio a 3.00€ y recortar marketing.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <div className="bg-white p-3 rounded-2xl border border-rose-100">
              <span className="text-[10px] text-obsidian-400 block uppercase font-bold">Margen</span>
              <span className="text-xl font-black text-rose-600 font-mono">{products?.socks.margin || -30.9}%</span>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-rose-100">
              <span className="text-[10px] text-obsidian-400 block uppercase font-bold">Ventas</span>
              <span className="text-xl font-black text-obsidian-900 font-mono">{products?.socks.unitsSold.toLocaleString() || '26,030'}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-rose-100 text-[11px] text-obsidian-500 flex justify-between">
            <span>Catálogo: <strong>5 modelos</strong></span>
            <span>Marketing: <strong>0 €</strong></span>
          </div>
        </div>

      </div>

    </div>
  );
};
