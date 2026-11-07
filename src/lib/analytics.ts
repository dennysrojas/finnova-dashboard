import {
  CompanyFinancials,
  MarketCompetitorState,
  PeriodDecision,
  ProductionMetrics,
  SimulationDataset
} from '../types/corbatul';

/**
 * Calculates competitive rankings, gap to industry leader,
 * and positioning metrics for each period with differentiated ranks.
 */
export function calculateBenchmarkingMetrics(competitors: MarketCompetitorState[], targetPeriod: number) {
  const periodData = competitors.filter(c => c.period === targetPeriod);
  
  // Sort by share price descending
  const sortedBySharePrice = [...periodData].sort((a, b) => b.sharePrice - a.sharePrice);
  const leaderSharePrice = sortedBySharePrice[0]?.sharePrice || 1;

  // Sort by units sold descending
  const sortedByUnits = [...periodData].sort((a, b) => b.unitsSold - a.unitsSold);
  const leaderUnits = sortedByUnits[0]?.unitsSold || 1;

  // Sort by gross margin descending
  const sortedByMargin = [...periodData].sort((a, b) => b.grossMargin - a.grossMargin);

  // Create rank maps
  const rankPriceMap = new Map<string, number>();
  sortedBySharePrice.forEach((item, idx) => rankPriceMap.set(item.firmId, idx + 1));

  const rankUnitsMap = new Map<string, number>();
  sortedByUnits.forEach((item, idx) => rankUnitsMap.set(item.firmId, idx + 1));

  const rankMarginMap = new Map<string, number>();
  sortedByMargin.forEach((item, idx) => rankMarginMap.set(item.firmId, idx + 1));

  return periodData.map(comp => {
    const gapToLeaderSharePricePct = ((comp.sharePrice - leaderSharePrice) / leaderSharePrice) * 100;
    const gapToLeaderMarketSharePoints = (comp.unitsSold - leaderUnits) / leaderUnits * 100;
    const ros = comp.totalRevenue > 0 ? (comp.netIncome / comp.totalRevenue) * 100 : 0;

    return {
      ...comp,
      rankBySharePrice: rankPriceMap.get(comp.firmId) || comp.rankBySharePrice,
      rankByUnitsSold: rankUnitsMap.get(comp.firmId) || 1,
      rankByGrossMargin: rankMarginMap.get(comp.firmId) || 1,
      gapToLeaderSharePricePct,
      gapToLeaderMarketSharePoints,
      returnOnSales: ros,
      isLeaderSharePrice: comp.sharePrice === leaderSharePrice,
      isLeaderUnits: comp.unitsSold === leaderUnits
    };
  });
}

/**
 * Aggregates high-impact executive KPIs for FashionClub (FINNOVA) strictly for selectedPeriod
 */
export function getExecutiveScorecard(dataset: SimulationDataset, selectedPeriod: number) {
  const ourFirmId = dataset.meta.primaryFirmId;
  const currentPeriod = selectedPeriod;
  
  const ourFinCurrent = dataset.financials.find(f => f.firmId === ourFirmId && f.period === currentPeriod);
  const ourFinPrev = dataset.financials.find(f => f.firmId === ourFirmId && f.period === currentPeriod - 1);
  const ourOpsCurrent = dataset.operations.find(o => o.firmId === ourFirmId && o.period === currentPeriod);
  const ourCompCurrent = dataset.competitors.find(c => c.firmId === ourFirmId && c.period === currentPeriod);
  
  const accumulatedNetIncome = dataset.financials
    .filter(f => f.firmId === ourFirmId && f.period <= currentPeriod)
    .reduce((sum, f) => sum + f.netIncome, 0);

  const prevAccumulatedNetIncome = dataset.financials
    .filter(f => f.firmId === ourFirmId && f.period <= currentPeriod - 1)
    .reduce((sum, f) => sum + f.netIncome, 0);

  const revenueGrowth = ourFinPrev && ourFinPrev.totalRevenue > 0
    ? ((ourFinCurrent?.totalRevenue || 0) - ourFinPrev.totalRevenue) / ourFinPrev.totalRevenue * 100 
    : 0;

  const netIncomeGrowth = ourFinPrev && ourFinPrev.netIncome !== 0
    ? ((ourFinCurrent?.netIncome || 0) - ourFinPrev.netIncome) / Math.abs(ourFinPrev.netIncome) * 100
    : 0;

  // Compute differentiated ranks for this period
  const periodComps = dataset.competitors.filter(c => c.period === currentPeriod);
  const sortedByPrice = [...periodComps].sort((a, b) => b.sharePrice - a.sharePrice);
  const rankBySharePrice = sortedByPrice.findIndex(c => c.firmId === ourFirmId) + 1 || 4;

  const sortedByUnits = [...periodComps].sort((a, b) => b.unitsSold - a.unitsSold);
  const rankByUnitsSold = sortedByUnits.findIndex(c => c.firmId === ourFirmId) + 1 || 4;

  const sortedByMargin = [...periodComps].sort((a, b) => b.grossMargin - a.grossMargin);
  const rankByGrossMargin = sortedByMargin.findIndex(c => c.firmId === ourFirmId) + 1 || 4;

  return {
    period: currentPeriod,
    year: ourFinCurrent?.year || (2025 + currentPeriod),
    totalRevenue: ourFinCurrent?.totalRevenue || 0,
    revenueGrowth,
    netIncome: ourFinCurrent?.netIncome || 0,
    netIncomeGrowth,
    accumulatedNetIncome,
    accumulatedNetIncomeGrowth: prevAccumulatedNetIncome !== 0 
      ? ((accumulatedNetIncome - prevAccumulatedNetIncome) / Math.abs(prevAccumulatedNetIncome)) * 100 
      : 0,
    grossProfit: ourFinCurrent?.grossProfit || 0,
    grossMargin: (ourFinCurrent?.grossMargin || 0) * 100, // e.g. 33.7, 32.0, 35.8, 39.5
    operatingIncome: ourFinCurrent?.operatingIncome || 0,
    operatingMargin: (ourFinCurrent?.operatingMargin || 0) * 100,
    netMargin: (ourFinCurrent?.netMargin || 0) * 100,
    marketShare: ourCompCurrent?.marketShareUnitsPct ?? ((ourCompCurrent?.marketShareUnits || 0) * 100),
    sharePrice: ourCompCurrent?.sharePrice || 0,
    rankBySharePrice,
    rankByUnitsSold,
    rankByGrossMargin,
    unitsSold: ourOpsCurrent?.unitsSold || 0,
    unitCost: ourOpsCurrent?.unitProductionCost || 0,
    capacityUtilization: (ourOpsCurrent?.capacityUtilizationRate || 0) * 100,
    stockoutRate: (ourOpsCurrent?.stockoutRate || 0) * 100,
    cashPosition: ourFinCurrent?.balanceSheet.cashAndEquivalents || 0,
    extraordinaryCredit: ourFinCurrent?.balanceSheet.extraordinaryCredit || 0,
    shareholdersEquity: ourFinCurrent?.balanceSheet.shareholdersEquity || 0,
  };
}
