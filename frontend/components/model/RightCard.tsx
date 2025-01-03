import { LinearProgress, Skeleton, Stack, Typography, linearProgressClasses } from "@mui/material";
import Image from "next/image";
import React from "react";
import { styled } from "@mui/material/styles";

interface Response {
  predicted_class: string;
  summary: string;
  score: number;
}

interface RightCardProps {
  responseText?: Response | null;
  loading?: boolean;
}

const RightCard: React.FC<RightCardProps> = ({ responseText = null, loading = false }) => {
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    },
  }));

  const scorePercentage = responseText ? responseText.score * 100 : 0;

  return (
    <div className="md:w-1/2 md:flex justify-center bg-gray-200 shadow-md bg-clip-border rounded-xl">
      <div className="w-full p-6 flex justify-center">
        {responseText === null && !loading ? (
          <div className="flex flex-col mt-11" style={{ alignItems: "center" }}>
            <Image
              src="/icons/keyboard.png" // Path relative to the public directory
              alt="Features Background"
              width={200} // Specify width
              height={200} // Specify height
            />
            <Typography color="textSecondary" width="60%" textAlign="center">
              Please enter the text and hit submit to process your request
            </Typography>
          </div>
        ) : loading ? (
          <div
            className="bg-white border border-gray-300 rounded-lg p-4 mb-4"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "100%",
            }}
          >
            <h3 className="text-lg font-semibold mb-2">Response</h3>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Skeleton
                variant="rectangular"
                width={30}
                height={30}
                sx={{ borderRadius: "2px" }}
              />
              <Skeleton
                variant="rectangular"
                width={130}
                height={30}
                sx={{ borderRadius: "5px" }}
              />
              <Skeleton
                variant="rectangular"
                width={100}
                height={30}
                sx={{ borderRadius: "100px" }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Skeleton
                variant="rectangular"
                width={30}
                height={30}
                sx={{ borderRadius: "2px" }}
              />
              <Skeleton
                variant="rectangular"
                width={100}
                height={30}
                sx={{ borderRadius: "5px" }}
              />
              <Skeleton
                variant="rectangular"
                width="calc(100% - 210px)"
                height={15}
                sx={{ borderRadius: "100px" }}
              />
              <Skeleton
                variant="rectangular"
                width={40}
                height={30}
                sx={{ borderRadius: "5px" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                flexDirection: "column",
              }}
            >
              <div style={{ display: "flex", width: "100%", gap: "10px" }}>
                <Skeleton
                  variant="rectangular"
                  width={30}
                  height={30}
                  sx={{ borderRadius: "2px" }}
                />
                <Skeleton
                  variant="rectangular"
                  width={130}
                  height={30}
                  sx={{ borderRadius: "5px" }}
                />
              </div>
              <Skeleton
                variant="rectangular"
                width="calc(100% - 40px)"
                height={200}
                sx={{ borderRadius: "5px", marginLeft: "40px" }}
              />
            </div>
          </div>
        ) : (
          responseText && (
            <div
              className="bg-white border border-gray-300 rounded-lg p-4 mb-4"
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <h3 className="text-lg font-semibold mb-2">Response</h3>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <Image
                  src="/icons/category.png" // Path relative to the public directory
                  alt="Features Background"
                  width={20} // Specify width
                  height={20} // Specify height
                />
                <div
                  className="flex flex-row ml-1 gap-2"
                  style={{ alignItems: "center" }}
                >
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide ">
                    Category:
                  </p>
                  <span className="inline-block bg-blue-500 text-white px-2 py-1 text-xs font-semibold rounded-full">
                    {responseText.predicted_class}
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <Image
                  src="/icons/score.png" // Path relative to the public directory
                  alt="Features Background"
                  width={20} // Specify width
                  height={20} // Specify height
                />
                <div
                  className="flex flex-row ml-1 gap-2 "
                  style={{ alignItems: "center", width: "100%" }}
                >
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide ">
                    Score:
                  </p>
                  <BorderLinearProgress
                    variant="determinate"
                    value={scorePercentage}
                    sx={{ width: "100%" }}
                  />
                  <p>{scorePercentage}%</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "start", gap: "5px" }}>
                <Image
                  src="/icons/summary.png" // Path relative to the public directory
                  alt="Features Background"
                  width={20} // Specify width
                  height={20} // Specify height
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "0.25rem",
                  }}
                >
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">
                    Summary:
                  </p>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ maxHeight: "200px", overflowY: "auto" }}
                  >
                    {responseText.summary}
                  </Typography>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default RightCard;
