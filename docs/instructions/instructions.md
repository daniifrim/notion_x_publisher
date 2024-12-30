# Project overview
This project is designed to integrate Notion with X (formerly known as Twitter). It accesses a Notion database containing tweets and automates their publication on X.

# Core functionalities
1. Access a Notion database containing tweets
2. See the tweets that are ready to be published and the publication date.
3. Automate the publication of tweets on X through the X API
4. Automate the checking of the Notion database every five minutes to identify tweets ready for publication.
5. Implement webhooks to trigger actions when the status of a Notion page changes to "ready to publish."
6. Schedule tweets to be published on their specified publication date once they are marked as ready.
7. This automation will be deployed on AWS Lambda or another suitable AWS service.
8. The main script is going to be using TypeScript language.

# Doc



# Current file structure



# Additional requirements
1. Project setup
   - Organize all new components in a dedicated components directory at the root level of the project.
   - Ensure that all new pages or modules are placed in a designated directory for easy navigation.
   - Structure the project to facilitate clear separation of concerns between different parts of the application.
   - Ensure that data fetching is handled in a manner that separates server-side logic from client-side logic.

2. Server-Side API Calls:
   - Perform all interactions with external APIs on the server-side to enhance security and performance.
   - Establish dedicated routes or endpoints for each external API interaction to maintain a clean architecture.
   - Ensure that client-side components retrieve data through these server-side routes, not directly from external APIs.

3. Environment Variables:
   - Store all sensitive information, such as API keys and credentials, in environment variables.
   - Use a local environment configuration file for development and ensure it is excluded from version control.
   - For production, configure environment variables in the deployment platform.
   - Access environment variables only in server-side code or secure routes.

4. Error Handling and Logging:
   - Implement comprehensive error handling throughout the application.
   - Log errors on the server-side to aid in debugging and monitoring.
   - Provide user-friendly error messages on the client-side to enhance user experience.

5. Type Safety:
   - Define clear data structures and types for all data, especially for API responses.
   - Avoid using generic or undefined types; instead, specify precise types for all variables and function parameters.

6. API Client Initialization:
   - Initialize API clients in server-side code to ensure secure and efficient operation.
   - Implement checks to verify that API clients are properly initialized before use.

7. Data Fetching in Components:
   - Implement data fetching in a way that supports efficient and responsive client-side operations.
   - Include loading states and error handling for all data fetching processes.

8. Configuration:
   - Utilize configuration files for environment-specific settings.
   - Ensure that environment variables are accessible to the application in a secure manner.

9. CORS and API Routes:
   - Use server-side routes to manage CORS issues when interacting with external APIs.
   - Implement proper request validation in all API routes to ensure data integrity and security.

10. Component Structure:
   - Maintain a clear separation of concerns between different components of the application.
   - Use server-side logic for initial data fetching and pass data to client-side components as needed.

11. Security:
    - Never expose sensitive information, such as API keys, on the client-side.
    - Implement proper authentication and authorization mechanisms for all routes and API interactions.