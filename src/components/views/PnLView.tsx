'use client';

import React from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Building, 
  HelpCircle,
  FileSpreadsheet,
  ArrowRight,
  PieChart
} from 'lucide-react';
import { FinnovaAnalyticsData } from '../../types';
import { formatCurrency } from '../../lib/data';

interface PnLViewProps {
  data: FinnovaAnalyticsData;
  selectedYear: number;
}

export const PnLView: React.FC<PnLViewProps> = ({
  data,
  selectedYear,
}) => {
  const yearKey = String(selectedYear in data.pnlData ? selectedYear : 2029);
  const pnl = data.pnlData[yearKey] || data.pnlData['2029'];
  const balance = data.balanceData[yearKey] || data.balanceData['2029'];

  // Historical debt evolution
  const creditEvolution = [
    { year: 2025, credit: 0, cash: 1916796, equity: 3979739 },
    { year: 2026, credit: 1327680, cash: 0, equity: 3417274 },
    { year: 2027, credit: 1612439, cash: 0, equity: 2771196 },
    { year: 2028, credit: 2499420, cash: 0, equity: 1314179 },
    { year: 2029, credit: 5518020, cash: 0, equity: -2085073 },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-pastel-200 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-obsidian-900 tracking-tight flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-pastel-500" />
            Cuenta de Resultados & Diagnóstico Financiero ({yearKey})
          </h2>
          <p className="text-xs text-obsidian-500">
            Auditoría de ingresos comerciales, absorción de costes y el impacto crítico del apalancamiento no programado.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-3 py-1.5 rounded-xl border border-emerald-200">
            Margen Bruto: {pnl.ratioMargen.toFixed(1)}%
          </span>
          <span className="text-xs bg-rose-50 text-rose-700 font-bold px-3 py-1.5 rounded-xl border border-rose-200">
            Crédito Ext.: {formatCurrency(balance.creditoExtraordinario)}
          </span>
        </div>
      </div>

      {/* P&L Waterfall Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Ingresos Totales */}
        <div className="bg-white rounded-2xl p-5 border border-pastel-200 shadow-sm hover:shadow-sunset transition-all">
          <span className="text-[10px] font-bold uppercase text-obsidian-400 tracking-wider block mb-1">
            01 · Facturación Neta
          </span>
          <div className="text-2xl font-black text-obsidian-950 tabular-nums">
            {formatCurrency(pnl.ingresos)}
          </div>
          <p className="text-xs text-obsidian-500 mt-2">
            Ventas impulsadas por corbatas (79%) y bufandas (19%) con volumen de 247k uds.
          </p>
          <div className="mt-3 text-[11px] font-semibold text-pastel-600 bg-pastel-50 px-2.5 py-1 rounded-lg border border-pastel-200/60 inline-block">
            Ingreso medio: 14.4 € / ud
          </div>
        </div>

        {/* Card 2: Coste de Ventas */}
        <div className="bg-white rounded-2xl p-5 border border-pastel-200 shadow-sm hover:shadow-sunset transition-all">
          <span className="text-[10px] font-bold uppercase text-obsidian-400 tracking-wider block mb-1">
            02 · Coste Industrial (COGS)
          </span>
          <div className="text-2xl font-black text-obsidian-950 tabular-nums">
            {formatCurrency(pnl.costeVentas)}
          </div>
          <p className="text-xs text-obsidian-500 mt-2">
            Incluye materia prima, mano de obra fabril y amortización técnica de telares.
          </p>
          <div className="mt-3 text-[11px] font-semibold text-obsidian-600 bg-obsidian-50 px-2.5 py-1 rounded-lg border border-obsidian-200/60 inline-block">
            60.5% sobre ventas
          </div>
        </div>

        {/* Card 3: Margen Bruto */}
        <div className="bg-gradient-to-br from-emerald-50/60 to-white rounded-2xl p-5 border border-emerald-200 shadow-sm hover:shadow-md transition-all">
          <span className="text-[10px] font-bold uppercase text-emerald-800 tracking-wider block mb-1">
            03 · Margen Comercial Bruto
          </span>
          <div className="text-2xl font-black text-emerald-800 tabular-nums">
            {formatCurrency(pnl.margenBruto)}
          </div>
          <p className="text-xs text-emerald-950 mt-2 font-medium">
            Récord del 39.50% de margen bruto, con salto en bufandas (52.3%) y recuperación en corbatas.
          </p>
          <div className="mt-3 text-[11px] font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-lg inline-block">
            +11.2% crecimiento vs 2028
          </div>
        </div>

        {/* Card 4: Gastos Operativos y Resultado */}
        <div className="bg-gradient-to-br from-rose-50/60 to-white rounded-2xl p-5 border border-rose-200 shadow-sm hover:shadow-md transition-all">
          <span className="text-[10px] font-bold uppercase text-rose-700 tracking-wider block mb-1">
            04 · Resultado Operativo Bruto
          </span>
          <div className="text-2xl font-black text-rose-700 tabular-nums">
            {formatCurrency(pnl.resultadoBruto)}
          </div>
          <p className="text-xs text-rose-950 mt-2 font-medium">
            Impactado por el salto en Gastos Generales ({formatCurrency(pnl.gastosGenerales)}) y Personal.
          </p>
          <div className="mt-3 text-[11px] font-extrabold text-rose-800 bg-rose-100 px-2.5 py-1 rounded-lg inline-block">
            Cargas de estructura elevadas
          </div>
        </div>

      </div>

      {/* Detailed P&L Table & Structure Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Waterfall Table */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-pastel-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-base text-obsidian-900 border-b border-pastel-100 pb-3 flex items-center justify-between">
            <span>Cascada de la Cuenta de Resultados ({yearKey})</span>
            <span className="text-xs font-normal text-obsidian-400">Datos auditados en Euros</span>
          </h3>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-2 border-b border-pastel-50 font-bold text-obsidian-900">
              <span>(+) Ingresos Totales por Ventas</span>
              <span className="font-mono tabular-nums text-sm">{formatCurrency(pnl.ingresos)}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-pastel-50 text-obsidian-600">
              <span className="pl-4">(-) Coste Total de las Ventas</span>
              <span className="font-mono tabular-nums text-rose-600">-{formatCurrency(pnl.costeVentas)}</span>
            </div>

            <div className="flex justify-between py-2.5 bg-pastel-100/70 rounded-xl px-3 font-extrabold text-obsidian-950">
              <span>(=) Margen Comercial Bruto</span>
              <span className="font-mono tabular-nums text-sm text-pastel-700">
                {formatCurrency(pnl.margenBruto)} ({pnl.ratioMargen.toFixed(1)}%)
              </span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-pastel-50 text-obsidian-600 pl-4">
              <span>(-) Gastos de Personal (Fuerza de ventas y operativa)</span>
              <span className="font-mono tabular-nums">-{formatCurrency(pnl.personal)}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-pastel-50 text-obsidian-600 pl-4">
              <span>(-) Gastos de Marketing & Promoción</span>
              <span className="font-mono tabular-nums">-{formatCurrency(pnl.marketing)}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-pastel-50 text-obsidian-600 pl-4">
              <span>(-) Amortización & Depreciación técnica</span>
              <span className="font-mono tabular-nums">-{formatCurrency(pnl.depreciacion)}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-pastel-50 text-rose-700 pl-4 font-semibold">
              <span>(-) Gastos Generales y Estructura Central</span>
              <span className="font-mono tabular-nums">-{formatCurrency(pnl.gastosGenerales)}</span>
            </div>

            <div className="flex justify-between py-2.5 bg-rose-50 rounded-xl px-3 font-bold text-rose-900">
              <span>(=) Resultado Bruto de Explotación</span>
              <span className="font-mono tabular-nums text-sm text-rose-700">{formatCurrency(pnl.resultadoBruto)}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-pastel-50 text-obsidian-600 pl-4">
              <span>(-) Gastos Financieros (Intereses deuda bancaria)</span>
              <span className="font-mono tabular-nums">-{formatCurrency(pnl.gastosFinancieros)}</span>
            </div>

            <div className="flex justify-between py-3 bg-obsidian-900 text-white rounded-xl px-3 font-extrabold">
              <span>(=) Resultado Neto del Ejercicio</span>
              <span className="font-mono tabular-nums text-sm text-pastel-300">{formatCurrency(pnl.resultadoNeto)}</span>
            </div>
          </div>
        </div>

        {/* Diagnosis & Liquidity Insight */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Diagnostic Box */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-3xl p-6 border border-amber-200/80 shadow-sm space-y-3">
            <div className="flex items-center space-x-2 text-amber-800 font-extrabold text-sm">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <h4>Diagnóstico Causal · Finnova</h4>
            </div>

            <p className="text-xs text-obsidian-700 leading-relaxed">
              El análisis revela una <strong>dualidad estratégica</strong>: 
              por un lado, la <strong>estrategia comercial y de pricing fue brillante</strong> (alcanzando 
              el 52.3% de margen en bufandas y el 38.1% en corbatas); por otro lado, la <strong>inversión 
              masiva en activos fijos en 2026 (aumentando a 6.54M€)</strong> agotó la caja de 1.91M€ al no 
              acompañarse de financiación estructurada a largo plazo.
            </p>

            <p className="text-xs text-obsidian-700 leading-relaxed">
              Esto activó de forma automática el <strong>crédito extraordinario</strong>, que creció hasta 
              <strong> 5,518,020 € en 2029</strong>, generando una fuerte carga financiera en el balance.
            </p>
          </div>

          {/* Balance Snapshot Card */}
          <div className="bg-white rounded-3xl p-6 border border-pastel-200 shadow-sm space-y-4">
            <h4 className="font-extrabold text-sm text-obsidian-900 flex items-center justify-between">
              <span>Balance de Situación ({yearKey})</span>
              <span className="text-xs font-normal text-obsidian-400">Estructura Patrimonial</span>
            </h4>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-pastel-50">
                <span className="text-obsidian-600">Activo No Corriente (Fábrica y telares):</span>
                <span className="font-mono font-bold text-obsidian-900">{formatCurrency(balance.activoFijoNeto)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-pastel-50">
                <span className="text-obsidian-600">Existencias e Inventario:</span>
                <span className="font-mono font-bold text-obsidian-900">{formatCurrency(balance.inventario)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-pastel-50">
                <span className="text-obsidian-600">Cuentas por Cobrar a Clientes:</span>
                <span className="font-mono font-bold text-obsidian-900">{formatCurrency(balance.cuentasCobrar)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-pastel-50">
                <span className="text-obsidian-600">Caja y Tesorería Disponible:</span>
                <span className="font-mono font-bold text-obsidian-900">{formatCurrency(balance.cajaDisponible)}</span>
              </div>
              <div className="flex justify-between py-1.5 bg-pastel-50 px-2 rounded-lg font-bold text-obsidian-900">
                <span>Total Activo:</span>
                <span className="font-mono">{formatCurrency(balance.activoTotal)}</span>
              </div>

              <div className="pt-2 border-t border-pastel-100 flex justify-between py-1">
                <span className="text-rose-700 font-bold">Crédito Extraordinario Acumulado:</span>
                <span className="font-mono font-extrabold text-rose-700">{formatCurrency(balance.creditoExtraordinario)}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Credit Evolution Timeline */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pastel-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-pastel-100 pb-3">
          <div>
            <h3 className="font-extrabold text-base text-obsidian-900">
              Evolución Histórica de la Liquidez y Deuda Extraordinaria (2025–2029)
            </h3>
            <p className="text-xs text-obsidian-500">
              Seguimiento de la absorción de caja frente al recurso al crédito extraordinario del sistema.
            </p>
          </div>
          <span className="text-xs text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200 font-bold self-start sm:self-auto">
            Factor Crítico de Auditoría
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
          {creditEvolution.map((item) => {
            const isCritical = item.credit > 2000000;
            return (
              <div 
                key={item.year}
                className={`p-4 rounded-2xl border transition-all ${
                  isCritical 
                    ? 'bg-rose-50/70 border-rose-200' 
                    : item.credit > 0 
                      ? 'bg-amber-50/70 border-amber-200' 
                      : 'bg-emerald-50/70 border-emerald-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-black text-sm text-obsidian-900">{item.year}</span>
                  <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${
                    item.credit === 0 ? 'bg-emerald-200 text-emerald-800' : 'bg-rose-200 text-rose-800'
                  }`}>
                    {item.credit === 0 ? 'Solvente' : 'Conuda'}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div>
                    <span className="text-[10px] text-obsidian-500 uppercase block">Crédito Ext.:</span>
                    <span className="font-bold font-mono text-rose-700">
                      {formatCurrency(item.credit)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-obsidian-500 uppercase block">Caja Líquida:</span>
                    <span className="font-mono text-obsidian-700">
                      {formatCurrency(item.cash)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
