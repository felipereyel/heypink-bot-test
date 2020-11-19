require("dotenv").config();
const fetch = require('node-fetch');
const fs = require("fs");


const GetFullBot = fs
	.readFileSync("./src/GetFullBot.gql")
	.toString();

const getConfigurations = async (botId) => {
    const body = { query: GetFullBot, variables: { id: botId } };
    const response = await fetch(process.env.HASURA_URL, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json', 'x-hasura-admin-secret': process.env.HASURA_SECRET },
    });

    const result = await response.json();
    return result.data.bots_by_pk;
}

exports.getConfigurations = getConfigurations;