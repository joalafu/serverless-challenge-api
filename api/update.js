"use strict";

const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.updateEmployeeById = (event, context, callback) => {
  const employeeDNI = event.pathParameters.id;
  const employee = JSON.parse(event.body);
  const params = {
    TableName: `EMPLOYEES`,
    Key: { employeeDNI },
    AttributeUpdates: {
      employeeAge: employee.Age,
      employeeName: employee.Name,
      employeePosition: employee.Position,
    },
    ReturnValues: "UPDATED_NEW",
  };

  console.log("Updating Employees table.");
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

  dynamoDb.update(params, onUpdate);
};
