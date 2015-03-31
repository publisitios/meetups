## Meetup APP




### accessible via public IP address :

### When a developer logs in:

 Date and topic of upcoming meetup will be displayed

 ```bash
 Hello ! Welcome to the meetup app !

 The next meetup is scheduled on : (Month / Day / Year)

 The topic covered will be : (Topic entered)

 There are currently ## developers attending.

 Type 'RSVP' to attend this event.  


 or 'exit' to close this connection

 ```

 If the client types RSVP then he will be prompted for his username and email

 ```bash
 To RSVP to this event please provide the following info:

 please enter your name:

 Please enter your email address:

 Awesome (persons name) ! you are now registered.

 ```
 Developers won't be able to RSVP without providing those things.


### Admin Access

These commands will require a password to be provided .

#### See list of developers attending

The admin user will be able to telnet to the app in order to get a current list of developers who are attending.

```bash
admin list

please provide your password:

the list of developers is:

  - mame 1 , email 1
  - name 2 , email 2

```

#### Set meetup

The admin user will be able to set the date and topic for the next meetup by entering the following command.

```bash
schedule 'password'

please provide your password:

what is the date of the next meetup:

what is the topic of the next meetup:

meetup created!

```
#### Clear meetup

When the meetup has passed the administrator will be able to clear out the RSVPs so the app is ready for the next meetup.

```bash
clear 'password'

meetup cleared!
```

### authentication

Authentication will take place by setting a fixed value to a global variable hardcoded in the sourcecode. The admin will be provided wit the password and

```javascript

var password = monkey

```
### data storage

data will be stored in two JSON text files.

The upcoming meetup will be stored as an object in `./meetup.json`.

The data structure will consist of two key / value pairs.
```javascript
{
event date : "month / day / year" ,
event topic : "Tech Hipsters unite!"
}
```

The list of atendees will be stored is a file named `./hipsters.json` As an array of objects. Each object will have the following data structure:

```javascript

var atendees = [
  {
  name : "hipster's name",
  email : "hipster's email"
  },
  {
  name : "hipster2's name",
  email : "hipster2's email"
  }
]
```

### Required Node Libraries

  - net (creates TCP/IP client-server)
  - fs (allows reading and writing to JSON file)
