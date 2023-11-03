using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;

public class CityBuilderScript : MonoBehaviour
{

    public GameObject building;

    Dictionary<string, int> data = new Dictionary<string, int>
        {
            {"CollectionsExample.java", 150},
            {"BufferenInputStreamExample.java", 231},
            {"Encapsulation.java", 307},
            {"EnumPizzaExample.java", 186},
            {"FileClass.java", 232},
            {"GenericInterface.java", 350},
            {"Assertions.java", 156},
            {"ClassNEstingInstantiateStaticNestedClass.java", 341},
            {"CustomComparator.java", 166},
            {"PrintWriterExample.java", 245},
            {"MapExample.java", 242},
            {"Refelction.java", 298},
            {"ReaderTheory.java", 621},
            {"FileInputStreamExample.java", 187},
            {"ByteArrayInputStreamExample.java", 467},
            {"Logging.java", 332},
            {"StackExample.java", 414},
            {"VectorExample.java", 510},
            {"WrapperClasses.java", 173}
        };

    // Start is called before the first frame update
    void Start()
    {

        int counter = 0;
        float height = 0;
        foreach (var d in data)
        {
            Debug.Log($"{d.Key}\t{d.Value}");
            height = d.Value / 100;

            GameObject newBuilding = Instantiate(building, new Vector3(transform.position.x + counter * 2, transform.position.y, 0), transform.rotation);
            newBuilding.transform.localScale = new Vector3(1, height, 1);
            newBuilding.transform.localPosition = new Vector3(transform.position.x + counter * 2, height / 2, 0);
            counter++;

        }
    }

    // Update is called once per frame
    void Update()
    {

    }
}
