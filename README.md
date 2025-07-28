# Leaderboard Frontend

A modern leaderboard app built with Vite, React, TypeScript, Apollo Client (GraphQL), Redux Toolkit, and Tailwind CSS.

## Features
- Vite + React 19 + TypeScript
- Apollo Client for GraphQL queries, mutations, and subscriptions
- Redux Toolkit for state management
- Tailwind CSS for styling
- GraphQL Codegen for type safety
- Comprehensive unit/integration tests:
  - Vitest (test runner)
  - React Testing Library (UI testing)
  - @testing-library/jest-dom (custom matchers)
  - @testing-library/user-event (user interaction)
  - Redux Mock Store (Redux state testing)

## Getting Started

### Prerequisites
- Node.js (v22.12.0 recommended)
- Yarn or npm

### Installation
```bash
git clone https://github.com/darshanvd/leaderboard-frontend.git
cd leaderboard-frontend
yarn install # or npm install
```

### Environment Variables
Create a `.env` at root directory file for development:
```
VITE_GRAPHQL_HTTP=http://localhost:8080/graphql
VITE_GRAPHQL_WS=ws://localhost:8080/graphql
```
For production, use `.env.production`:
```
VITE_GRAPHQL_HTTP=https://your-production-domain.com/graphql
VITE_GRAPHQL_WS=wss://your-production-domain.com/graphql
```

### Running the App
```bash
yarn dev # or npm run dev
```
The app will be available at http://localhost:5173

### Building for Production
```bash
yarn build # or npm run build
```
Output will be in the `dist/` folder.

### Running Tests
```bash
yarn test # or npm run test
```

## Project Structure

```
├── public/           # Static assets
├── src/              # Application source code
│   ├── component/    # React components (UI, common, tests)
│   ├── features/     # Redux slices and logic
│   ├── gql/          # GraphQL codegen output/types
│   ├── graqhql/      # GraphQL queries, mutations, subscriptions
│   ├── utils/        # Utility functions
│   └── ...           # App entry, store, config, etc.
├── .env, .env.production  # Environment configs
├── package.json           # Project metadata and scripts
├── vite.config.ts         # Vite configuration
└── ...                    # Other config and docs
```

## Deployment

### Deploying to AWS S3 + CloudFront + Route 53 (Custom Domain & HTTPS)

1. **Build the App**
   ```bash
   yarn build # or npm run build
   ```
   The production build will be in the `dist/` folder.

2. **Upload to S3**
   - Create an S3 bucket (e.g., `leaderboard-frontend.darshanvachhani.store`) with public access blocked (use CloudFront for public access).
   - Enable static website hosting (optional, but not required if using CloudFront).
   - Upload the contents of the `dist/` folder to the S3 bucket.

3. **Set Up CloudFront**
   - Create a CloudFront distribution with the S3 bucket as the origin.
   - Set the default root object to `index.html`.
   - (Recommended) Enable OAI/OAC for secure S3 access.
   - Configure error pages to serve `404.html` for 404/403 errors (for SPA routing).

4. **Set Up Route 53 Hosted Zone**
   - Create a hosted zone for `darshanvachhani.store` if not already present.
   - Add an A/AAAA record (alias) for `leaderboard-frontend.darshanvachhani.store` pointing to the CloudFront distribution.

5. **Enable HTTPS (SSL/TLS)**
   - Request an SSL certificate for `leaderboard-frontend.darshanvachhani.store` in AWS Certificate Manager (ACM) in the us-east-1 region.
   - Attach the certificate to your CloudFront distribution.

6. **Access Your App**
   - Visit https://leaderboard-frontend.darshanvachhani.store/ to see your deployed app.

**Tips: and Improvments**
- Invalidate the CloudFront cache after each deployment for instant updates.
- Make sure your backend CORS allows requests from your frontend domain.
- For more automation, consider using the AWS CLI or CI/CD pipelines.

## Notes
- Apollo Client is configured to send cookies with all requests (`credentials: 'include'`).
- For subscriptions, cookies are sent automatically if your domain, protocol, and cookie settings are correct.
- Make sure your backend CORS and cookie settings allow credentials and set the correct origin.

## License
MIT
