using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace Thuisbegymmen
{
    //De model van account, elke individuele variabele representeert een kolom in de tabel.
    public class FreeWeight : Product
    {
        //Voeg [JsonIgnore] toe boven of voor de variabele die refereert naar een andere tabel (Foreign Key).
        public int FreeWeightBelastbaarGewicht { get; set; }
        public int FreeweightGewicht { get; set; }
    }


    
}