const express = require('express');
const router = express.Router();
router.use(express.json());

const sellerDetails = require('../dataFiles/sellerData');
const productDetails=require('../dataFiles/productData');

router.get("/", (req, res) => {
    res.json({ data: "Seller Home Page" });
});

//Add New Record
router.post("/new", (req, res) => {
    const sellerNew = req.body;
    const seller = sellerDetails.filter((s) => parseInt(s.sellerId) === parseInt(sellerNew.sellerId));

    if (seller.length === 0) {
        sellerDetails.push(sellerNew);
        res.json({ data: sellerDetails });
    }
    else {
        res.json({ data: "Seller Already Exists...!" });
    }
});

//Fetch All Record
router.get("/list", (req, res) => {
    res.json({ data: sellerDetails });
});

//Fetch Record By Product Name
// http://localhost:5000/seller/list/product/Apple
router.get("/list/product/:prodname", (req, res) => {
    const productName = req.params.prodname.toLowerCase();
    const productList = productDetails.filter((p) => p.title.toLowerCase() === productName);

    if (productList.length != 0) {
        const pid = productList[0].productId; //fetching prodid of 1st record[as uniqe record]

        const sellerList = sellerDetails.filter(s => s.productId.includes(pid));
        console.log(sellerList.length);

        console.log(sellerList);

        if (sellerList.length != 0) {
            res.json({ data: sellerList });
        } else {
            res.json({ data: "Seller Not Found with this product" });
        }

    }
    else {
        res.json({ data: "No product exists...!" });
    }

});

//Update Product of Seller
// http://localhost:5000/seller/update/products/Bhavya
router.put("/update/products/:name", (req, res) => {
    const name = req.params.name;
    const sellerIndex = sellerDetails.findIndex(s => s.name.toLowerCase() === name.toLowerCase());

    if (sellerIndex >= 0) {
        sellerDetails[sellerIndex].productId = req.body.productId;
        res.json({ data: sellerDetails });
    } else {
        res.json({ data: "Seller Name Not Found..!" });
    }
});

//Delete Record by Seller Name
// http://localhost:5000/seller/delete/Bhavya
router.delete("/delete/:name", (req, res) => {
    const name = req.params.name;
    const sellerIndex = sellerDetails.findIndex(s => s.name.toLowerCase() === name.toLowerCase());

    if (sellerIndex >= 0) {
        sellerDetails.splice(sellerIndex,1);
        res.json({ data: sellerDetails });
    } else {
        res.json({ data: "Seller Name Not Found..!" });
    }
});


module.exports = router;