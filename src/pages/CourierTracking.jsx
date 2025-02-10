import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

// Define sample steps and event data for tracking
const steps = ["Order Placed", "Picked Up", "In Transit", "Out for Delivery", "Delivered"];
const eventData = [
  { date: "2025-01-01", event: "Order Placed", location: "Origin Warehouse" },
  { date: "2025-01-02", event: "Picked Up", location: "Origin Facility" },
  { date: "2025-01-03", event: "In Transit", location: "On the Road" },
  { date: "2025-01-04", event: "Out for Delivery", location: "Local Hub" },
  { date: "2025-01-05", event: "Delivered", location: "Customer Address" },
];

const CourierTrackingPage = ({ primaryColor, secondaryColor, tertiaryColor }) => {
  // activeStep controls the stepper's highlighted step
  const [activeStep, setActiveStep] = useState(2);
  // layoutMode toggles between vertical and horizontal layouts
  const [layoutMode, setLayoutMode] = useState("vertical");
  // layoutDialogOpen manages the open state of the layout modification dialog
  const [layoutDialogOpen, setLayoutDialogOpen] = useState(false);

  const handleLayoutChange = (mode) => {
    setLayoutMode(mode);
    setLayoutDialogOpen(false);
  };

  return (
    // Use Tailwind's spacing and minimal height classes.
    // The inline style sets CSS variables to use our custom colors.
    <div
      className="min-h-screen p-4"
      style={{
        "--primary": primaryColor,
        "--secondary": secondaryColor,
        "--tertiary": tertiaryColor,
      }}
    >
      {/* Header */}
      <header className="mb-4">
        <h1 className="text-3xl font-bold" style={{ color: "var(--primary)" }}>
          Courier Tracking
        </h1>
      </header>

      {/* Order Details Section */}
      <Paper className="p-4 mb-4">
        <h2 className="text-2xl font-semibold" style={{ color: "var(--secondary)" }}>
          Order Details
        </h2>
        <div className="mt-2">
          <p>Order ID: #123456</p>
          <p>Date: 2025-01-01</p>
        </div>
      </Paper>

      {/* Main content: Addresses + Tracking and Event Details */}
      <div className={layoutMode === "vertical" ? "space-y-4" : "flex space-x-4"}>
        {/* From & To Address with Stepper */}
        <Paper className="p-4 flex-1">
          <h2 className="text-2xl font-semibold mb-2" style={{ color: "var(--secondary)" }}>
            From &amp; To Addresses
          </h2>
          <div className="mb-2">
            <strong>From:</strong>
            <p>123 Origin St, City, Country</p>
          </div>
          <div>
            <strong>To:</strong>
            <p>789 Destination Ave, City, Country</p>
          </div>
          <Stepper activeStep={activeStep} alternativeLabel className="mt-4">
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>

        {/* Event Details Table */}
        <Paper className="p-4 flex-1">
          <h2 className="text-2xl font-semibold mb-2" style={{ color: "var(--secondary)" }}>
            Event Details
          </h2>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Event</TableCell>
                <TableCell>Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {eventData.map((event, index) => (
                <TableRow key={index}>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>{event.event}</TableCell>
                  <TableCell>{event.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>

      {/* Modify Layout Button */}
      <div className="mt-4">
        <Button variant="contained" color="primary" onClick={() => setLayoutDialogOpen(true)}>
          Modify Layout
        </Button>
      </div>

      {/* Layout Modification Dialog */}
      <Dialog open={layoutDialogOpen} onClose={() => setLayoutDialogOpen(false)}>
        <DialogTitle>Modify Layout</DialogTitle>
        <DialogContent>
          <p>Select layout mode:</p>
          <div className="flex space-x-2 mt-2">
            <Button variant="outlined" onClick={() => handleLayoutChange("vertical")}>
              Vertical
            </Button>
            <Button variant="outlined" onClick={() => handleLayoutChange("horizontal")}>
              Horizontal
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLayoutDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CourierTrackingPage;
