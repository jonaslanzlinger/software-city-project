# Week 2
In week 2 I focused on formulating my own personal requirements for an ideal visualization tool in the context of software structure and biometric data about that software.

## What I have done in this week’s iteration
* General decisions on project considerations, e.g. what static code analyzing tools should be used, etc.
* Defined my own requirements for the software city project.
* Completed a first prototype of software city visualization tool.

### General issues
I assume since the project name is still about “Software Cities”, the task is about finding a way to nicely visualize data in a software city format.
Therefore I further was looking for different tools that are able to display software as a software city. I encountered only 2 different options:
* Sonargraph (by Hello2morrow: https://www.hello2morrow.com/products/sonargraph)
  * Sonargraph is a software for software visualization in general. It is more about finding weaknesses in the design of the software structure.
    We could use Sonargraph to display the software in various different kinds of visualization techniques. But the software city visualization module is not that great.
    We are only capable of displaying 1 metric at a time, with different threshold values.
    Furthermore Sonargraph is not free to use, my 14-days trial license expired a couple days ago.
* CodeCity (by Richard Wetter: https://wettel.github.io/codecity.html):
  * CodeCity is old. The Mac version has been last updated in 2009. At least on my machine the software does not run.
    CodeCity is a free-to-use software that let's the users visualize a softare project as a software city. This program is built using VisualWorks Smalltalk on top of the Moose framework.
    The handling of CodeCity is not much easier than Sonargraph but the visualization looks better.
    As far as I understand it, it's not possible to easily add own custom metrics to CodeCity. You need to select metrics for visualization from a predefined metric list.
  
There is no other tool that implements natively a visualization of a software city. 

I think if we want to stick to the visualization of software as a Software City we should really consider implementing our own tool that displays data as a Software city.
Visualization based on our own data, that is not analyzing the source code of a software, is easily done.

After talking to Thierry, I found out that we don’t want to only use Software Cities as a visualization technique for the project.
There are various different types of software visualization:
* Paper Documents: 2D, poor navigation, static
* White board: 2D, static
* The Desktop Display: High resolution but limited display area, 2D+ (for the most part).
* More real estate: Multiple displays, large displays
* Support for collaborative problem solving
* Utilize: 3D, 3D+, Virtual Reality, Augmented Reality (combine stereopsis with motion, immersive environments), stereo displays, multi-resolution displays, multi-type medium (e.g. laptop + VE).
* provide navigational controls

My question here would be: What visualizations do we really want? Only software city or also others? This question really determines the decision we should make on how to tackle the project.

As far, as I understand it, it really is up to myself. Therefore, I have decided to formulate my own requirements for the project.

## My own Requirements for the project
* We want to be able to visualize biometric data provided by our own team. This data should be aggregated already in such a way, that the data is available in a easy to read format.
* We want to visualize various different software metrics and display them.
* Only one kind of visualization: Software City. But different kind of aggregation types:
  * 3D visualization of a software city
  * 2D visualization of a software city
  * select visualization parameters by metric or biometric data
  * relationship visualization between buildings (which are some metrics depending on the input data)
* Input data should be provided in a structured form (e.g. csv-file). This has to be given for source code metrics and biometric data.
* No need to be one workflow (specifically: 1 workflow - source code to source code analyzer. 1 workflow - raw data to visualizing tool).

## Considerations Visualizing tool:
* import raw data into a C# scripting file, that gets interpreted by Unity and displayed as a software city.
* import raw data into Python and model a software city with the STL library.
* import raw data into Aframe. With that solution we could also use VR to make the software city more immersive.

## Considerations for static source code analytics
A next step for the project would be to find out how we can get the software source code metrics. Therefore I explored some alternatives to Sonargraph:
* SonarQube: I run it locally on my machine in a Docker container. As an example I analyzed a dummy Java project, but there are no metrics provided regarding dependency relationships and code usages.

## Prototype - Software City visualization tool
I have started implementing a prototype for a visualization tool. Here are the steps I have taken to accomplish the final prototype down below:
* created new Unity 3D project
* implemented a camera view:
  * user is able to pan the camera and look around
  * user is able to move the camera in the space
* Script: imports data from a csv-file and creates for every entry a new building in the software city model. Here, in this file is the place where we define new metrics / dimensions.
