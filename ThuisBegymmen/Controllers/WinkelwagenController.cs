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
    public class WinkelwagenController : Controller
    {
        private readonly Context _context;
        private List<OrderDetail> winkelwagenList = new List<OrderDetail>();
        
        public WinkelwagenController(Context context) => _context = context;

        //Methode voor het opvragen van de winkelwagen.
        [HttpGet("getWinkelwagen")]
        public List<OrderDetail> GetWinkelwagen()
        {
            if(HttpContext.Session.GetString("Winkelwagen") != null)
            {
                winkelwagenList = JsonConvert.DeserializeObject<List<OrderDetail>>(HttpContext.Session.GetString("Winkelwagen"));
                return JsonConvert.DeserializeObject<List<OrderDetail>>(HttpContext.Session.GetString("Winkelwagen"));
            }
            else
            {
                return null;
            }
        }

        //Methode voor het toevoegen van een product aan de winkelwagen.
        [HttpPost("addProductToWinkelwagen")]
        public List<OrderDetail> AddProductToWinkelwagen([FromBody]OrderDetail _orderDetail)
        {
            
            //Er wordt eerst gechecked of er al een winkelwagen bestaat daarna wordt er pas een product toegevoegd.
            if(HttpContext.Session.GetString("Winkelwagen") != null)
            {
                winkelwagenList = JsonConvert.DeserializeObject<List<OrderDetail>>(HttpContext.Session.GetString("Winkelwagen"));
                bool alInWinkelwagen = winkelwagenList.Exists(x => x.ProductId == _orderDetail.ProductId);
                
                if(!alInWinkelwagen)
                {
                    OrderDetail orderDetail = new OrderDetail();
                    orderDetail.Hoeveelheid = _orderDetail.Hoeveelheid;
                    orderDetail.ProductId = _orderDetail.ProductId;
                    orderDetail.Product = _context.Product.FirstOrDefault(p => p.ProductId == _orderDetail.ProductId);
                    winkelwagenList.Add(orderDetail);
                    HttpContext.Session.SetString("Winkelwagen", JsonConvert.SerializeObject(winkelwagenList));
                    return winkelwagenList;   
                }
                else if(alInWinkelwagen)
                {
                    winkelwagenList.FirstOrDefault(p => p.ProductId == _orderDetail.ProductId).Hoeveelheid = winkelwagenList.FirstOrDefault(p => p.ProductId == _orderDetail.ProductId).Hoeveelheid + _orderDetail.Hoeveelheid;
                    HttpContext.Session.SetString("Winkelwagen", JsonConvert.SerializeObject(winkelwagenList)); 
                    return winkelwagenList;
                }
                else
                {
                    return null;
                }
            }
            else
            {
                OrderDetail orderDetail = new OrderDetail();
                orderDetail.Hoeveelheid = _orderDetail.Hoeveelheid;
                orderDetail.ProductId = _orderDetail.ProductId;
                orderDetail.Product = _context.Product.FirstOrDefault(p => p.ProductId == _orderDetail.ProductId);
                winkelwagenList.Add(orderDetail);
                HttpContext.Session.SetString("Winkelwagen", JsonConvert.SerializeObject(winkelwagenList));   
                return winkelwagenList;
            }
        }

        [HttpPost("verwijderProduct")]
        public List<OrderDetail> verwijderProduct([FromBody]OrderDetail _orderDetail)
        {
            //Er wordt eerst gechecked of er al een winkelwagen bestaat daarna wordt er pas een product toegevoegd.
            if(HttpContext.Session.GetString("Winkelwagen") != null)
            {
                winkelwagenList = JsonConvert.DeserializeObject<List<OrderDetail>>(HttpContext.Session.GetString("Winkelwagen"));
                winkelwagenList.Remove(winkelwagenList.FirstOrDefault(p => p.ProductId == _orderDetail.ProductId));
                HttpContext.Session.SetString("Winkelwagen", JsonConvert.SerializeObject(winkelwagenList));
                return winkelwagenList;
            }
            else
            {
                return null;
            }
        }
        //Methode voor het berekenen en teruggeven van de totaalprijs van alle producten die in de winkelwagen staan.
        [HttpGet("getTotaalPrijs")]
        public double? getTotaalPrijs()
        {
            double? totaalPrijs = 0.0;
            if(HttpContext.Session.GetString("Winkelwagen") != null)
            {
                winkelwagenList = JsonConvert.DeserializeObject<List<OrderDetail>>(HttpContext.Session.GetString("Winkelwagen"));
                foreach(OrderDetail orderDetail in winkelwagenList)
                {
                    totaalPrijs = totaalPrijs + (orderDetail.Hoeveelheid * orderDetail.Product.Prijs);
                }
            }
            else
            {
                totaalPrijs = null;
            }
            return totaalPrijs;
        }
    }
}
