"use strict";

// The aws-sdk module is imported, and a new instance of AWS.DynamoDB.DocumentClient is created to interact with DynamoDB.
const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

// The getEmployeeById is designed to be used as an AWS Lambda function.
module.exports.getEmployeeById = (event, context, callback) => {
  // Get pathParameters
  const employeeDNI = +event.pathParameters.id;
  
  // Definition's parameters for the dynamodb get method
  const params = {
    TableName: `EMPLOYEES`,
    Key: { employeeDNI },
  };

  console.log("Getting Employees table.");
  // Callback function for get method
  const onGet = (err, data) => {
    if (err) {
      console.log(`Couldn't get Employee ${employeeDNI}`, JSON.stringify(err, null, 2));
      callback(null, {
        statusCode: 404,
        body: JSON.stringify({
          message: `Couldn't get Employee ${employeeDNI}`,
          err,
        }),
      });
    } else {
      console.log(`Get succeeded. Employee ${employeeDNI}`);
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

  //Call to the get method
  dynamoDb.get(params, onGet);
};
