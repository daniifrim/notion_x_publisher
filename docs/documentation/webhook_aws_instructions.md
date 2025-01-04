# AWS HTTP API Setup for Notion Webhook

## Prerequisites
- AWS Account with appropriate permissions
- AWS CLI installed and configured
- Node.js and npm installed
- Project codebase cloned and dependencies installed

## 1. Create HTTP API in API Gateway

1. **Go to API Gateway Console**
   - Open AWS Console
   - Navigate to API Gateway
   - Click "Create API"
   - Choose "HTTP API" (not REST API)

2. **Configure API Settings**
   - Name: `notion-publisher-webhook`
   - Description: "Webhook endpoint for Notion tweet variation generation"
   - CORS: Enable if needed
   - Click "Next"

3. **Configure Routes**
   - Click "Add route"
   - Method: POST
   - Resource path: `/webhook`
   - Click "Next"

## 2. Configure Lambda Integration

1. **Select Lambda Function**
   - Choose the existing `notion-x-publisher` function
   - This function already contains our webhook handler code
   - No need to create a new function
   - The default handler will process webhook requests

2. **Verify Environment Variables**
   The following should already be set in your Lambda function:
   ```
   NOTION_API_KEY=your_notion_api_key
   NOTION_DATABASE_ID=your_database_id
   WEBHOOK_SECRET=your_webhook_secret
   ```

## 3. Connect API Gateway to Lambda

1. **Add Integration**
   - In API Gateway console
   - Select your API
   - Go to Integrations
   - Click "Manage integrations"
   - Click "Create"

2. **Configure Integration**
   - Integration type: Lambda function
   - Lambda function: notion-x-publisher
   - Click "Create"

## 4. Configure Permissions

1. **Verify Lambda Permissions**
   - The function should already have necessary permissions
   - Includes Notion API access and CloudWatch logs
   - No additional IAM roles needed

2. **Add API Gateway Permission**
   ```bash
   aws lambda add-permission \
     --function-name notion-x-publisher \
     --statement-id apigateway \
     --action lambda:InvokeFunction \
     --principal apigateway.amazonaws.com \
     --source-arn "arn:aws:execute-api:{region}:{account}:{api-id}/*"
   ```

## 5. Deploy API

1. **Create Stage**
   - In API Gateway console
   - Click "Stages"
   - Click "Create"
   - Name: `prod`
   - Auto-deploy: Enabled
   - Click "Create"

2. **Get API URL**
   - Note the API URL: `https://{api-id}.execute-api.{region}.amazonaws.com/prod/webhook`
   - This is your webhook URL for Notion

## 6. Configure Notion Button

1. **Create Button Property**
   - In Notion database
   - Add button property named "Create Variations"
   - Configure webhook URL from step 5
   - Add webhook secret to headers

2. **Test Configuration**
   - Create a test draft
   - Click "Create Variations" button
   - Check CloudWatch logs for execution details

## 7. Monitoring and Logs

1. **CloudWatch Logs**
   - Navigate to CloudWatch console
   - Find log group: `/aws/lambda/notion-x-publisher`
   - Look for webhook-related logs
   - Monitor for errors and execution times

2. **API Gateway Monitoring**
   - Monitor API metrics in CloudWatch
   - Check for 4xx and 5xx errors
   - Monitor latency and integration timeouts

## 8. Security Best Practices

1. **Webhook Secret**
   - Store in AWS Secrets Manager
   - Rotate regularly
   - Never commit to code

2. **API Gateway**
   - Enable AWS WAF if needed
   - Configure throttling limits
   - Enable access logging

## 9. Troubleshooting

1. **Common Issues**
   - 403 Unauthorized: Check webhook secret
   - 502 Bad Gateway: Check Lambda timeout
   - 504 Gateway Timeout: Increase timeout settings

2. **Debug Steps**
   - Check CloudWatch logs
   - Verify environment variables
   - Test Lambda function directly
   - Verify API Gateway integration 