# Census.gov Income Integration

## Overview

This project is a prototype designed to integrate Census.gov income data into a feature that allows users to compare their personal income against regional averages. It tests a developer’s ability to combine backend API integration with a clean, responsive frontend and robust error handling.

## Project Objectives

- **API Integration:** Fetch real-time regional income data from Census.gov.
- **User Interface:** Display a clear income comparison with visual cues (e.g., a bar chart or percentage ranking).
- **User Experience:** Provide both automatic location detection and manual input as fallback options.
- **Error Handling & Performance:** Gracefully handle API errors and ensure the solution is responsive and scalable.

## Key Focus Areas

1. **Backend Integration**
   - Accurate API calls to Census.gov endpoints.
   - Error handling for API failures and incomplete data.
2. **Frontend Implementation**
   - Responsive and intuitive UI.
   - Data visualization to display income comparisons.
3. **User Experience**
   - Auto-detection of location using the browser’s geolocation API.
   - Manual location input fallback.
4. **Performance**
   - Efficient handling of simultaneous user access through caching and optimized API calls.

## Implementation Approach

### Backend Integration

- **Data Fetching:**  
  We use Axios and Tan Stack Query to perform HTTP GET requests to the Census.gov endpoints. The endpoints are constructed using helper functions (e.g., `censusRoutes.counties` and `censusRoutes.medianIncome`) to maintain consistency. There is a clear sepparation of the api layer and the presentation layer.
- **Error Handling with React Query:**  
  React Query manages API state and error handling. When an API call fails (for example, in the counties fetch), the error is caught and stored as `query.error`. This triggers error notifications via React Toastify.
- **Data Normalization:**  
  Data is normalized so that even if different endpoints return data in various formats, the UI can display a consistent comparison.

### Frontend Implementation

- **Framework & Libraries:**  
  The UI is built with React using functional components:
  - **React Query** for managing server state.
  - **React Hook Form** for form state and validation.
  - **React Toastify** for displaying error notifications.
  - **Radix UI** components for accessible, custom select/dropdown elements.
- **UI/UX Design:**  
  The interface is designed to be simple and responsive:
  - **Location Input:** Offers both auto-detection and manual selection.
  - **Income Visualization:** Displays the user's income relative to the regional median using textual and visual indicators (e.g., a percentage and a basic bar chart).

### Auto-location and Fallbacks

- **Auto-location:**  
  The browser’s geolocation API is used to attempt to automatically detect the user’s location. If successful, the app fetches the corresponding FIPS data and pre-fills the location fields.
- **Manual Input:**  
  If auto-location fails (or if the user chooses), manual selection via dropdowns is available. Error handling is in place to inform the user if data fetching fails.

## Architecture

- **Frontend:**  
  A React-based application using functional components, hooks, and state management libraries.
- **Data Fetching:**  
  Axios handles HTTP requests, and React Query manages caching, re-fetching, and error states.
- **Error Notifications:**  
  Toast notifications (via React Toastify) alert users of issues like API failures.
- **Form Management:**  
  React Hook Form is used to manage user inputs for location and income.

## Key Challenges and Resolutions

- **Complex API Endpoints:**  
  Census.gov endpoints require precise query parameters. We addressed this by centralizing URL construction in helper objects, reducing errors and improving testability.
- **Robust Error Handling:**  
  API failures (e.g., counties data not fetched) were handled using React Query’s built-in error handling. Toast notifications ensure that users receive immediate feedback.
- **Auto-location Reliability:**  
  The implementation uses the browser’s geolocation API with a fallback to manual input. Special error handling ensures that if auto-location fails, users are prompted to manually enter their location.
- **Responsive UI Design:**  
  Careful design and testing ensured the interface works seamlessly on both desktop and mobile devices.

## Trade-offs and Considerations

### Proxy for API Calls

- **Pros:**
  - **Security:** Hides sensitive API keys and credentials.
  - **Rate Limiting:** Allows implementation of rate limiting and caching strategies.
  - **Centralized Error Handling:** Simplifies logging and monitoring of API requests.
- **Cons:**
  - **Increased Complexity:** Adds extra layers to the architecture, potentially delaying development.
  - **Development Time:** For a one-week prototype, direct API calls are faster to implement.
  - **Scope Consideration:** Given the limited scope and prototype nature of this project, direct integration was prioritized.

