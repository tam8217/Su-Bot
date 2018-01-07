/*
  A ping pong bot, whenever you send "ping", it replies "pong".
*/

// Import the discord.js module
const Discord = require('discord.js');

//Using file systems
const fs = require('fs');

// Create an instance of a Discord client
const client = new Discord.Client();

// The token of your bot - https://discordapp.com/developers/applications/me
const token = 'Mzk5MDY0NzE0NzU3NTM3Nzky.DTHtUQ.Z9GKkDoUAiK3pQea7EkIRcWtKNc';

//Creating a prefix to use
const prefix = 'su';

//Info pages for everyone
let yuiInfo;
let yuiSearch;
let moaInfo;
let moaSearch;
let suInfo;
let suSearch;

// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted
client.on('ready', () => {
  console.log('I am ready!');

  yuiInfo = fs.readFileSync('BabyMetalInfo/YuiInfo.txt', {"encoding": "utf-8"});
  moaInfo = fs.readFileSync('BabyMetalInfo/MoaInfo.txt', {"encoding": "utf-8"});
  suInfo = fs.readFileSync('BabyMetalInfo/SuInfo.txt', {"encoding": "utf-8"});

  //console.log(yuiInfo.search('Birthdate'));
  //console.log(suInfo.indexOf("   "));

  //Creating searchable versions of all the info files
  yuiSearch = yuiInfo.toLowerCase();
  moaSearch = moaInfo.toLowerCase();
  suSearch = suInfo.toLowerCase();

  //console.log(yuiInfo);
  //Setting the initial game for the bot
  client.user.setGame("with the Fox God | su help");
});

