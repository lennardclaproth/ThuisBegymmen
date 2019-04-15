using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace Thuisbegymmen
{
    //De model van account, elke individuele variabele representeert een kolom in de tabel.
    public class Product
    {
        //Voeg [JsonIgnore] toe boven of voor de variabele die refereert naar een andere tabel (Foreign Key).
        public int ProductId { get; set; }
        [Required]
        public string Productnaam { get; set; }
        [Required]
        public string Discriminator { get; set; }
        [Required]
        public string Productbeschrijving { get; set; }
        public int Breedte { get; set; }
        public int Hoogte { get; set; }
        public int Lengte { get; set; }
        public string Materiaal { get; set; }
        public string Kleur { get; set; }
        public string Merk { get; set; }
        [Required]
        public string Subcategorie { get; set; }
        [Required]
        public int Prijs { get; set; }
        [Required]
        public int Inventaris { get; set; }
        [Required]
        public int VerzendTijd { get; set; }
    }


    
}