const { Router } = require("express")
const express = require("express")
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const cors = require('cors');

const router = Router()
const db = admin.firestore();

const ordenCompra = express()
ordenCompra.use(cors({ origin: true }))

// Crear orden de compra
ordenCompra.post("/", async (req, res) => {
    const body = req.body
    try {
        await db.collection("ordenCompra")
            .doc()
            .create({
                idUsuario: body.idUsuario,
                idProducto: body.idProducto,
                cantidad: body.cantidad,
                total: body.total,
                fecha: new Date()
            });
        return res.status(200).json();
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
});

const updateOrdenC = express()
updateOrdenC.use(cors({ origin: true }))

// Crear orden de compra
updateOrdenC.put("/:id", async (req, res) => {
    const body = req.body
    console.log(body, req.params.id)
    try {
        await db.collection("ordenCompra")
            .doc(req.params.id)
            .update({
                estatus: body.estatus,
                fecha: new Date()
            }).then(doc => {
                return res.status(200).json(doc.data());
            }).catch(error => {
                console.log(error)
                return res.status(500).send(error)
            })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
});

const getOrden = express()
getOrden.use(cors({ origin: true }))

getOrden.get("/", async (req, res) => {
    const ordenesCompra = []
    db.collection('ordenCompra').get() //Regresa una promesa
        .then(snapshot => {

            if (snapshot.empty) {
                console.log('No matching documents.');
                return res.status(404).json({ message: "No existen documentos" });
            } else {
                snapshot.forEach(doc => {
                    let orden = doc.data()
                    console.log(orden)
                    orden.id = doc.id
                    ordenesCompra.push(orden)
                })
                return res.status(200).json(ordenesCompra)
            }
        }).catch(error => {
            console.log(error)
            return res.status(500).send(error)
        })
})


const runtimeOpts = {
    timeouSeconds: 30,
    memory: "256MB",
};

exports.ordenCompra = functions
    .runWith(runtimeOpts)
    .https.onRequest(ordenCompra);

exports.updateOrdenC = functions
    .runWith(runtimeOpts)
    .https.onRequest(updateOrdenC);

exports.getOrden = functions
    .runWith(runtimeOpts)
    .https.onRequest(getOrden);
