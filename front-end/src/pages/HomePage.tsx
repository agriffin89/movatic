import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Station } from "../interfaces/StationInterfaces";
import StationData from "../components/StationData";
import { CircularProgress } from "@mui/material";

const HomePage: React.FC = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${API_URL}/stations`)
      .then((response) => {
        setStations(response.data.data.stations);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching stations:", error);
        setLoading(false);
      });
  }, [API_URL]);

  const handleRowClick = (stationId: string) => {
    navigate(`/stations/${stationId}`);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return <StationData stations={stations} onRowClick={handleRowClick} />;
};

export default HomePage;
