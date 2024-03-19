# Week 21

## User stories

### US#1

* The user is a new employee in some company. He is responsible for developing an internal java application. Because the application is huge, he needs an easy way of discovering the source code. Therefore, he want to find the most important packages and the biggest classes and get an overview of the general structure of the code. Especially he wants to investigate the class "WebLogger".

* He decides to use the software city web application. Therefore, he visits the website: https://jonaslanzlinger.github.io/software-city-project/

* Because he never used this app, he reads the instructions on the front-page. From these instructions he learned that he wants to do a "Java Source Code" analysis.

* He creates a .csv-file as described in the instructions. His provided dataset includes at least the metrics "countAttributes", "countMethods", and "countDependencies".

* First, he clicks on "Upload" and selects the newly created .csv-file. Also he selects the respective upload data type "Java Source Code". Finally he clicks on "Upload Data".

* After receiving a confirmation that the upload was successful, he now wants to see the visualization. To do that, he clicks on "Visualize" in the navigation bar. He decides that he wants to display the "countAttributes" with the "Dimension"-metaphor - the "countMethods" with the "Height"-metaphor - the "countDependencies" with the "Color"-metaphor. The rest he leaves as it is. Clicking on "Visualize" creates the software city.

* The user now can explore the source code. First he investigates how the software developed over time and moves through the timeline by dragging the slider at the top.

* He opens the "Model Tree", searches the class "WebLogger", and marks this class in the color green.

* Now that the class is marked, he has a clearer view at where this class is positioned and according to the "Dimension", "Height", and "Color" he can infer its size and how much it is entangled with other parts of the system.

* The user clicks on the building and reads through the attributes this building has, because he wants to know the detailed numbers for the metrics.

* Now the user has a clearer view of the source code and he can start working on this project.


### US#2

* The user is the team leader of the software engineering team in some company. Regularly he hires new employees that will work on his Java software project. Because this project has grown a lot in the last years, he suspects that the code is starting to become very complex and hard to understand. Therefore, he started to perform an eye-tracking experiment with new employees. They need to look at the source code and the eye-tracking sensor captures multiple different bio metrics such as "eyeFixationDuration". His goal is to know which parts in the source code are hard to understand. Specificaly he wants to have a closer look at the "ApplicationService" class, because he suspects that this class is a potential candidate for refactoring.

* He decides to use the software city web application. Therefore, he visits the website: https://jonaslanzlinger.github.io/software-city-project/

* Because he never used this app, he reads the instructions on the front-page. From these instructions he learned that he wants to do an "Eye Tracking (Java Source Code)" analysis.

* He creates a .csv-file as described in the instructions. His provided dataset includes at least the metrics "linesOfCode", "countDependencies", and "eyeFixationDuration".

* First, he clicks on "Upload" and selects the newly created .csv-file. Also he selects the respective upload data type "Eye Tracking (Java Source Code)". Finally he clicks on "Upload Data".

* After receiving a confirmation that the upload was successful, he now wants to see the visualization. To do that, he clicks on "Visualize" in the navigation bar. He decides that he wants to display the "countDependencies" with the "Dimension"-metaphor - the "linesOfCode" with the "Height"-metaphor - the "eyeFixationDuration" with the "Color"-metaphor. The rest he leaves as it is. Clicking on "Visualize" creates the software city.

* This visualization type holds only one version of the static source code but the timeline simulates the experiment. When hes moving through the timeline he can see how the colors of the buildings change. That means buildings that are dull, are not of much interest, but very bright buildings are the corresponding classes on which the user was looking for a long time.

* He opens the "Model Tree", searches the class "ApplicationService", and marks this class in the color teal.

* Now that the class is marked, he has a clearer view at where this class is positioned and according to the "Dimension", "Height", and "Color" he can infer its size, how much it is entangled with other parts of the system, and how the perception of this class to the user developed during the experiment.

* The user clicks on the building and reads through the attributes this building has, because he wants to know the detailed numbers for the metrics.

* Now he has some ideas where the source code could need some refactoring to make the first day of new employees a bit easier.

## ToDo's for completing the User Stories

* [ ] create representative Java Source Code .csv-file
* [ ] create representative Eye Tracking (Java Source Code) .csv-file
* [x] add instructions page at startup of the website
* [x] remove automatical data upload at startup of the website
* [x] fix issue: when collapsing a folder in the Model Tree, the color selection disappears
* [x] fix issue: when selecting a color for a building, moving the timeline slider slightly changes the color
   * this is not an issue because we want that!
