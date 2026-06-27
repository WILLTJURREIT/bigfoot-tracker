# Bigfoot Tracker - Module 3 - Milestone 2

The Plan:   Create a client side leaflet app that will allow the user to see where the sightings are accross north america.  I will use a public ArcGIS GeoJSON dataset, with user filters and REST GET endpoints.

## The project must include:

1. At least **three** **REST GET** calls to distinct endpoints of a single no-authorization API (i.e. different urls, but all three should belong to the same API)

   API Explorer - Query URL:
   ALL: https://services2.arcgis.com/sJvSsHKKEOKRemAr/arcgis/rest/services/Bigfoot Locations/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json

   I will use this API for the 3 calls to destinct endpoints

   * **STATE_NAME** - this query returns which state the sighting was from:
     https://services2.arcgis.com/sJvSsHKKEOKRemAr/arcgis/rest/services/BigfootLocations/FeatureServer/0/query?where=1%3D1&outFields=STATE_NAME&outSR=4326&f=json
   * **Year** - This query returns the year of the sighting:
     https://services2.arcgis.com/sJvSsHKKEOKRemAr/arcgis/rest/services/Bigfoot Locations/FeatureServer/0/query?where=1%3D1&outFields=Year&outSR=4326&f=json
   * **Description** - This query returns the description of the sighting, which is  ashort line of text.
     https://services2.arcgis.com/sJvSsHKKEOKRemAr/arcgis/rest/services/Bigfoot Locations/FeatureServer/0/query?where=1%3D1&outFields=descriptio&outSR=4326&f=json
2. Each endpoint must return JSON data
3. A map provided by Leaflet.js with customization appropriate to your app
4. Map tiles provided by OpenStreetMap, or similar
5. At least two opportunities for user input, which should correspond to at least two of the distinct API calls.

## The Plan:

* I would like to use the codes from the earthquake demo in Module 3 - week 8 - Earthquake visualization application with Leaflet.js and D3.js
* The reason I would like to use this demo is because it was recommended by my instructor as an option, and I would need to provide acknowledgement of this. I feel currently this is my best option for this assignment for production and efficiency.
* I can re use some of the code from the earthquake app, and then modify it to create my bigfoot app. Thist still will take knowledge and effort to complete and understand, so I do beleive it will still be a solid learning experience for me.

### App stucture:

Files and folders:

bigfoot-tracker/
           - index.html (Main page)
           - styles.css (styles for the map and layout)
           - app.js (For the main logic of the app)
           - server.js (I think this is for running local host for testing purposes?)

### The Earthquake App:

The reason this is a good choice for me is because I have never built an app like this before. By studying the demo I can create multiple files and populate them with similar code, and then adapt and modify the code to create the  bigfoot app. The Demo offers a step-by-step guide where you will learn how to build an interactive earthquake visualization application using the Fetch API, Leaflet.js for mapping, and D3.js for data visualization. It explains how to create a fully functional web application that displays real-time earthquake data. This is exactly what I would nee dto meet the requirements of this assignment.

### Resources:

* I needed to remember how to use the async function:  https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
* Code to find a marker and how to hook up to the app: https://leafletjs.com/examples/quick-start/
* I was having difficulty with understanding how URLSearchParams() built in function works and why it was needed, but after looking at the https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams I learned that it’s a built-in JavaScript function that builds and encodes URL query strings, preventing formatting errors like extra question marks or incorrect parameter joins.
* https://www.w3schools.com/jsref/jsref_parseint.asp
* https://github.com/Leaflet/Leaflet.fullscreen

### Progress:

1. I made the files and folder.
2. I added the html code to make a basic skeleton of the page, and connected the styles.css, and app.js.
3. Prepare the leaflet map, and add openStreetMap tiles to app.js
4. Added style height for the map in the css and this enabled me to see the map now.
5. Added API connection accessing all data ( Tried only one STATE_NAME it did not work)
6. Added  a circle and popup with data present succesfully to the map, only one to test that I was able to get it working.
7. Add foreach loop instead of a single sighting to map, i can use the forEach to run through the dataset, and I beleive this will print all locations as if its going through an array.
8. I added a drop down menu that allows the user to choose from different states, but adding to the html, and styles to style this.
9. Centered the map view to the continental United States for better initial visibility.
10. Added all usa states to the dropdown filter so users can select any state.
11. Added console log tracking for the total sightings loaded, which helped confirm the API’s 2000 record limit.
12. Added dropdown for years, but decided to swap to decades to reduce code.
13. Added 2 additional endpoints, and refactored, by using helper function.
14. Added icon for the title tag at top of page.
15. added comments to structure and organize the files better.
16. Used a plugin from https://github.com/Leaflet/Leaflet.fullscreen to add a full screen option to the bigfoot app.

