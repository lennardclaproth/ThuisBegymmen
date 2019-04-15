using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace Thuisbegymmen {
    public class Image {
        public int ImageId { get; set; }
        [Required]
        public string ImageUrl { get; set; }
    
        public int ProductId { get; set; } // FK van de Product tabel
        public string Productnaam { get; set; }
        public Product Product { get; set; } // navigation property naar Product tabel
    }

}