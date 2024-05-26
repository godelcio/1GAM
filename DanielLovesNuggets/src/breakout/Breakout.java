package breakout;

//import javax.swing.JFrame;
//import java.applet.*;

import javax.swing.*;


//public class Breakout extends JFrame {
public class Breakout extends JApplet {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public Breakout() {
		try {
			add(new Board());
			//JOptionPane.(getRootPane(), "added new board");
			//setTitle("Daniel loves nuggets");
			//setDefaultCloseOperation(EXIT_ON_CLOSE);
			setSize(Commons.WIDTH, Commons.HEIGHT);
			//JOptionPane.showMessageDialog(getRootPane(), "set size");
			//setLocationRelativeTo(null);
			setIgnoreRepaint(true);
			//setResizable(false);
			setVisible(true);
		}
		catch(java.lang.NullPointerException e) {
			JOptionPane.showMessageDialog(rootPane, e.toString());
		}
		
	}
	
	public static void main(String args[]) {
		new Breakout();
	}
}
