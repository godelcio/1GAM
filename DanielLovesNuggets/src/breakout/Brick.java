package breakout;

import javax.swing.ImageIcon;
//import javax.swing.JOptionPane;

public class Brick extends Sprite {
	String brickie = "/breakout/images/nugget.png";
	boolean destroyed = false;
	
	public Brick(int x, int y){
		this.x = x;
		this.y = y;

		ImageIcon ii = new ImageIcon(this.getClass().getResource(brickie));
		image = ii.getImage();
		
		this.width = image.getWidth(null);
		this.height = image.getHeight(null);
		
		destroyed = false;
	}
	
	public boolean isDestroyed(){
		return destroyed;
	}
	
	public void setDestroyed(boolean destroyed){
		this.destroyed = destroyed;
	}
}
