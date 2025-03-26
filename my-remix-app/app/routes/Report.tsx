import { Card } from "./tremor/Card";
import { BarList } from "./tremor/BarList";
import { get } from "../services/destinoService";
import { MenuNavegacion } from "../components/Menu_navegacion/Menu_navegacion";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
  TableCaption,
  TableFoot
} from "./tremor/Table";
import "../tailwind.css";

import React from "react"

import { DonutChart, DonutChartEventProps } from "./tremor/DonutChart"

export default function Report() {
  var [answers, setAnswers] = useState<Array<{ name: string, value: number }>>([]);
  var [answersByQ, setAnswersByQ] = useState<Array<{ id: number, data: Array<{ name: string, amount: number }> }>>([]);
  var [dataUser, setDataUser] = useState<Array<{ id: number, full_Name: string, email: string}>>([]);
  var [dataUserA, setDataUserA] = useState<Array<{ id: number, full_Name: string, email: string}>>([]);

  useEffect(() => {
    datosUsuario();
    conteoOpciones();
    conteoOpcionesbyQuestion();
  }, [])

  const datosUsuario = async () => {
    var response = await get(`user/all`)
    if (response.status === 200) {
      const users = await response.json();
      setDataUser(users.filter((user: { tipo_Usuario: number }) => user.tipo_Usuario === 0));
      setDataUserA(users.filter((user: { tipo_Usuario: number }) => user.tipo_Usuario === 1));

    } else {
      console.log("Error al cargar los datos")
    }
  }

  const conteoOpciones = async () => {
    var response = await get(`Answer/CountAnswers`)
    if (response.status === 200) {
      const answers = await response.json();
      const formattedAnswers = answers.map((answer: { questionOptionText: string, count: number }) => ({
        name: answer.questionOptionText,
        value: answer.count
      }));
      setAnswers(formattedAnswers);
    } else {
      console.log("Error al cargar los datos")
    }
  }

  const conteoOpcionesbyQuestion = async () => {
    const allAnswersByQ = [];
    for (let i = 1; i <= 6; i++) {
      var response = await get(`Answer/CountAnswersById/${i}`);
      if (response.status === 200) {
        const answersByQ = await response.json();
        const formattedanswersByQ = answersByQ.map((answersByQ: { questionOptionText: string, count: number }) => ({
          name: answersByQ.questionOptionText,
          amount: answersByQ.count
        }));
        allAnswersByQ.push({ id: i, data: formattedanswersByQ });
      } else {
        console.log(`Error al cargar los datos para la pregunta ${i}`);
      }
    }
    setAnswersByQ(allAnswersByQ);
  }

  return (
    <>
      <MenuNavegacion/>
      <div>
        <Card>
          <h1 className="text-2xl font-bold">Estadisticas</h1>
        </Card>
      </div >
        <div className="flex flex-row justify-center gap-5">
          <Card className="grid grid-cols-1 mt-8" style={{ width: "48%" }}>
            <p className="text-center text-2xl font-medium mb-2">Resumen Respuestas</p>
            <BarList data={answers} />  
          </Card>
          <Card className="grid grid-cols-3 gap-10 mt-8" style={{ width: "48%" }}>
            <div className="flex flex-col justify-evenly">
              <p className="text-center">Entorno</p>
              <DonutChart
                className="mx-auto" 
                data={answersByQ[0]?.data || []}
                category="name"
                value="amount"
              />
            </div>
            <div className="flex flex-col justify-evenly">
              <p className="text-center gap-2">Clima</p>
              <DonutChart
                className="mx-auto" 
                data={answersByQ[1]?.data || []}
                category="name"
                value="amount"
              />
            </div>
            <div className="flex flex-col justify-evenly">
              <p className="text-center gap-2">Actividades</p>
              <DonutChart
                className="mx-auto" 
                data={answersByQ[2]?.data || []}
                category="name"
                value="amount"
              />
            </div>
            <div className="flex flex-col justify-evenly">
              <p className="text-center gap-2">Alojamiento</p>
              <DonutChart
                className="mx-auto" 
                data={answersByQ[3]?.data || []}
                category="name"
                value="amount"
              />
            </div>
            <div className="flex flex-col justify-evenly">
              <p className="text-center gap-2">Tiempo de estadía</p>
              <DonutChart
                className="mx-auto" 
                data={answersByQ[4]?.data || []}
                category="name"
                value="amount"
              />
            </div>
            <div className="flex flex-col justify-evenly">
              <p className="text-center gap-2">Rango de edad</p>
              <DonutChart
                className="mx-auto" 
                data={answersByQ[5]?.data || []}
                category="name"
                value="amount"
              />
            </div>
          </Card>
      </div>
      <div className="flex flex-row justify-center gap-5">
        <Card className="mt-8" style={{ width: "48%" }}>
          <p className="text-center text-2xl font-medium mb-2">Usuarios Consulta</p>
          <TableRoot>
            <Table>
              <TableHead className="bg-gray-100">
                <TableRow className="text-center">
                  <TableHeaderCell>Id</TableHeaderCell>
                  <TableHeaderCell>Nombre</TableHeaderCell>
                  <TableHeaderCell>Email</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataUser.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.full_Name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableRoot>
        </Card>
        <Card className="mt-8" style={{ width: "48%" }}>
        <p className="text-center text-2xl font-medium mb-2">Usuarios Administradores</p>
        <TableRoot>
          <Table>
            <TableHead className="bg-gray-100">
              <TableRow className="text-center">
                <TableHeaderCell>Id</TableHeaderCell>
                <TableHeaderCell>Nombre</TableHeaderCell>
                <TableHeaderCell>Email</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataUserA.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.full_Name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableRoot>
      </Card>
      </div>
      
    </>
  )
};