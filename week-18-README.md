# Week 18
The following objectives have been achieved this week:
* For the static java source code visualization the basic structure of the largest state of the city persists now to all epoques in the timeline. This improves readability of the model.
* All grouping elements (i.e. packages) get assigned a color
* The assigned color to the grouping elements persists now to all models from every epoque. This improves readability of the model.
* Model Tree: Introduced a new button in the navigation bar. When the model has been generated, users can click on the "Model Tree" button to inspect the package structure.
   * There are still a lot of bugs in this feature
   * Potentially redo this without the treejs-library to fully customize the tree elements

## Current state screenshot
<img src="video-demos%2Fweek-18-current-state.png" width="800">

## Todo's next week
I think slowly the key features of the prototype are in place. There are still some bugs in a few features that I wish to fix; some of the are:
* Model Tree: plenty of bugs (I think there is a more severe underlying issue that needs to be fixed in method "TreeOfBuildings.buildTreeStructure()")
* when clicking on the close button on any popup (e.g. elementInfo) all popups get closed. The close button should only close this specific popup window
* Think about meaningful datasets (most of them don't work at the moment because I have changed them a lot). The working ones are:
* [testFile-03-eye-tracking-java-source-code](https://github.com/jonaslanzlinger/software-city-project/tree/main/application/data/testFile-03-eye-tracking-java-source-code.csv)
* [testFile-06-java-source-code](https://github.com/jonaslanzlinger/software-city-project/tree/main/application/data/testFile-06-java-source-code.csv)
* [testFile-07-eye-tracking-java-source-code](https://github.com/jonaslanzlinger/software-city-project/tree/main/application/data/testFile-07-eye-tracking-java-source-code.csv)
* infoPanel: format this in a more meaningful way. Also work on the buildingData section to actually display the datapoints for this building.