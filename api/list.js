"use strict";

// The aws-sdk module is imported, and a new instance of AWS.DynamoDB.DocumentClient is created to interact with DynamoDB.
const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

// The listEmployees is designed to be used as an AWS Lambda function.
module.exports.listEmployees = (event, context, callback) => {
  // Definition's parameters for the dynamodb scan method
  const params = {
    TableName: `EMPLOYEES`,
    ProjectionExpression: "employeeDNI, employeeAge, employeeName, employeePosition",
  };

  console.log("Scanning Employees table.");
  // Callback function for scan method
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

  //Call to the scan method
  dynamoDb.scan(params, onScan);
};
