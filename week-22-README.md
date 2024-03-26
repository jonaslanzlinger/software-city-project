# Week 22

## Meeting with Thierry / Amine
* selection of participant and task (combination of participant and task => trial)
* possibility for defining the length of epochs (in order to decrease the number of epochs)
   * this is only needed for the java source code type, because in the eye tracking data i don't build epochs
* meeting setup with Thierry about the data and the models (ask him to provide the models)
* focus on BPMN data for now
* i can drop any columns that I want
* in BPMN data there is only 2 layers of grouping: model-g3.bpmn;title-for-questionID_9
   * the tabName_element attribute in the dataset is the whole grouping path
* find a way to have a microservice deployed that takes a file upload and generates the data frame that i need
   * python plumber
   * there is also an alternative for JS. Just look it up on google.

## Changes in the prototype
* [x] Java source code type is now working the same as the eye tracking data type
* [x] Adopted the type eye tracking with BPMN data.
* [x] If eye tracking BPMN is selected, when selecting the visualization parameters, users can now also input a participant and a task. the data will get filtered and the city is built only on that filtered data.
* [x] Created a jupyter notebook to easily perform data preparation on the raw data: [readAndWriteFile.ipynb](application/readAndWriteFile.ipynb)
   * the output of this script based on the provided raw data can be found here: [out1.csv](application/data/out1.csv)

## ToDo's
* The eye tracking BPMN does not work properly on the provided data. Somehow buildings disappear when sliding through the timeline
* Think about how to visualize the provided raw data for the java source code experiment.