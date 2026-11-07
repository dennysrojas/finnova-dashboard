export interface PeriodDecision {
  period: number;
  year: number;
  firmId: string;
  priceStandard: number;
  pricePremium: number;
  priceSocks: number;
  channelDiscount: number;
  marketingBudget: number;
  salesForceHeadcount: number;
  salesIncentives?: {
    standard: number;
    premium: number;
    socks: number;
  };
  productionOrdersStandard: number;
  productionOrdersPremium: number;
  productionOrdersSocks: number;
  plantShifts: 1 | 2 | 3;
  maintenanceBudget: number;
  qualityControlBudget: number;
  plantExpansionUnits: number;
  rawMaterialPurchaseStandard: number;
  rawMaterialPurchasePremium: number;
  shortTermLoanRequest: number;
  longTermDebtRepayment: number;
  dividendPayoutRatio: number;
  extraordinaryCreditEnding: number;
}

export interface RoundDecisionStory {
  period: number;
  year: number;
  firmId: string;
  roundTitle: string;
  strategicTheme: string;
  initialState: {
    cashStarting: number;
    inventoryStartingValue: number; // En euros (€) según correcciones 19, 28, 36
    inventoryStartingUnits?: number;
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
      priceSocks: number;
      channelDiscount: number;
      marketingBudget: number;
      salesForceCount?: number;
      salesIncentivesSummary?: string;
      commercialRationale: string;
    };
    production: {
      ordersStandard: number;
      ordersPremium: number;
      ordersSocks: number;
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
      extraordinaryCreditImpact: number;
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
      grossMargin: number; // Porcentual, ej: 33.7, 32.0, 35.8, 39.5
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
      marketShare: number; // Porcentual, ej: 15.0, 16.6, 16.3, 14.3
      marketRank: number; // Ranking por valor de compañía
      rankByUnitsSold?: number; // Ranking por unidades vendidas
      rankByGrossMargin?: number; // Ranking por margen bruto
      competitorMovements: string;
    };
    lessonsLearned: string;
  };
}

export interface CompanyFinancials {
  period: number;
  year: number;
  firmId: string;
  totalRevenue: number;
  costOfGoodsSold: number;
  grossProfit: number;
  grossMargin: number; // Decimal (ej: 0.337)
  marketingExpenses: number;
  personnelExpenses: number;
  rdExpenses: number; // Gastos de I+D
  depreciationExpenses: number;
  insolvencyProvisions: number; // Dotación insolvencias
  generalExpenses: number;
  operatingExpenses: number;
  operatingIncome: number;
  operatingMargin: number;
  interestExpenses: number;
  extraordinaryItems: number; // Resultados extraordinarios
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
  year: number;
  firmId: string;
  nominalCapacity: number;
  effectiveCapacity: number;
  actualProductionUnits: number;
  capacityUtilizationRate: number;
  inventoryBeginUnits?: number;
  inventoryBeginValue?: number;
  unitsAvailableForSale: number;
  unitsSold: number;
  inventoryEndUnits?: number;
  inventoryEndValue?: number;
  stockoutUnits: number;
  stockoutRate: number;
  unitProductionCost: number;
  products: {
    standard: { unitsSold: number; revenue: number; price: number; margin: number; catalogRange: number; narrative: string };
    premium: { unitsSold: number; revenue: number; price: number; margin: number; catalogRange: number; narrative: string };
    socks: { unitsSold: number; revenue: number; price: number; margin: number; catalogRange: number; narrative: string };
  };
}

export interface MarketCompetitorState {
  period: number;
  year: number;
  firmId: string;
  firmName: string;
  isOurFirm: boolean;
  color: string;
  sharePrice: number;
  marketShareUnits: number; // Decimal
  marketShareUnitsPct?: number; // Porcentual (ej: 15.0, 16.6, 16.3, 14.3)
  marketShareRevenue: number;
  totalRevenue: number;
  grossMargin: number; // Decimal
  grossMarginPct?: number; // Porcentual
  netIncome: number;
  unitsSold: number;
  rankBySharePrice: number;
  rankByUnitsSold?: number;
  rankByGrossMargin?: number;
  liquidityRatio?: number;
}

export interface ValuationComponentYear {
  parameter: string;
  score: number;
  industryMean: number;
  status: string;
  isTop?: boolean;
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
  valuationComponentsByYear: Record<number, ValuationComponentYear[]>;
}
