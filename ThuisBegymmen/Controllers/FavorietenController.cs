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
    public class FavorietenController : Controller
    {
        Account account;
        Favoriet favoriet = new Favoriet();
        public List<Favoriet> favorietenList = new List<Favoriet>();
        private readonly Context _context;
        public FavorietenController(Context context) => _context = context;
        
        [HttpGet("getFavorieten")]
        public IActionResult getFavorieten()
        { 
            account = JsonConvert.DeserializeObject<Account>(HttpContext.Session.GetString("Account"));
            List<Favoriet> favorieten = _context.Favoriet.ToList().FindAll(f => f.AccountId == account.Id);
            foreach(Favoriet favoriet in favorieten)
            {
                favoriet.Account = account;
                favoriet.Producten = _context.Product.FirstOrDefault(p => p.ProductId == favoriet.ProductId);
                favoriet.ProductId = favoriet.ProductId;
            }
            return Ok(favorieten);
        }

        [HttpPost("verwerkFavoriet")]
        public IActionResult verwerkFavoriet([FromBody] Favoriet favoriet)
        { 
            if(HttpContext.Session.GetString("Account") != null)
                {
                    if(HttpContext.Session.GetString("Favorieten") == null)
                        {
                            HttpContext.Session.SetString("Favorieten", JsonConvert.SerializeObject(favorietenList));   
                        }
                    else
                        {
                            favorietenList = JsonConvert.DeserializeObject<List<Favoriet>>(HttpContext.Session.GetString("Favorieten"));
                        }
                    account = JsonConvert.DeserializeObject<Account>(HttpContext.Session.GetString("Account"));
                    favoriet.AccountId = account.Id;
                    favoriet.Producten = _context.Product.FirstOrDefault(p => p.ProductId == favoriet.ProductId);
                    favoriet.ProductId = favoriet.ProductId;

                    _context.Favoriet.Add(favoriet); 
                    favorietenList = JsonConvert.DeserializeObject<List<Favoriet>>(HttpContext.Session.GetString("Favorieten"));  
                    _context.SaveChanges();
                    return Ok(favorietenList);
                }
            else {return NoContent();}
        }
            
        


        [HttpDelete("verwijderFavoriet")]
        public IActionResult verwijderFavoriet([FromBody] Favoriet favoriet)
        { 
            account = JsonConvert.DeserializeObject<Account>(HttpContext.Session.GetString("Account"));
            favoriet.AccountId = account.Id;
            favoriet.Producten = _context.Product.FirstOrDefault(p => p.ProductId == favoriet.ProductId);
            favoriet.ProductId = favoriet.ProductId;
            _context.Favoriet.Remove(favoriet);
            _context.SaveChanges();
            return Ok();
        }
    }
}