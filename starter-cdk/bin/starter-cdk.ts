#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { StarterCdkStack } from '../lib/starter-cdk-stack';
import { PhotosStack } from '../lib/PhotosStack';
import { PhotosHandlerStack } from '../lib/PhotoHandlerStack';

const app = new cdk.App();
new PhotosStack(app, 'PhotosStack')
new PhotosHandlerStack(app, 'PhotosHandlerStack')

