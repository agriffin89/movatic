import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  CircularProgress,
  TableContainer,
  Table,
  Paper,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { StationDetail } from "../interfaces/StationInterfaces";

const StationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [station, setStation] = useState<StationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${API_URL}/stations`)
      .then((response) => {
        const stations = response.data.data.stations;
        const selectedStation = stations.find(
          (s: StationDetail) => s.station_id === id
        );
        setStation(selectedStation);
        setLoading(false);
      })
      .catch((error) =>
        console.error("Error fetching station details:", error)
      );
  }, [API_URL, id]);

  if (loading) return <CircularProgress />;

  if (!station) {
    return <Typography variant="h6">Station not found</Typography>;
  }

  return (
    <div className="station-data-container">
      <h2 className="table-title">Details for Station: {station.station_id}</h2>
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableBody>
            <TableRow className="table-row">
              <TableCell className="table-cell">Is Returning</TableCell>
              <TableCell className="table-cell">
                {station.is_returning ? "Yes" : "No"}
              </TableCell>
            </TableRow>
            <TableRow className="table-row">
              <TableCell className="table-cell">Is Renting</TableCell>
              <TableCell className="table-cell">
                {station.is_renting ? "Yes" : "No"}
              </TableCell>
            </TableRow>
            <TableRow className="table-row">
              <TableCell className="table-cell">Is Installed</TableCell>
              <TableCell className="table-cell">
                {station.is_installed ? "Yes" : "No"}
              </TableCell>
            </TableRow>
            <TableRow className="table-row">
              <TableCell className="table-cell">Available Docks</TableCell>
              <TableCell className="table-cell">
                {station.num_docks_available}
              </TableCell>
            </TableRow>
            <TableRow className="table-row">
              <TableCell className="table-cell">Available Bikes</TableCell>
              <TableCell className="table-cell">
                {station.num_bikes_available}
              </TableCell>
            </TableRow>
            <TableRow className="table-row">
              <TableCell className="table-cell">Electric Bikes</TableCell>
              <TableCell className="table-cell">
                {station.num_bikes_available_types.electric}
              </TableCell>
            </TableRow>
            <TableRow className="table-row">
              <TableCell className="table-cell">Smart Bikes</TableCell>
              <TableCell className="table-cell">
                {station.num_bikes_available_types.smart}
              </TableCell>
            </TableRow>
            <TableRow className="table-row">
              <TableCell className="table-cell">Classic Bikes</TableCell>
              <TableCell className="table-cell">
                {station.num_bikes_available_types.classic}
              </TableCell>
            </TableRow>
            <TableRow className="table-row">
              <TableCell className="table-cell">Last Reported</TableCell>
              <TableCell className="table-cell">
                {new Date(station.last_reported * 1000).toLocaleString()}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StationDetails;
