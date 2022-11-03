import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from "constructs";

export interface HitCounterProps{
    // the function for which we want to count url hits
    downstream: lambda.IFunction;
};

export class HitCounter extends Construct{

    // allows accessing counter function
    public readonly handler: lambda.Function;

    constructor(scope: Construct, id: string, props: HitCounterProps){
        super(scope, id);

        const table = new dynamodb.Table(this, 'Hits', {
            partitionKey: { name: 'path', type: dynamodb.AttributeType.STRING }
        });

        this.handler = new lambda.Function(this, 'HitsCounterHandler', {
            runtime: lambda.Runtime.NODEJS_16_X,
            code: lambda.AssetCode.fromAsset('lambda'),
            handler: 'hitcounter.handler',
            environment: {
                DOWNSTREAM_FUNCTION_NAME: props.downstream.functionName,
                HITS_TABLE_NAME: table.tableName
            }
        });
    }
}