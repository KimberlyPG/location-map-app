export interface PlacesResponse {
  type:     string;
  licence:  string;
  features: Feature[];
}

export interface Feature {
  type:       string;
  properties: Properties;
  bbox:       number[];
  geometry:   Geometry;
}

export interface Geometry {
  type:        string;
  coordinates: Array<Array<number[] | number> | number>;
}

export interface Properties {
  place_id:     number;
  osm_type:     string;
  osm_id:       number;
  place_rank:   number;
  category:     string;
  type:         string;
  importance:   number;
  addresstype:  string;
  name:         string;
  display_name: string;
  address:      { [key: string]: string };
}
