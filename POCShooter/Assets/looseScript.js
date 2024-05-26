#pragma strict

function OnGUI() {
    if(GUI.Button(Rect(10, 10, 300, 50), "You lost. Press to play again.")) {
        Application.LoadLevel(0);
    }
}