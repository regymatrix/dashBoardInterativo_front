import React from "react";
import { Chart as ChartJS, RadarController, RadialLinearScale, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line, Pie, PolarArea, Radar } from "react-chartjs-2";

import "./App.css";

import revenueData from "./data/revenueData.json";
import sourceData from "./data/sourceData.json";
import economicData from "./data/economicData.json"
import totalEconomicData from "./data/totalEconomicData.json"

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

export const App = () => {
  return (
    <>
    <div className="App">
      <div className="dataCard revenueCard">
        <Bar
          data={{
            labels: revenueData.map((data) => data.equipe),
            datasets: [
              {
                label: "Total de Economia",
                data: revenueData.map((data) => data.revenue),
                backgroundColor: "#064FF0",
                borderColor: "#064FF0",
                borderRadius: 5,
              },
            ],
          }}
          options={{
            elements: {
              line: {
                tension: 0.5,
              },
            },
            plugins: {
              title: {
                text: "Total de economia por robô",
              },
            },
          }}
          />
      </div>

      <div className="dataCard totalCard">
        <Bar
          data={{
            labels: totalEconomicData.map((data) => data.label),
            datasets: [
              {
                fill: false,
                label: "Total de Economia",
                data: totalEconomicData.map((data) => data.revenue),
                backgroundColor: "#064FF0",
                borderColor: "#064FF0",
                borderRadius: 5,
              },
            ],
          }}
          options={{
            elements: {
              line: {
                tension: 0.5,
              },
            },
            plugins: {
              title: {
                text: "Total de economia realizada",
              },
            },
          }}
          />
      </div>

      <div className="dataCard customerCard">
        <Bar
          data={{
            labels: economicData.map((data) => data.label),
            datasets: [
              {
                label: "mais econômico",
                data: economicData.map((data) => data.maisEconomico),
                backgroundColor: [
                  "rgba(14, 209, 0, 0.8)",
                ],
                borderRadius: 5,
              },
              {
                label: "menos econômico",
                data: economicData.map((data) => data.menosEconomico),
                backgroundColor: [
                  "rgba(255, 49, 49, 0.8)",
                ],
                borderRadius: 5,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Produto mais e menos econômico",
              },
            },
          }}
          />
      </div>

      <div className="dataCard categoryCard">
        <Pie
          data={{
            labels: sourceData.map((data) => data.label),
            datasets: [
              {
                label: "Count",
                data: sourceData.map((data) => data.value),
                backgroundColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                  "rgba(135, 253, 157, 0.8)",
                  "rgba(135, 241, 253, 0.8)",
                  "rgba(237, 135, 253, 0.844)",
                  "rgba(253, 135, 178, 0.844)",
                  "rgba(170, 170, 170, 0.844)",
                  "rgba(255, 0, 0, 0.844)",
                  "rgba(0, 0, 0, 0.844)",
                ],
                borderColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                  "rgba(135, 253, 157, 0.8)",
                  "rgba(135, 241, 253, 0.8)",
                  "rgba(237, 135, 253, 0.844)",
                  "rgba(253, 135, 178, 0.844)",
                  "rgba(170, 170, 170, 0.844)",
                  "rgba(255, 0, 0, 0.844)",
                  "rgba(0, 0, 0, 0.844)",
                ],
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Top 10 produtos mais econômicos",
              },
            },
          }}
          />
      </div>
    </div>
  </>
  );
};
