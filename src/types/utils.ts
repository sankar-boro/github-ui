// Generic utility types
export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

export type ValueOf<T> = T[keyof T];

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;

export type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

export type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

// State management types
export type LoadingState = "idle" | "loading" | "success" | "error";

export interface AsyncState<T> {
  data: Nullable<T>;
  loading: boolean;
  error: Nullable<Error>;
  state: LoadingState;
}

export interface PaginatedState<T> {
  items: T[];
  totalCount: number;
  page: number;
  perPage: number;
  hasMore: boolean;
  loading: boolean;
  error: Nullable<Error>;
}

// Form types
export type ValidationRule = {
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  email?: boolean;
  url?: boolean;
  match?: string;
  custom?: (value: any) => boolean | string;
};

export type ValidationRules<T> = {
  [P in keyof T]?: ValidationRule | ValidationRule[];
};

export type FormErrors<T> = {
  [P in keyof T]?: string[];
};

export type FormTouched<T> = {
  [P in keyof T]?: boolean;
};

// Event types
export interface DragAndDropResult {
  draggableId: string;
  type: string;
  source: {
    index: number;
    droppableId: string;
  };
  destination?: {
    index: number;
    droppableId: string;
  };
  reason: "DROP" | "CANCEL";
}

// Sort and filter types
export type SortDirection = "asc" | "desc";

export interface SortConfig<T> {
  key: keyof T;
  direction: SortDirection;
}

export interface FilterConfig<T> {
  key: keyof T;
  value: any;
  operator:
    | "eq"
    | "neq"
    | "gt"
    | "gte"
    | "lt"
    | "lte"
    | "contains"
    | "startsWith"
    | "endsWith"
    | "in"
    | "nin";
}

// Chart data types
export interface ChartDataPoint {
  label: string;
  value: number;
  [key: string]: any;
}

export interface SeriesDataPoint {
  name: string;
  data: number[];
  color?: string;
}

// File types
export interface FileUploadResult {
  url: string;
  filename: string;
  size: number;
  mimeType: string;
}

export interface FileValidationResult {
  valid: boolean;
  errors?: string[];
}

// Export all types
// export * from "./index";
// export * from "./api";
// export * from "./components";
// export * from "./context";
