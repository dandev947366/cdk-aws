#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { StarterCdkStack } from '../lib/starter-cdk-stack';
import { PhotosStack } from '../lib/PhotosStack';

const app = new cdk.App();
new PhotosStack(app, 'PhotosStack')
