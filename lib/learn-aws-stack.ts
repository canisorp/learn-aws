import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import { HitCounter } from './hitcounter';
import { TableViewer } from 'cdk-dynamo-table-viewer';

export class LearnAwsStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // defines AWS lambda resource
    const hello = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_16_X,   // execution environment
      code: lambda.Code.fromAsset('lambda'), // code loaded from lambda directory
      handler: 'hello.handler'               // file is "hello", function is "handler"
    });

    const helloHitCounter = new HitCounter(this, 'HelloHitCounter',{
      downstream: hello
    });

    // define an API Gateway REST API resource backed by our "handler" function
    new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: helloHitCounter.handler
    })

    new TableViewer(this, 'ViewHitCounter', {
      title: 'Hello Hits',
      table: helloHitCounter.table,
      sortBy: "-hits"
    });
  };
};
