using System;
using System.Text;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Thuisbegymmen
{
    public class Account
    {
        public int Id { get; set; } 
        [Required]
        public String Gebruikersnaam { get; set; }
        [Required]
        public String Wachtwoord { get; set; }
        public string Salt { get; set; }
        [Required]
        public String Naam { get; set; }
        [Required]
        public String Tussenvoegsel { get; set; }
        [Required]
        public String Achternaam { get; set; }
        [Required]
        public String StraatHuisnr { get; set; }
        [Required]
        public String Postcode { get; set; }
        public Boolean IsAdmin { get; set; } = false;
        [Required]
        public String EmailAdres { get; set; }
        public int? Telefoonnummer { get; set; }
        public Boolean VerwijderAccount {get ; set; } = false;
        public Boolean VerwijderProduct {get ; set; } = false;
        public Boolean ToevoegenProduct {get ; set; } = false;
        public Boolean VerwijderCategorie {get ; set; } = false;
        public Boolean ToevoegenCategorie {get ; set; } = false;
        public Boolean Rechten {get ; set; } = false;
        public List<Betaling> Betalingen { get; set; }
        public List<Product> Producten {get; set;}
        public List<Order> Orders { get; set; }
        public List<Favoriet> Favorieten {get; set;} //miss niet nodig
    }
}