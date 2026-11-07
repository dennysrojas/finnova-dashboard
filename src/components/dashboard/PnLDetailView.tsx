'use client';

import React from 'react';
import { SimulationDataset } from '../../types/corbatul';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Building, 
  FileSpreadsheet,
  ArrowRight,
  ShieldAlert,
  Info
} from 'lucide-react';

interface PnLDetailViewProps {
  dataset: SimulationDataset;
  selectedPeriod: number;
}

export const PnLDetailView: React.FC<PnLDetailViewProps> = ({
  dataset,
  selectedPeriod,
}) => {
  const currentFin = dataset.financials.find(f => f.period === selectedPeriod && f.firmId === dataset.meta.primaryFirmId);
  const prevFin = dataset.financials.find(f => f.period === selectedPeriod - 1 && f.firmId === dataset.meta.primaryFirmId);

  const formatCurrency = (val: number) => {
    const rounded = Math.round(val);
    const sign = rounded < 0 ? '-' : '';
    const absVal = Math.abs(rounded).toLocaleString('es-ES');
    return `${sign}${absVal} €`;
  };

  if (!currentFin) return null;

  const bs = currentFin.balanceSheet;

  return (
    <div className="space-y-6 w-full animate-fadeIn">
      
      {/* 2029 Alert Banner if P4 */}
      {selectedPeriod === 4 && (
        <div className="bg-rose-50 border-2 border-rose-300 rounded-3xl p-5 shadow-sm flex items-start gap-3.5 text-rose-950">
          <ShieldAlert className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-black text-sm uppercase tracking-wide text-rose-900">
              Alerta de Quiebra Técnica y Asfixia Financiera (Ejercicio 2029)
            </h4>
            <p className="text-xs leading-relaxed text-rose-900/90">
              A pesar del récord en margen bruto comercial (<strong>39,5 %</strong>), los gastos generales acumulados (<strong>3.419.752 €</strong>) provocaron un resultado neto de <strong>-3.399.251 €</strong>. Esto agotó por completo la tesorería (<strong>0 €</strong>) y obligó a activar un crédito extraordinario de rescate de <strong>5.518.020 €</strong>, llevando el patrimonio neto a terreno negativo (<strong>-2.085.073 €</strong>).
            </p>
          </div>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-white border border-pastel-200/90 rounded-3xl p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wider uppercase font-extrabold bg-pastel-100 text-pastel-800 border border-pastel-200">
                P&L & Diagnóstico Financiero
              </span>
              <span className="text-xs text-obsidian-500 font-mono">
                Ejercicio {currentFin.year || 2025 + selectedPeriod}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-obsidian-950">
              Cuenta de Resultados y Balance de Situación
            </h2>
            <p className="text-xs sm:text-sm text-obsidian-600 mt-1 max-w-3xl leading-relaxed">
              Auditoría contable completa con todas las partidas de explotación, I+D, insolvencias y partidas extraordinarias.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-3 py-1.5 rounded-xl border border-emerald-200">
              Margen Bruto: {(currentFin.grossMargin * 100).toFixed(1)}%
            </span>
            <span className={`text-xs font-bold px-3 py-1.5 rounded-xl border ${
              bs.extraordinaryCredit > 0 
                ? 'bg-rose-50 text-rose-700 border-rose-200' 
                : 'bg-pastel-50 text-pastel-800 border-pastel-200'
            }`}>
              Crédito Ext.: {formatCurrency(bs.extraordinaryCredit)}
            </span>
          </div>
        </div>
      </div>

      {/* Waterfall & Balance Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Waterfall P&L */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-pastel-200/90 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm text-obsidian-950 border-b border-pastel-100 pb-3 flex items-center justify-between">
            <span>Cascada de Resultados de la Compañía (€)</span>
            <span className="text-xs font-normal text-obsidian-400">P{selectedPeriod} ({currentFin.year || 2025 + selectedPeriod})</span>
          </h3>

          <div className="space-y-2 text-xs">
            {/* Ingresos */}
            <div className="flex justify-between py-2 border-b border-pastel-50 font-bold text-obsidian-900">
              <span>(+) Ingresos Totales de Explotación</span>
              <span className="font-mono tabular-nums text-sm text-emerald-700">{formatCurrency(currentFin.totalRevenue)}</span>
            </div>

            {/* COGS */}
            <div className="flex justify-between py-2 border-b border-pastel-50 text-obsidian-600 pl-3">
              <span>(-) Coste Industrial de las Ventas (COGS)</span>
              <span className="font-mono tabular-nums text-rose-600">-{formatCurrency(currentFin.costOfGoodsSold)}</span>
            </div>

            {/* Margen Bruto */}
            <div className="flex justify-between py-2.5 bg-pastel-100/70 rounded-xl px-3 font-extrabold text-obsidian-950">
              <span>(=) Margen Comercial Bruto</span>
              <span className="font-mono tabular-nums text-sm text-pastel-700">
                {formatCurrency(currentFin.grossProfit)} ({(currentFin.grossMargin * 100).toFixed(1)}%)
              </span>
            </div>

            {/* Personal */}
            <div className="flex justify-between py-1.5 border-b border-pastel-50 text-obsidian-600 pl-3">
              <span>(-) Gastos de Personal & Red Comercial</span>
              <span className="font-mono tabular-nums">-{formatCurrency(currentFin.personnelExpenses || 0)}</span>
            </div>

            {/* Marketing */}
            <div className="flex justify-between py-1.5 border-b border-pastel-50 text-obsidian-600 pl-3">
              <span>(-) Gastos de Marketing & Marca</span>
              <span className="font-mono tabular-nums">-{formatCurrency(currentFin.marketingExpenses)}</span>
            </div>

            {/* I+D */}
            <div className="flex justify-between py-1.5 border-b border-pastel-50 text-obsidian-600 pl-3">
              <span>(-) Gastos de I+D & Innovación</span>
              <span className="font-mono tabular-nums">-{formatCurrency(currentFin.rdExpenses || 0)}</span>
            </div>

            {/* Amortización */}
            <div className="flex justify-between py-1.5 border-b border-pastel-50 text-obsidian-600 pl-3">
              <span>(-) Amortización & Depreciación Fábrica</span>
              <span className="font-mono tabular-nums">-{formatCurrency(currentFin.depreciationExpenses || 0)}</span>
            </div>

            {/* Insolvencias */}
            <div className="flex justify-between py-1.5 border-b border-pastel-50 text-obsidian-600 pl-3">
              <span>(+/-) Dotación por Insolvencias</span>
              <span className={`font-mono tabular-nums ${
                (currentFin.insolvencyProvisions || 0) < 0 ? 'text-emerald-700' : 'text-rose-600'
              }`}>
                {formatCurrency(currentFin.insolvencyProvisions || 0)}
              </span>
            </div>

            {/* Gastos Generales */}
            <div className="flex justify-between py-1.5 border-b border-pastel-50 text-rose-700 pl-3 font-semibold">
              <span>(-) Gastos Generales de Estructura</span>
              <span className="font-mono tabular-nums">-{formatCurrency(currentFin.generalExpenses || 0)}</span>
            </div>

            {/* Resultado de Explotacion */}
            <div className="flex justify-between py-2.5 bg-rose-50 rounded-xl px-3 font-bold text-rose-900">
              <span>(=) Resultado de Explotación (EBITDA/EBIT)</span>
              <span className="font-mono tabular-nums text-sm text-rose-700">{formatCurrency(currentFin.operatingIncome)}</span>
            </div>

            {/* Gastos Financieros */}
            <div className="flex justify-between py-1.5 border-b border-pastel-50 text-obsidian-600 pl-3">
              <span>(-) Gastos Financieros (Intereses deuda)</span>
              <span className="font-mono tabular-nums">-{formatCurrency(currentFin.interestExpenses)}</span>
            </div>

            {/* Extraordinarios */}
            <div className="flex justify-between py-1.5 border-b border-pastel-50 text-obsidian-600 pl-3">
              <span>(+/-) Resultados Extraordinarios</span>
              <span className="font-mono tabular-nums text-emerald-700">+{formatCurrency(currentFin.extraordinaryItems || 0)}</span>
            </div>

            {/* Resultado Neto */}
            <div className="flex justify-between py-3 bg-obsidian-950 text-white rounded-xl px-3 font-extrabold">
              <span>(=) Resultado Neto del Ejercicio</span>
              <span className="font-mono tabular-nums text-sm text-pastel-300">{formatCurrency(currentFin.netIncome)}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Balance & Debt Analysis */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Balance Sheet Card */}
          <div className="bg-white rounded-3xl p-6 border border-pastel-200/90 shadow-sm space-y-3.5">
            <h4 className="font-extrabold text-sm text-obsidian-950 border-b border-pastel-100 pb-2 flex items-center justify-between">
              <span>Balance de Situación al Cierre</span>
              <span className="text-[11px] font-normal text-obsidian-400">Estructura Activo / Pasivo</span>
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-pastel-50">
                <span className="text-obsidian-600">Activo Fijo Neto (Inmovilizado):</span>
                <span className="font-mono font-bold text-obsidian-900">{formatCurrency(bs.propertyPlantEquipment)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-pastel-50">
                <span className="text-obsidian-600">Existencias en Inventario:</span>
                <span className="font-mono font-bold text-obsidian-900">{formatCurrency(bs.inventoryValue)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-pastel-50">
                <span className="text-obsidian-600">Cuentas a Cobrar Clientes:</span>
                <span className="font-mono font-bold text-obsidian-900">{formatCurrency(bs.accountsReceivable)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-pastel-50">
                <span className="text-obsidian-600">Tesorería Líquida Disponible:</span>
                <span className={`font-mono font-bold ${bs.cashAndEquivalents <= 0 ? 'text-rose-600' : 'text-obsidian-900'}`}>
                  {formatCurrency(bs.cashAndEquivalents)}
                </span>
              </div>
              <div className="flex justify-between py-1.5 bg-pastel-50 px-2.5 rounded-xl font-extrabold text-obsidian-950">
                <span>Total Activo:</span>
                <span className="font-mono">{formatCurrency(bs.totalAssets)}</span>
              </div>

              <div className="pt-2 border-t border-pastel-100 flex justify-between py-1">
                <span className="text-rose-700 font-bold">Crédito Extraordinario:</span>
                <span className="font-mono font-black text-rose-700 text-sm">{formatCurrency(bs.extraordinaryCredit)}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-pastel-50">
                <span className="text-obsidian-600">Préstamo Bancario LP:</span>
                <span className="font-mono text-obsidian-900">{formatCurrency(bs.longTermDebt)}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-pastel-50">
                <span className="text-obsidian-600">Préstamo Bancario CP:</span>
                <span className="font-mono text-obsidian-900">{formatCurrency(bs.shortTermDebt)}</span>
              </div>

              <div className={`flex justify-between py-1.5 px-2.5 rounded-xl font-bold ${
                bs.shareholdersEquity < 0 
                  ? 'bg-rose-100 text-rose-900' 
                  : 'bg-obsidian-100 text-obsidian-900'
              }`}>
                <span>Fondos Propios / Patrimonio Neto:</span>
                <span className="font-mono">{formatCurrency(bs.shareholdersEquity)}</span>
              </div>
            </div>
          </div>

          {/* Diagnostic Note tailored to period */}
          <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200/90 text-xs text-amber-950 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Conclusión de Auditoría Financiera ({currentFin.year || 2025 + selectedPeriod})</span>
            </div>
            <p className="leading-relaxed">
              {selectedPeriod === 1 && (
                <>En 2026, el margen bruto se situó en <strong>33,7 %</strong> (1.145.916 €). Aunque la rentabilidad industrial fue sólida, los gastos operativos (I+D de 257.620 €, personal de 665.483 € y financieros de 133.379 €) llevaron el resultado neto a <strong>-562.464 €</strong>, requiriendo un crédito extraordinario de 2.000.000 €.</>
              )}
              {selectedPeriod === 2 && (
                <>En 2027, el margen bruto fue del <strong>32,0 %</strong> (1.105.437 €). Los gastos generales aumentaron a 504.171 € y los de personal a 793.464 €, generando un resultado neto de <strong>-646.078 €</strong> y manteniendo el crédito extraordinario en 2.000.000 €.</>
              )}
              {selectedPeriod === 3 && (
                <>En 2028, el margen bruto subió al <strong>35,8 %</strong> (1.265.816 €). Sin embargo, la duplicación de gastos generales (1.317.519 €) y el aumento salarial (959.377 €) ampliaron la pérdida neta a <strong>-1.457.017 €</strong>, incrementando el crédito extraordinario a 3.193.308 €.</>
              )}
              {selectedPeriod === 4 && (
                <>En 2029, FashionClub logró su margen bruto récord de <strong>39,5 %</strong> (1.406.968 €). A pesar de ello, los gastos generales alcanzaron 3.419.752 €, drenando totalmente la tesorería (0 €) y elevando el crédito extraordinario a 5.518.020 €, con un patrimonio neto de -2.085.073 €.</>
              )}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
