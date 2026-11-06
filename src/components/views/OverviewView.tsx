'use client';

import React from 'react';
import { 
  Award, 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  Target, 
  CheckCircle2, 
  AlertCircle,
  BarChart3,
  Sparkles
} from 'lucide-react';
import { FinnovaAnalyticsData } from '../../types';

interface OverviewViewProps {
  data: FinnovaAnalyticsData;
  selectedYear: number;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  data,
  selectedYear,
}) => {
  const { companyValuation, benchmarking2029 } = data;
  const rankFashion = companyValuation.ranking2029.find(r => r.firmId === 'fashionclub');
  const years = companyValuation.years;

  // Find FashionClub's value for the selected year
  const yearIndex = years.indexOf(selectedYear);
  const selectedValue = yearIndex !== -1 ? companyValuation.historical['fashionclub'][yearIndex] : 2231.9;
  const previousValue = yearIndex > 0 ? companyValuation.historical['fashionclub'][yearIndex - 1] : selectedValue;
  const valueDelta = selectedValue - previousValue;
  const valueDeltaPct = previousValue > 0 ? ((valueDelta / previousValue) * 100).toFixed(1) : '0.0';

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Hero Executive Banner */}
      <div className="bg-gradient-to-br from-white via-pastel-50/70 to-pastel-100/50 rounded-3xl p-6 sm:p-8 border border-pastel-200/90 shadow-sunset relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-gradient-to-br from-pastel-300/30 to-pastel-400/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-pastel-200/70 px-3 py-1 rounded-full text-xs font-bold text-pastel-700 border border-pastel-300/80">
              <Sparkles className="w-3.5 h-3.5 text-pastel-600" />
              <span>Resumen Estratégico · Equipo FINNOVA</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-obsidian-950 tracking-tight leading-tight">
              Evolución y Desempeño Corporativo de <span className="text-transparent bg-clip-text bg-gradient-to-r from-pastel-600 to-pastel-500">FashionClub</span>
            </h1>

            <p className="text-sm sm:text-base text-obsidian-600 leading-relaxed max-w-2xl">
              Durante las rondas de la simulación Corbatul (2025–2029), el equipo Finnova consolidó una 
              <strong> alta disciplina comercial</strong>: récord de margen del <strong>39.50%</strong> y la 
              <strong> 2ª mayor cuota de volumen en la industria (247,270 unidades)</strong>, manteniendo un 
              valor final de <strong>2,231.9 €</strong>.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <div className="bg-white/90 backdrop-blur-sm border border-pastel-200 px-3.5 py-2 rounded-2xl shadow-sm">
                <span className="text-[11px] font-semibold text-obsidian-400 block uppercase tracking-wider">Posición Industria</span>
                <span className="text-base font-extrabold text-obsidian-900">#4 de 7 Firmas</span>
              </div>
              <div className="bg-white/90 backdrop-blur-sm border border-pastel-200 px-3.5 py-2 rounded-2xl shadow-sm">
                <span className="text-[11px] font-semibold text-obsidian-400 block uppercase tracking-wider">Margen Bufandas (Punta)</span>
                <span className="text-base font-extrabold text-emerald-600">52.3%</span>
              </div>
              <div className="bg-white/90 backdrop-blur-sm border border-pastel-200 px-3.5 py-2 rounded-2xl shadow-sm">
                <span className="text-[11px] font-semibold text-obsidian-400 block uppercase tracking-wider">Alineación Presupuestaria</span>
                <span className="text-base font-extrabold text-pastel-600">426 pts <span className="text-xs font-normal text-obsidian-500">(Top)</span></span>
              </div>
            </div>
          </div>

          {/* Metric Spotlight Card */}
          <div className="lg:col-span-5 bg-white/95 rounded-2xl p-6 border border-pastel-200 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-pastel-100 pb-3">
              <div>
                <span className="text-xs uppercase font-bold text-obsidian-400 tracking-wider">Valor de la Compañía</span>
                <div className="flex items-baseline space-x-2 mt-1">
                  <span className="text-3xl sm:text-4xl font-black text-obsidian-950 tabular-nums">
                    {selectedValue.toFixed(1)}
                  </span>
                  <span className="text-xs font-bold text-obsidian-400">puntos</span>
                </div>
              </div>
              <div className={`flex items-center px-2.5 py-1 rounded-xl text-xs font-extrabold ${
                valueDelta >= 0 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}>
                {valueDelta >= 0 ? <TrendingUp className="w-3.5 h-3.5 mr-1" /> : <TrendingDown className="w-3.5 h-3.5 mr-1" />}
                {valueDeltaPct}% en {selectedYear}
              </div>
            </div>

            {/* Historical Progress Mini-Bar */}
            <div>
              <div className="flex justify-between text-xs text-obsidian-500 mb-1.5 font-medium">
                <span>Trayectoria histórica (2024–2029)</span>
                <span className="font-bold text-pastel-600">Pico: 2,373.1 (2027)</span>
              </div>
              <div className="grid grid-cols-6 gap-1.5">
                {years.map((y, idx) => {
                  const val = companyValuation.historical['fashionclub'][idx];
                  const isCurrent = y === selectedYear;
                  const heightPercent = Math.min(100, Math.max(30, ((val - 1400) / (3100 - 1400)) * 100));
                  return (
                    <div key={y} className="flex flex-col items-center">
                      <div className="w-full h-16 bg-pastel-100/70 rounded-lg flex items-end p-1 relative group cursor-pointer">
                        <div 
                          className={`w-full rounded-md transition-all duration-300 ${
                            isCurrent 
                              ? 'bg-gradient-to-t from-pastel-600 to-pastel-400 shadow-sunset-glow' 
                              : 'bg-pastel-300 hover:bg-pastel-400'
                          }`}
                          style={{ height: `${heightPercent}%` }}
                        ></div>
                        <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-obsidian-900 text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                          {val.toFixed(0)}
                        </span>
                      </div>
                      <span className={`text-[10px] mt-1.5 font-bold ${isCurrent ? 'text-pastel-600' : 'text-obsidian-400'}`}>
                        {y}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 text-xs text-obsidian-500 flex items-center justify-between border-t border-pastel-100">
              <span>Benchmark Líder 2029:</span>
              <span className="font-extrabold text-obsidian-800">Stuart20 (3,005.2)</span>
            </div>
          </div>

        </div>
      </div>

      {/* 7 Value Drivers Breakdown */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-extrabold text-obsidian-900 tracking-tight flex items-center gap-2">
              <Target className="w-5 h-5 text-pastel-500" />
              Desglose de los 7 Pilares del Valor de Compañía
            </h2>
            <p className="text-xs text-obsidian-500">
              Evaluación de cada parámetro de FashionClub frente a la media ponderada del mercado en la ronda de cierre.
            </p>
          </div>
          <span className="text-xs bg-pastel-100 text-pastel-700 font-bold px-3 py-1 rounded-full border border-pastel-200 self-start sm:self-auto">
            Datos Auditados Cuadro de Mando
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {companyValuation.componentsFashionClub.map((comp, idx) => {
            const currentScore = (comp as any)[selectedYear] || (comp as any)[2029];
            const meanScore = comp.industryMean2029;
            const diff = currentScore - meanScore;
            const isAbove = diff >= 0;

            return (
              <div 
                key={comp.parameter}
                className="bg-white rounded-2xl p-5 border border-pastel-200/90 shadow-sm hover:shadow-sunset transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-obsidian-400 uppercase tracking-wider">
                      Pilar 0{idx + 1}
                    </span>
                    <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full ${
                      isAbove 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {isAbove ? `+${diff.toFixed(0)} vs media` : `${diff.toFixed(0)} vs media`}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-sm text-obsidian-900 mb-1">
                    {comp.parameter}
                  </h3>

                  <div className="flex items-baseline space-x-2 my-2">
                    <span className="text-2xl font-black text-obsidian-950 tabular-nums">
                      {currentScore}
                    </span>
                    <span className="text-xs text-obsidian-400">pts (Media: {meanScore})</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-pastel-100">
                  <div className="w-full bg-pastel-100/70 h-2 rounded-full overflow-hidden flex">
                    <div 
                      className={`h-full rounded-full ${isAbove ? 'bg-gradient-to-r from-pastel-400 to-pastel-500' : 'bg-obsidian-300'}`}
                      style={{ width: `${Math.min(100, (currentScore / (meanScore * 1.4 || 100)) * 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-obsidian-400 mt-1">
                    <span>Base 2024: {(comp as any)[2024]}</span>
                    <span>Cierre: {(comp as any)[2029]}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Competitive Standings Summary */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pastel-200/90 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-pastel-100 pb-4">
          <div>
            <h2 className="text-lg font-extrabold text-obsidian-900 tracking-tight flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-pastel-500" />
              Ranking Final de la Industria Textil (2029)
            </h2>
            <p className="text-xs text-obsidian-500">
              Posición competitiva de las 7 firmas simuladas en valor de compañía acumulado.
            </p>
          </div>
          <div className="text-xs text-obsidian-500">
            Media de la industria: <strong className="text-obsidian-800">2,289 puntos</strong>
          </div>
        </div>

        <div className="space-y-3">
          {companyValuation.ranking2029.map((item) => {
            const isOur = item.firmId === 'fashionclub';
            const widthPct = (item.value / 3100) * 100;
            return (
              <div 
                key={item.firmId}
                className={`p-4 rounded-2xl border transition-all ${
                  isOur 
                    ? 'bg-gradient-to-r from-pastel-100/90 to-pastel-50/90 border-pastel-300 shadow-sunset font-bold' 
                    : 'bg-obsidian-50/50 border-obsidian-100 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5 text-xs">
                  <div className="flex items-center space-x-2">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-black ${
                      isOur ? 'bg-pastel-500 text-white' : 'bg-obsidian-200 text-obsidian-700'
                    }`}>
                      {item.rank}
                    </span>
                    <span className="font-extrabold text-obsidian-900 text-sm">{item.name}</span>
                    {isOur && (
                      <span className="text-[10px] bg-pastel-500 text-white px-2 py-0.5 rounded-full font-bold">
                        Finnova
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-semibold text-obsidian-500">{item.growth}</span>
                    <span className="text-sm font-black text-obsidian-950 tabular-nums">{item.value.toFixed(1)} pts</span>
                  </div>
                </div>

                <div className="w-full bg-pastel-100/60 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      isOur 
                        ? 'bg-gradient-to-r from-pastel-400 to-pastel-600 shadow-sm' 
                        : 'bg-obsidian-300'
                    }`}
                    style={{ width: `${widthPct}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
