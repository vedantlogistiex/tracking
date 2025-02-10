import React from "react";
import { trackingMilestonesReturn } from "../Utils/trackingMilestonesReturn";
import { MdCancel } from "react-icons/md";

export default function TrackingReturn(props) {
  let currentStateIndex = props.currentStateIndex;
  let cancellationStatus = props.cancellationStatus;
  let returnPickupFailedStatus = props.returnPickupFailedStatus;
  let returnPickupFailedReason = props.returnPickupFailedReason;
  let returnDeliveryFailedStatus = props.returnDeliveryFailedStatus;
  let returnDeliveryFailedReason = props.returnDeliveryFailedReason;
  let layout = props.layout;
  let colors = props.colors;
  return (
    <>
      <div className="timeline">
        <div className="my-16">
          <ol className={`items-center flex ${layout.horizontal === true ? "flex-row" : "flex-col"} w-full`}>
            {trackingMilestonesReturn
              ?.slice(0, cancellationStatus ? currentStateIndex + 1 : trackingMilestonesReturn.length)
              .map((data, index) => {
                const isCurrent = currentStateIndex >= data.index;
                const isState = index < currentStateIndex;
                const isReturnPickupFailed = returnPickupFailedStatus && index === 1;
                const isReturnDeliveryFailed = returnDeliveryFailedStatus && index === 4;
                return (
                  <>
                    <li key={index} className="relative mb-6 sm:mb-0 w-full">
                      {isReturnPickupFailed && (
                        <>
                          <div className="group">
                            <div>
                              <img
                                style={{
                                  position: "absolute",
                                  left: "50%",
                                  zIndex: 2,
                                }}
                                className="w-10 h-10"
                                src="/images/complaint.png"
                                alt=""
                              />
                            </div>
                            <div
                              style={{ top: "95%", left: "20%" }}
                              className="p-2 opacity-0 group-hover:opacity-100 duration-300 absolute bg-[#504cff]"
                            >
                              {returnPickupFailedReason}
                            </div>
                          </div>
                        </>
                      )}
                      {isReturnDeliveryFailed && (
                        <>
                          <div className="group">
                            <div>
                              <img
                                style={{
                                  position: "absolute",
                                  left: "50%",
                                  zIndex: 2,
                                }}
                                className="w-10 h-10"
                                src="/images/complaint.png"
                                alt=""
                              />
                            </div>
                            <div
                              style={{ top: "95%", left: "20%" }}
                              className="p-2 opacity-0 group-hover:opacity-100 duration-300 absolute bg-[#504cff]"
                            >
                              {returnDeliveryFailedReason}
                            </div>
                          </div>
                        </>
                      )}
                      <div className={`flex ${layout.horizontal === true ? "flex-row" : "flex-col"} items-center`}>
                        <div
                          style={{
                            backgroundColor: colors.primary,
                            boxShadow: isCurrent ? `0 0 0 8px ${colors.secondary}` : "0 0 0 8px white",
                          }}
                          className="z-10 flex items-center justify-center lg:w-12 lg:h-12 sm:w-2 sm:h-2 rounded-full shrink-0 p-1 lg:p-0"
                        >
                          <data.imgUrl
                            className="lg:w-[24px] lg:h-[24px] w-[18px] h-[18px]"
                            style={{ color: colors.secondary }}
                          />
                        </div>
                        {index < trackingMilestonesReturn.length - 1 && (
                          <div
                            className={`sm:flex ${
                              layout.horizontal === true ? "lg:w-[130px]" : "lg:h-[50px] w-[2px]"
                            } border-2  ${isState || cancellationStatus ? "border-solid" : "border-dashed"} `}
                            style={{ borderColor: colors.secondary }}
                          ></div>
                        )}
                      </div>
                      <div className={`${layout.horizontal === true ? "sm:pe-8 mt-3" : "absolute top-5 left-20"}`}>
                        <h3
                          className="lg:text-sm text-[8px] font-semibold"
                          style={{ color: colors.textPrimary, display: "ruby-text" }}
                        >
                          {data.label === "In Transit" ? "Return In Transit" : data.label}
                        </h3>
                      </div>
                    </li>
                  </>
                );
              })}
            {cancellationStatus && (
              <li className="relative mb-6 sm:mb-0">
                <div className="flex items-center">
                  <div
                    className={`z-10 flex items-center justify-center lg:w-12 lg:h-12 sm:w-2 sm:h-2 bg-blue-100 rounded-full lg:ring-8 ring-8 shrink-0 p-1 lg:p-0`}
                    style={{
                      backgroundColor: colors.primary,
                      boxShadow: cancellationStatus ? `0 0 0 8px ${colors.secondary}` : "0 0 0 8px white",
                    }}
                  >
                    <MdCancel
                      className="lg:w-[24px] lg:h-[24px] w-[18px] h-[18px]"
                      style={{ color: colors.secondary }}
                    />
                  </div>
                </div>
                <div className="mt-3 sm:pe-8">
                  <h3 className="lg:text-sm text-[8px] font-semibold" style={{ color: colors.textPrimary }}>
                    Cancelled
                  </h3>
                </div>
              </li>
            )}
          </ol>
        </div>
      </div>
    </>
  );
}
