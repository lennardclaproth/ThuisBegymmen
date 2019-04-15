using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using Newtonsoft.Json;

namespace Thuisbegymmen

{
    //De model van betaling, elke individuele variabele representeert een kolom in de tabel.

    public class Betaling
    {
        public int BetalingId { get; set; }
        
        public DateTime BetalingsDatum { get; set; }
        public double Bedrag { get; set; }
        public string status { get; set; }
        public int? AccountId { get; set; }
        public string Iban { get; set; }
        public Account Account { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; }
    }
}
