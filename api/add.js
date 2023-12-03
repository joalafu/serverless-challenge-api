"use strict";

// The aws-sdk module is imported, and a new instance of AWS.DynamoDB.DocumentClient is created to interact with DynamoDB.
const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient(); 

// The addEmployee is designed to be used as an AWS Lambda function.
module.exports.addEmployee = (event, context, callback) => {
  // Parse the body request
  const employee = JSON.parse(event.body);

  // Definition's parameters for the dynamodb put method
  const params = {
    TableName: `EMPLOYEES`,
    Item: {
      employeeDNI: employee.DNI,
      employeeAge: employee.Age,
      employeeName: employee.Name,
      employeePosition: employee.Position,
    },
    ReturnValues: "ALL_OLD",
  };

  console.log("Add Employee table.");
  // Callback function for put method
  const onPut = (err, data) => {
    if (err) {
      console.log(`Couldn't add Employee ${employee.DNI}`, JSON.stringify(err, null, 2));
      callback(null, {
        statusCode: 404,
        body: JSON.stringify({
          message: `Couldn't add Employee ${employee.DNI}`,
          err,
        }),
      });
    } else {
      console.log(`Add succeeded. Employee ${employee.DNI}`);
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          NewData: data.Attributes,
        }),
      });
    }
  };

  //Call to the put method
  dynamoDb.put(params, onPut);
};
