const express = require("express");
const router = express.Router();
router.use(express.json());

const companyDetails = require('../dataFiles/companyData');
const productDetails = require('../dataFiles/productData');



router.get("/", (req, res) => {
    res.json({ data: "Company home page" });
});

//Add new Record
router.post("/new", (req, res) => {
    const companyNew = req.body;
    const company = companyDetails.filter((c) => parseInt(c.companyId) === parseInt(companyNew.companyId));

    if (company.length === 0) {
        companyDetails.push(companyNew);
        res.json({ data: companyDetails });
    }
    else {
        res.json({ data: "Company Already Exists...!" });
    }
});

//Fetch All Record
router.get("/list", (req, res) => {
    res.json({ data: companyDetails });
});

// Fetch Record By ProductName
// http://localhost:5000/company/list/product/Apple
router.get("/list/product/:prodname", (req, res) => {
    const productName = req.params.prodname.toLowerCase();
    const productList = productDetails.filter((p) => p.title.toLowerCase() === productName);

    if (productList.length != 0) {
        const pid = productList[0].productId; //fetching prodid of 1st record[as uniqe record]

        const companyList = companyDetails.filter(c => c.productId.includes(pid));
        console.log(companyList.length);

        console.log(companyList);

        if (companyList.length != 0) {
            res.json({ data: companyList });
        } else {
            res.json({ data: "Company Not Found with this product" });
        }

    }
    else {
        res.json({ data: "No product exists ...!" });
    }

});


//Update Product of company
// http://localhost:5000/company/update/products/ITC
router.put("/update/products/:name", (req, res) => {
    const name = req.params.name;
    const companyIndex = companyDetails.findIndex(c => c.name.toLowerCase() === name.toLowerCase());

    if (companyIndex >= 0) {
        companyDetails[companyIndex].productId = req.body.productId;
        res.json({ data: companyDetails });
    } else {
        res.json({ data: "Copmany Name Not Found..!" });
    }
});

// Updates Company Name and productId [companyId won't change] 
// http://localhost:5000/company/update/all/ITC
router.put("/update/all/:name", (req, res) => {
    const name = req.params.name;
    const companyList = companyDetails.filter((c) => c.name.toLowerCase() === name.toLowerCase());

    const companyUpdatedData = req.body;
    const companyIndex = companyDetails.findIndex(c => c.name.toLowerCase() === name.toLowerCase());

    if (companyIndex >= 0) {
        const oldCid = companyList[0].companyId;
        const newCid = companyUpdatedData.companyId;
        if (oldCid === newCid) {
            companyDetails[companyIndex] = companyUpdatedData;
            res.json({ data: companyDetails });
        }
        else {
            res.json({ data: "Id can not be change..!" });
        }

    } else {
        res.json({ data: "Copmany Name Not Found..!" });
    }
});

// Updated Only Name //Learnig Purpose
// http://localhost:5000/company/update/ITC
router.put("/update/:name", (req, res) => {
    const name = req.params.name;
    const companyIndex = companyDetails.findIndex(c => c.name.toLowerCase() === name.toLowerCase());

    if (companyIndex >= 0) {
        companyDetails[companyIndex].name = req.body.name;
        res.json({ data: companyDetails });
    } else {
        res.json({ data: "Copmany Name Not Found..!" });
    }
});

// Delete Record By Company Name
// http://localhost:5000/company/delete/ITC
router.delete("/delete/:name", (req, res) => {
    const name = req.params.name;
    const companyIndex = companyDetails.findIndex(c => c.name.toLowerCase() === name.toLowerCase());

    if (companyIndex >= 0) {
        // companyDetails.pop(companyIndex);
        companyDetails.splice(companyIndex, 1);
        res.json({ data: companyDetails });
    } else {
        res.json({ data: "Copmany Name Not Found..!" });
    }
});



module.exports = router;