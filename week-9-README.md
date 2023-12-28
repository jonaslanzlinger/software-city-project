# Week 8

## Notes from discussion with Amine
* Focus on programming a prototype.
* Implement the tree structure inside the visualization service for data. For now, just focus on Java source code data.
* For now, don't bother about the Bounded Context structure.

## Changes in the prototype
I have started to implement the grouping functionality in the prototype but after the discussion with Thierry,
I decided to continue with the work on the concept. Therefore, the prototype did not change much this week.
The current state of the dynamic grouping functionality is as follows:
* added a new navigation bar menu "Grouping" where the user can drag & drop an attribute of the selected dataset
into the targetGroup (for grouping).
* the attributes in the sourceGroup are loaded dynamically, depending on the data that has been uploaded.
* The grouping doesn't do anything at the moment, I just implemented the UI for that.

![week-8-grouping-functionality.png](video-demos%2Fweek-8-grouping-functionality.png)
## Concept
Here some excerpts of the concept so far. See the full drawio notebook, [here](concept.drawio).


![concept-drawio-screenshot-everything.png](video-demos%2Fconcept-drawio-screenshot-everything.png)


![concept-drawio-screenshot-1.png](video-demos%2Fconcept-drawio-screenshot-1.png)


![concept-drawio-screenshot-2.png](video-demos%2Fconcept-drawio-screenshot-2.png)


![concept-drawio-screenshot-3.png](video-demos%2Fconcept-drawio-screenshot-3.png)


## Conclusion
Generally I think it would make sense to work on how to actually conceptualize the visualization for our use case.
I would suggest that I would not work on programming a whole application (like I did in the past weeks), rather
implementing small sub-solutions for specific use cases. As an example, I would work on specifying a way
how to "drill-down/roll-up" in a software city. After the use case is clear, I would implement that in a static
way, without a microservice architecture, without UI and without the user having the ability to adjust things or move around.