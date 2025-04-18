import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  Code,
  Function as LambdaFunction,
  Runtime,
} from "aws-cdk-lib/aws-lambda";
import { Fn } from "aws-cdk-lib";

interface PhotosHandlerStackProps extends cdk.StackProps{
    targetBucketArn: string
}
export class PhotosHandlerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: PhotosHandlerStackProps) {
    super(scope, id, props);
    new LambdaFunction(this, "PhostoHandler", {
      runtime: Runtime.NODEJS_16_X,
      handler: "index.handler",
      code: Code.fromInline(`
            export.handler = async (event) => {
                console.log("hello! " + process.env.TARGET_BUCKET)
            };
        `),
      environment: {
        TARGET_BUCKET: props.targetBucketArn,
      },
    });
  }
}
