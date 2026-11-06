export interface Firm {
  id: string;
  name: string;
  isOurFirm: boolean;
  color: string;
  badge: string;
}

export interface ValuationRank {
  rank: number;
  firmId: string;
  name: string;
  value: number;
  growth: string;
}

export interface ValuationComponent {
  parameter: string;
  2024: number;
  2025: number;
  2026: number;
  2027: number;
  2028: number;
  2029: number;
  industryMean2029: number;
}

export interface PnLYear {
  ingresos: number;
  costeVentas: number;
  margenBruto: number;
  ratioMargen: number;
  marketing: number;
  personal: number;
  gastosGenerales: number;
  depreciacion: number;
  totalGastosOperacion: number;
  resultadoBruto: number;
  gastosFinancieros: number;
  resultadoNeto: number;
}

export interface BalanceYear {
  activoFijoNeto: number;
  inventario: number;
  cuentasCobrar: number;
  cajaDisponible: number;
  activoTotal: number;
  patrimonioNeto: number;
  prestamoLargoPlazo: number;
  prestamoCortoPlazo: number;
  creditoExtraordinario: number;
  proveedores: number;
}

export interface ProductMarginEvolution {
  year: number;
  margin: number;
}

export interface ProductStats2029 {
  salesUnits: number;
  revenue: number;
  price: number;
  marginPct: number;
  capacity: number;
  utilization: number;
  catalogRange: number;
  designLevel: number;
  marketingBudget: number;
  salesIncentive: number;
}

export interface ProductInfo {
  id: string;
  name: string;
  role: string;
  badgeColor: string;
  marginEvolution: ProductMarginEvolution[];
  stats2029: ProductStats2029;
  insight: string;
}

export interface DecisionItem {
  param: string;
  val: string;
  evidence: string;
}

export interface DecisionAudit {
  year: number;
  period: number;
  title: string;
  strategicIntent: string;
  decisions: DecisionItem[];
  results: {
    revenue: string;
    margin: string;
    netIncome: string;
    extraordinaryCredit: string;
    companyValue: string;
  };
}

export interface CompetitorBenchmark {
  firmId: string;
  name: string;
  companyValue: number;
  units: number;
  marketShare: number;
  revenue: number;
  marginPct: number;
  grossProfit: number;
  liquidity: number;
  rank: number;
  isOurFirm?: boolean;
}

export interface FinnovaAnalyticsData {
  metadata: {
    team: string;
    company: string;
    industry: string;
    simulationRounds: number;
    years: number[];
    generatedAt: string;
    author: string;
  };
  firms: Firm[];
  companyValuation: {
    years: number[];
    ranking2029: ValuationRank[];
    historical: Record<string, number[]>;
    componentsFashionClub: ValuationComponent[];
  };
  pnlData: Record<string, PnLYear>;
  balanceData: Record<string, BalanceYear>;
  products: ProductInfo[];
  decisionsAudit: DecisionAudit[];
  benchmarking2029: CompetitorBenchmark[];
}
