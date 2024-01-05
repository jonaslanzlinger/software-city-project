# Week 11
This week I have worked on the following features:
* I refactored the creation of the buildings
and the grouping logic into an JavaSourceCodeDataObject.js
file.
* I created another DataObject-file for the use-case of BPMN's:
  * BPMNDataObject.js: This file specifies another way
  to parse data provided by the user. In this case a BPMN-model.
  Now I am able to also visualize BPMN-model data.

In the picture below is a visualization of a BPMN-model, parsed
by the BPMNDataObjectjs.

<img src="video-demos%2Fweek-11-first-visualized-bpmn.png" width="500">

* In order to visualize BPMN data (and possibly all sorts of data),
I changed the way how data gets treated in the system.
  * When uploading data, specify which type of data you are providing.
  * When visualizing data, the data-analyzer service will
  respond with a tuple: { data: <uploaded-data>, dataType: <data-type> }
  * The visualizer service will build the buildings according to the
  dataType that has been returned be the data-analyzer service.
  * For each new data format, we need to add the selection in the
  dropdown-lists and also add a new ObjectType mapper in the visualizer.
  * In this ObjectType mapper we can specify how the data should actually
  be mapped on the building object. The development of new ObjectType mappers
  should be very easy going forward.
* Dynamic matching of metaphor attributes and data attributes
  * I have started to implement the UI for the dynamic metaphor to attribute matching
  * Created a prototype of a generic data object class to parse any data type.
  * I have the implementations of those two features only locally because they don't work
  at the moment. I will continue development on these features next week.

Here is the current progress of this GenericDataObject.js class.

<img src="video-demos%2Fweek-11-generic-data-object.png" width="500">

## Open Points
* For now, I left the hard-coded logic for mapping the uploaded
data on one specific schema in the data-analyzer service. This will
change soon and I will implement a way that the mapping is done dynamically.
  (This is already implemented for the uploading of BPMN model data, and the stubs
for the GenericDataObject.js are present.)
* The prototype gets increasingly dynamic. Therefore, I need to refactor the hard-coded
parts in the data-analyzer and the visualizer services.
* Grouping is done static. I cannot imagine how that could be dynamic, because if the user
selects an attribute for the grouping, that is not representing any hierarchy by itself,
the grouping would not work. I think the best approach for now would be to write for each data type
a new DataObject that hard-codes the grouping of the data. This has the drawback that a user
would not be able to change the grouping at run-time.