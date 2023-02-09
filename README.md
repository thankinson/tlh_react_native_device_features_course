# Udemy React Native course

## Native Device Features
This app was created by follwoing a udemy course where i was trying to learn and understand how to implament and use the native features of a mobile device.

This includes:
* Using gps and map feature to set curent location or choose location on a map
* Using the camera to take a picture

All the data added in the app is stored locay in an SQLite database on the mobile device. 

#
## The App

to run the app you will need to install the EXPO app from android or apple stores.

on your host machine download this repo and install packages with 

  to install the packages using the terminal/command line: 
  ```
  npm install
  ```

 to start the app:
 ```
 npm start
 ```

 open the EXPO app on phone and either manualy type in the url code displayed after you run npm start or scan the qr code. 

 #
 ## How it works

 Once you have the app open and running on your device you will be able to store your favourite places on a database on teh device. 

 to do this tap on the + button in the top right of the screen.

 you will then be taken to the next screen where you can:
 * Add a title
 * take a photo 
 * get GPS map location by clicking Locate User or Pick location to manuly select.

 after all is set click Add Place to store in DB.

 After which you will be redirected back to the home screen where your Saved place will be displayed in a list.

 You can then click on a Place in yoru list to bring up the Information and location where it was taken.

 You can also open the map to view where you placed the marker. 

 #
 ## Issues to be fixed.... eventualy
 The only issue with this app at the moment is that when you select a Place from your list and try to open the Map to see where the marker is EXPO crashes. 

 So far i belive that its not passing the data from PlacesDetails.js to Map.js correctly and have tried several differnt ways to fix this with no luck as of yet. 

 How ever if you comment out lines 9, 10, 11,12 and uncomment line 14 on Map.js the map loads and displays a map with no marker. 

