#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { StarterCdkStack } from '../lib/starter-cdk-stack';
import { PhotosStack } from '../lib/PhotosStack';
import { PhotosHandlerStack } from '../lib/PhotoHandlerStack';
import { BucketTagger } from './Tagger';

const app = new cdk.App();
const photosStack = new PhotosStack(app, 'PhotosStack')
new PhotosHandlerStack(app, 'PhotosHandlerStack', {
  targetBucketArn: photosStack.photosBucketArn
})

const tagger = new BucketTagger('level','test')
cdk.Aspects.of(app).add(tagger)