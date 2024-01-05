# Week 11
This week I have worked on the following features:
* I refactored the creation of the buildings
and the grouping logic into an JavaSourceCodeDataObject.js
file.
* I created another DataObject-file for the use-case of BPMN's:
  * BPMNDataObject.js: This file specifies another way
  to parse data provided by the user. In this case a BPMN-model.
  Now I am able to also visualize BPMN-model data.
* In order to visualize BPMN data (and possibly all sorts of data),
I changed the way how data gets treated in the system.
  * When uploading data, specify which type of data you are providing.
  * When visualizing data, the data-analyzer service will
  respond with a tuple: { data: <uploaded-data> dataType: <dataType> }
  * The visualizer service will build the buildings according to the
  dataType that has been returned be the data-analyzer service.
  * For each new data format, we need to add the selection in the
  dropdown-lists and also add a new ObjectType mapper in the visualizer.
  * In this ObjectType mapper we can specify how the data should actually
  be mapped on the building object. The development of new ObjectType mappers
  should be very easy going forward.
* Dynamic matching of metaphor attributes and data attributes: I am 
starting to make thoughts about this.

## Open Points
* For now, I left the hard-coded logic for mapping the uploaded
data on one specific schema in the data-analyzer service. This will
change soon and I will implement a way that the mapping is done dynamically.
  (This is already implemented for the uploading of BPMN model data)