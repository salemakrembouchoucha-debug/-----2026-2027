export type QuestionType =
  | 'mcq'
  | 'essay'
  | 'table'
  | 'classification'
  | 'chemical_equation_fill'
  | 'molecule_identification';

export interface McqOption {
  id: string; // 'A' | 'B' | 'C' | 'D'
  text: string;
}

export interface DiagramConfig {
  type:
    | 'dalton_sphere'
    | 'thomson_model'
    | 'bohr_model'
    | 'aluminum_atom'
    | 'beryllium_atom'
    | 'lithium_atom_mcq'
    | 'boron_atom_essay'
    | 'lithium_atom_diagram'
    | 'ammonia_space_filling'
    | 'ammonia_ball_stick'
    | 'water_space_filling'
    | 'hoffman_voltameter'
    | 'caco3_heating_apparatus'
    | 'banana_browning'
    | 'magnesium_burning'
    | 'wood_ice_changes'
    | 'heart_anatomy'
    | 'blood_vessel_artery'
    | 'blood_vessel_vein'
    | 'blood_vessel_capillary'
    | 'blood_vessels_comparison_abc'
    | 'four_molecules_ball_stick';
  props?: Record<string, any>;
}

export interface ChemicalEquationData {
  reactants: string; // Left side (المواد المتفاعلة على اليسار)
  arrowCondition?: string; // Above arrow (e.g. طاقة حرارية)
  products: string; // Right side (المواد الناتجة على اليمين)
}

export interface McqQuestion {
  id: string;
  unitId: string;
  unitTitle: string;
  pageNumber: number;
  originalNumber: number;
  text: string;
  options: McqOption[];
  correctOptionId: string;
  diagram?: DiagramConfig;
  equation?: ChemicalEquationData;
}

export interface EssaySubQuestion {
  id: string;
  partNumber: number | string;
  text: string;
  officialAnswer: string;
  inputPlaceholder?: string;
  diagram?: DiagramConfig;
  equation?: ChemicalEquationData;
}

export interface EssayQuestion {
  id: string;
  unitId: string;
  unitTitle: string;
  pageNumber: number;
  originalTitle: string;
  introText?: string;
  diagram?: DiagramConfig;
  equation?: ChemicalEquationData;
  subQuestions: EssaySubQuestion[];
}

export interface TableRowData {
  elementOrFormula: string;
  givenCol1?: string;
  givenCol2?: string;
  blankCol: string;
  officialAnswer: string;
}

export interface TableQuestion {
  id: string;
  unitId: string;
  unitTitle: string;
  pageNumber: number;
  originalTitle: string;
  columns: string[];
  rows: {
    id: string;
    values: { text: string; isBlank?: boolean; officialAnswer?: string }[];
  }[];
}

export interface ClassificationItem {
  id: string;
  label: string;
  correctCategory: string;
  diagram?: DiagramConfig;
}

export interface ClassificationQuestion {
  id: string;
  unitId: string;
  unitTitle: string;
  pageNumber: number;
  originalTitle: string;
  categories: string[];
  items: ClassificationItem[];
}

export interface UnitInfo {
  id: string;
  numberArabic: string;
  title: string;
  topics: string[];
}
