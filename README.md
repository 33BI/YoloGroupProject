# YoloGroupProject

A comprehensive banking application with automated testing using Cypress and API testing with Postman.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- VS Code (recommended)
- Postman

### Installation

1. **Clone and Open the Project**
   ```bash
   git clone <repository-url>
   cd YoloGroupProject
   ```
   
2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Install Cypress** (if not already included)
   ```bash
   npm install cypress --save-dev
   ```

## 🛠️ Setup Guide

### Postman Configuration

1. **Import Collections and Environment**
   - Open Postman
   - Import `postman/ExBanking.postman_collection.json`
   - Import `postman/ExBanking.postman_environment.json`

2. **Create Mock Server**
   - In Postman, create a mock server using the imported collection
   - Copy the generated mock server URL

3. **Update Environment**
   - Go to your ExBanking environment in Postman
   - Update the mock server URL in both:
     - Initial Value
     - Current Value

### Cypress Configuration

1. **Update Base URL**
   - Open `cypress.env.json`
   - Update the `baseUrl` with your mock server URL
   ```json
   {
     "baseUrl": "https://your-mock-server-url.com"
   }
   ```

## 🧪 Running Tests

### Cypress Tests

#### GUI Mode (Interactive)
```bash
npm run cypress:open
```
This opens the Cypress Test Runner with a graphical interface where you can:
- Select and run individual tests
- Watch tests run in real-time
- Debug test failures

#### Headless Mode (CI/CD)
```bash
npm run cypress:open:cli
```
or
```bash
npm run html-report
```
These commands run tests without the GUI, perfect for:
- Continuous Integration
- Automated testing pipelines
- Quick test execution

## 📁 Project Structure

```
YoloGroupProject/
├── cypress/
│   ├── e2e/
│   ├── fixtures/
│   └── support/
├── postman/
│   ├── ExBanking.postman_collection.json
│   └── ExBanking.postman_environment.json
├── cypress.env.json
├── package.json
└── README.md
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run cypress:open` | Opens Cypress GUI |
| `npm run cypress:open:cli` | Runs Cypress tests headlessly |
| `npm run html-report` | Generates HTML test report |

## 📋 Development Workflow

1. Set up your development environment following the setup guide
2. Make your code changes
3. Run tests locally using `npm run cypress:open`
4. Fix any failing tests
5. Run headless tests with `npm run cypress:open:cli` before committing
6. Submit your pull request

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Notes

- Ensure your mock server is running before executing Cypress tests
- Update the mock server URL in both Postman environment and `cypress.env.json`
- For any issues with setup, check that all dependencies are properly installed

## 🐛 Troubleshooting

### Common Issues

**Mock Server Connection Failed**
- Verify the mock server URL is correctly configured
- Ensure the mock server is active in Postman

**Cypress Tests Not Running**
- Check that `baseUrl` in `cypress.env.json` matches your mock server
- Verify all npm dependencies are installed

**Import Issues in Postman**
- Ensure you're importing both the collection AND environment files
- Check that file paths are correct
