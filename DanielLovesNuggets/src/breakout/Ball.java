package breakout;

import javax.swing.ImageIcon;
//import javax.swing.JOptionPane;

public class Ball extends Sprite implements Commons {
	private int xdir = 0;
	private int ydir = 0;
	
	protected String ball = "/breakout/images/dani.png";
	
	public Ball() {
		
		xdir = 1;
		ydir = -1;
		ImageIcon ii = new ImageIcon(this.getClass().getResource(ball));
		image = ii.getImage();
		
		width = image.getWidth(null);
		height = image.getHeight(null);
		
		resetState();
		//JOptionPane.showMessageDialog(null, "end ball");
	}
	
	public void move(){
		x += xdir;
		y += ydir;
		
		if(x == 0){
			setXDir(1);
		}
		
		if(x == BALL_RIGHT){
			setXDir(-1);
		}
		
		if(y == 0){
			setYDir(1);
		}
	}
	
	public void resetState(){
		x = 200;
		y = 255;
	}
	
	public void setXDir(int x){
		xdir = x;
	}
	
	public void setYDir(int y){
		ydir = y;
	}
	
	public int getYDir(){
		return ydir;
	}
}
