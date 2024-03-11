# Plans of action

1. Framework and Architecture:

   - Use Express.js as the backend framework.
   - Implement dependency injection to promote loose coupling and testability.
   - Follow a modular and scalable architecture with separation of concerns.

2. Test-Driven Development (TDD):

   - Adopt a TDD approach throughout the development process.
   - Write unit tests before implementing the corresponding code.
   - Use Jest as the testing framework for unit tests and integration tests.
   - Aim for high test coverage (e.g., 90% or above) to ensure code quality and reliability.
   - Continuously run tests and refactor code as needed to maintain a clean and maintainable codebase.

3. GraphQL Integration:

   - Implement a GraphQL API using Apollo Server or TypeGraphQL.
   - Define the GraphQL schema and resolvers.
   - Write tests for GraphQL resolvers and mutations to ensure proper functionality.
   - Stitch together resolvers to make requests to upstream services.

4. Error Handling and Logging:

   - Implement robust error handling using try-catch blocks and error middleware.
   - Write tests for error handling scenarios.
   - Use a logging library like Winston or Pino for structured logging.
   - Consider integrating with an error tracking and monitoring service.

5. Integration with Upstream Services:

   - Use appropriate libraries and SDKs for communicating with upstream services (gRPC, event bus, external GraphQL APIs).
   - Write tests for integration with each upstream service.
   - Test error handling and edge cases when interacting with upstream services.

6. Database for Session Data:

   - Use Redis for storing user session data.
   - Write tests for Redis integration and data storage/retrieval.
   - Integrate Redis with the backend server using a Redis client library.

7. Authentication:

   - Implement authentication using a third-party service.
   - Write tests for authentication flows and token handling.
   - Use Passport.js for handling authentication strategies.
   - Ensure secure handling of user credentials and tokens.

8. Timeframe and Milestones:
   - Milestone 1: Basic Scaffolding and TDD Setup
     - Set up the project structure and dependencies.
     - Configure Jest and establish the TDD workflow.
     - Write initial tests for the basic server setup.
   - Milestone 2: Integrate with One Upstream Service
     - Choose one of the upstream services (gRPC, event bus, or external GraphQL API) to integrate first.
     - Write tests for the integration and data flow between the server and the upstream service.
     - Implement the necessary communication layer and test it thoroughly.
   - Milestone 3: Testing, Observability, and Continuous Integration
     - Expand unit tests, integration tests, and end-to-end tests.
     - Set up code coverage reporting and ensure high coverage.
     - Implement logging and error handling.
     - Configure monitoring and alerting systems.
     - Set up a Continuous Integration (CI) pipeline to automatically run tests on each code change.

The focus on Test-Driven Development remains a priority, ensuring that the codebase is thoroughly tested, reliable, and maintainable. The plan emphasizes writing tests before implementing the corresponding code and continuously running tests and refactoring as needed.

Remember to review and refine the implementation based on feedback and requirements while maintaining the TDD discipline throughout the development process.

## steps to iteratively build

- [x] scaffold
  - [x] add logger, done with winston logger.config
  - [ ] inversify
    - [ ] set up jest correct, currently need beforeEach to get all the binding
    - [ ] proper place for import "reflect-metadata"
    - [ ] investigate if possible to create multiple containers, current one container gets messy
- [ ] Error handling for different scenarios see [Error Handling](#error-handling)
  - [ ] controller
  - [ ] repository
  - [ ] service
- [ ] Mocking different handlers
  - [ ] controller
  - [ ] repository
  - [ ] service
- [] mock the upstream
- [] establish one connection to upstream
- [] expose one graphql query via resolver
- [] create mock class builder

### graphql build

- [] generate schema
- [] integrate with zod
- [] testing generated schema

## Error handling

### Centralized Error Handling Middleware

Create a centralized error handling middleware in your application that catches and handles errors from all layers.
This middleware can be placed at the top level of your application, such as in the app.ts file.
It should catch any unhandled errors thrown by the controllers, services, or repositories.
The middleware can log the errors, format them appropriately, and send a consistent error response to the client.
This approach provides a single point of error handling and ensures consistent error responses across the application.

### Error Handling in Controllers

Implement error handling logic within each controller method.
Use try-catch blocks to catch any errors thrown by the services or repositories.
If an error occurs, log the error and send an appropriate error response to the client.
This approach allows for more granular error handling specific to each controller method.
However, it can lead to duplicated error handling code across controllers.

### Error Handling in Services and Repositories

Implement error handling within the service and repository layers.
Use try-catch blocks to catch any errors that occur during service or repository operations.
If an error occurs, log the error and throw a custom error or a more specific error type.
The custom errors can include additional metadata or error codes to help identify the nature of the error.
The controllers can then catch these custom errors and handle them appropriately.

### Error Handling with Promises and Async/Await

Utilize the error handling mechanisms provided by Promises and async/await.
In async functions, use try-catch blocks to catch any errors that occur within the function.
If an error occurs, log the error and throw a custom error or reject the promise with an appropriate error.
The calling code (e.g., controllers) can then catch and handle the errors using .catch() or try-catch blocks.

### Logging and Monitoring

Implement comprehensive logging throughout your application, including error logging.
Use a logging library or framework to log errors, along with relevant contextual information.
Integrate with a centralized logging system or error monitoring service to track and analyze errors in real-time.
This approach helps in identifying and diagnosing issues, and provides valuable insights for debugging and troubleshooting.

### Graceful Error Handling and Fallback Mechanisms

Design your application to handle errors gracefully and provide fallback mechanisms when possible.
For example, if a service or repository operation fails, consider returning default values or cached data to maintain a functional user experience.
Implement circuit breakers or retry mechanisms to handle temporary failures or network issues.
Provide meaningful error messages to the client, indicating the nature of the error and possible actions to take.
