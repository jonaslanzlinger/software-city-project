# Week 1
During week 1 of the software-city project, the primary objective was to become familiar with the Sonargraph tool and its capabilities. This contains the following key tasks and achievements:
* Tool Familiarization: The initial goal was to familiarize myself with Sonargraph, a software analysis and visualization tool. After installing I had to activate my 14-days trial license.
* Java Repository Import: I began by importing a Java repository into Sonargraph. This involved configuring the project's workspace with the settings within Sonargraph.
* 3D Software City Visualization: Using Sonargraph's features, I transformed the imported Java repository into a 3D software city. This visualization serves as a comprehensive understanding of the codebase's structure and relationships between the modules and classes.
* Predefined Software Metrics: Sonargraph uses a set of predefined software metrics, which provide insights into the code's quality, complexity, and maintainability.
* Customized Software Metrics: As the next step, I explored the potential to introduce my own customized software metrics into Sonargraph. To achieve this, there is the Sonargraph API, that I was able to use in Sonargraph directly within the built-in editor. The scrips are written in Groovy, a documentation of the Sonargraph API can be found [here](https://eclipse.hello2morrow.com/doc/standalone/scriptApi/index.html)
* Data Mapping: The script is responsible for reading data from a local dummy-data file and mapping these values onto the Sonargraph internal metric representation. This step is crucial for this project, since we want to use our own collected eye-tracking data as a software metric.
* Final Visualization: The end result was a 3D software city in Sonargraph, where I could visualize the Java repository using my own software metric.

# Results
## Import a repository into Sonargraph
The first step is to set up a Sonargraph system.
## ![Screenshot 2023-10-13 at 15 40 09](https://github.com/jonaslanzlinger/software-city-project/assets/141398686/98b6d903-50d1-41bf-a2d1-5c424b300732)
After importing the Java repository, there is already the possibility to get a quick overview over the repository by clicking on the tab "Metrics".

## Create Script
After importing the Java repository, I created a Sonargraph script:
* Package Explorer > Scripts > New Script File... > Finish
* My script can be found here: [sonargraph-create-new-metric.groovy](sonargraph-create-new-metric.groovy)
* [Sonargraph API](https://eclipse.hello2morrow.com/doc/standalone/scriptApi/index.html)
* My dummy-data file can be found here: [dummy-data-eye-fixation-duration.csv](dummy-data-eye-fixation-duration.csv)
* Note: The script needs to be saved everytime before executing.
* As stated in the script, it is necessary to specify what type of metric we want to add. There are various types of metric-levels: System, Module, Type, Component, etc.
* When introducing a new metric, keep that in mind to search for that metric on the specific metric-level in the "Metrics" tab.

## Running script on Sonargraph system
When just running a script in Sonargraph, we are not changing the data of the Sonargraph system. To be able to do that we need to make use of the "ScriptRunner":
* Package Explorer > Files > Analyzers > ScriptRunner
  * Either add the run configuration of your script here
  * ...or click on Package Explorer > Files > Scripts > expand > right click on configuration > Add to Script Runner
* When successfully added a configuration to the ScriptRunner, click run.
* Now the new metrics should be added to the Sonargraph system. You can see your metrics in the "Metrics" tab on the corresponding metric-level.
![Screenshot 2023-10-13 at 15 55 02](https://github.com/jonaslanzlinger/software-city-project/assets/141398686/b7eaaf6d-98a6-4bff-880a-0ce4a2fff800)
* If the metrics are not visible, delete the ScriptRunner configuration, and add it again...that worked for me.

## Creating Treemap visualization
Now we have our metrics in place, let's create a visualization:
* Package Explorer > Files > right click on Treemaps > New Treemap...
* Define "Leaf Element" as "Souce File"
* In "Height Source" you can select your own metric. (I haven't found a possibility to select multiple metrics for a visualization. I am not sure if that is even possible)
![Screenshot 2023-10-13 at 16 00 03](https://github.com/jonaslanzlinger/software-city-project/assets/141398686/927b133d-ce4d-4698-bf36-46ad7c330a9c)

This picture displays the 3D visualization of a small Java repository:
* Buildings are the classes
* Building height is the eye-fixation-duration from the dummy-data file
* Buildings are grouped in blocks (packages)
* Blocks are grouped (project)
From this we could see which classes are fixated by the eyes the longest.

## Issues & Proposal
* I want to introduce Treshholds into the visualization (e.g. display a building red, if metric-X > 200), but that doesn't seem to be trivial to do on own customized metrics. In the standard metrics you can just add new Treshholds but in own metrics you need to code that into the scripting files. There is no real documentation for that.
* Sonargraph in general is a great tool for analyzing and visualizing a software project. But since we want to introduce our own metrics it becomes a little bit clumsy.
* As far as I know, multiple metrics are not supported by Sonargraph's Treemaps. If this is indeed the case I strongly propose to use a different tool. Since we only want to display biometric data that is annotated to the code-blocks or classes, I think the best way to do this is to reflext that on the collected data: E.g. "in class Dog.java the eye fixated on line 22 for 187ms" would translate to the data "Dog.java,22,187". Since we don't need to analyze the structure of the code, this would suffice. Therefore you could read that data, aggregate it and draw it (...or write into a file that can be imported by a visual drawing software).

# ToDo's for week 2:
* Investigate Sonargraph capabilities:
  * Explore visualization of multiple metrics simultaneously
    * Example: color of buildings representing class usage frequency
    * Example: Facade texture indicating the number of lines in a class
* Consider obtaining eye-tracking data for potential visualizations
* Exmplore other tools and libraries for code analysis with custom software metrics:
  * Investigate TreeMap with Java for data representation
  * Conside developing a customized solution to display collected data
