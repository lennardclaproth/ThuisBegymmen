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

     public class SearchbarController : Controller{
     private readonly Context _context;
    
    public SearchbarController(Context context){
        _context = context;
    }
    

    [HttpGet ("GetProduct")]
     public IQueryable<Product> GetProduct(string productNaam)
        {
            return from p in _context.Product where p.Productnaam.Contains(productNaam) select p;
        }
    }

}