# Week 23

## Meeting with Ekkart, Thierry, Amine
Key Takeaways:
* Remove some hard coding — so that everything should be derived from the headline of the table
* Proximity and relationships (user based or artifact based)
* The possibility to manually set the location of the building (drag and drop)
* Color-scale in threshold with a curve
* In BPMN, use the model layout
* Profiles to avoid manual configuration

## ToDos's
* Communicate with Thierry to:
   * Deploy a running current version of the tool
   * Provide him explanation of the tool such that he can present a demo himself
* Refactor the code
* Fix all bugs
* Last things to implement:
   * implement a way to save configuration of the mapping between metaphor -> attribute, such that we don't have to hard code anything.
      * because the tool is stateless and does not have a server where we can store configureations, I decided to store the config in the cookies with a default lifetime of 1 hour.
   * drag & drop moving around elements in the visualization.