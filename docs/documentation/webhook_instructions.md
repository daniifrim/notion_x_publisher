# Updated Instructions for Using a Notion Button to Trigger Webhooks

Below is a comprehensive guide on how to set up and use a Notion Button (or Database Button) to send a webhook directly to your AWS Lambda function. This update reflects Notion’s support for the “Send Webhook” action, as documented in [Notion's official docs on webhook actions](https://www.notion.com/help/webhook-actions).

---

## 1. Creating the Webhook Receiver on AWS

1. **AWS API Gateway**  
   - Create (or reuse) an AWS API Gateway endpoint with a publicly accessible URL.  
   - This endpoint will receive POST requests from Notion whenever you click the Notion Button with a “Send Webhook” action.

2. **AWS Lambda**  
   - Behind your API Gateway, configure a Lambda function to handle incoming requests.  
   - In this Lambda, you’ll parse the JSON payload from Notion, extract any needed data (e.g., `pageId`, `Title`), and pass it to your existing draft processor logic.

3. **Security**  
   - Although Notion’s “Send Webhook” doesn’t enforce authentication, you may secure it by adding a shared secret, a custom header, or a signature check so that only your Notion workspace can trigger this endpoint.

---

## 2. Setting up the Notion Button

Because Notion provides a “Send Webhook” action on paid plans, you can configure a button to directly send data to your AWS endpoint:

1. **Go to the Notion Page or Database**  
   - You can add a “Button” (on a regular page) or a “Database Button” (in a database).  
   - If it’s a Database Button, you’ll see this option at the top when editing properties.

2. **Configure the Button**  
   - Under the “Actions” menu, select “Send Webhook.”  
   - Paste your AWS API Gateway URL.  
   - Optional: Add **Custom Headers** (e.g., an API key) to help secure or identify requests.

3. **Select Which Properties to Send**  
   - If using a database automation, you can specify which properties (like “Title” or custom fields) are sent in the payload.  
   - Database Button properties automatically include basic page info like the Title if that property is visible.

4. **Usage**  
   - Clicking the button triggers a POST request from Notion to your AWS endpoint.  
   - If this request fails (e.g., Lambda is unavailable), Notion pauses the automation and shows an exclamation mark, requiring manual intervention to resume.

**Limitations** (from Notion’s documentation):
- You can create up to 5 webhook actions per automation.  
- Only page properties (e.g., Title, Status, etc.) can be included, not the full page contents.  
- The request is always a POST, and you cannot modify the HTTP method.  
- No built-in authentication is required by Notion.

---

## 3. Parsing Data in Your Lambda

In your AWS Lambda function:

1. **Parse the Request Body**  
   - Extract the JSON payload that Notion sends (e.g., `pageId`, `Title`), based on what you configured in the button.  
   - Each property you’ve included in the automation or button will appear in `data` or a similar structure in the payload.

2. **Invoke the Draft Processor**  
   - Use the existing `DraftProcessorService` (or equivalent) to fetch more details from Notion if needed.  
   - Generate AI variations or handle any other logic relevant to your application.

3. **Update Notion**  
   - After processing, write final results (like AI-generated text) back to the original page using your `NotionService`.

4. **Respond to Notion**  
   - Return a 200 OK status if everything succeeded.  
   - For errors, return a non-200 status so Notion can show the exclamation mark indicator and pause the automation if necessary.

---

## 4. Example Payload Structure

Below is an example of what the Notion webhook payload might look like. Actual keys can differ based on your automation settings and the properties you include:

```json
{
"event_type": "databaseButtonClick",
"timestamp": "2023-10-01T12:34:56.789Z",
"data": {
"pageId": "some-notion-page-id",
"properties": {
"Title": "Draft Tweet: Busy day ahead!",
"Status": "Draft",
"Scheduled Time": "2023-10-10T10:00:00.000Z"
}
}
}
```

• Note: If you added custom properties for your Notion database, they may appear in `properties`.  
• You can reference the `event_type`, `timestamp`, or other metadata as needed in your Lambda.

---

## 5. Error Handling Patterns

1. **Lambda Failures**  
   - If your Lambda throws an error or returns a non-2xx HTTP status, Notion will mark the webhook as failed.  
   - Notion will pause the automation until a user intervenes or you manually resume it.

2. **Exception Logging**  
   - Log errors within your Lambda function (e.g., console.error) and consider using CloudWatch alarms to notify you when failures exceed a threshold.

3. **Retries**  
   - Currently, Notion does not automatically retry. If a webhook call fails, the automation is paused. You must manually resume once you fix the issue.

---

## 6. Rate Limiting Considerations

• Notion’s “Send Webhook” frequency depends on user interaction or automation triggers. Typically, it won’t bombard your endpoint, but consider adding logic in your Lambda to handle bursts (e.g., queue them or respond quickly to avoid hitting high concurrency).  
• If you add multiple Notion automations triggering the same endpoint, you could implement an SQS queue or throttling logic in your Lambda to handle potential load spikes.

---

## 7. Detailed Lambda Configuration

If you’re using the Serverless Framework, your `serverless.yml` might look like this for a dedicated webhook function:

```yaml
functions:
notionWebhook:
handler: src/functions/notionWebhook/index.handler
events:
http:
path: notion-webhook
method: post
timeout: 30
memorySize: 256
```

Key Points:
- **Path**: Sets the URL path (e.g., `https://your-api-id.execute-api.us-east-1.amazonaws.com/dev/notion-webhook`).  
- **Method**: Must be `post` since Notion always does a POST request.  
- **Timeout**: 30 seconds is typically enough for quick AI generation; configure as needed.

---

## 8. TypeScript Interface for Webhook Data

Consider defining an interface in your code to keep it type-safe:

```typescript
// src/types/notionWebhook.types.ts
export interface NotionWebhookPayload {
event_type: string;
timestamp: string;
data: {
pageId: string;
properties: {
[key: string]: unknown;
};
};
}
```

• Adjust `properties` based on what you expect from Notion.  
• In your Lambda, you can import this interface and parse the request body accordingly:

```typescript:src/functions/notionWebhook/index.ts
import { APIGatewayEvent } from 'aws-lambda';
import { NotionWebhookPayload } from '../../types/notionWebhook.types';
export const handler = async (event: APIGatewayEvent) => {
try {
const payload = JSON.parse(event.body || '{}') as NotionWebhookPayload;
console.log('Received webhook payload:', payload);
// Extract needed info
const { pageId, properties } = payload.data;
// TODO: Pass pageId to your DraftProcessorService, etc.
// ...
return {
statusCode: 200,
body: JSON.stringify({ message: 'Draft processing initiated.' })
};
} catch (error) {
console.error('Webhook processing failed:', error);
return {
statusCode: 500,
body: JSON.stringify({ error: 'Failed to process Notion webhook.' })
};
}
};
```


---

## 9. Summary of the Flow

1. **User** clicks or triggers the “Send Webhook” button in Notion.  
2. **Notion** makes a POST request to your **AWS API Gateway** endpoint.  
3. **API Gateway** invokes your **Lambda** webhook receiver.  
4. **Lambda** processes the payload, calling your draft-processing logic.  
5. **Lambda** updates the Notion page with any results (e.g., tweet variations).  
6. **Lambda** responds with success or error to Notion.  
7. **Notion** shows the button action as successful or failed. If failed, automation is paused.

---

## 10. Documenting and Tracking Changes

1. **instructions.md**  
   - Keep these conceptual instructions (and any further clarifications) updated in `instructions.md` so future developers have a high-level reference.

2. **progress.md**  
   - Whenever you add or change the AWS endpoint or update your Lambda to handle new properties from the Notion button, log that in `progress.md`.

---

With these additions, you have a more robust setup: you understand the exact JSON payload, how to handle errors, how to manage rate limiting, what your Lambda configuration might look like, and how to keep the code strictly typed in TypeScript. Using Notion’s built-in webhook functionalities can greatly streamline your workflow—just click the button and your AI-driven tweet variations appear in seconds.