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

  if (!currentOps || !products) return null;

  const year = currentOps.year || 2025 + selectedPeriod;

  // Exact narrative descriptions strictly matching each period's real metrics (Corrections 9, 19, 28, 40)
  const productDescriptions: Record<number, { scarves: string; ties: string; socks: string }> = {
    1: {
      scarves: 'La línea de mayor rentabilidad unitaria con un margen del 48,6 % y 25.971 unidades vendidas.',
      ties: 'El motor de volumen y facturación con 192.223 unidades vendidas y un margen comercial del 32,3 %.',
      socks: 'Línea deficitaria en etapa de penetración con 26.240 unidades vendidas y un margen de -51,3 %.'
    },
    2: {
      scarves: 'Consolidación de alta rentabilidad con un margen del 49,4 % y 26.977 unidades vendidas.',
      ties: 'Ventas estables de 191.996 unidades (apenas 227 uds menos que en 2026) con un margen del 30,1 %.',
      socks: 'Punto de máxima presión en costes con 26.272 unidades vendidas y un margen de -57,3 %.'
    },
    3: {
      scarves: 'Superó el umbral del 50 % de rentabilidad alcanzando un margen del 50,5 % y 27.488 unidades vendidas.',
      ties: 'Mantuvo la estabilidad con 192.002 unidades vendidas y un margen en recuperación del 34,2 %.',
      socks: 'Inicio del ajuste de gama y precios con 24.528 unidades vendidas y margen de -48,4 %.'
    },
    4: {
      scarves: 'La línea con mayor rentabilidad de Finnova. Se alcanzó un 52,3 % de margen con 27.500 unidades vendidas y 91,7 % de ocupación.',
      ties: 'El motor principal de facturación con 193.740 unidades vendidas y margen consolidado en 38,1 %.',
      socks: 'Recuperación eficiente tras ajustar precio a 3,00 € y recortar marketing: mejora de margen a -30,9 % (26.030 unidades vendidas).'
    }
  };

  const currentDesc = productDescriptions[selectedPeriod] || productDescriptions[4];

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
                Ejercicio P{selectedPeriod} ({year})
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-obsidian-950">
              Gestión Industrial y Rendimiento por Línea de Producto
            </h2>
            <p className="text-xs sm:text-sm text-obsidian-600 mt-1 max-w-3xl leading-relaxed">
              Capacidad nominal, tasa de ocupación de telares y calibración del surtido (Bufandas, Corbatas y Calcetines).
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
                {currentOps.unitsSold.toLocaleString('es-ES')} uds
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
              PVP: {products.premium.price.toFixed(2)} €
            </span>
          </div>

          <div>
            <h3 className="text-xl font-black text-obsidian-950">Bufandas (Línea Premium)</h3>
            <p className="text-xs text-obsidian-600 mt-1 leading-relaxed">
              {currentDesc.scarves}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <div className="bg-white p-3 rounded-2xl border border-emerald-100">
              <span className="text-[10px] text-obsidian-400 block uppercase font-bold">Margen</span>
              <span className="text-xl font-black text-emerald-700 font-mono">
                +{products.premium.margin.toFixed(1)}%
              </span>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-emerald-100">
              <span className="text-[10px] text-obsidian-400 block uppercase font-bold">Ventas</span>
              <span className="text-xl font-black text-obsidian-900 font-mono">
                {products.premium.unitsSold.toLocaleString('es-ES')}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-emerald-100 text-[11px] text-obsidian-500 flex justify-between">
            <span>Catálogo: <strong>{products.premium.catalogRange || 7} modelos</strong></span>
            <span>Ocupación: <strong>{(currentOps.capacityUtilizationRate * 100).toFixed(1)}%</strong></span>
          </div>
        </div>

        {/* Corbatas */}
        <div className="bg-gradient-to-br from-pastel-100/60 via-white to-white rounded-3xl p-6 border border-pastel-300 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black uppercase tracking-wider bg-pastel-200 text-pastel-800 px-2.5 py-0.5 rounded-full">
              Volumen y Cobertura
            </span>
            <span className="text-xs font-mono font-bold text-obsidian-500">
              PVP: {products.standard.price.toFixed(2)} €
            </span>
          </div>

          <div>
            <h3 className="text-xl font-black text-obsidian-950">Corbatas (Línea Estándar)</h3>
            <p className="text-xs text-obsidian-600 mt-1 leading-relaxed">
              {currentDesc.ties}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <div className="bg-white p-3 rounded-2xl border border-pastel-100">
              <span className="text-[10px] text-obsidian-400 block uppercase font-bold">Margen</span>
              <span className="text-xl font-black text-pastel-700 font-mono">
                +{products.standard.margin.toFixed(1)}%
              </span>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-pastel-100">
              <span className="text-[10px] text-obsidian-400 block uppercase font-bold">Ventas</span>
              <span className="text-xl font-black text-obsidian-900 font-mono">
                {products.standard.unitsSold.toLocaleString('es-ES')}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-pastel-100 text-[11px] text-obsidian-500 flex justify-between">
            <span>Catálogo: <strong>{products.standard.catalogRange || 12} modelos</strong></span>
            <span>Participación: <strong>Principal motor</strong></span>
          </div>
        </div>

        {/* Calcetines */}
        <div className="bg-gradient-to-br from-rose-50/50 via-white to-white rounded-3xl p-6 border border-rose-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-800 px-2.5 py-0.5 rounded-full">
              Línea Accesoria
            </span>
            <span className="text-xs font-mono font-bold text-obsidian-500">
              PVP: {products.socks.price.toFixed(2)} €
            </span>
          </div>

          <div>
            <h3 className="text-xl font-black text-obsidian-950">Calcetines (Línea Accesoria)</h3>
            <p className="text-xs text-obsidian-600 mt-1 leading-relaxed">
              {currentDesc.socks}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <div className="bg-white p-3 rounded-2xl border border-rose-100">
              <span className="text-[10px] text-obsidian-400 block uppercase font-bold">Margen</span>
              <span className="text-xl font-black text-rose-600 font-mono">
                {products.socks.margin.toFixed(1)}%
              </span>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-rose-100">
              <span className="text-[10px] text-obsidian-400 block uppercase font-bold">Ventas</span>
              <span className="text-xl font-black text-obsidian-900 font-mono">
                {products.socks.unitsSold.toLocaleString('es-ES')}
              </span>
            </div>
          </div>

          <div className="pt-2 border-rose-100 text-[11px] text-obsidian-500 flex justify-between">
            <span>Catálogo: <strong>{products.socks.catalogRange || 5} modelos</strong></span>
            <span>Ajuste: <strong>{selectedPeriod === 4 ? 'Marketing 0 €' : 'En optimización'}</strong></span>
          </div>
        </div>

      </div>

    </div>
  );
};
