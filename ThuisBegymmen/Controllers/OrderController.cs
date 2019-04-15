using System;
using System.Web;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Net.Mail;
using System.Net;

namespace Thuisbegymmen.Controllers
{
    [Route("api/[controller]")]
    public class OrderController : Controller
    {
        Gebruiker gebruiker;
        Account account;
        Order order = new Order();
        public List<OrderDetail> winkelwagenList = new List<OrderDetail>();
        private readonly Context _context;
        public OrderController(Context context) => _context = context;
        
        [HttpGet("GetOrders")]
        public IActionResult GetOrders()
        {
            List<Order> orders = _context.Order.ToList();
            if(orders == null)
            {
                return NoContent();
            }
            else
            {
                return Ok(orders);
            }
        }

         [HttpGet("GetOrdersFromAccount")]
         public IActionResult GetOrdersFromAccount()          
        {   
            Account _account = JsonConvert.DeserializeObject<Account>(HttpContext.Session.GetString("Account"));
            List<Order> orders = _context.Order.ToList().FindAll(o => o.AccountId == _account.Id);
            foreach(Order order in orders)
            {
                order.Account = _account;
            }

            if(orders == null)
            {
                return NoContent();
            }
            else
            {
                return Ok(orders);
            }
        }

        [HttpGet("GetSingleOrder")]
        public IActionResult GetSingleOrder(int orderId)
        {
            Order order = _context.Order.FirstOrDefault(o => o.OrderId == orderId);
            if(order == null)
            {
                return NoContent();
            }
            else
            {
                return Ok(order);
            }
        }

        [HttpGet("GetOrderDetail")]
        public IActionResult GetOrderDetail(int orderId)
        {
            List<OrderDetail> orderDetails = _context.OrderDetail.Where(o => o.OrderId == orderId).ToList();

            foreach(OrderDetail orderDetail in orderDetails)
            {
                orderDetail.Product = _context.Product.FirstOrDefault(p => p.ProductId == orderDetail.ProductId);
            }

            if(orderDetails == null)
            {
                return NoContent();
            }
            else
            {
                return Ok(orderDetails);
            }
        }

        [HttpPut("WijzigStatus")]
        public IActionResult WijzigStatus([FromBody] OrderStatus status)
        {
            Order order = _context.Order.FirstOrDefault(o => o.OrderId == status.orderId);
            if(status.status.Equals("Verwerkt"))
            {
                List<OrderDetail> orderDetails = _context.OrderDetail.Where(o => o.OrderId == status.orderId).ToList();
                ProductController controller = new ProductController(this._context);
                foreach(OrderDetail detail in orderDetails)
                {
                    if(_context.Product.FirstOrDefault(p => p.ProductId == detail.ProductId).Inventaris < detail.Hoeveelheid)
                    {
                        detail.Status = "Nabestelling plaatsen";
                        break;
                    }
                    else
                    {
                        _context.Product.FirstOrDefault(p => p.ProductId == detail.ProductId).Inventaris = _context.Product.FirstOrDefault(p => p.ProductId == detail.ProductId).Inventaris - detail.Hoeveelheid;
                        detail.Status = "Product op voorraad";
                    }
                }
            }

            order.Status = status.status;

            try{
                _context.SaveChanges();            }
            catch(MySql.Data.MySqlClient.MySqlException)
            {
                return BadRequest();
            }
            return Ok(order);
        }

        [HttpPost("verwerkOrder")]
        public IActionResult VerwerkOrder([FromBody] Gebruiker _gebruiker)
        {

            if(HttpContext.Session.GetString("Account") == null)
            {
                gebruiker = _gebruiker;
                order.OrderDatum = DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss");
                order.Status = "In behandeling";
                order.Comments = "";
                order.Naam = gebruiker.Naam;
                order.Achternaam = gebruiker.Achternaam;
                order.EmailAdres = gebruiker.EmailAdres;
                order.StraatHuisnr = gebruiker.StraatHuisnr;
                order.Postcode = gebruiker.Postcode;
            }
            else
            {
                account = JsonConvert.DeserializeObject<Account>(HttpContext.Session.GetString("Account"));
                order.OrderDatum = DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss");
                order.Status = "In behandeling";
                order.Comments = "";
                order.AccountId = account.Id;
            }   

            _context.Order.Add(order);
            try
            {
                _context.SaveChanges();
            }
            catch(MySql.Data.MySqlClient.MySqlException)
            {
                return BadRequest();
            }

            winkelwagenList = JsonConvert.DeserializeObject<List<OrderDetail>>(HttpContext.Session.GetString("Winkelwagen"));

            int totaalPrijs = 0;
            foreach(OrderDetail orderDetail in winkelwagenList) 
            { 
                totaalPrijs = totaalPrijs + (orderDetail.Hoeveelheid * orderDetail.Product.Prijs); 
            }

            foreach(OrderDetail orderDetail in winkelwagenList)
            {
                orderDetail.OrderId = order.OrderId;
                orderDetail.Order = order;
                orderDetail.Product = null;
                _context.OrderDetail.Add(orderDetail);
            }

            try
            {
                _context.SaveChanges();
            }
            catch(MySql.Data.MySqlClient.MySqlException)
            {
                return BadRequest();
            }

            HttpContext.Session.Remove("Winkelwagen");

            if(new BetalingController(this._context).verwerkBetaling(this.order, totaalPrijs) == null)
            {
                return BadRequest();
            }

            //mail 
            MailMessage message = new System.Net.Mail.MailMessage();
            string fromEmail = "thuisbegymmen@gmail.com";
            string emailPassword = "adminthuisbegymmen";
            message.From = new MailAddress(fromEmail);
            if(HttpContext.Session.GetString("Account") == null)
            {
                message.To.Add(_gebruiker.EmailAdres);
            }
            else
            {
                message.To.Add(account.EmailAdres);
            }

            message.Subject= "Orderbevestiging";
            message.Body=   "Beste klant" + "," + "\n"+ "Hartelijk dank voor uw bestelling." + "\n"
                            +"Hieronder ziet u een overzicht van u bestelde product:" +"\n"
                           +" Orderdatum:" + "" + order.OrderDatum + "\n" 
                           +" Ordernummer:" + ""+ order.OrderId + "\n" 
                           +" Totaal prijs: "+ "€" + totaalPrijs + " incl. 21% btw." + "\n"
                           + "Uw order zal zo spoedig mogelijk worden uitgevoerd." + "\n"+"\n"
                           + "Met vriendelijk groet," + 
                            "\n" +"\n"+ "\n"+
                            "ThuisBegymmen";
            message.DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure;

            using (SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587))
            {
                smtpClient.EnableSsl = true;
                smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtpClient.UseDefaultCredentials = false;
                smtpClient.Credentials = new NetworkCredential(fromEmail, emailPassword);

                smtpClient.Send(message.From.ToString(), message.To.ToString(), message.Subject, message.Body);
            }

            if(account != null)
            {
                Betaling betaling = _context.Betaling.FirstOrDefault(b => b.OrderId == order.OrderId);
                betaling.AccountId = account.Id;
            }
            

            return Ok(order);
        }
        [HttpDelete("VerwijderOrder")]
        public IActionResult VerwijderOrder([FromBody] Order order)
        {
            order = _context.Order.FirstOrDefault(o => o.OrderId == order.OrderId);
            _context.Order.Remove(order);
            _context.SaveChanges();
            return Ok(order);
        }
    }
}