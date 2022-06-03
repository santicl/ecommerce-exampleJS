function returnTotalMountInDolars() {
    let invoices = JSON.parse(localStorage.getItem("Invoices"));
    console.log(invoices);
    let total = 0;
    for (let i = 0; i < invoices.length; i++) {
        invoices[i] = JSON.parse(invoices[i]);
        for (let j = 0; j < invoices[i].length; j++) {
            invoices[i][j].price = parseInt(invoices[i][j].price);
            total += invoices[i][j].price;
            total = total / 3955;
        }
        total  = total.toString();
    }
    return total;
}


paypal
    .Buttons({
        // Sets up the transaction when a payment button is clicked
        createOrder: function (data, actions) {
            const mount = returnTotalMountInDolars();
            console.log(mount);
            return actions.order.create({
                purchase_units: [{
                  amount: {
                    value:"40"  // Can also reference a variable or function
                  }
                }]
              });
        },
        // Finalize the transaction after payer approval
        onApprove: function (data, actions) {
            return actions.order.capture().then(function(orderData) {
                // Successful capture! For dev/demo purposes:
                console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
                const transaction = orderData.purchase_units[0].payments.captures[0];
                alert(`Transaction ${transaction.status}: ${transaction.id}\n\nSee console for all available details`);
                // When ready to go live, remove the alert and show a success message within this page. For example:
                // const element = document.getElementById('paypal-button-container');
                // element.innerHTML = '<h3>Thank you for your payment!</h3>';
                // Or go to another URL:  actions.redirect('thank_you.html');
              });
        },
        onCancel : function(data) {
            console.log(data);
            window.location.href = "checkout.html";
        }
    })
    .render("#paypal-button-container");