### Rate Limiting

- **Pros:**
  - Prevents abuse and ensures fair use of the external API.
  - Protects against service downtime or throttling.
- **Cons:**
  - Adds additional overhead to the project.
  - For this prototype, React Query’s caching and built-in refetch controls are sufficient.

### Overall Scope vs. Complexity

- **Focus on Core Functionality:**  
  We prioritized the primary use case—comparing user income to regional averages—over advanced analytics or multi-region comparisons.
- **Trade-off:**  
  This approach ensured a timely delivery while maintaining a high-quality user experience.

## Installation and Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/marcelo-kodaira/home-pathway
   cd home-pathway
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Run the Application:**
   ```bash
   npm start
   ```

## Usage

- Location Input: Auto-detection: The app will attempt to automatically detect your location using your browser’s geolocation API.
- Manual Selection: If auto-detection fails, you can manually select your state and county via the dropdowns.
- Income Comparison: Enter your income and click Compare Income. The app displays your income ranking relative to the regional median, along with a basic visual representation.
- Responsive Design: The UI is optimized for both desktop and mobile experiences.

## Testing

### End-to-End Tests:

Cypress is used to simulate user interactions.
Run the tests using:`

```bash
npm run cypress:open
```

# Project Folder Structure

This project follows a structured architecture that separates concerns into distinct layers: **Presentation**, **Logic**, and **API**. This separation ensures better maintainability, scalability, and reusability.

## Folder Overview

### `src/`

This is the main source directory, containing all the core application files.

#### 📌 `app/`

- Contains the main application entry point (`App.tsx`), styles (`App.css`), and global assets (`assets/`).
- Focuses on initializing the React application and rendering global components.

#### 📌 `components/`

- Houses reusable UI components, including:
  - `ui/`: Contains common UI elements like `Footer.tsx` and `Header.tsx`.
- Part of the **Presentation Layer**, responsible for displaying information.

#### 📌 `config/api/`

- Defines API configurations:
  - `axios.ts`: Manages Axios setup for HTTP requests.
  - `queryClient.ts`: Configures React Query for data fetching and caching.
  - `routes.ts`: Defines API routes.
- Part of the **API Layer**, centralizing API interaction.

#### 📌 `features/`

This directory organizes features into separate modules, aligning with a domain-driven design.

##### 🔹 `features/income/`

- **API Layer**
  - `api/hooks/useMedianIncome.ts`: Manages API interactions using hooks.
  - `api/response/getMedianIncomeResponse.ts`: Defines API response types.
  - `api/income.service.ts`: Encapsulates API calls, ensuring a clean separation from business logic.
- **Logic Layer**
  - `components/IncomeChart/`: Displays processed income data.
  - `components/IncomeResult/`: Shows calculated results.
- Ensures a clean separation between data fetching, processing, and presentation.

##### 🔹 `features/location/`

- **API Layer**
  - `api/hooks/`: Contains hooks for fetching location data (`useAutoLocation.ts`, `useCounties.ts`).
  - `api/response/`: Structures API response types.
  - `api/location.service.ts`: Encapsulates location-related API logic.
- **Logic Layer**
  - Handles coordinate transformations and location-based computations.

#### 📌 `pages/`

- Contains top-level views that integrate multiple components.
- Represents the **Presentation Layer**, orchestrating UI elements.

#### 📌 `utils/`

- Provides utility functions shared across multiple modules.
- Helps avoid code duplication and centralizes helper methods.

## Benefits of This Architecture

- ✅ **Separation of Concerns**: Clearly divides **Presentation**, **Logic**, and **API** layers.
- ✅ **Scalability**: Allows easy expansion of features without impacting other parts of the project.
- ✅ **Reusability**: Components, hooks, and services can be reused across different features.
- ✅ **Maintainability**: Easier debugging and updates with a modular structure.
- ✅ **Testability**: Business logic is isolated, making it easier to write unit tests.

## Infrastructure

This project is hosted on Vercel, but provides a Terraform (TF) to manage its infrastructure on AWS. The deployment setup includes:

Amazon S3: Used to store and serve the static files of the application.

Amazon CloudFront: Configured as a CDN to enhance performance and reduce latency.

Integrated Deployment Pipeline: A CI/CD pipeline is set up to automate deployments to AWS, ensuring smooth and efficient updates.
