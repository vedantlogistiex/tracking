import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { SHIPPING_URL } from "../Utils/backendURL";
import { Button, CircularProgress, TextField, Typography } from "@mui/material";

const TrackingForm = ({ colors, updateTrackingId }) => {
  const { shipmentId: initialShipmentId } = useParams();
  const [shipmentId, setShipmentId] = useState(initialShipmentId || "");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setShipmentId(event.target.value);
    setErrorMsg(""); // Clear previous errors on change
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!shipmentId.trim()) {
      setErrorMsg("Please enter a valid shipment ID.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    // Ensure updateTrackingId is a function and call it
    if (typeof updateTrackingId === "function") {
      updateTrackingId(shipmentId);
    }

    try {
      const response = await axios.get(`${SHIPPING_URL}/api/shipping/v1/status_public/v2?awb_number=${shipmentId}`);

      if (response.status === 200) {
        navigate(`/trackpage/trackShipment/${shipmentId}`);
      } else {
        setErrorMsg(`No details found for Tracking ID: ${shipmentId}.`);
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || `Error tracking ${shipmentId}: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="p-6 rounded-lg shadow-md max-w-sm w-full flex flex-col gap-4"
      style={{ backgroundColor: colors.paper }}
    >
      <Typography variant="h5" sx={{ color: colors.textPrimary, fontWeight: "bold" }}>
        Track Your Order
      </Typography>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Enter your order number"
        value={shipmentId}
        onChange={handleInputChange}
        sx={{ my: 2 }}
        inputProps={{ "aria-label": "Enter tracking number" }}
      />

      {errorMsg && (
        <Typography color="error" className="text-center">
          {errorMsg}
        </Typography>
      )}

      <Button
        onClick={handleSubmit}
        fullWidth
        variant="contained"
        sx={{
          backgroundColor: colors.secondary,
          color: colors.tertiary,
          "&:hover": { backgroundColor: colors.secondary },
        }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} sx={{ color: colors.tertiary }} /> : "Track Shipment"}
      </Button>
    </div>
  );
};

export default TrackingForm;
