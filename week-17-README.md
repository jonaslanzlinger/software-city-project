# Week 17
This week's focus has been on finishing the refactoring of the prototype. Additionally I have worked on the deployment of the prototype with Github Pages and Github Actions.

## Refactoring
The prototype has been refactored. The following additional features, bug fixes have been added to the prototype:
* Removed the distinction between the two microservices data-analyzer and visualizer. Now there is only one service.
* Added incremental data upload.
* Uploaded data can now be deleted again.
* Tabular view of the uploaded data
* Two different kinds of visualization
   * Static visualization: This visualization depicts a source code project divided into epoques according to the timestamps. Each epoque is a new 3D-model that gets displayed at the screen depending on where the timeline slider is located.
   * Eye tracking visualization: Here we are not talking about epoques. The experiment is conducted with the source code from one epoque, therefore, it is not necessary to worry about changes in the source code. This visualization is only concerned with how the metaphors are changing while scrolling through the timeline. E.g. the eyeFixationDuration.
* The slider now correctly determines the time window from the provided data
* Info panel (when you click on an visualization element) is not resizable, draggable, and bounded to the screen size.
* It is now possible to make multiple visualization trial without refreshing the page. => The ThreeJS elements and the dat.gui element get destroyed correctly after closing the visualization and get removed from the document entirely.
* In the static visualization the hovering and clicking on visualization elements works now also when the timeline slider is not at the complete maximum.
* Lots of work has gone into performance optimization of computing the models, because this resulted in some issues for extremely large datasets.

## Deployment
The prototype is deployed with Github Pages [here](https://jonaslanzlinger.github.io/software-city-project/).
Additionally I tried to set up Github Actions to always redeploy the prototype when the main branch get committed.
The preliminary deploy.yml file can be found [here](./.github/workflows/deploy.yml)

### Quick 'how to use the prototype'
* visit: [Prototype](https://jonaslanzlinger.github.io/software-city-project/)
* Click "Upload"
* Upload some file from [here](https://github.com/jonaslanzlinger/software-city-project/tree/main/application/data)
* depending on the file name select the corresponding Type.
* Click "Visualize"
* select the metaphor attributes
* Click "Visualize"
* Navigate the prototype by moving the timeline at the bottom of the screen.

## Notes of Meeting with Amine
Upcoming ToDo's
* Create a new popup with the package tree structure
* Assign to each element in the package tree an individual color. Mirror this assigned color in the prototype visualization.
* Change the static visualization in a way such that buildings stay in one position as the user is scrolling through the timeline. Idea: Maybe compute for every epoque the final epoque and just remove the elements that are not present in the individual epoque.