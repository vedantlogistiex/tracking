import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { SHIPPING_URL } from "../Utils/backendURL";
import { Button, CircularProgress, TextField } from "@mui/material";

const TrackingForm = ({ colors }) => {
  const { shipmentId: initialShipmentId } = useParams();
  const [shipmentId, setShipmentId] = useState(initialShipmentId || ""); // Initialize with URL param
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setShipmentId(event.target.value);
    setErrorMsg("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!shipmentId.trim()) {
      alert("Please enter a shipment ID.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const response = await axios.get(`${SHIPPING_URL}/api/shipping/v1/status_public/v2?awb_number=${shipmentId}`);
      if (response.status === 200) {
        navigate(`/trackpage/trackShipment/${shipmentId}`);
      } else {
        setErrorMsg(`No details found for Tracking ID: ${shipmentId}.`);
      }
    } catch (err) {
      setErrorMsg(`Error tracking ${shipmentId}: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="p-6 rounded-lg shadow-md max-w-sm w-full flex flex-col gap-4"
      style={{ backgroundColor: colors.paper }}
    >
      <h2 className="text-xl font-bold" style={{ color: colors.textPrimary }}>
        Track your order
      </h2>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Enter your order number"
        value={shipmentId}
        onChange={handleInputChange}
        className="my-4"
      />
      {errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}
      <Button
        onClick={handleSubmit}
        fullWidth
        variant="contained"
        style={{ backgroundColor: colors.secondary, color: colors.tertiary }}
      >
        {loading ? <CircularProgress size={24} style={{ color: colors.tertiary }} /> : "Track Shipment"}
      </Button>
    </div>
  );
};

export default TrackingForm;