* [x] fix issue: when clicking on a building, the Info Panel only shows "[Object object]" in the "buildingData" section.
* [ ] IMPORTANT: Most functionalities work for "Eye Tracking (Java Source code)". Make it work also for "Java Source Code".
* [x] investivate on using VR with the visualization.
   * I would need either an Oculus 2 VR or an Apple Vision Pro. With my PSVR2 goggles it can't work because the integrated web browser in the PS5 does not support WebGL, which is responsible for the graphics. Also connecting the PSVR2 goggles with my Macbook Pro does not work.


## Notes from Literature Research

I have searched through a broad palette of papers and gathered the most important key takeaways.
The papers can be found [here](literature)

### What others do

#### Short version (conclusion):
* Most of the ideas that we have in our prototype are found somewhere in the literature. But no prototype is including all of them, or focussing only on one specific aspect of the viaualization. The most well-rounded prototype appear to be CodeCity by Richard Wettel.
* A nice way to improve our prototype would be to add dependencies or traces of flow to the visualization via archs atop of the buildings. For decluttering the visualization we could make use of the hierarchical edge bundles (HEB) technique. This might take some time to implement though.
* Adapting level of resolution: currently the research is only focusing on one specific level of resolution at a time (i.e. showing the packages and classes). But it would be cool to be able to zoom in on a class and at a certain distance we can see the structure of the class in that building.
* An important feature will be to define the distance between the buildings. Some tools provide that, and it looks very neat.

Summary of all software city tools from literature:
* (Knight and Munro): Software World - one of the first approaches employing the 3D city metaphor. Static code structure only
* (Wettel and Lanza) CodeCity - first only static code structure. In the next iteration they added 3 more visualization types, including a type that depicts the city in a timeline
* (Thomas Panas et al) - Very realistic 3D city visualization focusing on the static strcuture and the communication flows based on program traces.
* (EvoSpace) - provides a "day view" to display static code structure and a "night view" to display its dynamic behavior. 
* (Pierre Caserta et al) - Visualization for large software systems with their static and dynamic properties using the software city metaphor and the hierarchical edge bundles technique (HEB) to aggregate dynamic relations.
* (SynchroVis) - They also use the software city metaphor and the HEB technique, but focus more on the concurrency problems (i.e. specific flows). Right now they focus on improving the look of their buildings, possibility of adding additional building shapes for different type of software components and providing greater scalability of their visualization for larger software sytems.


#### [Daniel Limberger et al - Visual variables and configuration of software maps](literature/Daniel_Limberger.pdf)
This paper gives a good overview over the whole city metaphor concept, including piplines, layouts, packing methods, and visual variables.

Proposed Software City Pipeline:
* data analysis (for us, this is done beforehand)
* filtering (some sort of filtering happens when data gets parsed for visualizing. Identical packages and classes get aggregated to one)
* mapping (each class is a building, each package is a plane)
* rendering (the rendering is done via ThreeJS and bin-pack, a technique to place elements on a surface in a space saving manner)

Layout Possibilities:
* rectengular splitting layout: this is what we are using at the moment
* mixed splitting layout: mixing rectengular and polygonal shapes
* polygonal layouts
   
Packing the Buildings:
* bin-packing
* data jewelry
* box algorithm
* EvoCells

Visual Variables (selection):
* area
* color
* height
* transparency
* light emission
* stacking
* segments
* shape type
* shape parameter
* contour width
* contour color
* sketchy contour
* surface pattern (texture)
* surface noise (texture)
* surface shading (texture)
* nesting-level margin
* color weaving
* height threshold

They have a lot very interesting visualization ideas presented.

#### [Richard Wettel, Michele Lanza - CodeCity: 3D Visualization of Large-Scale Software](literature/Richard_Wettel_1.pdf)

They developed a tool for the analysis of large software systems. Based on a city metaphor, it depicts classes as buildings and packages as districts
of a “software city”. By offering consistent locality and solid orientation points they keep the viewer oriented during the exploration of
a city. They applied the tool on several large-scale industrial systems.

* static code visualization
* interesting way of displaying the dimensions of the buildings:
   * width depicts number of attributes
   * height depicts number of methods
   * our prototype is already capable of doing exactly this
* can specify the distance between elements in the visualization
   * we should persue to implement this

#### [Richard Wettel, Michele Lanza - Visual Exploration of Large-Scale System Evolution](literature/Richard_Wetter_2.pdf)

This is the second paper by Wetter and Lanza. They improved their prototype in the following direction:
* they developed three additional visualization techniques
* Age Map: Each building gets displayed from dull to bright, how many software iterations it has survived to get a feeling of which parts are rather old or new.
* Time Travel: Navigating back and forth through the history of a software artifact. Each step is displaying the current state of the software. They make sure that every artifact is assigned an individual space in the city, such that moving through history doesn't change the location of a building.
   * For the eye fixation data this works already in our prototype. I am not sure how well this works in the static source code scenario.
