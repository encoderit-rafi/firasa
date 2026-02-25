"use client";
import { ComponentProps } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

// #region Sample data
const data = [
  {
    subject: "openness",
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: "conscientiousness",
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "agreeableness",
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "extraversion",
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    subject: "neuroticism",
    A: 85,
    B: 90,
    fullMark: 150,
  },
];

// #endregion
export default function SimpleRadarChart({
  ...props
}: ComponentProps<typeof RadarChart>) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart
        outerRadius="65%"
        data={data}
        margin={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        {...props}
      >
        <defs>
          <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF77D7" stopOpacity={1} />
            <stop offset="100%" stopColor="#FA6C12" stopOpacity={1} />
          </linearGradient>
        </defs>
        <PolarGrid gridType="circle" strokeOpacity={0.3} stroke="#FF77D7" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: "currentColor", fontSize: 10 }}
        />
        {/* <PolarRadiusAxis /> */}
        <Radar
          name="Data"
          dataKey="A"
          fill="url(#radarGradient)"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
