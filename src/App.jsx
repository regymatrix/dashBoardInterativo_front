import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  RadarController,
  RadialLinearScale,
  defaults,
} from "chart.js/auto";
import { Bar, Doughnut, Line, Pie, PolarArea, Radar } from "react-chartjs-2";
import "./App.css";
import revenueData from "./data/revenueData.json";
import sourceData from "./data/sourceData.json";
// import economicData from "./data/economicData.json";
import totalEconomicData from "./data/totalEconomicData.json";
import { api } from "./api/API";
import setTimer from "./data/requestTimer.json"

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

export const App = () => {
  const [totalEconomiaPorRobo, setTotalEconomiaPorRobo] = useState([]);
  const [totalEconomia, setTotalEconomia] = useState([]);
  const [top10ProdutosMaisEconomicos, setTop10ProdutosMaisEconomicos] =
    useState([]);
  const [produtoMaisEconomico, setProdutoMaisEconomico] = useState([]);
  const [produtoMenosEconomico, setProdutoMenosEconomico] = useState([]);
  const [economicData, setEconomicData] = useState([]);

  useEffect(() => {
    loadData();
    setInterval(() => {
      loadData();
    }, setTimer.timer);
  }, []);

  function loadData() {
    api.get("/economia-por-robo").then((response) => {
      setTotalEconomiaPorRobo(response.data);
    });

    api.get("/produto-menos-economico").then((responseMenos) => {
      setProdutoMenosEconomico(responseMenos.data);

      api.get("/produto-mais-economico").then((responseMais) => {
        setProdutoMaisEconomico(responseMais.data);

        setEconomicData([
          {
            label: `Mais econômico: ${responseMais.data[0].nomeproduto}`,
            maisEconomico: responseMais.data[0].economia,
          },
          {
            label: `Menos econômico: ${responseMenos.data[0].nomeproduto}`,
            menosEconomico: responseMenos.data[0].economia,
          },
        ]);
      });
    });

    api.get("/top-10-produtos-economicos").then((response) => {
      setTop10ProdutosMaisEconomicos(response.data);
    });

    api.get("/total-economia").then((response) => {
      setTotalEconomia(response.data);
    });
  }

  return (
    <>
      <h1 className="title">Análise de relatórios benchmarking</h1>

      {totalEconomiaPorRobo &&
      totalEconomicData &&
      top10ProdutosMaisEconomicos &&
      economicData &&
      totalEconomia &&
      produtoMaisEconomico &&
      produtoMenosEconomico ? (
        <div className="App">
          <div className="dataCard revenueCard">
            <Bar
              data={{
                labels: totalEconomiaPorRobo.map((data) => data.codigoRobo),
                datasets: [
                  {
                    label: "Total de Economia",
                    data: totalEconomiaPorRobo.map(
                      (data) => data.economiaTotal
                    ),
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
                labels: totalEconomia.map((data) => data.label),
                datasets: [
                  {
                    fill: false,
                    label: "Total de Economia",
                    data: totalEconomia.map((data) => data.revenue),
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
            {economicData.length > 0 && (
              <Bar
                data={{
                  labels: [
                    economicData[0].label.split(":")[1],
                    economicData[1].label.split(":")[1],
                  ],

                  datasets: [
                    {
                      label: "mais econômico",
                      data: economicData.map((data) => data.maisEconomico),
                      backgroundColor: ["rgba(14, 209, 0, 0.8)"],
                      borderRadius: 5,
                    },
                    {
                      label: "menos econômico",
                      data: economicData.map((data) => data.menosEconomico),
                      backgroundColor: ["rgba(255, 49, 49, 0.8)"],
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
            )}
          </div>

          <div className="dataCard categoryCard">
            <Pie
              data={{
                labels: top10ProdutosMaisEconomicos.map(
                  (data) => data.nomeproduto
                ),
                datasets: [
                  {
                    label: "Economia",
                    data: top10ProdutosMaisEconomicos.map(
                      (data) => data.economia
                    ),
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
      ) : (
        <h1>Carregando...</h1>
      )}
    </>
  );
};
