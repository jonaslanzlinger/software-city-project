# Week 13

## Meeting with Amine
Together with Amine, we decided to move on to the second part
of the project, which is concerned with the time dimension of the visualization.
I can assume that any kind of data will be available in any form.

During the meeting, Amine proposed 3 main ideas that I will persue in the next weeks.

### Timeline
The goal is to introduce the time dimension into the visualization.
The given data will be annotated with timestamps that enables us to
divide the data into "epoques". Via a slider in the menubar the user should be able
to slide through the epoques to see where the changes of a specific metric happen.

### Epoque comparison
A user can define a fixpoint in the timeline. This fixpoint will be saved, and upon defining a second fixpoint,
the user will see a comparison (a delta) of the two fixpoints, i.e. a visualization of the delta between
those two points. In the coming weeks I will think about ways how to implement that.

### Selection of metric
Users should be able to select the metric that he wants to change as the user
navigates through the timeline. This selection can be implemented in a similar way
as the metric selection in the static code analysis.
For now, I will focus on selection of only one metric at a time.

## Meeting with Thierry
Conceptual discussion about visualization in the software city.
The question is: "How can we visualize a model in a way, such that
when we change the perspective (or the dimension) additional or different
data will be revealed?"
A user should be able to navigate the city and a view from the top should show different data than a view from the side.

Example:\
x-axis: time\
y-axis: model-element
When a user looks at an element it appears on the grid. This visualization
shows the concurrence of discovery of all the elements over time. This could get implemented
in the software city by saying that the timeline only reveals all the buildings that are
discovered by the participant at that time.

# Change-log Prototype
![week-13-whole-prototype.png](video-demos%2Fweek-13-whole-prototype.png)
* finalized the menubar for dynamically select metrics for each metaphor
* unified styling of all menu pop-ups
* overworked the visual representation of the buildings and planes. Now every object has a black outline, which makes it 
much easier to distinguish them from each other
* overworked dat.gui overlay. Now the height of the buildings can be adjusted during runtime.
The two sliders "Scale (%)" and "Normalize (%)" adjust the overall height of the building, plus if the heights differ by alot,
users can adjust the "Normalize (%)" slider to bring the heights more together.
* Fixed bug that when starting a fresh visualization not all ThreeJS elements get disposed from the canvas.
* Started implementing the timeline (see screenshot):
  * First of all, I created a new dataset for testing this purpose with an additional column "timestamp".
  * When starting the visualization a timeline get displayed
  * The timeline selects the timespan dynamically from the dataset the is uploaded in the data store.
  * By sliding the timeline slider, users can "scroll" through the different epoques
  * I fear that this will not be that performant for bigger datasets, but at the moment it works smoothly. I will test bigger datasets next week.


