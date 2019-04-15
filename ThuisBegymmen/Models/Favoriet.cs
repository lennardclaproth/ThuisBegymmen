using System;
using System.Collections.Generic;
using System.Text;

namespace Thuisbegymmen
{
    public class Favoriet // Favorieten tabel met 2 foreign keys als composite key van deze table.
    {
        public int ProductId { get; set; } // foreign key naar Product table
        public Product Producten { get; set; } // navigation property

        public int? AccountId { get; set; } // foreign key naar Account table
        public Account Account { get; set; } // navigation property
    }
}