# Week 14
Some considerations for how to use the tool to show as many metrics at the same time and using different perspectives depending
on how the user is looking at the visualization. The generated software city should provide a very tangible way of
interacting with the visualization.


## Consideration 1
The general structure, i.e. buildings, blocks, groupings, etc. of the software city is given by the static model/code depending on the type of provided data.
This part of the visualization does not change during the exploration of the user in the visualization or the sliding motion through the timeline.

In the following is an explanation of all dimensions of the visualization.

### Metrics


### Perspectives
With the different perspectives the kind of metrics that get displayed for the users attention change.
Depending on the perspective, a user can navigate different visualizations uniquely, or at the same time.
* Side: The most prevalent metaphor is the color of the building's fassade. The fassade color can be selected by selecting a metric for the "Color" metaphor in the menu.
* Top: The top perspective, is mostly defined by the rooftop color of the buildings.
* (Bottom: Maybe a user could look at the model from the bottom. This would display dependencies?)

### Time
The time dimension is adjustable with a slider. The user can navigate through time from left to right. By default the metric of this dimension
is:
* When an element gets discovered the first time, it gets displayed
* The height of the building is defined as the sum of the specified metric of all datapoints
* The color of the building is defined as the sum of all occurances in the whole dataset
* The rooftop of the building is defined as the ratio between height and occurances. As an example, if the height metric is "avgEyeFixationDuration",
the rooftop color of a building highlights the difficulty or the level of interest for that building, depending on how a user wants to interpret the visualization.

### Drill-Down / Roll-Up
Another way of interacting with the visualization is something that can be compared to the OLAP operations for a cube.
Those two operations "drill-down" / "roll-up" provide further capabilities in exploring the data.
With both, the drill-down and the roll-up functionality, users can navigate through the layers (the depth) of the visualization.


#### Drill-down:
* When clicking on a plane/block in the visualization, the visualization defines this element as the new base node, i.e.
all the elements that don't belong to this element get removed from the screen.

#### Roll-up:
* This is the reversed function of the drill-down.


[week-14-video-demo.mov](video-demos%2Fweek-14-video-demo.mov)