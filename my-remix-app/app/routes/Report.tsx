import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { getReportData } from "../services/reportService";

export const loader: LoaderFunction = async () => {
  try {
    const params = {}; // Ajusta si necesitas filtros
    const data = await getReportData(params);
    return json({ reportData: data });
  } catch (error) {
    console.error("Error al cargar los datos del reporte:", error);
    throw new Response("Error loading report data", { status: 500 });
  }
};

export default function Report() {
  const loaderData = useLoaderData<typeof loader>();
  const [reportData, setReportData] = useState(loaderData.reportData);

  const loadReportData = async () => {
    try {
      const response = await fetch("/api/reload-report");
      const data = await response.json();
      setReportData(data.reportData);
    } catch (error) {
      console.error("Error al actualizar los datos del reporte:", error);
    }
  };

  return (
    <div>
      {reportData ? (
        <pre>{JSON.stringify(reportData, null, 2)}</pre>
      ) : (
        <p>Cargando...</p>
      )}
      <button onClick={loadReportData}>Actualizar Reporte</button>
    </div>
  );
}
