export interface Paginate {
  limit?: number;
  page?: number;
}

export interface DateFilter {
  startDate?: string;
  endDate?: string;
}

export interface Search {
  searchField?: string[];
  q?: string;
}

export interface Condition {
  field?: string;
  value?: string;
}

export interface InNumber {
  field?: string;
  value?: number[];
}

export interface InString {
  field?: string;
  value?: string[];
}

export interface QueryProps {
  dateFilter?: DateFilter;
  search?: Search;
  sort?: number;
  paginate?: Paginate;
  condition?: Condition[];
  inNumber?: InNumber[];
  inString?: InString[];
  joins?: string[];
  select?: string[];
}