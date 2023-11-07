const express = require('express');
const app = express();
const port = 3090; 
const axios = require('axios');
const http = require('https');
const fs = require('fs'); 
const { exec } = require('child_process');
const readline = require('readline'); 

// Load API keys from the JSON file
let apiKeys = {};
const jsonFilePath = './json_files/API_keys.json';

function getKeysFromJSONFile(filePath) {
    try {
        const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        return Object.keys(jsonData);
    } catch (error) {
        console.error(`Error reading JSON file: ${error.message}`);
        return [];
    }
}

const keys = getKeysFromJSONFile(jsonFilePath);

if (fs.existsSync(jsonFilePath)) {
    apiKeys = require(jsonFilePath);
}

// function to fill the api key file json
function areAPIKeysEmpty(keys) {
    return Object.values(keys).some((value) => value === '');
}

function createAPIKeysFile() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const keys = ["rapidAPIKey", "whoisKey", "hunterioKey"];
    const userInput = {};

    function askForKey(index) {
        if (index < keys.length) {
            rl.question(`Enter your ${keys[index]}: `, (answer) => {
                userInput[keys[index]] = answer;
                askForKey(index + 1);
            });
        } else {
            // Save the user input to the JSON file
            fs.writeFileSync(jsonFilePath, JSON.stringify(userInput, null, 4));
            console.log('Your API keys are:');
            console.log(userInput);
            apiKeys = userInput;
            rl.close();
        }
    }

    askForKey(0);
}

if (fs.existsSync(jsonFilePath) && areAPIKeysEmpty(apiKeys)) {
    console.log('API keys are empty. Please enter your API keys:');
    createAPIKeysFile();
} else {
    // Use the existing API keys
    console.log('Using existing API keys:');
    console.log(apiKeys);
}

// Routes definition

// GET request for retrieving keys
app.get('/get-keys-list', (req, res) => {
    const keys = getKeysFromJSONFile(jsonFilePath);

    if (keys.length > 0) {
        res.json({ keys });
    } else {
        res.status(404).send('No keys found in the JSON file.');
    }
});


// route for modifying API keys
app.post('/modify-api-keys', (req, res) => {
    const updatedKeys = req.body;
    if (!updatedKeys) {
        return res.status(400).send('Please provide a JSON body with updated API keys.');
    }

    Object.keys(updatedKeys).forEach((key) => {
        if (apiKeys.hasOwnProperty(key)) {
            apiKeys[key] = updatedKeys[key];
        }
    });

    // Save the updated keys to the JSON file
    fs.writeFileSync(jsonFilePath, JSON.stringify(apiKeys, null, 4));

    res.send('API keys have been updated successfully.');
});



// Get report for specific json -- to be implemented later
app.get('/get-report', (req, res) => {
    // Implement report retrieval logic here
    res.json({ name: 'John Doe', email: 'johndoe@example.com' });
});


// -Netlas- FREE //

app.get('/run-netlas-api', (req, res) => {
    const userDomainName = req.query.userDomainName; // Retrieve the 'userDomainName' from the query parameters

    if (!userDomainName) {
        return res.status(400).send('Please provide a valid "userDomainName" in the query parameters.');
    }

    const { exec } = require('child_process');

    // Execute the Python script with the userDomainName as a command-line argument
    exec(`python python/netlas_api.py ${userDomainName}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send('Internal Server Error');
        }

        // Handle the output from the Python script as needed
        const scriptOutput = stdout.trim();
        res.send(`Script executed successfully. Output: ${scriptOutput}`);
    });
});



// -Reverse IMG search- 50 per month // 

const bodyParser = require('body-parser');

// Use body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/run-reverse-image-search', (req, res) => {
    const userUrl = req.query.url;

    if (!userUrl) {
        return res.status(400).send('Please provide a valid "url" query parameter.');
    }

    exec(`python python/reverse_image_search.py ${userUrl}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Add any additional logic or response handling if needed

        res.send('Command executed successfully');
    });
});


// - Whoisv2 - 500 credits //

app.get('/run-whois-api', (req, res) => {
    const userDomainName = req.query.domainName;

    if (!userDomainName) {
        return res.status(400).send('Please provide a valid "domainName" in the query parameters.');
    }

    exec(`python python/whois_api.py ${userDomainName}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.send('Command executed successfully');
    });
});

// - Routes for test - //

// A route to run the Python script
app.get('/run-test-api', (req, res) => {
    // Execute the Python script using child_process
    exec('python apitest.py', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Modify the script output to remove "Response content:"
        const scriptOutput = stdout.replace('Response content:', '').trim();

        // Save the modified output to a JSON file
        const fileName = 'apiTest_result.txt';

        // Write the output to the JSON file
        fs.writeFile(fileName, scriptOutput, (writeError) => {
            if (writeError) {
                console.error(`Error writing to ${fileName}: ${writeError.message}`);
                res.status(500).send('Error saving the output to a file');
            } else {
                console.log(`Script output: ${scriptOutput}`);
                console.log(`Results saved to ${fileName}`);
                res.send('Script executed successfully, and results saved to ' + fileName);
            }
        });
    });
});

// function to list all the routes //
function listRoutes() {
    const routes = [];
    app._router.stack.forEach((middleware) => {
        if (middleware.route) {
            routes.push(middleware.route.path);
        }
    });
    return routes;
}

// running the application
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log('Available routes:');
    console.log(listRoutes());
});