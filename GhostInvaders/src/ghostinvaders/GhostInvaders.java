package ghostinvaders;

import javax.swing.JApplet;
//import javax.swing.JFrame;

public class GhostInvaders extends JApplet implements Commons {


	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public GhostInvaders() {
		add(new Board());
		//setTitle("Ghost Invaders");
		//setDefaultCloseOperation(EXIT_ON_CLOSE);
		//setSize(BOARD_WIDTH, BOARD_HEIGHT);
		//setLocationRelativeTo(null);
		setVisible(true);
		//setResizable(false);
	}
	
	public static void main(String[] args) {
		new GhostInvaders();
	}
}
