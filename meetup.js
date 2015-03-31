// The Hipster Tech Meetup App
//Xavier Fernandez
// WDI March 31st 2015

//load required libraries
var fs = require('fs');
var net = require('net');

// data storage in JSON text 
var MEETUP_FILE = './meetup.json';
var HIPSTER_FILE = './hipsters.json';

// set the super secret password
var admin_pw = "juicer"

// Temporary object for storing contact data
var newHipster = {
    hipsterName: null,
    email: null
};

// Temporary object for storing meetup data
var newMeetup = {
    date: null,
    topic: null,
};

// start the telnet server
var server = net.createServer();
server.on('connection', function(client) { //'connection' listener
    console.log('client connected');
    client.setEncoding('utf8');
    // re-load the json files
    var meetup = JSON.parse(fs.readFileSync(MEETUP_FILE, 'utf8'));
    var hipsters = JSON.parse(fs.readFileSync(HIPSTER_FILE, 'utf8'));

    // Functions 
    function rsvp(data) {
        fs.writeFileSync(HIPSTER_FILE, JSON.stringify(data), 'utf8');
    }

    // Functions 
    function schedule(data) {
        fs.writeFileSync(MEETUP_FILE, JSON.stringify(data), 'utf8');
    }

    // calculate number of hipsters
    if (hipsters.length === undefined) {
        atendees = 0;
    } else {
        atendees = hipsters.length
    }

    client.write('\n\nHello ! Welcome to the hipster tech meetup app !\n\n');
    client.write("The next meetup is scheduled on : " + meetup.date + "\n");
    client.write("The topic covered will be : " + meetup.topic + "\n");
    client.write("There are currently " + atendees + " developers attending.\n\n");
    client.write(" -Type 'rsvp'|`your name`|`your@email.com` to register for this event.\n");

    client.on('data', function(stringFromClient) {

        // sanitize the user's input
        var str1 = stringFromClient.trim(); // remove nasty characters from the end of the file
        var input = str1.toLowerCase(); // convert to lower case to make more user friendly

        console.log("received input: " + input);
        // console.log(str1); //debuging
        var inputArray = input.split("|"); //convert input into an array  
        // console.log(inputArray); //debuging
        var command = inputArray[0];
        var password = inputArray[1];

        // Run Main Application Controller Switch 
        switch (command) {

            case "rsvp":
                newHipster.hipsterName = inputArray[1];
                newHipster.email = inputArray[2];
                console.log(newHipster);
                hipsters.push(newHipster);
                rsvp(hipsters);
                client.write("\nYour RSVP is confirmed for " + newHipster.hipsterName + ". See you there!\n");
                client.write("\nThe next meetup is scheduled on : " + meetup.date + "\n");
                client.write("The topic covered will be : " + meetup.topic + "\n");
                client.write("There are currently " + atendees + " developers attending.\n\n");
                client.write("\nGoodbye! \n");
                client.end();
                break;


            case "list":
                if (password === admin_pw) {
                    if (hipsters.length > 0) {
                        hipsters.forEach(function(entry) {
                            client.write("- " + entry.hipsterName + " / " + entry.email + "\n");
                        });
                    } else {
                        client.write("\nNo hipsters...\n");
                    }
                } else {
                    client.write("\nsorry wrong password!\n");
                }
                client.write("\n\nGoodbye! \n");
                client.end();
                break;

            case "clear":
                if (password === admin_pw) {
                    if (hipsters.length > 0) {
                        rsvp([]);
                        client.write("\nAll RSVP data has been cleared\n");
                        console.log("\nAll RSVP data has been cleared");
                    } else if (hipsters.length === 0) {
                        client.write("\nNo hipsters...\n");
                    }
                } else {
                    client.write("\nSorry wrong password!\n");
                }
                client.write("\n\nGoodbye! \n");
                client.end();
                break;

            case "schedule":
                if (password === admin_pw) {
                    newMeetup.date = inputArray[2];
                    newMeetup.topic = inputArray[3];
                    console.log(newMeetup);
                    schedule(newMeetup);
                    client.write("\nNew Meetup Scheduled! \n");
                    client.write("\nGoodbye! \n");
                    client.end();
                } else {
                    client.write("\nsorry wrong password!\n");
                    client.write("\n\nGoodbye! \n");
                    client.end();
                }

                break;

            default:
                client.write("\nIncorrect command. Try `rsvp` 'your name' 'your email' to register for the meetup\n");
        } // end switch

    }); // end client.on
}); //end server.on

server.listen(8124, function() { //'listening' listener
    console.log('meetup server is running');
});