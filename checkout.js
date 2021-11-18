const taxRate = 0.18;
const shippingPrice = 15.0;

window.onload = () => {
    window.localStorage.setItem("taxRate", taxRate);
    localStorage.setItem("shippingPrice", shippingPrice);

    window.sessionStorage.setItem("taxRate", taxRate);
    sessionStorage.setItem("shippingPrice", shippingPrice);
    calculateCartTotal();
}

let quantityControllerDivs = document.getElementsByClassName("quantity-controller");


[...quantityControllerDivs].forEach((quantityControllerDiv) => {
    //minus button
    let quantityP = quantityControllerDiv.querySelector("#product-quantity");
    quantityControllerDiv.firstElementChild.addEventListener("click", () => {
        /* if (quantityP.innerText === "1") {
             quantityP.innerText = "1"

         } else {
             quantityP.innerText = parseInt(quantityP.innerText) - 1;
         }
         */
        if (quantityP.innerText === "0") {
            alert("product will be removed!");
            quantityControllerDiv.parentElement.parentElement.remove();

        } else {
            quantityP.innerText = parseInt(quantityP.innerText) - 1;
        }
        calculateProductTotal(quantityP);

    });
    //plus button
    quantityControllerDiv.lastElementChild.addEventListener("click", () => {

        quantityP.innerText = parseInt(quantityP.innerText) + 1;
        calculateProductTotal(quantityP);

    });
});

const calculateProductTotal = (quantityP) => {
    let productInfoDiv = quantityP.parentElement.parentElement;
    const productPrice = parseFloat(productInfoDiv.querySelector("strong").innerText);

    let productTotalPrice = productPrice * parseInt(quantityP.innerText);
    //   console.log(productTotalPrice);
    let productTotalDiv = productInfoDiv.querySelector(".product-line-price");
    productTotalDiv.innerText = productTotalPrice.toFixed(2);
    calculateCartTotal();
}
const calculateCartTotal = () => {
    let subTotal = 0;
    //NodeList burada direk foreach kullanabilirken 

    let productTotalPrices = document.querySelectorAll(".product-line-price");

    //HTML Collections burada foreach kullanamayız [...] dönüşüm yapmamız gerekmektedir

    // let prooductTotalPrices = document.getElementsByClassName(".product-line-price");

    productTotalPrices.forEach((productPrice) => {
            subTotal += parseFloat(productPrice.innerText);
        })
        //console.log(subTotal);
    let taxPrice = subTotal * taxRate;
    // let taxPrice=subTotal*localStorage.parseFloat(getItem("taxRate"));
    let shipping = (subTotal > 0 ? shippingPrice : 0);
    let cartTotal = subTotal + taxPrice + shipping;

    document.querySelector("#cart-subtotal p:nth-child(2").innerText = subTotal.toFixed(2);
    document.querySelector("#cart-tax p:nth-child(2").innerText = taxPrice.toFixed(2);
    document.querySelector("#cart-shipping p:nth-child(2").innerText = shipping.toFixed(2);
    document.querySelector("#cart-total p:nth-child(2").innerText = cartTotal.toFixed(2);



}
document.querySelectorAll(".remove-product").forEach((removeButton) => {
    removeButton.addEventListener("click", () => {
        removeProduct(removeButton);
    })

})
const removeProduct = (removeButton) => {
    let productDiv = removeButton.parentElement.parentElement.parentElement;
    productDiv.remove();
    calculateCartTotal();
}