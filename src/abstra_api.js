require("dotenv").config();
const fetch = require('node-fetch');

const getConfigurations = async (botId) => {
    const body = {
        query: "mutation Something($statementId: ID!, $args: [Arg]) { execute_statement(statement_id: $statementId, args: $args){ rows } }",
        variables: { statementId: process.env.CONFIGURATION_QUERY_ID, args: [botId] }
    }

    const response = await fetch(process.env.TABLES_URL, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    });

    const result = await response.json();
    const responses = result.data.execute_statement.rows;

    for (const response of responses) {
        response.options = responses.filter(r => r.parent_id === response.id);
    }

    return responses;
}

exports.getConfigurations = getConfigurations;