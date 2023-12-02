<!--
title: 'Serverless Challenge Stefanini Group'
description: 'The challenge we propose is to provision an infrastructure in AWS, in which there is a lambda that is capable of recording data about a company's employees in a database.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
priority: 1
authorLink: 'https://github.com/joalafu'
authorName: 'Lafuente Joaquín.'
authorAvatar: 'https://avatars.githubusercontent.com/u/24613613?v=4'
-->

# Serverless Challenge

The challenge proposes to provision an infrastructure in AWS, in which there is a lambda that is capable of recording data about a company's employees in a database.
This lambda provides the methods to get, delete, and update employees.
I chose to use Serverless Framework.

## Entities

An employee have the following attributes: DNI, Age, Name and Position.

## Usage

### Requirements

Install serverless:
```
npm install -g serverless
```

Setup AWS Credentials:
- Run the command “serverless”.
- Type "Y" and press "enter" after "Register or Login to Serverless Framework"
- Log in to Serverless Dashboard 
- Select your organization and press "enter"
- Type "N" and press "enter" after "Do you want to deploy now"

### Deployment

Install dependencies with:

```
npm install
```

and then deploy with:

```
serverless deploy
```

After running deploy, you should see output similar to:

```bash
Deploying serverless-challenge-api to stage dev (us-east-1, "default" provider)

✔ Service deployed to stack serverless-challenge-api-project-dev (177s)

endpoints:
  POST - https://{restapi_id}.execute-api.{region}.amazonaws.com/{stage_name}/employee
  GET - https://{restapi_id}.execute-api.{region}.amazonaws.com/{stage_name}/employee/{id}
  PUT - https://{restapi_id}.execute-api.{region}.amazonaws.com/{stage_name}/employee/{id}
  DELETE - https://{restapi_id}.execute-api.{region}.amazonaws.com/{stage_name}/employee/{id}
  GET - https://{restapi_id}.execute-api.{region}.amazonaws.com/{stage_name}/employees
```

Save the url address of the "endpoint" this will be the one used for its invocation.
