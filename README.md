# IanBot <img src="https://logos-world.net/wp-content/uploads/2020/12/Discord-Logo.png" width=4% height=4%>
## Description
IanBot is an object oriented discord bot written in JavaScript using a Node.js framework. It responds to text commands (typed in the discord channel feed) and
depending on the command typed and the arguments given, IanBot can get US stock prices for any ticker for any date, retrieve crypto prices for any crypto in any
currency, give you an 8 ball prediction, or even say hello!
## Features
### Commands
_All commands must precede with a '!' in order to be recognized as a command._

* **!crypto [crypto ticker] [currency]** 
  * retrieves current unit price for the given crypto ticker in the given currency. 
  
  _Example_: \
  <img src="https://i.postimg.cc/gwfw11Cv/crypto-screenshot.png" width=17.5% height=17.5%>
  
* **!stock [stock ticker] [date (mm/dd/yyyy)]**
  * retrieves the following information for the given stock ticker on the given date: 
    * unit price pre-market
    * unit price when market opens
    * unit price when market closes
    * unit price post market
    * unit price high
    * unit price low
    * volume (amount of shares)
  
  _Example_: \
  <img src="https://i.postimg.cc/wMCJrszS/stock-screenshot.png" width=30% height=30%>
  
* **!8ball [question]** 
  * responds with 1 of the 20 classic magic 8 ball responses given a question. 
  
  _Example_: \
  <img src="https://i.postimg.cc/066MW9Bk/8ball-screenshot.png" width=17.5% height=17.5%>
  
* **!mood** 
  * responds with a random mood. 
  
  _Example_: \
  <img src="https://i.postimg.cc/gLpx28kj/mood-screenshot.png" width=17.5% height=17.5%>
  
* **!hello** 
  * says hello to you and only you! 
  
  _Example_: \
  <img src="https://i.postimg.cc/Fd3fvDvw/hello-screenshot.png" width=17.5% height=17.5%>
  
* **!help** 
  * responds with a guide on how to use IanBot. 
  
  _Example_: \
  <img src="https://i.postimg.cc/L6mxBnvn/help-screenshot.png" width=65% height=65%>
 
### Error Handling
_Any wrong or bad inputs are properly handled._
