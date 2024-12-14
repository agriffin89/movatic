export interface Station {
  station_id: string;
  num_bikes_available: number;
  num_docks_available: number;
}

export interface StationDetail extends Station {
  is_returning: number;
  is_renting: number;
  is_installed: number;
  last_reported: number;
  num_bikes_available_types: {
    electric: number;
    smart: number;
    classic: number;
  };
}

export interface StationDataProps {
  stations: Station[];
  onRowClick: (id: string) => void;
}
