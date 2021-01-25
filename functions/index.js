const functions = require("firebase-functions");
const express = require("express");
const admin = require('firebase-admin');
const cors = require('cors');

// const app = express();
// app.use(cors({ origin: true }))
//admin.initializeApp();

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://api-udemy-1-default-rtdb.firebaseio.com"
});

const db = admin.firestore();

const ordenCompra = require("./routes/ordenCompra")


exports.ordenCompra = ordenCompra.ordenCompra;
exports.updateOrdenC = ordenCompra.updateOrdenC;
exports.getOrden = ordenCompra.getOrden;


exports.useWildcard = functions.firestore
    .document('/ordenCompra/{id}')
    .onWrite((change, context) => {
        console.log('before', change.before.data())
        console.log('after', change.after.data())

        const orden = change.after.data()
        // Para porder modificar el stock, el admin debe de aceptar la solicitud de orden de compra
        if (change.before.data() &&
            change.before.data().estatus === "Solicitud" &&
            change.after.data() &&
            orden.estatus === "Aprobado") {

            (async () => { // Función "inmediata"??
                try {
                    const doc = db.collection("productos").doc(orden.idProducto)
                    const item = await doc.get();
                    const product = item.data();

                    let newStock = product.stock - orden.cantidad
                    if (newStock >= 0) { // Si existe disponibilidad se aprueba la orden de compra

                        // Se modifica el stock del producto
                        const docUpdated = db.collection("productos").doc(orden.idProducto)
                        await docUpdated.update({
                            stock: newStock
                        })

                        return change.after.ref.set({
                            estatus: "Realizado"
                        }, { merge: true });

                    } else { // Al no existir productos disponibles se rechaza la orden de compra

                        return change.after.ref.set({
                            estatus: "Rechazado"
                        }, { merge: true });
                    }
                } catch (error) {

                    return change.after.ref.set({
                        estatus: "Rechazado"
                    }, { merge: true });
                }
            })();
        }
    });


