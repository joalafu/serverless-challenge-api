"use strict";

const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.addEmployee = (event, context, callback) => {
  const employee = JSON.parse(event.body);

  const params = {
    TableName: `EMPLOYEES`,
    Item: {
      employeeDNI: employee.DNI,
      employeeAge: employee.Age,
      employeeName: employee.FullName,
      employeePosition: employee.Position,
    },
    ReturnValues: "ALL_NEW",
  };

  console.log("Add Employee table.");
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

  dynamoDb.put(params, onPut);
};
