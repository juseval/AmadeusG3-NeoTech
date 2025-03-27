import axios from "axios";

const apiUrl = "https://671ece1f1dfc4299198329fd.mockapi.io/ListaReporte";

export async function getReportData(params: any): Promise<any> {
  try {
    const response = await axios.get(apiUrl, { params });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los datos del reporte:", error);
    throw error;
  }
}
