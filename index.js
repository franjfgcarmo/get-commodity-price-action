const core = require('@actions/core');
const github = require('@actions/github');

try{ 
    const gold = 'gold';   
    const silver = 'silver';
    const USD = 'USD';
    const EUR = 'EUR';
    const commodity = core.getInput('commodity').toLowerCase();
    const currency = core.getInput('price').toUpperCase();
    const message = `The price of ${commodity} is ${currency}`;
    console.log(message);
    let price = 0;

    if(commodity !== gold && commodity !== silver){
        throw new Error(`Commodity ${commodity} not supported`);
    }

    if(currency !== USD && currency !== EUR){
        throw new Error(`Currency ${currency} not supported`);
    }

    if(commodity === gold){
        price = currency.toUpperCase() === USD ? 2652.84 : 2425.52;
    }else if(commodity === silver){
        price = currency.toUpperCase() === USD ? 30.59 : 29.10;
    }
    console.log(`Current price of gold per ounce: ${price} ${currency}`);
    
    core.setOutput('price', price);

    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);

}catch(error){
    core.setFailed(error.message);
}