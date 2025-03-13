import { json } from "@remix-run/node";
import { getReportData } from "../../services/reportService";
import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  try {
    const params = {};
    const data = await getReportData(params);
    return json({ reportData: data });
  } catch (error) {
    console.error("Error al recargar los datos del reporte:", error);
    throw new Response("Error al recargar los datos", { status: 500 });
  }
};
