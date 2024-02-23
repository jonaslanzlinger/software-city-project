# Week 15 & 16

Following our meeting with Barbara and Amine, I dedicated the past two weeks to completely revamping the project from scratch. Here, I outline the key takeaways from our recent meeting and present the results of the new prototype.

## Meeting Takeaways (08.02.2024)
* The implementation of the prototype should focus on the essentials. Don't spend time persuing something that we don't need.
* Polish the prototype in a way, such that it is presentable and robust. Therefore, ...
   * Revamp the prototype from scratch
   * Replace the microservice architecture by a monolithic approach
      * This includes merging the two microservices "data-analyzer" and "visualizer" into one
   * Refactor the code: This will help going further into the implementation
      * This includes replacing the capability of the generic upload data type
   * Lookahead: A possible path for further development could be to integrate the visualization tool into the Github pipeline


## Todo's for the upcoming weeks
* Schedule a meeting with Thierry for aligning what to write about
* Making the prototype work for the BPMN model data aswell
* Implement the visualization of the data in each of the cases:
   * Java Source Code
      * Static code analysis: show how the code base is evolving through time (use timeline)
      * Eye tracking: Show the eyeFixation per building over time (use timeline)
   * BPMN model data
      * Eye tracking: Show the eyeFixation per building over time (use timeline)
* Integrate the tool into the Github Pipeline:
   * Use Github Pages (github.io) for hosting the tool
   * Use the Upload button for providing the individual commits

## Prototype
I recreated the tool from scratch using a monolithic approach. Doing that, I focused also on refactoring the code and making the visualization of data more robust.

For accountability I left the old prototype version in this git repository.

The new prototype is located in this repository under: ./software-city-project-fresh

To run the prototype locally, simply perform "npm run dev" in the terminal.