# Week 4

During the study on this project during the past weeks, I collected the most prevalent system requirements. The next step is to list all those requirements and make a proposal for an architectural solution for this system.

## Functional Requirements
* Deployment as a Web Application
* Users want to use the code analysis separated from the visualization. That means provide raw data to the system and get the compressed analyzed metrics as a response.
* Users want to provide the raw data to the system and get the visualization of the compressed analyzed metrics as a response in the browser.
* Code analysis:
    * Provide raw data that gets analyzed based on different metrics. The following data types should be supported:
        * Source code (languages?)
        * BPMN (Business Process Model and Notation) files
        * ...
* Data Visualization:
    * Form: Software City metaphor
    * Visualization possible for a variety of different types of data.
    * The visualization should be viewable in the browser

## Modelling
From these requirements I derived the following logical model, grouped up by the Bounded Contexts.

![architecture-model](https://github.com/jonaslanzlinger/software-city-project/blob/main/video-demos/architecture-model.png)

Choosing a distributed approach is a logical conclusion. Therefore, I will build the prototype in a Microservice Architectural style. By doing so, we have multiple loosely coupled services that can operate in isolation, good interoperability and since the services are straight forward there will be no complex interservice communication.
Also because users want to use the Data Analyzer in isolation, decoupled from the Visualizer, it makes sense to separate those two services from each other. 

Furthermore I will implement the Hexagonal Architecture (Clean Architecture / Ports and Adapters). The biggest advantage of this architecture is that we don't know yet what data types (source code in JavaSciprt, Java, C++, Python, etc., BPMN or more) we want to analyze. The easy addition of different Port implementations helps a lot in that regard.

## Prototype
This week I outlined the skeleton for the Microservice and Hexagonal Architecture approach.
The project now contains 2 services:
* data-analyzer
    * implemented with Express
    * npm install
    * npm start
    * localhost:3001
    * endpoints:
        * GET '/' -> returns the loaded data in the memory of the service. If no data available, DUMMY_DATA gets returned.
        * POST '/' -> application/json
* visualizer
    * implemented in Vite
    * npm install
    * npm start
    * localhost:3000
    * visualizer queries the data-analyzer service for the data and visualizes it

Additionally I refined the visualization service:
* rudimentary GUI for visualization
* threshold color/value
* Every building now is hoverable
* Clicking on a building now prints the data of that building in the console log.

![software-city-prototype-week-4](https://github.com/jonaslanzlinger/software-city-project/blob/main/video-demos/software-city-prototype-week-4.gif)
