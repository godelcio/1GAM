

#include <stdio.h>
#include <time.h>
#include <stdlib.h>
#include <conio.h>
#include<time.h>
#include<ctype.h>
#include <time.h>
#include <windows.h>
#include <process.h>


#include <stdlib.h>
#include <stdio.h>
//#include <windows.h>

// Prototypes
void draw_line(int col, int row);
//void show_score();
void add_segment();
void setup_level();

// Contants
const int maxrow=15, maxcol=77;
const int snake_start_col=33, snake_start_row=7;
const int up_key='a', down_key='z', left_key='o', right_key='p';
const int pause_length=500000;

// Global vars
int score, snake_length, speed, obstacles, level, firstpress, high_score=0;
//char screen_grid[maxrow][maxcol];
char screen_grid[15][77];
int direction = 'p';//right_key;
struct snake_segment {
	int row, col;
} snake[100];

void main()
{

	// Var declarations for main
	char keypress;

	do
	{
		int ia;
		for(ia = 0; ia<(speed*pause_length); ia++)
		{
			int j;
			j= 1+ia; // Pause
		}
		// if keypress, then check if is a direction key, if so change direction
		if (keypress = getchar())
			if((keypress == right_key) || (keypress == left_key) || (keypress == up_key) || (keypress == down_key))
				direction = keypress;
		// add a segment
		add_segment();
		// clean last snake's segment
		//SetCursorPos(snake[0].col, snake[0].row);
		printf(" ");  // remove snake segment from the array as well
		int ha;
		for(ha = 0; ha <= snake_length; ha++)
		{
			snake[ha-1] = snake[ha];
		}
		// display snake in yellow
		//SetConsoleTextAttribute(output_handle);
		//textcolor(YELLOW);
		int ib;
		for(ib = 0;ib<=snake_length; ib++)
		{
			//SetCursorPos(snake[ib].col, snake[ib].row);
//			textcolor();
			printf("O");
		}
		// move cursor away from the snake
		SetCursorPos(1,1);

		// The first press on each level, pause until a key is pressed
		if(firstpress)
		{
			while(!kbhit())
			{
				firstpress = 0;
			}
		}

		// Collision detection where walls are bad
		if((snake[snake_length-1].row>maxrow+1) || (snake[snake_length-1].row<=1) ||
			(snake[snake_length-1].col>maxcol-1) || (snake[snake_length-1].col<=1) ||
			// Collision detection where obstacles are bad
			(screen_grid[snake[snake_length-1].row-2][snake[snake_length-1].col-2]=='x'))
		{
			keypress = 'x'; // exit loop / game over
		}

		// Collision detection where snake is bad
		int b;
		for(b=0; b< snake_length-1; b++)
		{
			if((snake[snake_length-1].row) == (snake[b].row) &&
				(snake[snake_length-1].col) == (snake[b].col))
			{
				keypress = 'x'; // exit loop, game over
				break;
			}
		}

		// Collision detection where food is good
		if(screen_grid[snake[snake_length-1].row-2][snake[snake_length-1].col-2] == '.')
		{
			// Increase score and length of snake
			score += snake_length * obstacles;
//			show_score();
			snake_length++;
			add_segment();
			// If length of snake reaches a certain size, onto next level
			if(snake_length==(level+3)*2)
			{
				score += level * 1000;
				obstacles += 2;
				level++;
				if((level%5==0) && (speed>1)) // This is to increase speed every 5 levels
				{
					speed--;
				}
				setup_level(); // Display next level
			}
		}

		while (keypress !='x');

		// Game over message
		if(score > high_score)
		{
			high_score = score;
		}
//		show_score();
		SetCursorPos(30,6);
//		textcolor(LIGHTRED);
		printf("G A M E   O V E R");
		SetCursorPos(30,9);
//		textcolor(YELLOW);
		printf("Another Game? (y/n)? ");
		do keypress = getchar();
		while((keypress!='y') && (keypress!='n'));
	}
	while(keypress == 'y');
}

void setup_level()
{
	int row, col;
	// now set global variable for the level
	snake_length = level+4;
	direction = right_key;
	firstpress = 1;
	// fill grid with blanks
	for(row=0; row<maxrow; row++)
	{
		for(col=0; col<maxcol; col++)
		{
			screen_grid[row][col] = ' ';
		}
	}
	// fill grid with Xs and food
	int x;
	for(x = 0; x < obstacles * 2; x++)
	{
		row = rand() % maxrow;
		col = rand() % maxcol;
		if(x < obstacles)
		{
			screen_grid[row][col] = 'x';
		}
		else
		{
			screen_grid[row][col] = '.';
		}
	}
	// create snake array of snake lenght
	int g;
	for(g = 0; g < snake_length; g++)
	{
		snake[g].row = snake_start_row;
		snake[g].col = snake_start_col + 1;
	}
	// draw playing board
	draw_line(1,1);
	for(row=0; row<maxrow; row++)
	{
		//SetCursorPos(1, row + 2);
//		textcolor(LIGHTBLUE);
		printf("|");
//		textcolor(WHITE);
		for(col=0;col<maxcol; col++)
		{
			printf("%c", screen_grid[row][col]);
		}
//		textcolor(LIGHTBLUE);
		printf("|");
	}
	draw_line(1, maxrow+2);
	//show_score();
	SetCursorPos(2, maxrow+5);
//	textcolor(LIGHTRED);
	printf("~~ SNAKE GAME ~~ Left: %c, Right: %c, Up: %c, Down: %c, Exit: x. Any key to start",
			left_key, right_key, up_key, down_key);
}

void draw_line(int col, int row)
{
	SetCursorPos(col,row);
//	textcolor(LIGHTBLUE);
	for( col=0; col < maxcol; col++)
	{
		printf("=");
	}
}

void add_segment()
{
	switch(direction)
	{
		case 1://(right_key):
				snake[snake_length].row = snake[snake_length-1].row;
				snake[snake_length].col = snake[snake_length-1].col + 1;
				break;
		case 2://(left_key) :
				snake[snake_length].row = snake[snake_length-1].row;
				snake[snake_length].col = snake[snake_length-1].col-1;
				break;
		case 3://(up_key):
				snake[snake_length].row = snake[snake_length-1].row-1;
				snake[snake_length].col = snake[snake_length-1].col;
				break;
		case 4://(down_key):
				snake[snake_length].row = snake[snake_length-1].row+1;
				snake[snake_length].col = snake[snake_length-1].col;
				break;
	}
}

