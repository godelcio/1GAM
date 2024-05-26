package snake2;

import java.awt.Color;
import javax.swing.*;

import javax.swing.JApplet;
import javax.swing.JFrame;

//public class Snake extends JFrame {
public class Snake extends JApplet {
	public Snake() {
		add(new Board());
		
		//setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setSize(320, 340);
		//setLocationRelativeTo(null);
		//setTitle("Bugs");
		
		//setResizable(false);
		setVisible(true);
	}
	
	public static void main(String[] args) {
		new Snake();
	}
}
