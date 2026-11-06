'use client';

import React from 'react';
import { 
  Building2, 
  TrendingUp, 
  AlertTriangle, 
  Award, 
  Layers, 
  BarChart3,
  Calendar
} from 'lucide-react';

interface HeaderProps {
  selectedYear: number;
  onSelectYear: (year: number) => void;
  availableYears: number[];
}

export const Header: React.FC<HeaderProps> = ({
  selectedYear,
  onSelectYear,
  availableYears,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-pastel-200/80 shadow-card-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Identity */}
          <div className="flex items-center space-x-4 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pastel-400 via-pastel-500 to-pastel-600 flex items-center justify-center shadow-sunset text-white font-bold text-xl tracking-tight flex-shrink-0">
              FC
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg text-obsidian-900 tracking-tight">FINNOVA</span>
                <span className="text-pastel-300 font-light text-base">|</span>
                <span className="font-semibold text-sm text-pastel-600 bg-pastel-100/90 px-2.5 py-0.5 rounded-full border border-pastel-200/80">
                  FashionClub
                </span>
                <span className="hidden md:inline-flex items-center text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
                  Simulación Corbatul
                </span>
              </div>
              <p className="text-xs text-obsidian-600 truncate mt-0.5">
                Plataforma de Inteligencia Directiva y Soporte a la Decisión
              </p>
            </div>
          </div>

          {/* Quick Metrics Flash Strip */}
          <div className="hidden xl:flex items-center space-x-3 bg-pastel-50/80 border border-pastel-200/60 rounded-2xl px-4 py-2">
            <div className="flex items-center space-x-2 border-r border-pastel-200 pr-3">
              <Award className="w-4 h-4 text-pastel-500" />
              <div>
                <span className="text-[10px] uppercase font-bold text-obsidian-400 block tracking-wider">Valor Empresa</span>
                <span className="text-sm font-bold text-obsidian-900 tabular-nums">2,231.9 €</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 border-r border-pastel-200 pr-3">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="text-[10px] uppercase font-bold text-obsidian-400 block tracking-wider">Margen Bruto</span>
                <span className="text-sm font-bold text-emerald-700 tabular-nums">39.50%</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 border-r border-pastel-200 pr-3">
              <Layers className="w-4 h-4 text-blue-600" />
              <div>
                <span className="text-[10px] uppercase font-bold text-obsidian-400 block tracking-wider">Volumen Vendido</span>
                <span className="text-sm font-bold text-obsidian-900 tabular-nums">247k uds <span className="text-[10px] text-pastel-600 font-semibold">(#2)</span></span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              <div>
                <span className="text-[10px] uppercase font-bold text-rose-600 block tracking-wider">Crédito Ext.</span>
                <span className="text-sm font-bold text-rose-700 tabular-nums">5.52M €</span>
              </div>
            </div>
          </div>

          {/* Interactive Year Selector */}
          <div className="flex items-center space-x-1.5 bg-obsidian-100/90 p-1.5 rounded-2xl border border-pastel-200/70">
            <div className="hidden sm:flex items-center text-xs font-semibold text-obsidian-600 px-2.5 space-x-1">
              <Calendar className="w-3.5 h-3.5 text-pastel-600" />
              <span>Año:</span>
            </div>
            {availableYears.map((year) => {
              const isSelected = selectedYear === year;
              return (
                <button
                  key={year}
                  onClick={() => onSelectYear(year)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all duration-200 ${
                    isSelected
                      ? 'bg-gradient-to-r from-pastel-500 to-pastel-600 text-white shadow-sunset font-extrabold scale-105'
                      : 'text-obsidian-600 hover:text-obsidian-900 hover:bg-white/70'
                  }`}
                >
                  {year}
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </header>
  );
};
