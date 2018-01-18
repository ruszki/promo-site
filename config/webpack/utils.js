const clientName = "client";
const serverName = "server";

const devName = "dev";
const prodName = "prod";

module.exports = {
    getName: (client, dev) => {
        return (client !== undefined ? (client ? clientName : serverName) : "") +
            (client !== undefined && dev !== undefined ? "_" : "") +
            (dev !== undefined ? (dev ? devName : prodName) : "");
    }
};