// Create an event listener for messages
client.on('message', message => {
  //A generic hi message
  if(message.content.toLowerCase() == 'hi su-metal')
  {
    message.channel.send("こんにちは " + message.author + "!");
  }

  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(prefix) !== 0) return;

  //Preventing the bot from looping on itself
  if(message.author.bot) return;

  /*Taken from the tutorial for The Perfect Lil Bot on Github https://gist.github.com/eslachance/3349734a98d30011bb202f47342601d3*/
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  //console.log(args[1]);

  //Running out a help command
  if(command  == "help")
  {
    message.channel.send("Su-Bot is a work in progress\nTo unlock my full potential, please let me manage messages! \nCurrent commands: help, roll, say \nUse the prefix 'su' to activate\nSay 'Hi Su-metal' for me to talk to you!\nShe has very few commands, but more are coming!");
  }

  if(command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 

    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }
  
 
  //Rolling a standard d20
  if(command == "roll")
  {
    //Generating a random number between 1 and 20
    let ranNum = Math.floor((Math.random() * 20) +1);

    //Deleting the previous message
    message.delete(0).catch(O_o=>{}); 
    //message.delete();

    //Sending out the random number
    message.channel.send(ranNum);
  }

  //Creating a tool for retrieving info
  if(command == 'info')
  {

    if(args[0] == null)
    {
      message.channel.send("Who're you talking about?\nPlease use 'info yui', 'info moa', or 'info su'");
    }

    else if(args[0] != null)
    {
      if(args[0].toLowerCase() == 'yui')
      {
        if(args[1] == null)
        {
          //Sending the info as a message
          message.channel.send(yuiInfo);
        }

        /*
        //Quickly getting specific info
        //Age search
        else if(args[1].toLowerCase() == "age")
        {
          //Getting the place where the age begins
          let wordNum = yuiInfo.indexOf("Birthdate");

          //Getting a string from the text file
          let dateString = yuiInfo.substring(wordNum, wordNum + 29);
          
          message.channel.send(dateString);
          
          let ts = textSearch(yuiInfo, "Birthdate", 29);

          message.channel.send(ts);
        }

        //Height search
        else if(args[1].toLowerCase() == "height")
        {
          /*
          //Getting the place where the age begins
          let wordNum = yuiInfo.indexOf("Height");

          //Getting a string from the text file
          let heightString = yuiInfo.substring(wordNum, wordNum + 20);
          
          message.channel.send(heightString);
          

          let strongBoi = textSearch(yuiInfo, "Height", 20);

          message.channel.send(strongBoi);
        }

        else
        {
          message.channel.send("That's not a valid search!\nYou can currently search for: Age, Height");
        }
        */
        else 
        {
          let searchText = Search(yuiSearch, yuiInfo, args[1]);

          message.channel.send(searchText);
        }
      }

      if(args[0].toLowerCase() == 'moa')
      {
        if(args[1] == null)
        {
          //Sending the info as a message
          message.channel.send(moaInfo);
        }

        /*
        else if(args[1].toLowerCase() == "age")
        {
          //Getting the place where the age begins
          let wordNum = moaInfo.indexOf("Birthdate");

          //Getting a string from the text file
          let dateString = moaInfo.substring(wordNum, wordNum + 29);
          
          message.channel.send(dateString);
        }
        */
        else
        {
          let searchText = Search(moaSearch, moaInfo, args[1]);

          message.channel.send(searchText);
          //Getting the initial spot of the word
          /*let initialValue = moaSearch.indexOf(args[1].toLowerCase());

          //If the word exists in the page, do further searches
          if(initialValue != -1)
          {
            //Finding the end of the line for the info
            let secondValue = moaSearch.indexOf("   ", initialValue);

            //Getting the line
            let strong = moaInfo.substring(initialValue, secondValue);
            
            //Sending the line
            message.channel.send(strong);
          }

          //If the search parameter doesn't exist, give an error message
          else
          {
            message.channel.send("That isn't a valid search term! Please try something else.");
          }
          */
        }
      }

      if(args[0].toLowerCase() == 'su')
      {
        if(args[1] == null)
        {
          //Sending the info as a message
          message.channel.send(suInfo);
        }

        /*
        else if(args[1].toLowerCase() == "age")
        {
          //Getting the place where the age begins
          let wordNum = suInfo.indexOf("Birthdate");

          //Getting a string from the text file
          let dateString = suInfo.substring(wordNum, wordNum + 34);
          
          message.channel.send(dateString);
        }
        */
        //Searching for phrases which someone might put in
        else
        {
          //Getting the initial spot of the word
          let initialValue = suSearch.indexOf(args[1].toLowerCase());

          //If the word exists in the page, do further searches
          if(initialValue != -1)
          {
            //Finding the end of the line for the info
            let secondValue = suSearch.indexOf("   ", initialValue);

            //Getting the line
            let strong = suInfo.substring(initialValue, secondValue);
            
            //Sending the line
            message.channel.send(strong);
          }

          //If the search parameter doesn't exist, give an error message
          else
          {
            message.channel.send("That isn't a valid search term! Please try something else.");
          }
        }
      }
    }
  }
});

//Testing channel creation events
client.on('channelCreate', channel => {
  console.log("Channel made");
})


// Log our bot in
client.login(token);


//Creating a function which does a search of a specified variable, looks for a term, and gets a substring of specified length
function textSearch(pageSearch, termSearch, spaceSearch)
{
  //Getting the place where the age begins
  let wordNum = pageSearch.indexOf(termSearch);

  //Getting a string from the text file
  let dateString = pageSearch.substring(wordNum, wordNum + spaceSearch);
  return dateString;
  //message.channel.send(dateString);
}

//Creating a function to search for whatever term the user puts in, and pulling it out of the info page if it exists
function Search(pageSearch, pagePull, termSearch)
{
  //Getting the initial spot of the word
  let initialValue = pageSearch.indexOf(termSearch.toLowerCase());

  //If the word exists in the page, do further searches
  if(initialValue != -1)
  {
    //Finding the end of the line for the info
    let secondValue = pageSearch.indexOf("   ", initialValue);

    //Getting the line
    let strong = pagePull.substring(initialValue, secondValue);
    
    //Sending the line
    //message.channel.send(strong);
    return strong;
  }

  //If the search parameter doesn't exist, give an error message
  else
  {
    //message.channel.send("That isn't a valid search term! Please try something else.");
    return "That isn't a valid search term! Please try something else.";
  }
}