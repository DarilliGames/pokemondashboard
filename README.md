## Data Visualisation

###  About

#### Author

Stephen Moody

Submittion for Project 2 for Code Institute

Live Project Available [here](https://pokemondashboard.herokuapp.com/) or at:

https://pokemondashboard.herokuapp.com/

Git-Hub Available [here](https://github.com/DarilliGames/pokemondashboard) or at:

https://github.com/DarilliGames/pokemondashboard

#### Project Contents


| Folder | Condition | Comments |
|-------|----|--------|
| appy.py | Working | The base file the for project including. Routing and main functions. |
| templates | Working| The base HTML Files are here, including the main page, 404 error page and also a small little addition which, just for a little fun. |
| pokegraph.js | Working|  Provides functionality to generate and manipulate database and represent them visually using DC, D3 and Corssfilter |
| pokechecker.js | Working | This is a small additional page that will take a person's information and generate information on Pokemon Prefrenaces.  It is just a little bit of fun |
| PokemonOne.csv | Working | This file is just a copy of the Database Used on the website.  The Actual Database being called when processing the charts is MongoDB based |

#### Project Insight 

While tasked with building a Visual Dashboard a number of different areas came to mind including building a financially or revenue based database.  I found a trend while researching similar dashboards that a large focus was placed on numerical data and I decided to do something different.  I focused more on finding an attribute based database with some numerical values as a good balance to manipulate data in a more balanced way.

Pokemon as franchise is the largest grossing media franchise[^1], over taking media giants like that of the Star Wars franchise[^2], and I decided to focus my efforts on that.

#### Features

##### Pokemon Database

Large Pokemon Database of 800 entries are held within a MongoDB Database.  The information held is their Pokedex Entry Number, Name, Primary Type, Secondary Type, Total Statistics including indiviual statistics (Health, Attack, Defence, Special Attack, Special Defence and Speed), in addition it also holds the Generation the Pokemon was introduced to the series and weither or not it is a member of the "Legendary Pokemon" group.

##### Type Selecting

Each Pokemon has a Primary and Secondary Type, within the Pokemon franchise - it is common that a character will collect and train one perticular type of Pokemon.  Using the Type Selecters, it is possible to filter between types to display how many of a perticular type there is and using tools like the scatter plot, see how the Pokemon Perform by their statistics against eachother.

#####  The Scatter Plot

Pokemon will usually have one or two statistics which are higher than their average.  Depending on the distribution of their statistics, the use of the Pokemon can be dettermined.  In competitive use, teams are usually built with some Pokemon good at individual areas and some Pokemon with less fluctuating statistics as they can be used for a variety of reasons.

The X-Axis on the scatter plot is a Pokemon's Total Statistics and the Y-Axis is the Highest Statistics.  Building a team that can dramatically deviate from the X:Y trend will usually result in an unbalanced competitive team.

#### Website Successes

The goal for the website is to represent data visually and dynamically via filtering.

| Goal | Pass | Notes |
|-----|-----|-----|
| Accessing Database | Yes | The data is held on mlab and has secure, easy assess to the MongoDB database. Additional Pokmeon can be added easily at any time and we are able to access this database at will. |
| Representing Data | Yes | Through the tools of DC and D3 we are able to use JavaScript to quickly set up a number of Graphs and displays.  It is is the crossfiltering where the graphs come alive.  Selecting sections on one graph will adjust the results on others. |


#### Difficulties Present

##### Difficulty of Use

DC, D3 and CrossFilter are incredibly powerful tools.  They can be used to rapidly generate simple charts which will be reactive but after the basics are completed their is a steep learning curve involved across the tools.

I would have prefered to develop more additional dynamic charts but the time involved did not allow me to study the matter further.

##### Loading Errors

I was unsure if the issue is one of the tools, Cloud9, MLab, etc. - but on a larger number of occassions the page has failed to load.  While testing the website, these failures added additional time.  This time was not only spent on restarting the project, but also through time spend on attempting to debug and prevent it from failing in the future.

Since uploading to Heroku, the issue has stopped, so I presume that the fault likely somehow involved with Cloud9.

#### Bug Tracker

##### Known Bugs

1) Development Bug - Scripts failing to generate or populate graphs. Not found on Deployed versions.
2) Scatter Plot Text - Hovering over an individual dot on the scatter Plot will not tell you about the Pokemon all the time.  I believe it is due to the "Area Selecting" ability is trying to override hovering.

##### Resolved Bugs

1) Bar Chart Colours - Error: Bar charts received incorrect colours through color selecter. Solved.
2) Error 404 page Layout - Error: BootStrap Continues to fail to provide layout.  Solved - Incorrect Version of script used.

[^1]: http://www.pokemon.co.jp/corporate/en/services/
[^2]: http://fortune.com/2015/12/24/star-wars-value-worth/

