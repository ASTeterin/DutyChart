﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dutyChart.Models
{
    public class Group
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int NumberDutyHours { get; set; }
        public int Priority { get; set; }
    }
}
