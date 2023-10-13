
println("Importing data and create new metric.\n\n")

// Reading data from local csv file. Attributes:
//    -> [0]: Class name [<class>]
//    -> [1]: Eye fixation duration time value in milliseconds
values = [:]
new File("/Users/jonaslanzlinger/programming/software-city-project/dummy-data-eye-fixation-duration.csv").splitEachLine(",")
{fields ->
    // Add values to map
    values[fields[0]] = fields[1]
    // Logging all values
    println("Class: " + fields[0] + "   fixation_duration: " + values[fields[0]])
}


// Defining a new metric type
// This metric type can get associated to an element in a specific project level with a value:
//    result.addMetricValue(<metric-id>, <target-level>, <value>)
def metricId = coreAccess.getOrCreateMetricId("Eye-Tracking-metric", "fixation_duration",
    "The duration for which the eye focuses on this specific element.",
    false, "Eye-Tracking-metric");


// Access Sonargraph internal representation of the imported project
ICoreVisitor v = coreAccess.createVisitor()

// Iterate over the SourceFile classes
v.onSourceFile
{
    ISourceFileAccess sourceFile ->
    
    // Exclude Std. Library classes
    if(sourceFile.isExternal() || sourceFile.isExcluded())
    {
        return
    }
    
    // Logging all project classes
    // println(sourceFile.getShortName())
    
    // Check if this class has data in the data file 
    if(values.containsKey(sourceFile.getShortName()))
    {
        // Logging all values
        // println(values[sourceFile.getShortName()])
        value = Integer.parseInt(values[sourceFile.getShortName()])
        
        // Add element to metrics
        // Add metric value to this element
        // println(value)
        result.addMetricValue(metricId, sourceFile, value)
    } else
    {
        result.addMetricValue(metricId, sourceFile, 0)
    }
    
    result.addElement(sourceFile)
    
    // Continue
    v.visitChildren(type)
    
}

// Traverse the model
coreAccess.visitModel(v)

println("\n\nData successfully imported and new metric has been created.")