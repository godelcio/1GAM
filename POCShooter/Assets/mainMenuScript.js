#pragma strict

function OnGUI() {
    var instructionText = "Instructions\nPress Left and Right arrows to move\nPress Spacebar to fire";
    GUI.Label(Rect(10, 20, 300, 200), instructionText);
    if(GUI.Button(Rect(10, 70, 200, 50), "Start Game")) {
        Application.LoadLevel(1);
    }
}