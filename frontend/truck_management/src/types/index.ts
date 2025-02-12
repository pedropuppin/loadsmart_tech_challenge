export interface Assignment {
  id: number;
  driver: number;
  truck: number;
  driver_detail: {
    id: number;
    name: string;
    license_type: string;
  };
  truck_detail: {
    id: number;
    plate: string;
    minimum_license_required: string;
  };
  date: string;
}

export interface Driver {
  id: number;
  name: string;
  license_type: string;
  assignments_count: number;
}

export interface TruckType {
  id: number;
  plate: string;
  minimum_license_required: string;
  assignments_count: number;
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}