#pragma strict

var playerSpeed:int;
var playerLives:int;
static var playerScore:int;
var bullet:Rigidbody;
var explosion:Transform;

function Start () {

}

function Update () {
    // amount to move the player
    var amtToMove = (playerSpeed * Input.GetAxis("Horizontal")) * Time.deltaTime;
    
    // move/translate the player
    transform.Translate(Vector3.right * amtToMove);

    // fire bullet
    if(Input.GetKeyDown("space")) {
        var tempBullet:Rigidbody;
        tempBullet = Instantiate(bullet, transform.position, transform.rotation);
    }

    if(playerScore >= 5000) {
        playerScore = 0;
        Application.LoadLevel(3);
    }

    if(playerLives <= 0) {
        playerScore = 0;
        Application.LoadLevel(2);
    }
}


function OnGUI() {
    GUI.Label(Rect(10, 10, 200, 50), "Score: " + playerScore);
    GUI.Label(Rect(10, 30, 200, 50), "Lives: " + playerLives);
}

function OnTriggerEnter(otherObject:Collider) {
    if(otherObject.gameObject.tag == "enemy") {
        otherObject.gameObject.transform.position.y = 6.5;
        otherObject.gameObject.transform.position.x = Random.Range(-6, 6);
        var tempExplosion:Transform;
        tempExplosion = Instantiate(explosion, transform.position, transform.rotation);
        playerLives--;
    }
}