#pragma strict

var bulletSpeed:int;
var explosion:Transform;

function Start () {

}

function Update () {
    // amount to move bullet
    var amtToMove = bulletSpeed * Time.deltaTime;

    transform.Translate(Vector3.up * amtToMove);

    if(transform.position.y >= 6.3) {
        Destroy(gameObject);
    }
}

function OnTriggerEnter(otherObject:Collider) {
    if(otherObject.gameObject.tag == "enemy") {
        playerScript.playerScore += 100;
        otherObject.gameObject.transform.position.y = 6.5;
        otherObject.gameObject.transform.position.x = Random.Range(-6, 6);

        var tempExplosion:Transform;
        tempExplosion = Instantiate(explosion, transform.position, transform.rotation);

        Destroy(gameObject);
    }
}