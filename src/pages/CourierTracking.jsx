import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import HeroSection from "../components/HeroSection";
import TrackingForword from "../components/TrackingForward";
import axios from "axios";
import { useEffect, useState } from "react";
import TrackingReturn from "../components/TrackingReturn";
import { useParams } from "react-router-dom";
import { trackingMilestonesReturn } from "../Utils/trackingMilestonesReturn";
import { trackingMileStones } from "../Utils/trackingMilestones";
import { SHIPPING_URL } from "../Utils/backendURL";
import { withTranslation } from "react-i18next";
import Loader from "../components/Loader";

const TrackingPage = ({ layout, colors, ...props }) => {
  const { shipmentId: initialShipmentId } = useParams();

  // State for shipmentId input and tracking data
  const [shipmentId, setShipmentId] = useState(initialShipmentId || ""); // Initialize with URL param
  const [trackingID, setTrackingID] = useState(initialShipmentId || "");
  const [trackingData, setTrackingData] = useState(null);
  const [isReturnShipment, setIsReturnShipment] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deliveryFailedStatus, setDeliveryFailedStatus] = useState(false);
  const [returnPickupFailedStatus, setReturnPickupFailedStatus] = useState(false);
  const [returnPickupFailedReason, setReturnPickupFailedReason] = useState("");
  const [returnDeliveryFailedStatus, setReturnDeliveryFailedStatus] = useState(false);
  const [returnDeliveryFailedReason, setReturnDeliveryFailedReason] = useState("");
  const [deliveryFailedReason, setDeliveryFailedReason] = useState("");
  const [cancellationStatus, setCancellationStatus] = useState(false);
  const [currentStateIndex, setCurrentStateIndex] = useState(-1);
  const [eventsArr, setEventsArr] = useState([]);
  const [courierCode, setCourierCode] = useState("");
  const [markRTOStatus, setMarkRTOStatus] = useState(false);
  const [myData, setMyData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (trackingID) {
      // Fetch data if initialShipmentId is present (for initial load)
      fetchData(trackingID);
    }
  }, [trackingID]);

  // Define the function that updates the tracking ID
  const updateTrackingId = (id) => {
    setShipmentId(id);
    console.log("Tracking ID updated:", id); // Optional, for debugging
  };

  // Fetch data based on the updated shipmentId
  useEffect(() => {
    if (shipmentId) {
      fetchData(shipmentId);
    }
  }, [shipmentId]);

  const getEventDescription = (event, t) => {
    const eventType = event?.shipment_event?.event;
    let location = event?.current_location?.node || event?.current_location?.city;
    let next_location = event?.next_location?.node || event?.next_location?.city;
    let translation = t(eventType);
    let eventDescription;
    if (!translation || translation === eventType) {
      return "";
    }
    if (eventType === "DeliveryFailedEvent") {
      const deliveryfailed = event?.notes ? translation + " due to " + event?.notes : translation;
      if (!deliveryFailedReason) {
        setDeliveryFailedReason(deliveryfailed);
      }
      eventDescription = deliveryfailed;
    } else if (eventType === "ReturnDeliveryFailedEvent") {
      const returnDeliveryFailed = event?.notes ? translation + " due to " + event?.notes : translation;
      if (!returnDeliveryFailedReason) {
        setReturnDeliveryFailedReason(returnDeliveryFailed);
      }
      eventDescription = returnDeliveryFailed;
    } else if (eventType === "ReturnPickupFailedEvent") {
      const returnPickupFailed = event?.notes ? translation + " due to " + event?.notes : translation;
      if (!returnPickupFailedReason) {
        setReturnPickupFailedReason(returnPickupFailed);
      }
      eventDescription = returnPickupFailed;
    } else if (eventType === "ShipmentInscanEvent") {
      if (location) {
        eventDescription = translation + " at " + location;
      } else if (next_location) {
        eventDescription = "Shipment Departed to " + next_location;
      } else {
        eventDescription = translation + " at courier facility";
      }
    } else if (eventType === "ShipmentOutscanEvent") {
      if (location) {
        eventDescription = translation + " from " + location;
      } else if (next_location) {
        eventDescription = translation + " to " + next_location;
      } else {
        eventDescription = "Shipment Departed to courier facility";
      }
    } else {
      eventDescription = translation;
    }
    return eventDescription;
  };

  const groupEventsByDate = (events, t) => {
    console.log("groupEventsByDate function called");
    let groupedEvents = {};
    for (const event of events) {
      const eventDate = new Date(event.timestamp).toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      if (event?.shipment_event?.event === "ShipmentReturnInitiatedEvent" && markRTOStatus) {
        groupedEvents = {};
      }
      let eventDescription = getEventDescription(event, t);
      const eventData = {
        eventTime: new Date(event?.timestamp).getTime(),
        eventType: event?.shipment_event?.event,
        eventDescription: eventDescription,
      };
      if (groupedEvents[eventDate]) {
        const lastEvent = groupedEvents[eventDate].eventList[groupedEvents[eventDate].eventList.length - 1];

        if (lastEvent && lastEvent?.eventDescription === eventData?.eventDescription) {
          if (eventData.eventTime > lastEvent.eventTime) {
            lastEvent.eventTime = eventData.eventTime;
          }
        } else {
          groupedEvents[eventDate].eventList.push(eventData);
        }
      } else {
        groupedEvents[eventDate] = {
          _id: eventDate,
          eventList: [eventData],
        };
      }
    }
    for (const date in groupedEvents) {
      groupedEvents[date].eventList.sort((a, b) => a.eventTime - b.eventTime);
      groupedEvents[date].eventList = groupedEvents[date].eventList.filter((event) => event.eventDescription != "");
    }
    const sortedGroupedEvents = Object.keys(groupedEvents)
      .sort((a, b) => new Date(a) - new Date(b))
      .map((date) => groupedEvents[date]);
    setTrackingData(sortedGroupedEvents);
  };

  useEffect(() => {
    if (eventsArr.length > 0) {
      groupEventsByDate(eventsArr, props?.t);
    }
  }, [eventsArr, props?.t, props.tReady]);

  const fetchData = async () => {
    console.log("fetchData function called");
    setLoading(true);
    try {
      const response = await axios.get(`${SHIPPING_URL}/api/shipping/v1/status_public/v2?awb_number=${shipmentId}`);
      const resData = response.data;
      setMyData(resData[0]);

      console.log("resData", resData);

      if (resData) {
        const currentState = resData[0]?.current_status;
        const newCourierCode = resData[0]?.courier_code || "";
        const newEvents = resData[0]?.events || [];
        setEventsArr(newEvents);
        setCourierCode(newCourierCode);
        if (currentState?.startsWith("RETURN") && resData[0]?.rto_initiated === false) {
          setIsReturnShipment(true);
          let currIndex = trackingMilestonesReturn.findIndex((item) => item?.currentStatus === currentState);
          if (currIndex === -1) {
            if (currentState === "RETURN_PICKUP_FAILED") {
              setReturnPickupFailedStatus(true);
              setCurrentStateIndex(1);
            }
            if (currentState === "RETURN_DELIVERY_FAILED") {
              setReturnDeliveryFailedStatus(true);
              setCurrentStateIndex(4);
            } else if (currentState === "CANCELLED") {
              setCancellationStatus(true);
              setCurrentStateIndex(0);
            }
          } else {
            setCurrentStateIndex(currIndex + 1);
          }
        } else {
          let currIndex = trackingMileStones.findIndex((item) => item?.currentStatus === currentState);
          if (currIndex === -1) {
            if (currentState === "DELIVERY_FAILED") {
              setDeliveryFailedStatus(true);
              setCurrentStateIndex(5);
              return;
            } else if (currentState === "CANCELLED") {
              setCancellationStatus(true);
            } else if (
              (currentState.startsWith("RETURN") || currentState.startsWith("RTO")) &&
              resData[0]?.rto_initiated === true
            ) {
              setMarkRTOStatus(true);
            }
            const eventIndex = resData[0]?.events.findIndex((event) =>
              trackingMileStones.some((item) => item?.currentStatus === event.current_status)
            );
            if (eventIndex !== -1) {
              const matchingStatus = resData[0]?.events[eventIndex].current_status;
              currIndex = trackingMileStones.findIndex((item) => item?.currentStatus === matchingStatus);
              setCurrentStateIndex(currIndex);
            }
          } else {
            setCurrentStateIndex(currIndex);
          }
        }
        setFetchError(false);
      } else {
        console.error("Data not found");
        setFetchError("Data not found");
      }
    } catch (error) {
      console.error("Error fetching tracking data:", error.response?.data?.message);
      setFetchError(
        `Error while tracking ${shipmentId}: ${error.response?.data?.message ?? error.message}` ||
          "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
      setIsLoaded(true);
    }
  };

  console.log("trackingData", trackingData);
  console.log("isReturnShipment", isReturnShipment);
  console.log("eventsArr", eventsArr);
  console.log("myData", myData);

  useEffect(() => {
    // Scroll to 90vh after loading is complete
    if (!loading && isLoaded) {
      window.scrollTo(0, window.innerHeight * 0.9);
    }
  }, [loading, isLoaded]); // This will trigger when loading or isLoaded changes

  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="mx-auto">
        <HeroSection colors={colors} updateTrackingId={updateTrackingId} />
        {loading ? (
          <Loader colors={colors} />
        ) : (
          <div className="py-8" style={{ backgroundColor: colors.paper }}>
            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Shipment Details */}
                <div className="p-6 rounded-lg" style={{ backgroundColor: colors.primary }}>
                  <h2 className="text-xl font-semibold mb-4" style={{ color: colors.textPrimary }}>
                    AWB
                  </h2>
                  <p style={{ color: colors.textPrimary }}>{myData?.awb_number}</p>
                </div>
                <div className="p-6 rounded-lg" style={{ backgroundColor: colors.primary }}>
                  <h2 className="text-xl font-semibold mb-4" style={{ color: colors.textPrimary }}>
                    Status
                  </h2>
                  <p style={{ color: colors.textPrimary }}>{myData?.current_status}</p>
                </div>
                <div className="p-6 rounded-lg" style={{ backgroundColor: colors.primary }}>
                  <h2 className="text-xl font-semibold mb-4" style={{ color: colors.textPrimary }}>
                    Courier
                  </h2>
                  <p style={{ color: colors.textPrimary }}>{myData?.courier_code}</p>
                </div>
                <div className="p-6 rounded-lg" style={{ backgroundColor: colors.primary }}>
                  <h2 className="text-xl font-semibold mb-4" style={{ color: colors.textPrimary }}>
                    Current Location
                  </h2>
                  <p style={{ color: colors.textPrimary }}>
                    {myData?.current_location?.node
                      ? myData?.current_location?.node
                      : `${myData?.current_location?.city}, ${myData?.current_location?.state}`}
                  </p>
                </div>
              </div>

              <div className={`grid gap-8 ${layout.horizontal ? "md:grid-cols-1" : "md:grid-cols-4"}`}>
                {/* Stepper */}
                <div
                  className={`mt-8 p-6 w-full rounded-lg flex ${
                    layout.horizontal ? "md:col-span-1 justify-center" : "md:col-span-1"
                  }`}
                  style={{ backgroundColor: colors.primary }}
                >
                  {isReturnShipment ? (
                    <TrackingReturn
                      trackingData={trackingData}
                      courierCode={courierCode}
                      shipmentId={trackingID}
                      cancellationStatus={cancellationStatus}
                      currentStateIndex={currentStateIndex}
                      returnPickupFailedStatus={returnPickupFailedStatus}
                      returnPickupFailedReason={returnPickupFailedReason}
                      returnDeliveryFailedStatus={returnDeliveryFailedStatus}
                      returnDeliveryFailedReason={returnDeliveryFailedReason}
                      layout={layout}
                      colors={colors}
                    />
                  ) : (
                    trackingData && (
                      <TrackingForword
                        trackingData={trackingData}
                        courierCode={courierCode}
                        shipmentId={trackingID}
                        cancellationStatus={cancellationStatus}
                        markRTOStatus={markRTOStatus}
                        currentStateIndex={currentStateIndex}
                        deliveryFailedStatus={deliveryFailedStatus}
                        deliveryFailedReason={deliveryFailedReason}
                        layout={layout}
                        colors={colors}
                      />
                    )
                  )}
                </div>

                {/* Events Table */}
                <div className={`${layout.horizontal ? "md:col-span-1" : "md:col-span-3 mt-8 "}`}>
                  <Paper
                    elevation={3}
                    style={{
                      background: colors.paper,
                      borderRadius: "12px",
                      overflow: "hidden",
                    }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow style={{ background: colors.secondary }}>
                          <TableCell style={{ color: colors.textSecondary, fontWeight: "bold" }}>Date</TableCell>
                          <TableCell style={{ color: colors.textSecondary, fontWeight: "bold" }}>Time</TableCell>
                          <TableCell style={{ color: colors.textSecondary, fontWeight: "bold" }}>Location</TableCell>
                          <TableCell style={{ color: colors.textSecondary, fontWeight: "bold" }}>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {myData?.events?.map((event, index) => (
                          <TableRow
                            key={index}
                            style={{
                              background: index % 2 === 0 ? colors.tertiary : colors.paper,
                            }}
                          >
                            <TableCell>{new Date(event.timestamp).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(event.timestamp).toLocaleTimeString()}</TableCell>
                            <TableCell>
                              {event.current_location?.node
                                ? event.current_location?.node
                                : `${event.current_location?.city}, ${event.current_location?.state}`}
                            </TableCell>
                            <TableCell>{event.current_status}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Paper>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default withTranslation()(TrackingPage);
