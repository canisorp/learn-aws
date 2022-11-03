#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { LearnAwsStack } from '../lib/learn-aws-stack';

const app = new cdk.App();
new LearnAwsStack(app, 'LearnAwsStack');
