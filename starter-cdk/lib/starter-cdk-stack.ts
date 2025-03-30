import * as cdk from "aws-cdk-lib";
import { CfnOutput, CfnParameter, Duration } from "aws-cdk-lib";
import { Bucket, CfnBucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';
class L3Bucket extends Construct {
  constructor(scope: Construct, id: string, expiration: number) {
    super(scope, id);
    new Bucket(this, "L3Bucket", {
      lifecycleRules: [
        {
          expiration: cdk.Duration.days(2),
        },
      ],
    });
  }
}
export class StarterCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create s3 bucket 3 ways
    // this = StarterCdkStack
    // L1 construct
    new CfnBucket(this, "MyL1Bucket", {
      lifecycleConfiguration: {
        rules: [
          {
            expirationInDays: 1,
            status: "Enabled",
          },
        ],
      },
    });
    // adjust duration : cdk deploy --parameters duration=10
    const duration = new CfnParameter(this, 'duration',{
      default: 6,
      minValue: 1,
      maxValue: 10,
      type: 'Number'
    })
    // L2 construct : most popular
    const myL2Bucket = new Bucket(this, "MyL2Bucket", {
      lifecycleRules: [
        {
          expiration: Duration.days(duration.valueAsNumber)
        },
      ],
    });
     // cdk output
    new CfnOutput(this, 'myL2Bucket', {
      value: myL2Bucket.bucketName
    }) 
    
    // L3 construct
    new L3Bucket(this, "MyL3Bucket", 3);
    // example resource
    // const queue = new sqs.Queue(this, 'StarterCdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}

