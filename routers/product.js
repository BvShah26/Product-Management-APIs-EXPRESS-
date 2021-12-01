const express = require("express");
const router = express.Router();
router.use(express.json());

const productDetails = require('../dataFiles/productData');
const companyDetails = require('../dataFiles/companyData');
const sellerDetails = require('../dataFiles/sellerData');



router.get("/", (req, res) => {
    res.json({ data: "Product home page" });
});

//Add New Record
router.post("/new", (req, res) => {
    const prod = req.body;
    const product = productDetails.filter((p) => parseInt(p.productId) === parseInt(req.body.productId));

    if (product.length === 0) {
        productDetails.push(prod);
        res.json({ data: productDetails });
    }
    else {
        res.json({ data: "Product Already Exists...!" });
    }
});

//Fetch All Record
router.get("/list", (req, res) => {
    res.json({ data: productDetails });
});

//Fetch Record by Copmany Name
// http://localhost:5000/product/list/company/ITC
router.get("/list/company/:companyName", (req, res) => {
    const companyName = req.params.companyName.toLowerCase();
    const companyList = companyDetails.filter((c) => c.name.toLowerCase() === companyName.toLowerCase());

    if (companyList.length != 0) {
        const cid = companyList[0].companyId;
        const productList = productDetails.filter((p) => p.companyId === cid);
        if (productList.length != 0) {
            res.json({ data: productList });
        }
        else {
            res.json({ data: "Company has no product ...!" });
        }
    } else {
        res.json({ data: "No Company Found...!" });
    }

});

//Ftehc Record By SellerName
// http://localhost:5000/product/list/seller/Bhavya
router.get("/list/seller/:sellerName", (req, res) => {
    const sellerName = req.params.sellerName.toLowerCase();
    const sellerList = sellerDetails.filter((c) => c.name.toLowerCase() === sellerName.toLowerCase());

    if (sellerList.length != 0) {
        const sid = sellerList[0].sellerId;
        const productList = productDetails.filter(p => p.sellerId.includes(sid));
        if (productList.length != 0) {
            res.json({ data: productList });
        }
        else {
            res.json({ data: "seller has no product ...!" });
        }
    } else {
        res.json({ data: "No seller Found...!" });
    }

});

//Update ProductCategory By ProductName
// http://localhost:5000/product/update/Apple
router.put("/update/:name", (req, res) => {
    const name = req.params.name;
    const productIndex = productDetails.findIndex(p => p.title.toLowerCase() === name.toLowerCase());

    if (productIndex >= 0) {
        productDetails[productIndex].category = req.body.category;
        res.json({ data: productDetails });
    } else {
        res.json({ data: "Product Not Found..!" });
    }
});

//Delete Record by ProductName
// http://localhost:5000/product/delete/Apple
router.delete("/delete/:name", (req, res) => {
    const name = req.params.name;
    const productIndex = productDetails.findIndex(p => p.title.toLowerCase() === name.toLowerCase());

    if (productIndex >= 0) {
        productDetails.splice(productIndex,1);
        res.json({ data: productDetails });
    } else {
        res.json({ data: "Product Name Not Found..!" });
    }
});

module.exports = router;