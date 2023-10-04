import axios from "axios";

let token = process.env.BUSYBENCH_TOKEN;
let domain = "https://api.busybench.com";

async function updateTicket(ticketID: string, body: string,) {
    let _body = {
        "accountID":"1770",
        // "customerID":"528167",
        "ticketID": ticketID,
        "noteID": 0,
        // "color": "#ffffff",
        // "sticky":"0",
        "public":"0",
        "note": `<h2>Mega Mind Automation (by Dev)</h2></br>${body}`
    };
    let post = axios.post(`${domain}/ticket/saveNote`, _body, {
        headers: {
            token,
            "referrer": "https://portal.busybench.com/",
            "Content-Type": "application/json"
        }
    });

    try {
        let {status, data} = await post;
        console.log(status);
        console.log(data);
    } catch(error) {
        console.error(error);
    }

}

async function getTicket(ticketID: string) {

    let _body = {
        "accountID":"1770",
        // "customerID":"528167",
        "ticketID": ticketID,
    };
    let post = axios.post(`${domain}/ticket/getTicket_byID`, _body, {
        headers: {
            token,
            "referrer": "https://portal.busybench.com/",
            "Content-Type": "application/json"
        }
    });

    try {
        let {status, data} = await post;
        console.log(status);
        console.log(data);
    } catch(error) {
        console.error(error);
    }
}

export {
    updateTicket,
    getTicket
}

