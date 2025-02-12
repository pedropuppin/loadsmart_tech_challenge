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
}

export interface TruckType {
  id: number;
  plate: string;
  minimum_license_required: string;
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}