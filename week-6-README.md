# Week 6

## Code Metrics
To provide a better understanding of how the visualization could work, I exported code metrics data from a real Java project (TAPAS tasks project from ASSE). The code metrics of this export include:
* package/classname
* Lines of Comments
* Lines of Javadoc
* Lines of Code

Additionally, I added another column with randomly generated values for:
* Avg. eye fixation duration: between 60-750 ms

For now, only CSV-file formats of this form are supported:
* className
* linesOfComments
* linesOfJavadoc
* linesOfCode

Ideally the flow should, such that we can upload a blank software project, call a 3rd party library to analyze the code metrics and then store the information from that 3rd party library. I haven't looked into that yet.
I imagine that providing additional formats would be an easy task, e.g. if we want to provide CSV-formats for BPMN-projects.

To try importing a project, I recommend using this template CSV-file. The CSV-file for these code metrics can be found here: [project-metrics-tapas.csv](threeJS-software-city%2Fdata-analyzer%2Fresources%2Fdata%2Fproject-metrics-tapas.csv)

## New Overlay for Data Analyzer
In the week before it was only possible to upload new metric data via postman.
Now, I implemented a simple user interface to perform the following actions:
* view data in Datastore
* clear data in Datastore
* upload CSV-file with code metrics

I am asking myself if the Data Analyzer service even makes sense. I think nobody would want to use a service that just does what other 3rd party libraries already do. In my opinion, maybe the best solution would be to just have the Visualizer service, where you can upload some elected project types and based on that, the visualizer service processes the data via a 3rd party directly. We should discuss that next week.

To illustrate the new overlay, here some screenshots:

![week-6-data-analyzer-overlay.png](video-demos%2Fweek-6-data-analyzer-overlay.png)
![week-6-data-analyzer-overlay-datastore.png](video-demos%2Fweek-6-data-analyzer-overlay-datastore.png)

## Visualizer
Last week there was no real overlay for the Visualizer service. Now, you can import projects (CSV-files) also via the Visualizer server, which makes the User Experience much better. There is a navigation bar at the top of the canvas where you can find:
* Dimensions: here you input your desired dimensions of the resulting software city. After clicking ont he "Visualize"-button you can see the newly created software city without the need of refreshing the page.

To illustrate the improved overlay, here some screenshots:
![week-6-visualizer-overlay-dimensions.png](video-demos%2Fweek-6-visualizer-overlay-dimensions.png)
![week-6-visualizer-overlay-dataupload.png](video-demos%2Fweek-6-visualizer-overlay-dataupload.png)

For now, I have the problem with the CSS of the navigation bar, such that the cursor on the canvas of the visualization has the offset of the navigation bar. I think this will be easy to fix.

I adapted the data structure imposed from last week's iteration. This enables us to be not restricted on the imported project types (i.e. a building for a Java project software city will be the same as a building for a BPMN project software city).
Also I added the possibility to have a different colors in the visualization based on one specific data field (here, avgEyeFixationDuration). It would be a nice feature to have those "settings" available in the navigation bar such that a user can more easily change how the visualization should look like.

## Prototype
I have uploaded the current version of the prototype here on Github. If you want to try the prototype, you just need to do the following:
* clone/pull main-branch of this repository
* data-analyzer: npm start (visit: localhost:3001)
* visualizer: npm start (visit: localhost:3000)
* if you want to import data, I provide you with the code metrics of the TAPAS tasks project from the ASSE course:
  * [project-metrics-tapas.csv](threeJS-software-city%2Fdata-analyzer%2Fresources%2Fdata%2Fproject-metrics-tapas.csv)

Overall this week's prototype is not finished, there are still some bugs and problems in the overlays. If I find time on the weekend, I will fix those issues and update this repository.

If you run into any problems or have some questions, don't hesitate to contact me.

## Presentation
I didn't find time to update the slides for the presentation. If I find time on the weekend I can do that before next Thursday. Nonetheless, I think the meeting will be more of a discussion about the next steps.