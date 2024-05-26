#pragma strict

var enemySpeed:int;

function Start () {

}

function Update () {
    var amtToMove = enemySpeed * Time.deltaTime;
    transform.Translate(Vector3.down * amtToMove);
    if(transform.position.y <= -4.7) {
        transform.position.y = 6.5;
        transform.position.x = Random.Range(-6, 6);
    }
}