### Learnings and steps: (I am learning my workflows still)

1. I first used the "basic Leaflet map" example to understand how to make a basic map, but I will want to add my own styles to this so I also added a link to my own style sheet.
2. The example has script in it, but I think I would rather have my script in a different file.
3. Part 2 of the demo they Implement the map, and initialize the leaflet map
4. I changed the coordinates for the leaflet initialization because my app is based on north america, I found the coordinates on a basic goolgle search. (54.5260° N, 105.2551° W)
5. I added style and the map appeared, very cool. The coordinates I found are also loading the map directly above north america.
6. I can contain the map to mainly north america, by using the bounds coordinates in the app.js
7. Added Styles and an image to the styles, so I added a images folder.
8. I have established a connection witht he database, I used the async function from: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch. looking at examples helps me alot atleast to remember some of the structure and syntax for now, but in time I will remember with  mopre practice.
9. I was succesful in fetching and inspecting real Bigfoot data from the API, I can see this in the console inspection tool.
10. I added code in appjs that listens for changes in the selected STATE_NAME When the user selects a different state, the new value is stored in a variable and used to update the map display dynamically. I ran into an issue where the map stopped showing any markers. This happened because my API URL had conflicting parameters, I was accidentally passing two sets of query strings, which caused the REST GET request to fail. The problem was that I had hardcoded the original URL instead of making it flexible. I fixed this by using the URLSearchParams()) function to dynamically build the query string, allowing the map to fetch and display the correct filtered data.
11. I learned that the dataset was providing the year in the form of a string,  and I was trying to add 9 to the end of each year which was looking like "1970" + 9, this will not work correctly and required me to use parseInt() built in function that converts a string into a number, and also I needed to add quotation marks to the temporate literals which behaved more correctly due to how the data was being provided.
12. Simplified and refactored event listeners to use shared global variables selectState and selectDecade and a single buildQuery() helper. This allowed combining both filters dynamically with minimal code. Now, selecting both state and decade filters results in accurate and efficient queries to the API. I needed this to create my 3rd endpoint, which is 2 queries combined, I felt this would meet the requirements of the assignment because it now alters the query to include both STATE_NAME, and year.
13. I learned I can add plug ins to add extra functionality to my maps. I was able to integrated the Leaflet.fullscreen plugin into the app to add a fullscreen toggle button, allowing users to expand and exit the map view.


## Issues:

1. I have a hard time with which step to take first sometimes, I am trying to follow the workflow of the demos, to see what they did in what order to help understand this.
2. I am having an issue where I cannot see my map, I am not completely sure why yet, but possibly I need to add the styles. ( solved this, it was the height of the map needed to be styled)
3. I am having an issue with one of my API REST GET calls STATE_NAME. I used an async function to try to use the query, and I called the function getBigFootData(); in an alert and the result was [object Promise]. I then checked this in the inspection tool console.log and I found an error. which I am trying to understand now. (I was able to successfully connect to the API using the "API Explorer - Query URL", mentioned above. the console inspection tool shows me a new result, "objectIdFieldName: 'OBJECTID_1'..." this is a good sign as it also shows some data I am getting.
4. I just had an issue with the description, the for each loop worked to populate the map, I did nto realize it was going to only be america, but thats ok.. I was hoping for canadien sightings as well. But the pop up is not showing the description, the year and the state which the sighting took place. (I found the error was a typo in the dataset "descriptio").
5. The drop down menu has been very difficult for me to figure out, because it means adding to my functioning code, in a way that changes how things work. I am using alerts, and console.log and https://leafletjs.com/ to help try and figure out how to complete this step.
6. Learned how to use map centering set view to improve the initial display map area.
7. Confirmed that the ArcGIS API allows only a 2000 record limit per query, using console.log
8. Expanded the dropdown to improve user interaction and usability.
9. When selecting the decade from the drop down, I was getting an undefined value, but once I added an else statement this changed.. I had forgotten to add the else statement.
10. I now in my js do get a value from the chosen decade, but I have another issue, my alert is showing me that I get the year chosen so my listener is working, but it shows the number 9 added onto the end. this to me look slike a string value and a number value that are not adding. this will not allow the selected decade to display.

## Conclusion:
