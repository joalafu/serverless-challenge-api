"use strict";

const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.listEmployees = (event, context, callback) => {
  const params = {
    TableName: `EMPLOYEES`,
    ProjectionExpression: "employeeDNI, employeeAge, employeeName, employeePosition",
  };

  console.log("Scanning Employees table.");
  const onScan = (err, data) => {
    if (err) {
      console.log(
        "Scan failed to load data. Error JSON:",
        JSON.stringify(err, null, 2)
      );
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          message: `Scan failed to load data.`,
          err,
        }),
      });
    } else {
      console.log("Scan succeeded.");
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          ...data,
        }),
      });
    }
  };

  dynamoDb.scan(params, onScan);
};
