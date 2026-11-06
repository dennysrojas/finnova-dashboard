export interface PeriodDecision {
  period: number;
  year?: number;
  firmId: string;
  priceStandard: number;
  pricePremium: number;
  priceSocks?: number;
  channelDiscount?: number;
  marketingBudget: number;
  salesForceHeadcount: number;
  salesIncentives?: {
    standard: number;
    premium: number;
    socks: number;
  };
  productionOrdersStandard: number;
  productionOrdersPremium: number;
  productionOrdersSocks?: number;
  plantShifts: 1 | 2 | 3;
  maintenanceBudget: number;
  qualityControlBudget: number;
  plantExpansionUnits: number;
  rawMaterialPurchaseStandard: number;
  rawMaterialPurchasePremium: number;
  shortTermLoanRequest: number;
  longTermDebtRepayment: number;
  dividendPayoutRatio: number;
  extraordinaryCreditEnding?: number;
}

export interface RoundDecisionStory {
  period: number;
  year?: number;
  firmId: string;
  roundTitle: string;
  strategicTheme: string;
  initialState: {
    cashStarting: number;
    inventoryStartingUnits: number;
    nominalCapacity: number;
    inheritedSharePrice: number;
    inheritedRank: number;
    inheritedMarketShare: number;
    diagnosticContext: string;
    criticalChallenge: string;
  };
  decisions: {
    commercial: {
      priceStandard: number;
      pricePremium: number;
      priceSocks?: number;
      channelDiscount?: number;
      marketingBudget: number;
      salesForceCount?: number;
      salesIncentivesSummary?: string;
      commercialRationale: string;
    };
    production: {
      ordersStandard: number;
      ordersPremium: number;
      ordersSocks?: number;
      plantShifts: 1 | 2 | 3;
      maintenanceBudget: number;
      qualityControlBudget: number;
      plantExpansionUnits: number;
      productionRationale: string;
    };
    sourcing: {
      rawMaterialStandard: number;
      rawMaterialPremium: number;
      catalogRangeSummary?: string;
      designLevelSummary?: string;
      sourcingRationale: string;
    };
    finance: {
      shortTermLoan: number;
      debtRepayment: number;
      dividendPayout: number;
      extraordinaryCreditImpact?: number;
      financeRationale: string;
    };
    strategicHypothesis: string;
  };
  consequences: {
    operationalImpact: {
      unitsProduced: number;
      unitsSold: number;
      utilizationRate: number;
      overtimeIncidence: string;
      machineBreakdowns: string;
      stockoutOccurred: boolean;
      stockoutUnits: number;
      operationalVerdict: string;
    };
    financialImpact: {
      totalRevenue: number;
      grossProfit: number;
      grossMargin: number;
      cogsSummary: string;
      netIncome: number;
      netMargin: number;
      endingCash: number;
      endingDebt: number;
      extraordinaryCredit: number;
      financialVerdict: string;
    };
    competitiveImpact: {
      endingSharePrice: number;
      sharePriceDelta: number;
      marketShare: number;
      marketRank: number;
      competitorMovements: string;
    };
    lessonsLearned: string;
  };
}

export interface CompanyFinancials {
  period: number;
  year?: number;
  firmId: string;
  totalRevenue: number;
  costOfGoodsSold: number;
  grossProfit: number;
  grossMargin: number;
  marketingExpenses: number;
  personnelExpenses?: number;
  depreciationExpenses?: number;
  generalExpenses?: number;
  operatingExpenses: number;
  operatingIncome: number;
  operatingMargin: number;
  interestExpenses: number;
  extraordinaryItems?: number;
  taxExpenses: number;
  netIncome: number;
  netMargin: number;
  balanceSheet: {
    cashAndEquivalents: number;
    accountsReceivable: number;
    inventoryValue: number;
    currentAssets: number;
    propertyPlantEquipment: number;
    totalAssets: number;
    shortTermDebt: number;
    extraordinaryCredit: number;
    accountsPayable: number;
    currentLiabilities: number;
    longTermDebt: number;
    totalLiabilities: number;
    shareholdersEquity: number;
  };
}

export interface ProductionMetrics {
  period: number;
  year?: number;
  firmId: string;
  nominalCapacity: number;
  effectiveCapacity: number;
  actualProductionUnits: number;
  capacityUtilizationRate: number;
  inventoryBeginUnits: number;
  unitsAvailableForSale: number;
  unitsSold: number;
  inventoryEndUnits: number;
  stockoutUnits: number;
  stockoutRate: number;
  unitProductionCost: number;
  products?: {
    standard: { unitsSold: number; revenue: number; price: number; margin: number; catalogRange: number };
    premium: { unitsSold: number; revenue: number; price: number; margin: number; catalogRange: number };
    socks: { unitsSold: number; revenue: number; price: number; margin: number; catalogRange: number };
  };
}

export interface MarketCompetitorState {
  period: number;
  year?: number;
  firmId: string;
  firmName: string;
  isOurFirm: boolean;
  color: string;
  sharePrice: number;
  marketShareUnits: number;
  marketShareRevenue: number;
  totalRevenue: number;
  grossMargin: number;
  netIncome: number;
  unitsSold: number;
  rankBySharePrice: number;
  liquidityRatio?: number;
}

export interface SimulationDataset {
  meta: {
    teamName: string;
    primaryFirmId: string;
    primaryFirmName: string;
    totalFirms: number;
    totalPeriods: number;
    generatedAt: string;
  };
  periods: number[];
  years: number[];
  firms: { id: string; name: string; isOurFirm: boolean; color: string; badge?: string }[];
  decisions: PeriodDecision[];
  decisionStories: RoundDecisionStory[];
  financials: CompanyFinancials[];
  operations: ProductionMetrics[];
  competitors: MarketCompetitorState[];
}
