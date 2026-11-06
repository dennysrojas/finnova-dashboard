'use client';

import React, { useState } from 'react';
import { 
  GitFork, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Layers, 
  TrendingUp, 
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { FinnovaAnalyticsData } from '../../types';

interface DecisionsViewProps {
  data: FinnovaAnalyticsData;
}

export const DecisionsView: React.FC<DecisionsViewProps> = ({ data }) => {
  const { decisionsAudit } = data;
  const [selectedAuditYear, setSelectedAuditYear] = useState<number>(2029);

  const currentAudit = decisionsAudit.find(d => d.year === selectedAuditYear) || decisionsAudit[3];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-pastel-200 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-obsidian-900 tracking-tight flex items-center gap-2">
            <GitFork className="w-6 h-6 text-pastel-500" />
            Triada Causal & Auditoría Decisional (2026–2029)
          </h2>
          <p className="text-xs text-obsidian-500">
            Trazabilidad sistemática de cada ronda: Hipótesis Estratégica → Decisiones Adoptadas → Consecuencias Financieras e Industriales.
          </p>
        </div>

        {/* Round Switcher */}
        <div className="flex items-center space-x-1.5 bg-pastel-100 p-1.5 rounded-2xl border border-pastel-200">
          {decisionsAudit.map((audit) => {
            const isSelected = audit.year === selectedAuditYear;
            return (
              <button
                key={audit.year}
                onClick={() => setSelectedAuditYear(audit.year)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                  isSelected
                    ? 'bg-pastel-500 text-white shadow-sunset scale-105'
                    : 'text-obsidian-600 hover:text-obsidian-900 hover:bg-white/60'
                }`}
              >
                Ronda {audit.period} ({audit.year})
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Audit Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pastel-200 shadow-sm space-y-6">
        
        {/* Title & Strategic Intent */}
        <div className="bg-gradient-to-r from-pastel-100/90 via-pastel-50/60 to-white rounded-2xl p-5 border border-pastel-200/90">
          <div className="flex items-center space-x-2 text-xs font-bold text-pastel-700 uppercase tracking-wider mb-1">
            <Calendar className="w-4 h-4 text-pastel-600" />
            <span>Ronda {currentAudit.period} · Ejercicio {currentAudit.year}</span>
          </div>
          <h3 className="text-xl font-black text-obsidian-950 mb-2">
            {currentAudit.title}
          </h3>
          <p className="text-xs sm:text-sm text-obsidian-700 leading-relaxed font-medium">
            <strong>Hipótesis e Intención Estratégica:</strong> {currentAudit.strategicIntent}
          </p>
        </div>

        {/* Causal Triad Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Decisions Adopted */}
          <div className="lg:col-span-7 space-y-4">
            <h4 className="font-extrabold text-sm text-obsidian-900 flex items-center gap-2 border-b border-pastel-100 pb-2">
              <FileText className="w-4 h-4 text-pastel-500" />
              Decisiones Auditadas (Datos reportados en hoja de decisión)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentAudit.decisions.map((dec, i) => (
                <div 
                  key={i} 
                  className="p-3.5 bg-pastel-50/60 rounded-2xl border border-pastel-200/70 hover:bg-white hover:shadow-sm transition-all"
                >
                  <span className="text-[10px] uppercase font-bold text-obsidian-400 block tracking-wider mb-0.5">
                    {dec.param}
                  </span>
                  <div className="text-base font-black text-obsidian-950 font-mono">
                    {dec.val}
                  </div>
                  <p className="text-[11px] text-obsidian-500 mt-1 line-clamp-2">
                    {dec.evidence}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Results & Impact */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="font-extrabold text-sm text-obsidian-900 flex items-center gap-2 border-b border-pastel-100 pb-2">
              <ArrowRight className="w-4 h-4 text-pastel-500" />
              Consecuencias Directas en el Ejercicio
            </h4>

            <div className="bg-obsidian-950 text-white rounded-2xl p-5 space-y-3.5 shadow-md">
              <div className="flex justify-between items-center border-b border-obsidian-800 pb-2">
                <span className="text-xs text-obsidian-400">Facturación Neta:</span>
                <span className="font-mono font-bold text-sm text-white">{currentAudit.results.revenue}</span>
              </div>

              <div className="flex justify-between items-center border-b border-obsidian-800 pb-2">
                <span className="text-xs text-obsidian-400">Margen Comercial Bruto:</span>
                <span className="font-mono font-bold text-sm text-emerald-400">{currentAudit.results.margin}</span>
              </div>

              <div className="flex justify-between items-center border-b border-obsidian-800 pb-2">
                <span className="text-xs text-obsidian-400">Resultado Neto del Año:</span>
                <span className="font-mono font-bold text-sm text-rose-400">{currentAudit.results.netIncome}</span>
              </div>

              <div className="flex justify-between items-center border-b border-obsidian-800 pb-2">
                <span className="text-xs text-obsidian-400">Crédito Extraordinario al Cierre:</span>
                <span className="font-mono font-bold text-sm text-amber-300">{currentAudit.results.extraordinaryCredit}</span>
              </div>

              <div className="flex justify-between items-center pt-1 text-sm font-extrabold">
                <span className="text-pastel-300">Valor de la Compañía:</span>
                <span className="font-mono text-base text-pastel-400">{currentAudit.results.companyValue}</span>
              </div>
            </div>

            <div className="bg-pastel-50 p-4 rounded-2xl border border-pastel-200 text-xs text-obsidian-600 space-y-2">
              <div className="font-bold text-obsidian-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-pastel-600" />
                Veredicto Causal de la Ronda
              </div>
              <p className="leading-relaxed">
                El modelo demostró gran robustez en fijación de precios y asignación de presupuesto por canal. 
                El punto de inflexión fue la necesidad de refinanciación preventiva para evitar el coste implícito del crédito de emergencia.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
