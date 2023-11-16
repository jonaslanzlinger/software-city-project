# Week 3

The plan for this week's iteration is to build a lightweight prototype that just visualizes a software city, based on some generic data. The following criterias are formulated:
* consider different microservices for the tasks
  * analyze source code microservice
  * visualize data microservice
* services should expose http endpoints to call the service

Some inputs from other repositories:
* JS-City (https://github.com/aserg-ufmg/JSCity/tree/master)
* babel-parser for JavaScript (https://babeljs.io/docs/babel-parser)
* GithubCity (https://github.com/honzaap/GithubCity/tree/main)
* 3DCityWebApp (https://github.com/3dcitydb/3dcitydb-web-map)

## Prototype
In this week, the focus was on thinking about the architecture considerations for this project and build a prototype. This included getting familiar with the existing example projects listed above. 

### Microservice Architecture
To split up the functionalities for loose coupling and a certain service independence, there will be different web-based microservices for every task. So far I have identified two different microservices:
* microservice for analyzing source code: The idea is to provide raw data or a source code project to the microservice. The service is analyzing the data via a 3rd party library and provide the analyzed data back to the user.
* microservice for visualizing data: This service is responsible for taking in the pre-prepared data and build a software-city 3D model with the data and display the model within the browser.

### Visualization Microservice
The prototype is very lightweight containing the following components:
* Vite as a development server, running on localhost:3001
* ThreeJS for modelling the software city on the canvas.
* Some sample data to visualize

In order to test the prototype:
* clone this git repository locally
* perform ```npm install```
* perform ```npm run dev```
* open browser on localhost:3001
* First you get prompted to provide two values:
  * What dimensions should the visualization of the software city have?
  * How far away should the buildings of the city be apart from each other?
* Now the dummy data gets visualized

#### Demo Video
Here is a video about the resulting prototype:

![software-city-prototype-week-3](https://github.com/jonaslanzlinger/software-city-project/blob/main/video-demos/software-city-prototype-week-3.gif)


## Next steps
I think it makes sense to refine the prototype now. Here some ideas:
* Add capabilities to display other metaphors like building width, shape, color.
* Making the buildings clickable to display more detailed information about a building/node.
* When clicking on a building, show dependencies to other buildings via e.g. a fine line that connects both buildings.
* Visualize real data.
* Maybe implement functionality to adjust the dimensions of the software city during runtime, inorder to not have to reload the endpoint.

Also building the microservice that analyzes the source code would be a next possible step.

In general, I have to do a lot of refactoring of the prototype.

# Update
Played around with:
* Lightning settings. Adjusts now depending on size of the dataset, spead of the buildings, or the dimension choice.
* First additional visualization properties:
  * thresholdValue
  * thresholdColor
* They are adjustable via the GUI provided in the interface

Example screenshot of current state:
<img width="1162" alt="software-city-prototype-week-3" src="https://github.com/jonaslanzlinger/software-city-project/assets/141398686/676e58b8-c8de-4c90-a878-c35ad88e274b">

