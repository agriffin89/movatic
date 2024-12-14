import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Station } from "../interfaces/StationInterfaces.tsx";
import StationData from "../components/StationData.tsx";
import { CircularProgress } from "@mui/material";

const HomePage: React.FC = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/stations")
      .then((response) => {
        setStations(response.data.data.stations);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching stations:", error);
        setLoading(false);
      });
  }, []);

  const handleRowClick = (stationId: string) => {
    navigate(`/stations/${stationId}`);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return <StationData stations={stations} onRowClick={handleRowClick} />;
};

export default HomePage;
