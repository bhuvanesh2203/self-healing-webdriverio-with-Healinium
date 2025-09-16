# self-healing-webdriverio-with-Healinium

Healenium is a  self-healing layer for Selenium/WebDriver tests that automatically detects broken locators and finds replacements, ensuring test stability even when the UI changes.

<img width="1954" height="1092" alt="image" src="https://github.com/user-attachments/assets/cadc2da9-2dd7-4120-b5f6-34309b4db974" />

Healenium Architecture Components

1. HLM Proxy
 * Acts as a middle layer between your WebDriver tests and the browser.
 * Intercepts all Selenium commands to monitor and log element interactions.
 * Sends information about failed locators to the backend for healing.

2. HLM Backend
* Core engine that stores healed locators and historical element interactions.
* Uses machine learning to suggest alternative locators when tests fails.
  
3. Selector Limiter
* Ensures only valid and efficient selectors are used for healing.
* Filters out redundant or unreliable locator suggestions to improve accuracy.

4. PostgreSQL
* Database used by Healenium to persist all element interactions, healing suggestions, and historical data.
* Supports analytics, reporting, and allows the backend to remember successful locators.

Steps to setup the Project:
git clone https://github.com/bhuvanesh2203/self-healing-webdriverio-with-Healinium.git
cd self-healing-webdriverio-with-Healinium
npm install
cd Healinium
docker-compose up -d
This command starts the necessary Healenium services, including the selenium grid,proxy, backend, selector limitator, and PostgreSQL database.

Once the containers are started validate if we are able to access the below services in corresponding ports
1. Selenium grid where our UI test will be triggered - http://localhost:4444/ui/#/
2. Healinium Dashboard -http://localhost:7878/healenium/report/


Now with the above steps the healinium services should be up and running and time to integrate with our JavaScript/Webdriver Framework.

In the wdio config for the selenium grid configuration mention the HLM proxy's port 
services: [],
hostname: '127.0.0.1',
port: 8085, // Healenium proxy
protocol: 'http',

Project Structure:
self-healing-webdriverio-with-Healinium/
├── healenium/              # Healenium-related configurations and scripts
├── test/                   # Test scripts and page objects
│   ├── pageobjects/        # Page Object files for different pages
│   │   ├── page.js         # Base Page class with common methods
│   │   └── login.page.js   # Login page specific selectors and methods
│   └── specs/              # Test spec files
│       └── example.e2e.js # Example end-to-end test using the page objects
├── wdio.conf.js            # WebDriverIO configuration file
├── package.json            # Project metadata and dependencies
├── package-lock.json       # Exact versions of installed dependencies
└── README.md               # Project documentation


Sample demo:

Site used for testing: https://elenastepuro.github.io/test_env/index.html

 All the current locators are defined in `login.page.js`. The method `testAllElements` accesses the getters for multiple elements declared within the class. When the elements on the page change, Healenium automatically kicks in and attempts to heal the broken locators by providing alternate locators based on the data stored in the database when the elements were first accessed.

 Below is the snapshot of the elements that got modifed and being healed by healinium
<img width="2505" height="858" alt="image" src="https://github.com/user-attachments/assets/50fb0bdc-341f-4e79-8fe4-ca00e12cc6be" />




