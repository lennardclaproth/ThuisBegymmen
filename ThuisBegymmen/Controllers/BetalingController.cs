using System;
using System.Web;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http;

namespace Thuisbegymmen.Controllers
{
    [Route("api/[controller]")]

    public class BetalingController : Controller
    {
        public Context _context;
        Order order;
        Account account;

        public BetalingController(Context context) => _context = context;

        public Betaling verwerkBetaling(Order order, int totaalPrijs)
        {
            Betaling betaling = new Betaling();

            betaling.BetalingsDatum = DateTime.Now;
            betaling.Bedrag = totaalPrijs;
            betaling.OrderId = order.OrderId;
            betaling.AccountId = null;
            betaling.status = "Nog niet betaald";
            
            _context.Betaling.Add(betaling); 
            try
            {
                _context.SaveChanges();
            }
            catch(MySql.Data.MySqlClient.MySqlException)
            {
                return null;
            }
            return betaling;
        }

        [HttpGet("GetSingleBetaling")]
        public IActionResult GetSingleBetaling(int orderId)
        {
            Betaling betaling = _context.Betaling.FirstOrDefault(b => b.OrderId == orderId);
            return Ok(betaling);
        }
        
        [HttpPut("UpdateBetalingStatus")]
        public IActionResult UpdateBetalingStatus([FromBody] BetalingStatus status)
        {
            Betaling betaling = _context.Betaling.FirstOrDefault(b => b.OrderId == status.orderId);
            betaling.status = status.status;
            betaling.Iban = status.Iban;
            try
            {
                _context.SaveChanges();
            }
            catch(MySql.Data.MySqlClient.MySqlException)
            {
                return BadRequest();
            }
            return Ok(betaling);
        }
    }
}
