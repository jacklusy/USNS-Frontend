export type ApiTimestamp = string;

export interface PaginationMetaDto {
  total: number;
  page: number;
  per_page: number;
  last_page: number;
}

export interface PaginatedDto<T> {
  data: T[];
  meta: PaginationMetaDto;
}
