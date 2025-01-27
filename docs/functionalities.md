# Functionalities

<img src="resources/banner.png" width="1000">

#### Visualization Types
> Visualize different data types for different purposes, according to the underlying dataset (for now: "java-source-code", "eye-tracking-java-source-code").

#### Tabular View of Data
> Provides good discoverability for loaded datasets via a tabular view of the data records. Includes features like navigation, searching, and sorting.

#### Datafield Configuration
> Allows the loading of any dataset into the tool via a mapping of "groupingPath" and "timestamp" to respective selectable columns in the dataset.

#### Metaphor Mapping
> Enables the creation of the desired visualization output by visualizing key data fields as desired metaphor features. A wide range of combinations allows for the creation of various cities.

#### Persistence
> The backend server stores computed metrics in a MongoDB instance. This accelerates the process of loading precomputed visualizations—compute only once.

#### Uninterrupted Workflow
> The backend server processes requests for new repositories by forwarding them to the "metrics-computation-service." This enables non-blocking metrics computation, allowing users to continue analyzing different repositories while the request is being completed.

#### Easy Data Collection
> Users don't need to collect data, extract datasets, or pre-compute metrics. Simply provide a GitHub URL to the tool for enhanced usability.

#### Responsiveness of Status
> Computing metrics might take some time. To inform users of the readiness, the tool provides status symbols to show the current status of each repository request.

#### Data Dump
> Loaded datasets are downloadable with a button click. A local copy of metrics (in CSV format) can be used for manual uploads in case of a faulty backend server. This feature is also useful for sharing data exports with others.

#### City Metaphor Features
> The city metaphor displays various information at once. Features include buildings, blocks (planes), size, height, and color (using HSL: hue, saturation, lightness) to represent key metrics.

#### Model Tree Structure
> The model tree displays the hierarchical structure of the entire codebase, enabling space navigation and better exploration.

#### Info Panel
> Clicking on a city element opens an info panel showing in-depth information about the selected element. It includes charts that display the evolution of the entity over time.

#### Timeline
> Time navigability: Depending on the selected datatype for the city, scrolling through the commit history or the experiment data is enabled, updating the visualization at each step.

#### Timeline Value Display
> Shows the current visualized commit hash and its respective timestamp. This allows easy understanding of the time dimension and locating an individual commit.

#### Copy Commit Hash Button
> Provides an easy way to further navigate to an individual commit on GitHub. Drill down and investigate the code base.

#### Snapshot Picker
> Enables input of a specific snapshot or commit in the city. This allows a detailed view of differences between commits to track the city’s evolution.

#### Aggregation Functions
> The aggregation function determines how the city should be built, i.e., how values are computed for the metaphor features. By adhering to the Open/Closed Principle (O/C), additional aggregation functions can be implemented in the future.

#### GUI
> The GUI in the top right corner enables customization of the displayed visualization. Features include saturation threshold data fields, threshold levels, height, and normalization.

#### Camera Controls
> Enables navigation and interactivity with the visualization: hover (highlight), click (info panel + move to location in model tree), click + drag (pan), right-click + drag (move), mouse wheel (zoom).

#### Highlight Elements
> In the Model Tree, a color picker allows for highlighting individual city elements over multiple snapshots. This improves the discoverability of elements, effectively "bookmarking" them.

#### Fixed City Element Positions
> When building the city, each city element is assigned a fixed position in the visualization. This is necessary due to the dynamic nature of code projects. Entities might be created, renamed, or deleted, leading to different positions in the city. Fixed positions make elements easy to find and track while navigating through time.

#### Arrow Indicator
> When selecting a city element (either by clicking on the element or the corresponding Model Tree entry), an arrow indicator is shown to "bookmark" the element and keep track of it while navigating through time.