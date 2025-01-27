# Analysis

## Repositories
- Repo 1: CloudflareAPI (https://github.com/robinbraemer/CloudflareAPI)
- Repo 2: Proteus (https://github.com/noboomu/proteus)
- Repo 3: Educational-Platform (https://github.com/anton-liauchuk/educational-platform)
- Repo 4: JApiDocs (https://github.com/YeDaxia/JApiDocs)
- Repo 5: Logger (https://github.com/orhanobut/logger)
- Repo 6: Catnap (https://github.com/gregwhitaker/catnap)
- Repo 7: Roboslack (https://github.com/palantir/roboslack)
- Repo 8: Restsuite (https://github.com/supanadit/restsuite)
- Repo 9: OpenAI-webflux-java (https://github.com/reactiveclown/openai-webflux-java)
- Repo 10: OpenPGP-Api (https://github.com/open-keychain/openpgp-api)
- Repo 11: MigrationMiner (https://github.com/hussien89aa/MigrationMiner)
- Repo 12: EventBus (https://github.com/greenrobot/EventBus)

I will choose one or more of the above repositories, because the to-be-analyzed repo should be medium-size,
written
in Java, easy to understand, and expose some interesting insights. To choose the best repository, all repos
have been analyzed, and loaded into the tool's database.

<img src="resources/summer-extension-week-8-loaded-repos.png" alt="all loaded repositories" width="300"/>

## Analysis Procedure

In the next step, I have opened the visualization of each repository in the tool, to see, if anything
interesting is observable. The analysis is grouped in 4 topics, where each topic answers one specific
family of questions. The topics are:

- Bird-eye view
- God classes
- Complex classes

## Analysis Results

### Bird-eye view

For obtaining a broad overview of the repository, including the evolution of the code base, I have used
the following procedure:

- Load repository
- To get a feeling of the size of the components:
    - Size: "LOC"
    - Height: "LOC"
- Scroll through the timeline, to see high-volatile areas
- Firstly, it is necessary to keep in mind, that during the development process some components might get
  renamed, moved, deleted, or new components are created. This is visible by scrolling through the timeline.
- Next, look for extreme "LOC" values in the timeline, and find the commits before and after the commit
  in which the "LOC" value has drastically changed. When those boundary commits have been found,
  further drill down, by having a look at the changes in the code, to see what has been changed.
- Obtain bird-eye by looking at the city:
    - Identify high-volatile areas
    - Identify key components
    - Obtain feeling of the size of the components
    - Identify which classes are grouped together
    - Identify which components have been created / deleted / renamed

Going through the procedure described above, I have found the following things, using the software city tool.

Example Repository: CloudflareAPI (https://github.com/robinbraemer/CloudflareAPI)

In the current state, the repository is not very big, and the visualization is easy to understand.
The repository has had three "main" classes: "UserService" and "ZoneService". Those
services got deleted in the commit number 28, and never reappeared. This is a clear indicator, that the
repository has been refactored, and the services have been moved to another location.
In the current state, the system is composed of one main package "objects" that contains definitions for
object types and how they should be represented. The granularity of the components is very high, as all
the city buildings are about the same height. This suggests, that the components are very similar in size.


### God classes

Next, I have investigated the repositories for god classes. God classes are classes that are doing too
much, and are violating the single responsibility principle. God classes don't necessarily have high "LOC"
values. For example, a class that is doing too many unrelated small things, might have a low "LOC" value,
but is still a god class. To find god classes, I want to bring two metrics into proportion: "LOC" and
"CBO". By this, I set the size of the buildings to the metric "LOC", and the height of the buildings to
the metric "CBO". This way, if a class has a high "CBO" value compared to the "LOC" value, it is likely a
god class.

Example Repository: JApiDocs (https://github.com/YeDaxia/JApiDocs)

In the screenshot below you can see the resulting visualization.

<img src="resources/summer-extension-week-8-japidocs.png" alt="JApiDocs visualization" width="400"/>

Setting the timeline at the complete end, reveals that the buildings are rather high, while the size is
small. This suggests, that there is a tendency to classes with proportionally high cbo values compared to
the loc values, which leads to my conclusion, that there must be some god classes.

The highlighted building in the screenshot is the [SpringControllerParser](https://github.com/YeDaxia/JApiDocs/blob/4b92eee3be6a79d49d394253b17c9442c9c337c8/library/src/main/java/io/github/yedaxia/apidocs/parser/SpringControllerParser.java) class. After copying the commitHash, and have a
look at the class code, it becomes clear, that this is definitely a god class as it displays the
following characteristics:
- Amount of responsibilities: The class is doing too much - handling controller annotations, handling
  method annotations, parsing request parameters, handling responses, and even converting data types. In
  that sense, it is violating the single responsibility principle.
- Operations on various objects: The class is working with several different types of objects, and is
  performing many operations on them. These operations should be split up into multiple different
  controllers and parsers.
- Dependency on other classes: Regarding the separation of concern, the handling of spring annotations
  should be separated from the parsing logic and specific parts be delegated to dedicated classes.
- Conclusion: This class is a god class, and should be refactored.


### Complex classes

Complex classes are classes that are unnecessarily complex, and are hard to understand. To find complex
classes, I utilized the metrics described in the CK Metrics Suite.
In this next example, I want to display how to find modules or classes inside the to-be-analyzed
repository that are not optimal, using the (CK Metrics Suite)[https://medium.com/@benkaddourmed54/analyzing-ck-metrics-results-and-quality-assessment-a70ba56534f0].
The CK Metrics Suite consists of the following six metrics:

- CBO: Coupling between object classes
- DIT: Depth of inheritance tree
- LCOM*: Lack of cohesion in methods (LCOM* is a slightly modified version of the standard LCOM metric,
  giving values between 0 and 1)
- NOC: Number of children
- RFC: Response for a class
- WMC: Weighted method count

While using single metrics alone can already be useful, this might not always lead to the best results,
and could be misleading. For example a class that highly relies on external libraries, might have a very
high CBO metric value, but isn't necessarily complex. Also, utility classes are typically very simple to
understand, but have a high CBO value nonetheless (regardless whether it conforms with the single
responsibility principle).
Therefore, it might be even more valuable to combine multiple metrics in the visualization.
I have come up with 3 metric combinations, that tackle 3 individual use-cases:

#### Identify classes with multiple high metrics
Classes with high values in multiple metrics are likely "hot spots" in the code, and should be
addressed first for refactoring. To achieve this, I set the size of the building to the metric
CBO, the height of the building to the metric RFC, and the color-hue to the metric WMC. This way,
classes with high values in all three metrics will be displayed either BIG, TALL, and/or in CYAN COLOR.
Because we always want to tackle the "big fish" first, I also set the LOC metric to the
color-lightness. This way, if a class has a low LOC value, the building will be displayed in a LIGHT COLOR,
and it can be ignored for now.

Example Repository: EventBus (https://github.com/greenrobot/EventBus)

<img src="resources/summer-extension-week-8-eventbus.png" alt="EventBus visualization" width="400"/>

The screenshot above shows the visualization of the EventBus repository with the metaphor mapping
described before. The highlighted building is the [EventBusAnnotationProcessor](https://github.com/greenrobot/EventBus/blob/master/EventBusAnnotationProcessor/src/org/greenrobot/eventbus/annotationprocessor/EventBusAnnotationProcessor.java) class. This class is displayed small, tall, and
pink. This indicates, that the class has a low CBO value, but high RFC and WMC values. This suggests,
that the class is too complex, and should be refactored. When copying the commit hash value and having a look
at the code, I found that the class is indeed complex. For example, there is a high cyclomatic complexity,
due to lots of nested if-else statements, and loops (see method "checkForSubscribersToSkip").
Another problem I found is the violation of the single responsibility principle. Without diving too deep
into the ins and outs of the class, it appears like the class is handling multiple unrelated things like
handling annotations, creating and writing to files, generating code, and also extensive error handling.
This class should be refactored.


#### Identify classes with complex logic
When looking at bare complexity metrics, this does not give enough information, whether a class is
indeed too complex. It needs to be brought into proportion, e.g. with the size. Therefore, if a class
has both high RFC and high WMC values, it is likely that the class is too complex (from the logic
point of view). To achieve this, I have set the size of the building to the metric RFC, the height to
the metric WMC, and the color-hue, as well as the color-lightness to the metric LOC. This way, if a
building is too complex, it will be displayed BIG, TALL, and in "some" color (see limitations).
Depending on the size of the class, this color will be different.

Example Repository: Restsuite (https://github.com/supanadit/restsuite)

For this example, I have chosen to show, how the timeline can be utilized to find occasion where a class
has added some functionality that increase its complexity. To display this, I show the difference between
this repositories commit number 51 and number 52. As you can see, the size and the height of the building
increased, meaning that the RFC and the WMC values have increased. This suggests, that the class has
become more complex. The highlighted building is the [SocketIoPanel](https://github.com/supanadit/restsuite/commit/bbbd8b725cf5e190ccc536e7c741bbda2882ac2c#diff-96fa613718bafbda135aa9dbe1f1675d65148919076ca65c420eb43ef3eb158a) class. After checking the
code on GitHub, I was able to verify that the class has indeed become more complex, as you can see in the
screenshot further below.

Commit 51:

<img src="resources/summer-extension-week-8-restsuite-commit-51.png" alt="commit 51" width="200"/>

Commit 52:

<img src="resources/summer-extension-week-8-restsuite-commit-52.png" alt="commit 52" width="200"/>

Commits Difference in Code:

<img src="resources/summer-extension-week-8-restsuite-commit-difference.png" alt="diff" width="500"/>


Scrolling at the end of the timeline, I have found 3 main classes that are displayed big, tall, and in
some color. After checking the code on GitHub, I was able to verify, that those classes indeed are more
complex than the rest of the other system. A perfect example is the class [UrlParser](https://github.com/supanadit/restsuite/blob/master/src/main/java/com/supanadit/restsuite/helper/UrlParser.java).
This class is VERY complex especially in the method "getQueryParams". This method should definitely be
refactored, maybe split into multiple sub methods, to increase the readability and maintainability of the
class.

Here is a screenshot of the 3 main classes that are displaying an increased complexity:

<img src="resources/summer-extension-week-8-restsuite-complex-classes.png" alt="complex" width="500"/>


#### Identify class with low cohesion:
High LCOM* combined with other metrics like CBO suggest that a class is doing too much unrelated
things. Therefore, it might be subject for refactoring with the goal of high cohesion and single
responsibility. To achieve this, I have set the size of the building to the metric LCOM*, the height
to the metric CBO, and the color-hue, and the color-lightness to the metric LOC. This way, if a class has
low cohesion, it will be displayed BIG, TALL, and in "some" color (see limitations above). Depending
on the lightness of the color, the refactoring of this class has probably a higher or lower priority.

Unfortunately, the computation of the LCOM* metric is not working properly, but the procedure of finding
those low cohesion classes is similar to the few procedures described above. 