#pragma strict

var pScore:GUIText;
var eScore:GUIText;

function OnGUI()
{
	pScore.text = "Player Score: " + Ball.playerScore ;
	eScore.text = "Enemy Score: " + Ball.enemyScore;
}