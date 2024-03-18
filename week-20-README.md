# Week 20
In this iteration the package model tree has been finished. Additionally I have optimized some UI elements and overworked the functionality for displaying customized colors across multiple epoques. To see the prototpye in action, I have updated the deployment [here](https://jonaslanzlinger.github.io/software-city-project/)

## Test the prototype
To see what I have implemented this week, you can try the following:
* visit the prototype [here](https://jonaslanzlinger.github.io/software-city-project/)
* upload [this](application/data/testFile-03-eye-tracking-java-source-code.csv) file
   * Select "Eye Tracking (Java Source Code)" as the upload type
* Click on "Visualize"
* Select "linesOfCode" for the "Dimension"
* After starting the visualization, you can navigate the timeline at the top
* Click on "Model Tree": now you can see the package model tree
   * you can click on folders to toggle collapse and expand
   * hovering over an element in the package model tree highlights the element in the visualization, anc vice versa
   * you can specify a color for each element in the package model tree which then gets displayed in the visualization accordingly
   * if you now slide through the timeline, the selected color will get brighter / duller according to the eye fixation over time

## Meeting with Amine
ToDo's for next week:
* scientific research:
   * What is interesting about what the papers are talking about?
   * What are we doing differently from what those papers are talking about?

## ToDos next week:
* 1 day literature review
   * search in google scholar
   * do forward search
   * do backward search
* 1 day working on the prototype (work on the scenarios)
* ToDo's for the prototype
   * When collapsing a folder inside the package model tree, highlight the folder if the user is hovering over an element within that folder in the visualization
   * When selecting a color for a folder, trickle down this color for all its child elements
   * Implement this funcionality also for the "Java Source Code" upload type
