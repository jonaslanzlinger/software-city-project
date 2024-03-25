# Week 22

## Meeting with Amine
* selection of participant and task (combination of participant and task => trial)
* possibility for defining the length of epochs (in order to decrease the number of epochs)
* meeting setup with Thierry about the data and the models (ask him to provide the models)
* focus on BPMN data for now
* i can drop any columns that I want
* in BPMN data there is only 2 layers of grouping: model-g3.bpmn;title-for-questionID_9
   * the tabName_element attribute in the dataset is the whole grouping path
* find a way to have a microservice deployed that takes a file upload and generates the data frame that i need
   * python plumber
   * there is also an alternative for JS. Just look it up on google.