﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework;

namespace PongoMono
{
    public abstract class Sprite
    {
        protected readonly Texture2D texture;
        public Vector2 Location;
        //protected readonly Rectangle gameBoundaries;
        public Rectangle gameBoundaries { get; set; }

        public int Width
        {
            get { return texture.Width; }
        }

        public int Height
        {
            get { return texture.Height; }
        }

        public Vector2 Velocity { get; protected set; }

        public Rectangle BoundingBox 
        {
            get
            {
                return new Rectangle((int)Location.X, (int)Location.Y, Width, Height);
            }
        }

        public Sprite(Texture2D texture, Vector2 location, Rectangle gameBoundaries)
        {
            this.texture = texture;
            Location = location;
            Velocity = Vector2.Zero;
            this.gameBoundaries = gameBoundaries;
        }

        public void Draw(SpriteBatch spriteBatch)
        {
            spriteBatch.Draw(texture, Location, Color.White);
        }

        public virtual void Update(GameTime gameTime, GameObjects gameObjects)
        {
            Location += Velocity;

            CheckBounds();
        }

        protected abstract void CheckBounds();
    }

}