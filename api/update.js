"use strict";

// The aws-sdk module is imported, and a new instance of AWS.DynamoDB.DocumentClient is created to interact with DynamoDB.
const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

// The getEmployeeById is designed to be used as an AWS Lambda function.
module.exports.updateEmployeeById = (event, context, callback) => {
  // Get pathParameters
  const employeeDNI = +event.pathParameters.id;
  
  // Parse the body request
  const employee = JSON.parse(event.body);
  
  // Definition's parameters for the dynamodb update method
  const params = {
    TableName: `EMPLOYEES`,
    Key: { employeeDNI },
    AttributeUpdates: {},
    ReturnValues: "UPDATED_NEW",
  };

  // I adds an extra functionality 
  // that allows you to use the update
  // without having to pass all the values 
  // but you can only send the ones you want to update.

  // Check is updated in field Age
  if (employee.Age) {
    params.AttributeUpdates.employeeAge = { Value: employee.Age };
  }
  // Check is updated in field Name
  if (employee.Name) {
    params.AttributeUpdates.employeeName = { Value: employee.Name };
  }
  // Check is updated in field Position
  if (employee.Position) {
    params.AttributeUpdates.employeePosition = { Value: employee.Position };
  }

  console.log("Updating Employees table.");
  // Callback function for update method
  const onUpdate = (err, data) => {
    if (err) {
      console.log(
        `Couldn't update Employee ${employeeDNI}`,
        JSON.stringify(err, null, 2)
      );
      callback(null, {
        statusCode: 404,
        body: JSON.stringify({
          message: `Couldn't update Employee ${employeeDNI}`,
          err,
        }),
      });
    } else {
      console.log(`Update succeeded. Employee ${employeeDNI}`);
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
  dynamoDb.update(params, onUpdate);
};
