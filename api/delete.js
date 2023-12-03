"use strict";

// The aws-sdk module is imported, and a new instance of AWS.DynamoDB.DocumentClient is created to interact with DynamoDB.
const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

// The deleteEmployeeById is designed to be used as an AWS Lambda function.
module.exports.deleteEmployeeById = (event, context, callback) => {
  // Get pathParameters
  const employeeDNI = +event.pathParameters.id;

  // Definition's parameters for the dynamodb delete method
  const params = {
    TableName: `EMPLOYEES`,
    Key: { employeeDNI },
    ReturnValues: "ALL_OLD",
  };

  console.log("Deleting Employees table.");
  // Callback function for delete method
  const onDelete = (err, data) => {
    if (err) {
      console.log(
        `Couldn't delete Employee ${employeeDNI}`,
        JSON.stringify(err, null, 2)
      );
      callback(null, {
        statusCode: 404,
        body: JSON.stringify({
          message: `Couldn't delete Employee ${employeeDNI}`,
          err,
        }),
      });
    } else {
      console.log(`Delete succeeded. Employee ${employeeDNI}`);
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          OldData: data.Attributes,
        }),
      });
    }
  };

  //Call to the delete method
  dynamoDb.delete(params, onDelete);
};
