'use client';

import React, { useState } from 'react';
import { Header } from '../components/Header';
import { NavigationTabs, TabKey } from '../components/NavigationTabs';
import { OverviewView } from '../components/views/OverviewView';
import { PnLView } from '../components/views/PnLView';
import { ProductsView } from '../components/views/ProductsView';
import { DecisionsView } from '../components/views/DecisionsView';
import { BenchmarkView } from '../components/views/BenchmarkView';
import { finnovaData } from '../lib/data';

export default function FinnovaDashboardPage() {
  const [selectedYear, setSelectedYear] = useState<number>(2029);
  const [activeTab, setActiveTab] = useState<TabKey>('overview');

  const availableYears = finnovaData.companyValuation.years;

  return (
    <div className="min-h-screen bg-pastel-50 flex flex-col text-obsidian-900 selection:bg-pastel-200">
      
      {/* Reimagined Executive Header */}
      <Header 
        selectedYear={selectedYear}
        onSelectYear={setSelectedYear}
        availableYears={availableYears}
      />

      {/* Navigation Sub-bar */}
      <NavigationTabs 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <OverviewView data={finnovaData} selectedYear={selectedYear} />
        )}

        {activeTab === 'pnl' && (
          <PnLView data={finnovaData} selectedYear={selectedYear} />
        )}

        {activeTab === 'products' && (
          <ProductsView data={finnovaData} />
        )}

        {activeTab === 'decisions' && (
          <DecisionsView data={finnovaData} />
        )}

        {activeTab === 'benchmark' && (
          <BenchmarkView data={finnovaData} />
        )}
      </main>

      {/* Reimagined Footer */}
      <footer className="bg-white border-t border-pastel-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-obsidian-500">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-obsidian-800">FINNOVA</span>
            <span>·</span>
            <span>FashionClub Executive Intelligence</span>
            <span>·</span>
            <span className="text-pastel-600 font-semibold">Simulación Corbatul</span>
          </div>

          <div className="flex items-center space-x-4">
            <span>Metodología Spec-Driven Development (SDD)</span>
            <span>·</span>
            <span>Arquitectura Local-First</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
