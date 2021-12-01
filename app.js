const express = require('express');
const app = express();
app.use(express.json());
const port = 5000;

const productRoute = require("./routers/product");
const companyRoute = require("./routers/company");
const sellerRoute = require("./routers/seller");

app.get('/', (req, res) => res.send('Product Managment System..!'));

app.use("/product", productRoute);
app.use("/company", companyRoute);
app.use("/seller", sellerRoute);

app.listen(port, () => {
    console.log(`Project listening on port ${port}`);
})