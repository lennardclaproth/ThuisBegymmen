using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace Thuisbegymmen
{
    //De model van account, elke individuele variabele representeert een kolom in de tabel.
    public class Cardio : Product
    {
        //Voeg [JsonIgnore] toe boven of voor de variabele die refereert naar een andere tabel (Foreign Key).
        public string CardioWeerstandType { get; set; }
        public bool OnderhoudsVrij { get; set; }
        public bool HeeftScherm { get; set; }
        public int MotorPk { get; set; }
        public string TypeLagers { get; set; }
    }
}