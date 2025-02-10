import React from "react";
import { trackingMileStones } from "../Utils/trackingMilestones";
import { MdCancel } from "react-icons/md";
import { TbTruckReturn } from "react-icons/tb";

export default function TrackingForword(props) {
  let currentStateIndex = props.currentStateIndex;
  let deliveryFailedReason = props.deliveryFailedReason;
  let markRTOStatus = props.markRTOStatus;
  let cancellationStatus = props.cancellationStatus;
  let layout = props.layout;
  let colors = props.colors;

  console.log("colors", colors);
  return (
    <>
      <div className="timeline">
        <div className={`my-16 flex`}>
          <ol className={`items-center flex ${layout.horizontal === true ? "flex-row" : "flex-col"} w-full`}>
            {trackingMileStones
              ?.slice(0, cancellationStatus || markRTOStatus ? currentStateIndex + 1 : trackingMileStones.length)
              .map((data, index) => {
                const isCurrent = currentStateIndex >= data.index;
                const isState = index < currentStateIndex;
                const isDeliveryFailed = props.deliveryFailedStatus && index === 5;
                return (
                  <li key={index} className="relative mb-6 sm:mb-0">
                    {isDeliveryFailed && (
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
                            {deliveryFailedReason}
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
                          className={`lg:w-[24px] lg:h-[24px] w-[18px] h-[18px]`}
                          style={{ color: colors.secondary }}
                        />
                      </div>
                      {index < trackingMileStones.length - 1 && (
                        <div
                          className={`sm:flex ${
                            layout.horizontal === true ? "lg:w-[130px]" : "lg:h-[50px] w-[2px]"
                          } border-2 ${
                            isState || cancellationStatus || markRTOStatus ? "border-solid" : "border-dashed"
                          }`}
                          style={{ borderColor: colors.secondary }}
                        ></div>
                      )}
                    </div>
                    <div className={`${layout.horizontal === true ? "sm:pe-8 mt-3" : "absolute top-5 left-20"}`}>
                      <h3
                        className="lg:text-sm text-[8px] font-semibold"
                        style={{ color: colors.textPrimary, display: "ruby-text" }}
                      >
                        {data.label}
                      </h3>
                    </div>
                  </li>
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
            {markRTOStatus && (
              <li className="relative mb-6 sm:mb-0">
                <div className="flex items-center">
                  <div
                    className={`z-10 flex items-center justify-center lg:w-12 lg:h-12 sm:w-2 sm:h-2 bg-blue-100 rounded-full lg:ring-8 ring-8 shrink-0 p-1 lg:p-0`}
                    style={{
                      backgroundColor: colors.primary,
                      boxShadow: markRTOStatus ? `0 0 0 8px ${colors.secondary}` : "0 0 0 8px white",
                    }}
                  >
                    <TbTruckReturn
                      className="lg:w-[24px] lg:h-[24px] w-[18px] h-[18px]"
                      style={{ color: colors.secondary }}
                    />
                  </div>
                </div>
                <div className="mt-3 sm:pe-8">
                  <h3 className="lg:text-sm text-[8px] font-semibold" style={{ color: colors.textPrimary }}>
                    Return Initiated
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
