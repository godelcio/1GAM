#pragma strict

var cSpeed:float = 10.0;
var sFactor:float = 10.0;

static var playerScore:int = 0;
static var enemyScore:int = 0;

function Start () 
{
	rigidbody.AddForce(10.0, 0.0, 0.0);
}

function Update () 
{
	var cvel = rigidbody.velocity;
	var tvel = cvel.normalized * cSpeed;
	
	rigidbody.velocity = Vector3.Lerp(cvel, tvel, Time.deltaTime * sFactor);
	
	// Check right bounds
	if(transform.position.x > 23)
	{
		playerScore++;
		transform.position.x = 0;
		transform.position.y = 0;
	}
	
	// Check left bounds
	if(transform.position.x < -23)
	{
		enemyScore++;
		transform.position.x = 0;
		transform.position.y = 0;
	}
}