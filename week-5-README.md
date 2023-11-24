# Week 5

Last week I did make architectural style decision based on the system requirements that I have developed before. The first goal was to split the application apart into two separate services:
* visualizer
* data-analyzer

While last week this separation was already successful, I didn't really follow the Hexagonal Architecture style. This week I transformed the spaghetti-code into a more modularized manner by defining domain entities, services, and adapters. Now that the application is better structured, progress can be made more easily. I haven't implemented the beneficial traits of the Hexagonal Infrastructure yet (the abstraction of implementation with port/interfaces), therefore, I want to read into [this GitHub project](https://github.com/juanm4/hexagonal-architecture-frontend) or [this arcticle](https://connorsmyth.com/implementing-interface-in-javascript/) for a better understanding how to do that with JavaScript.

## Presentation
The slide-deck can be found here (possible to change): [PPP Slides](https://github.com/jonaslanzlinger/software-city-project/blob/main/week-5-slides.pptx)

Furthermore, I created a short slide-deck for a possible presentation next week about the current project status, including the Hexagonal Architecture, the service communication and the current state of the application including a short live-demo.

## Data Format structure
To ensure the optimal operation of the Visualizer service, it is essential to establish a well-defined data structure that can communicate with external services (e.g. Data-Analyzer) in a "all possible, nothing required" manner. Instead of saying that the Data-Analyzer exclusively produces a predefined data structure, which would result in a very high degree of dependence and tight coupling of the two services, I have chosen a more flexible approach to define the data format:
* buildingId (int): REQUIRED - the identification of an entity in the 3D model
* buildingName (string): OPTIONAL - the name of the entity
* buildingGroupId (int): OPTIONAL - the identification of a group of entities in the 3D model (e.g. packagename in a software project)
* buildingLength (int): OPTIONAL - length of the 3D box of the building
* buildingWidth (int): OPTIONAL - width of the 3D box of the building
* buildingHeight (int): OPTIONAL - height of the 3D box of the building
* buildingShape (enum): OPTIONAL - default=rectangle, shape of the 3D box representing the building
* buildingColor (rgb-code:string): OPTIONAL - the color of the 3D box of the building
* buildingRelationships (array\[buildingId\]): OPTIONAL - an array with all relationships to other entities
* buildingData (json): OPTIONAL - arbitrary data that has been analyzed

The Data-Analyzer service can send more data features in the buildingData field, letting the visualizer service know what different features he would be able to provide. This helps in regards of extensibility of the visualization service (e.g. additional future visualization metaphors).

## Prototype
This weeks focus has been more on the refactoring of the code. The current state of the prototype can be viewed in iteration week-4.
The implementation of the data formats is not done yet, stubs are created.

Right now, I have a problem with fetching the data from the Data-Analyzer service. I want to wait for the data being fetched but I didn't figure out yet how to do that correctly with .fetch(). Will take a look at that over the next days.
