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
    public class ProductController : Controller
    {
        private readonly Context _context;

        public ProductController(Context context) => _context = context;

        [HttpGet]
        public IEnumerable<Product> getKey()
        { return _context.Product.OrderBy(p => p.Productnaam).ToList();}

        [HttpGet("getCategory")]
        public IQueryable getCategory(string discriminator)
        {
            return
            from var in _context.Product
            where var.Discriminator == discriminator
            select var;
        }


        [HttpGet ("getSingleProduct")]
        public IActionResult Get (int id) {
            var product = _context.Product.FirstOrDefault(t => t.ProductId == id );
            if (product == null) {
                return NotFound();
            }

            return new ObjectResult (product); 
        }

        [HttpPut("UpdateProduct")]
        public IActionResult UpdateProduct([FromBody] UpdateProduct _product)
        {
            Product product = _context.Product.FirstOrDefault(p => p.ProductId == _product.ProductId);

            if(_product.Prijs != null)
            {
                product.Prijs = _product.Prijs ?? default(int);
            }
            
            if(_product.Inventaris != null)
            {
                product.Inventaris = _product.Inventaris ?? default(int);
            }

            if(!string.IsNullOrEmpty(_product.ProductNaam))
            {
                product.Productnaam = _product.ProductNaam;
            }

            try
            {
                _context.SaveChanges();
            }
            catch(MySql.Data.MySqlClient.MySqlException)
            {
                return BadRequest();
            }
            return Ok(product);
        }

        [HttpGet("GetAllProducts")]
        public IActionResult GetAllProducts()
        {
            List<Product> products = _context.Product.ToList();
            return Ok(products);
        }

        [HttpPost("MaakFreeWeight")]
        public IActionResult MaakFreeWeight([FromBody] FreeWeight _product)
        {
            _context.Add(_product);
            _context.SaveChanges();
            return Ok(_product);
        }
        [HttpPost("MaakFixedWeight")]
        public IActionResult MaakFixedWeight([FromBody] FixedWeight _product)
        {
            _context.Add(_product);
            _context.SaveChanges();
            return Ok();
        }
        [HttpPost("MaakCardio")]
        public IActionResult MaakCardio([FromBody] Cardio _product)
        {
            _context.Add(_product);
            _context.SaveChanges();
            return Ok();
        }
        [HttpPost("MaakBankjes")]
        public IActionResult MaakBankjes([FromBody] Bankje _product)
        {
            _context.Add(_product);
            _context.SaveChanges();
            return Ok();
        }
        [HttpPost("MaakKleinFitness")]
        public IActionResult MaakKleinFitness([FromBody] KleinFitness _product)
        {
            _context.Add(_product);
            _context.SaveChanges();
            return Ok();
        }
        [HttpPost("MaakAccessoires")]
        public IActionResult MaakAccessoires([FromBody] Accessoires _product)
        {
            _context.Add(_product);
            _context.SaveChanges();
            return Ok();
        }

        [HttpDelete("VerwijderProduct")]
        public IActionResult VerwijderProduct(int _id)
        {
            Product product = _context.Product.FirstOrDefault(p => p.ProductId == _id);
            _context.Product.Remove(product);
            _context.SaveChanges();
            return Ok();
        }
    }
}


