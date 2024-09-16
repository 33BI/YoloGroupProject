Setup Instructions
1. Add the Folder YoloGroupProject to VScode

2. Navigate to the project folder and install dependencies:
	*cd YoloGroupProject
	*npm install

4. Setup Postman:
	*Import ExBanking.postman_collection.json from the postman folder.
	*Import ExBanking.postman_environment.json from the postman folder.
	*Create a mock server in Postman using the imported collection.
	*Copy the mock server URL and update it in the ExBanking environment under both Initial Value and Current Value.

4.Setup Cypress:
	*npm install cypress --save-dev
	*Update baseUrl in cypress.env.json with the mock server URL.
 
Running the Tests:
	*To Run Cypress Tests Without the GUI:
	*Run npm run cypress:open:cli or npm run html-report.
 
To Open the Cypress GUI:
	*Run npm run cypress:open.
