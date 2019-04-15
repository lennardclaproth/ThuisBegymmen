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
    public class ImageController : Controller
    {
        private readonly Context _context;

        public ImageController(Context context) => _context = context;

        [HttpGet]
        public IEnumerable<Image> Get()
        {
            return _context.Image.ToList();
        }

        // [HttpGet ("getImages")]
        // public IActionResult Get (int id) {
        //     var image = _context.Image.FirstOrDefault(t => t.ImageId == id);
        //     if (image == null) {
        //         return NotFound();
        //     }
        //     return new ObjectResult (image);
        // }

        [HttpGet ("getImages")]
        public IQueryable<String> GetImages(int productId)
        {
            return 
            from var in _context.Image
            where var.ProductId == productId
            select var.ImageUrl;
        }
    }
}
