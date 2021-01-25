const { Router } = require("express")
const admin = require("firebase-admin");

const router = Router()
const db = admin.firestore();

router.post("/api/productos", async (req, res) => {
    try {
        await db.collection("productos")
            .doc(req.body.id)
            .create({
                nombre: req.body.nombre,
                precio: req.body.precio,
                stock: req.body.stock
            });
        return res.status(200).json();
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
});

router.get("/api/productos/:id", async (req, res) => {
    console.log('id:', req.params.id)
    await db.collection('productos').doc(req.params.id).get()
        .then(doc => {
            if (doc.empty) {
                console.log('No matching documents.');
                return res.status(404).json({ message: "No existe el documento" });
            } else {
                let producto = doc.data()
                console.log(doc.data())
                producto.id = doc.id
                return res.status(200).json(producto)
            }
        })
        .catch(error => {
            console.log(error)
            return res.status(500).send(error)
        })
});

router.get("/api/productos", async (req, res) => {
    const productos = []
    await db.collection('productos').get() //Regresa una promesa
        .then(snapshot => {

            if (snapshot.empty) {
                console.log('No matching documents.');
                return res.status(404).json({ message: "No existen documentos" });
            } else {
                snapshot.forEach(doc => {
                    let producto = doc.data()
                    producto.precioString = producto.precio.toLocaleString()
                    producto.id = doc.id
                    productos.push(producto)
                })
                return res.status(200).json(productos)
            }
        })
        .catch(error => {
            console.log(error)
            return res.status(500).send(error)
        })
})

module.exports = router;