export interface RoutesResponse {
  geometry:    Geometry;
  legs:        Leg[];
  weight_name: string;
  weight:      number;
  duration:    number;
  distance:    number;
}

export interface Geometry {
  coordinates: Array<number[]>;
  type:        string;
}

export interface Leg {
  steps:    any[];
  summary:  string;
  weight:   number;
  duration: number;
  distance: number;
}