* Timeline: They take a building of the city and place all the versions of that building next to each other to see how this component evolved through time.


#### [Pierre Caserta, Olivier Zendra - Visualization of the Static Aspects of Software: A Survey](literature/Pierre_Caserta_1.pdf)

This again is a nice paper to have a look at different visualization techniques. They categorized the visualization techniques according
to their characteristics and features. Most of the techniques don't include the city metaphor at all, but in my opinion the city metaphor does by far the best job to do this. They also found that it is easy to display temporal data with the city metaphor.


#### [Thomas Panas et al - 3D Hierarchical Edge Bundles to Visualize Relations in a Software City Metaphor](literature/Pierre_Caserta_2.pdf)

In this paper they propose a 3D visual approach to depict software production
cost related program information to support software maintenance. The information helps to reduce software maintenance costs, to plan the use of personnel wisely, to appoint experts efficiently and to detect system problems early.
* visually detailed prototype
* visualization of multiple cities, connected by streets to depict interactions between packages/modules
* utilization of clouds to create areas that are not important and should be hidden from one specific perspective
* using hot spots to show high frequency code parts
* identifying code blocks that have not been used for a long time


#### [Simone Romano et al - The city metaphor in software visualization: feelings, emotions, and thinking](literature/Simone_Romano_1.pdf)

A controlled experiment to assess the use of virtual reality in
software visualization with a high number of participants (i.e.,
42). They provide evidence on the benefits deriving from the use of the city
metaphor for program comprehension, so bringing credibility to
both software visualization and city metaphor in the combination with VR.
* They show how the use of virtual reality in exploring software cities can improve an easy and immersive perception of the software city model.


#### [Simone Romano et al - On the use of virtual reality in software visualization: The case of the city metaphor](literature/Simone_Romano_2.pdf)

They report the results of a study to assess the city metaphor implemented in a VR-based tool and in a 3D-based tool with respect to users’ feelings, emotions, and thinking. To this end, they contrasted these tools with a non-visual exploration tool (i.e., Eclipse). The main result of the study is: the use of the city metaphor implemented in a VR-based tool positively affects users’ feelings and emotions, while the thinking about this implementation is posi- tive and comparable with that of a traditional 3D implementation of the city metaphor and it is slightly better than the thinking about a non-visual exploration tool (i.e., Eclipse).


#### [Pierre Caserta et al - 3D Hierarchical Edge Bundles to Visualize Relations in a Software City Metaphor](literature/Pierre_Caserta_2.pdf)

They are using archs atop of the city to display the interactions between software parts. They combine the assets of the software city metaphor and the hierarchical Edge Bundles (HEB) technique, taking better advantage of the third dimension to avoid clutter due to a lot of relations.


#### [Veronika Dashuber, Michael Philippsen - Trace visualization within the Software City metaphor: Controlled experiments on program comprehension](literature/Veronika_Dashuber.pdf)

* they use a tool called DynaCity that uses the city metaphor for visualization.
* Its novel trace visualization display dynamic dependencies as arcs atop the city/buildings
* identical requests between modules or services get aggregated to improve readability
   * maybe utilize HEB technique here?
* The arcs atop of the city are helping in identifying the flow between the individual services (espacially ineteresting for e.g. event-driven architectures)
* They have performed experiments with developers that needed to identify error causes. The ones that had access to DynaCity were significantly more accurate than the developers that only looked at the source code.


#### [Jan Waller et al - SynchroVis: 3D Visualization of Monitoring Traces in the City Metaphor for Analyzing Concurrency](literature/Jan_Waller.pdf)

* They improve program comprehension for software systems by visualizing the systems basic structure based on the source code analysis while the dynamic behavior is gathered from information collected in monitoring traces
* a 3D city metaphor to simultaneously visualize the static and dynamic properties of software systems
* a visualization of the system's concurrent behavior within the city metaphor
* additional support for displaying and navigating collected program traces within the city metaphor


### What we do differently

* Introducing time dimension
* We do pretty much the time travel visualization of Richard Wettel
   * Our extension to this is the mapping to the eye tracking experiment
   * Also what we do better is the fact that we have a web application. This makes the usage and the interoperability with other sources easier.
   * Another extension could be to use VR to explore the software city. For this I have already implemented the VRButton for ThreeJS. I would need to try at home, if I can use my VR goggle with the visualization, but I am not too confident that this works just out of the box.
* Most software city visualizations focus on static source code metrics. Our prototype takes the static visualization and enhances the model with bio metric data for measuring the cognitive load while exploring the software system.
* The goal is to gain a better understanding of where the complexities in a software system lie and how to reveal points of high complexities.