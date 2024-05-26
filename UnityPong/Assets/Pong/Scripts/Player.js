#pragma strict

// Declare variable to hold player's speed
var speed:int = 10;

function Update () 
{
	// Player input
	if(Input.GetButton("UP")) //&& transform.position.y <= 14)
	{
		transform.Translate(Vector3(0, speed, 0) * Time.deltaTime);
	}
	if(Input.GetButton("DOWN")) // && transform.position.y >= -12)
	{
		transform.Translate(Vector3(0, -speed, 0) * Time.deltaTime);
	}
	
	// Check vertical boundaries
	if(transform.position.y > 14)
	{
		transform.position.y = 14;
	}
	
	if(transform.position.y < -12)
	{
		transform.position.y = -12;
	}
}