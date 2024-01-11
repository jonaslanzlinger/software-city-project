# Week 12
I have worked on the following features for the Software City Project:
* Working towards importing any type of data. The problem that still persists is that somehow
I need to tell the problem based on which data fields it should group up
the buildings. This is now done by the Data Type. I will work next week on
a way to specify this in the data itself, or maybe dynamically with the UI.
* I have implemented a new UI element:
  * The new UI element is parsing the uploaded data and based on the
  data fields that are in the data, it fills the lists from which a user 
  can select the correct data field that he wants to map to a specific
  software city metaphor.
  * Each time new data gets uploaded the lists get filled again with the new values.
  * Because of this new feature I decided to remove the "Dimensions" navigation bar element.
  This is due to the fact that I only want one way of starting the visualization.
<img src="video-demos%2Fweek-12-new-UI-element.png" width="500">
* I also fixed the problem of "floating buildings". The problem was, as stated
in the README file of week-9-10, that if a building has not the complete
grouping structure to its specific layer, then the building and the corresponding grouping layers
float in the air. This problem is now fixed, see screenshot down below:
<img src="video-demos%2Fweek-12-gap-bug-fixed.png" width="500">

## Further Development
* I have started to implement a more sophisticated way of adjusting the metaphors during runtime.
This feature will most likely be finished the next time. The functionality for this is on my local branch.
* Part of this dynamic adjusting of metaphors is the possibility to catch all kinds of different scalings for e.g. building height.
For this, I am creating a slider to adjust the scaling and the normalization of the data, inorder to display the data as intended.
* There are some bugs in the program that I want to fix before moving away from the static visualization.
  * dat.gui UI controls disappear if clicking on starting the visualization again.
  * after creating a new visualization the canvas before gets removed. But still some components stay on the document, but I don't know how to remove them completely.
* Furthermore, I want to integrate the two service data-analyzer and visualizer into one service. I think in respect to functionality
code volatility, fault tolerance, ease of development, expandability integrating them makes sense.
  * To achieve this, I will dedicate 2-3 hours next time to just integrate/refactor/cleanup both services.
  * Furthermore, I have found a website where I could deploy the service for free (directly from my Github repository). I think
  this would make sense, that people can test the service in an even easier manner.

