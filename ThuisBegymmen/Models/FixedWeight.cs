using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace Thuisbegymmen
{
    //De model van account, elke individuele variabele representeert een kolom in de tabel.
    public class FixedWeight : Product
    {
        //Voeg [JsonIgnore] toe boven of voor de variabele die refereert naar een andere tabel (Foreign Key).
        public int FixedWeightBelastbaarGewicht { get; set; }
        public int FixedWeightGewicht { get; set; }
        public bool GebruiktHalterSchijven { get; set; }
    }

}