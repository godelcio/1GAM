﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PongoMono
{
    public class GameObjects
    {
        public Paddle PlayerPaddle { get; set; }
        public Paddle ComputerPaddle { get; set; }
        public Ball Ball { get; set; }
        public Score Score { get; set; }
    }
}
