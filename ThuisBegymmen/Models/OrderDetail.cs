using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace Thuisbegymmen {
    public class OrderDetail {
        public int Hoeveelheid { get; set; }
        public string Status { get; set; }
        public int OrderId { get; set; } // FK van de Order tabel
        public Order Order { get; set; } // navigation property naar Order tabel
        public int ProductId { get; set; } // FK van de Product tabel
        public Product Product { get; set; } // navigation property naar Product tabel
    }
}