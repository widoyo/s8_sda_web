import React, { useEffect, useState } from "react";

const RealTimeClock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date | null>(new Date());
  const [timeData, setTimeData] = useState<boolean>(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center flex flex-col justify-center">
      {timeData ? (
        <div className="flex items-center gap-4 ">
          <p className="text-base text-gray-700 font-semibold">
            {currentTime
              ? currentTime.toLocaleDateString("id-ID", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })
              : "Memuat..."}
          </p>
          <div className="flex items-center justify-center">
            <span className="text-xl font-semibold text-gray-700 tracking-wider">
              {currentTime
                ? currentTime.toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })
                : "Memuat..."}
            </span>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Memuat data waktu...</p>
      )}
    </div>
  );
};

export default RealTimeClock;
