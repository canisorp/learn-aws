import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class LearnAwsStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // defines AWS lambda resource
    const hello = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_16_X,   // execution environment
      code: lambda.Code.fromAsset('lambda'), // code loaded from lambda directory
      handler: 'hello.handler'               // file is "hello", function is "handler"
    });
  };
};
