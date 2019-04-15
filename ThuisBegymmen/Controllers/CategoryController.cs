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

     public class CategoryController : Controller{
     private readonly Context _context;
    
    public CategoryController(Context context){
        _context = context;
    }
    

    [HttpGet ("GetProduct")]
     public IQueryable<Product> GetProduct(string discriminator)
        {
            return from p in _context.Product where p.Subcategorie.Contains(discriminator) select p;
        }
     }
}//type of freeweight > discriminator linq functie
// iaction zonder specifiek returntype