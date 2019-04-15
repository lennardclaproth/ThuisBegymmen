using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace Thuisbegymmen {
    public class Order {
        public int OrderId { get; set; }
        [Required]
        public string OrderDatum { get; set; }
        [Required]
        public string Status { get; set; }
        [Required]
        public string Comments { get; set; }
        public string Naam {get ; set; }
        public string Achternaam {get ; set; }
        public string EmailAdres {get; set; }
        public string StraatHuisnr {get; set;}
        public string Postcode {get; set;}
        public int? AccountId { get; set; } // FK van de Order tabel
        public Account Account { get; set; } // navigation property naar Order tabel
    }

}