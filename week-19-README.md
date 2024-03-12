# Week 19

## Meeting with Amine
* Start programming the Model Tree from scratch to have more control over it
* The Model Tree should be rebuilt at startup but without assigned colors
* Each element in the Model Tree should have a way of setting a color
   * The element in the 3D visualization should also have this color then
* Hover effet over the Model Tree / 3D Visualization element should work vice versa

## Implementation
I have started to implement the Model Tree from scratch again. It is not yet finished, but the most important parts are in place.
* parsing the elements in the 3D visualization on the Model Tree
* Creating folders for Planes
* Creating files for Buildings
* When hovering over an entry in the Model Tree, the corresponding element in the 3D visualization is also highlighted
* When hovering over an element in the 3D visualization, the corresponding element in the Model Tree is also highlighted

## Open ToDo's
* The placement of the file elements in the Model Tree is off. They get appended to the wrong parent element I think
* I want to implement a color picker for every single line in the Model Tree that also modifies the color for the elements in the corresponding 3D visualization
* I tested everything only for eye-tracking-java-source-code data. Next week I will work on adapting the functionality for all other data types