# Week 9 & 10
This weeks README file contains the documentation of last and this week.
In week 9, I met with Amine and discussed the further development of the prototype. The rest of the week
and the whole week 10 was dedicated to code the prototype, described as follows.

## Notes from discussion with Amine
* Focus on programming a prototype.
* Implement the tree structure inside the visualization service for data. For now, just focus on Java source 
code data.
* For now, don't bother about the Bounded Context structure.

## Changes in the prototype
In the last iteration the grouping algorithm was very stiff and was only able to display 1 layer of grouping.
I realized if I want to implement the possibility to display multiple layers of grouping,
I needed to represent all the data elements as a N-ary tree internally. This was more difficult than
I thought. The construction of the tree was not a big problem but reading the tree and building the
city based on this tree representation was a challenge.

The placement of the buildings and the planes was based on a grid layout. This leads to problems when we
want to introduce different building sizes, because then they will be very far away from each other,
already when there is only one huge building. Therefore, I decided to make use of the 'bin-packing' algorithm.
This algorithm places elements on an area depending on its dimensions by using as little space as possible.
I think the algorithm that I found is okay for now, but it still leaves some free space, if dimensions of elements
differ a lot.

Furthermore, I introduced the possibility to have buildings of different sizes. For now, the building width/length is
based on the 'linesOfCode' attribute. I imagine this should be customizable in the menu bar, but things like this really
take some time and are not the most important feature.

In general, I just implemented the functionalities for one specific data type (Java source Code, in a very specific format).
If someone uploads data that doesn't conform to this format, the visualization breaks.

How could I overcome this problem? Or is it normal, that I would need to implement this parsing
new for every data type / format?

### Screenshots of current state
<img src="video-demos%2Fweek-9%2610-demo1.png" width="700">
<img src="video-demos%2Fweek-9%2610-demo2.png" width="500">
<img src="video-demos%2Fweek-9%2610-demo3.png" width="250">
<img src="video-demos%2Fweek-9%2610-demo4.png" width="700">

### Upcoming developments
I have discovered the following problems with the current prototype that I will address in the coming week/weeks:
* All buildings are on the y-axis=0. The grouping levels go below 0 in steps of 0.2. This introduces the problem of having
'floating' elements like in this screenshot: <img src="video-demos%2Fweek-9%2610-floating-elements.png" width="500">
* For now, the input fields 'Dimensions' and 'City Spread' don't have an effect. I think it would take
quite some time to make the spread of the city adjustable with this 'bin-packing' algorithm.
* The Grouping menu in the Nav-Bar doesn't do anything yet. Question is, if I should still implement this functionality.
I assume that it is not the most important feature.
* The threshold GUI for the visualization doesn't work anymore. I need to fix that next week.
* New Use Case possibility: Implement a slider that lets the user navigate through a time-series of datapoints.
* New Use Case possitility: Implement the possibility to select which attributes of the data should be used for a given metaphor.

### Using the prototype
* npm start
* localhost:3001 -> upload data (try both [project-metrics-tapas-simple.csv](threeJS-software-city%2Fdata-analyzer%2Fresources%2Fdata%2Fproject-metrics-tapas-simple.csv)
and [project-metrics-tapas.csv](threeJS-software-city%2Fdata-analyzer%2Fresources%2Fdata%2Fproject-metrics-tapas.csv))
* localhost:3000 -> 'Dimensions' -> input something -> 'Visualize'
