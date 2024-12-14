import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { StationDataProps } from "../interfaces/StationInterfaces";
import "../styles/StationData.css";

export const StationData: React.FC<StationDataProps> = ({
  stations,
  onRowClick,
}) => {
  return (
    <div className="station-data-container">
      <h2 className="table-title">All Available Stations</h2>
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="table-header-cell" align="inherit">
                Available Bikes
              </TableCell>
              <TableCell className="table-header-cell" align="inherit">
                Available Docks
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stations.map((station) => (
              <TableRow
                className="table-row"
                key={station.station_id}
                onClick={() => onRowClick(station.station_id)}
                style={{ cursor: "pointer" }}
              >
                <TableCell
                  className={`table-cell table-cell-bikes-available ${
                    station.num_bikes_available > 0
                      ? "bikes-available"
                      : "bikes-unavailable"
                  }`}
                  align="inherit"
                >
                  {station.num_bikes_available}
                </TableCell>
                <TableCell
                  className={`table-cell table-cell-bikes-available ${
                    station.num_docks_available > 0
                      ? "docks-available"
                      : "docks-unavailable"
                  }`}
                  align="inherit"
                >
                  {station.num_docks_available}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StationData;
