#region Using Statements
using System;
using System.Collections.Generic;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Content;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
using Microsoft.Xna.Framework.Storage;
using Microsoft.Xna.Framework.GamerServices;
using Microsoft.Xna.Framework.Audio;
#endregion

namespace Splash
{
    /// <summary>
    /// This is the main type for your game
    /// </summary>
    public class Game1 : Game
    {
        private GraphicsDeviceManager graphics;
        private SpriteBatch spriteBatch;

        private Texture2D background;
        private Rectangle backgroundRect;
        private Texture2D viking;
        private Rectangle vikingRect;
        private Texture2D mole;
        private Rectangle moleRect;
        private Texture2D[] moleFamily = new Texture2D[3];

        SoundEffect soundHit;

        Random rnd = new Random();
        double spawnTime = 0;
        int score = 0;
        public static int SCORE_POINTS = 75;
        private int moleIndex = 0;

        public Game1()
            : base()
        {
            graphics = new GraphicsDeviceManager(this);
            Content.RootDirectory = "Content";
        }

        /// <summary>
        /// Allows the game to perform any initialization it needs to before starting to run.
        /// This is where it can query for any required services and load any non-graphic
        /// related content.  Calling base.Initialize will enumerate through any components
        /// and initialize them as well.
        /// </summary>
        protected override void Initialize()
        {
            this.Window.Title = "SCORE: " + score;
            IsMouseVisible = false;
            base.Initialize();
        }

        /// <summary>
        /// LoadContent will be called once per game and is the place to load
        /// all of your content.
        /// </summary>
        protected override void LoadContent()
        {
            // Create a new SpriteBatch, which can be used to draw textures.
            spriteBatch = new SpriteBatch(GraphicsDevice);
            
            // TODO: use this.Content to load your game content here
            background = Content.Load<Texture2D>("grass");
            viking = Content.Load<Texture2D>("viking");
            //mole = Content.Load<Texture2D>("mole");
            moleFamily[0] = Content.Load<Texture2D>("mole0");
            moleFamily[1] = Content.Load<Texture2D>("mole1");
            moleFamily[2] = Content.Load<Texture2D>("mole2");

            backgroundRect = new Rectangle(0, 0, (int)(background.Width / 0.5), (int)(background.Height));
            vikingRect = new Rectangle(0, 0, (int)(viking.Width / 1.5), (int)(viking.Height / 1.5));
            moleRect = new Rectangle(0, 0, (int)(moleFamily[0].Width / 2), (int)(moleFamily[0].Height / 2));

            soundHit = Content.Load<SoundEffect>("hit");
        }

        /// <summary>
        /// UnloadContent will be called once per game and is the place to unload
        /// all content.
        /// </summary>
        protected override void UnloadContent()
        {
            // TODO: Unload any non ContentManager content here
        }

        /// <summary>
        /// Allows the game to run logic such as updating the world,
        /// checking for collisions, gathering input, and playing audio.
        /// </summary>
        /// <param name="gameTime">Provides a snapshot of timing values.</param>
        protected override void Update(GameTime gameTime)
        {
            if (GamePad.GetState(PlayerIndex.One).Buttons.Back == ButtonState.Pressed || Keyboard.GetState().IsKeyDown(Keys.Escape))
                Exit();
            spawnTime += gameTime.ElapsedGameTime.TotalSeconds;
            vikingRect.X = Mouse.GetState().X - vikingRect.Width / 2;
            vikingRect.Y = Mouse.GetState().Y - vikingRect.Height / 2;
            
            if (spawnTime >= 1.5)
            {
                moleRect.X = rnd.Next(0, this.Window.ClientBounds.Width - moleRect.Width);
                moleRect.Y = rnd.Next(0, this.Window.ClientBounds.Height - moleRect.Height);
                moleIndex = rnd.Next(0, 3);
                spawnTime = 0;
            }

            if (Mouse.GetState().LeftButton == ButtonState.Pressed)
            {
             
                if (moleRect.Intersects(vikingRect))
                {
                    moleRect.X = rnd.Next(0, this.Window.ClientBounds.Width - moleRect.Width);
                    moleRect.Y = rnd.Next(0, this.Window.ClientBounds.Height - moleRect.Height);
                    spawnTime = 0;
                    moleIndex = rnd.Next(0, 3);
                    soundHit.Play();
                    score += SCORE_POINTS;
                    this.Window.Title = "SCORE: " + score.ToString();
                }
               
                
            }

            base.Update(gameTime);
        }

        /// <summary>
        /// This is called when the game should draw itself.
        /// </summary>
        /// <param name="gameTime">Provides a snapshot of timing values.</param>
        protected override void Draw(GameTime gameTime)
        {
            GraphicsDevice.Clear(Color.CornflowerBlue);

            // TODO: Add your drawing code here
            spriteBatch.Begin();
            spriteBatch.Draw(background, backgroundRect, Color.White);
            //spriteBatch.Draw(mole, moleRect, Color.White);
            spriteBatch.Draw(moleFamily[moleIndex], moleRect, Color.White);
            spriteBatch.Draw(viking, vikingRect, Color.White);
            spriteBatch.End();
            base.Draw(gameTime);
        }

    }
}
