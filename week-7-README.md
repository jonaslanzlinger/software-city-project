# Week 7

## Meeting Notes
* visualization divided into 2 components:
  * spatial data: static - uploaded data will not change over time
  * temporal data: dynamic - the uploaded temporal data has annotated timestamps. The delta of the data snapshots should get visualized
* first focus on discussion of the concept
* grouping of spatial data is a must have. Users should be able to select the granularity of the grouping. Here, some examples how the data could get grouped:
  * bounded context's
  * package structure
  * Java Spring Annotations (i.e. @Service, @Component, etc.)
* meet with Amine/Thierry next week to discuss how to proceed
* develop analysis of generic data (either Java project source code or BPMNs, etc.). For now, assume a 3rd party library does this job for me.
* don't dig into technical aspects too early
* think about how the software city should evolve over time

## Implementations
#### Importing BPMN / generic data
Since we want to be able to upload any type of data, I also added a way to upload BPMN data. 
Currently I am working on removing the static parsing of the data. 
So far, I achieved to build an array of json objects that could be of any kind. 
The idea is that the user then would be able to specify the mapping 
between attributes -> software city visualization metaphors (e.g. height, color, etc.). 
Since that would involve quite some additions to the visualization service, 
it will take some time until that is possible. I think this is an essential part of the service, 
therefore, I think it makes sense to implement that already.
![week-7-file-upload.png](video-demos%2Fweek-7-file-upload.png)

#### Grouping of Buildings
I have worked on the grouping of buildings based on the uploaded data. For now, the membership of a building to a group is done randomly. 
But next week I will look into letting the user specify which attributes should get 
interpreted as the grouping attribute.
Implementation / Visualization -wise this will not change anything, I have programmed the grouping function
in a dynamic way => groups get created dynamically, buildings get placed based on the group membership, groups
get placed based on the overall structure of the data.

In this screenshot you can have a look at how this might look for the TAPAS project.
Here, I have randomly generated some groups and buildings get assigned to a group randomly.

![week-7-grouping-of-buildings.png](video-demos%2Fweek-7-grouping-of-buildings.png)

Here, another screenshot displaying the grouping with 38 example groups and some more data.


![week-7-grouping-of-buildings-2.png](video-demos%2Fweek-7-grouping-of-buildings-2.png)

## Prototype
I have uploaded the current version of the prototype here on Github. If you want to try the prototype, you just need to do the following:
* clone/pull main-branch of this repository
* data-analyzer: npm start (visit: localhost:3001)
* visualizer: npm start (visit: localhost:3000)
* here, some example import csv-files:
  * Java project (TAPAS Tasks project - ASSE - Group 8): [project-metrics-tapas.csv](threeJS-software-city%2Fdata-analyzer%2Fresources%2Fdata%2Fproject-metrics-tapas.csv)
  * BPMN example: [Process_models_complexity_metrics.csv](threeJS-software-city%2Fdata-analyzer%2Fresources%2Fdata%2FProcess_models_complexity_metrics.csv)
    * hint: import BPMN as Java Source Code. Otherwise nothing will be displayed in the visualization.

The bugs regarding the navigation bar in the visualization from last week have been fixed.

If you run into any problems or have some questions, don't hesitate to contact me.

Generally, I think it will get a lot easier to implement new things from now on because I get used more and more
to the framework and JS in general each week.

(I have kicked the Unity visualization tool out of this repository.)

