using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MainCameraScript : MonoBehaviour
{

    public float sensX;
    public float sensY;

    public Transform orientation;

    public float xRotation;
    public float yRotation;


    // Movement of Camera
    public float moveSpeed;
    public float horizontalInput;
    public float verticalInput;
    public Vector3 moveDirection;

    // Start is called before the first frame update
    void Start()
    {
        Cursor.lockState = CursorLockMode.Locked;
        Cursor.visible = true;

    }

    // Update is called once per frame
    void Update()
    {
        // Camera orientation
        float mouseX = Input.GetAxisRaw("Mouse X") * Time.deltaTime * sensX;
        float mouseY = Input.GetAxisRaw("Mouse Y") * Time.deltaTime * sensY;
        yRotation += mouseX;
        xRotation -= mouseY;
        orientation.rotation = Quaternion.Euler(xRotation, yRotation, 0);

        // Camera movement
        horizontalInput = Input.GetAxisRaw("Horizontal");
        verticalInput = Input.GetAxisRaw("Vertical");
        moveDirection = orientation.forward * verticalInput * moveSpeed + orientation.right * horizontalInput * moveSpeed;
        orientation.position += moveDirection;

    }
}
