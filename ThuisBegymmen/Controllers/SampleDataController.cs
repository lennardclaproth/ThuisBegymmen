using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Thuisbegymmen.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private readonly Context _context;

        public SampleDataController(Context context)
        {
            _context = context;
        }

        [HttpGet("login")]
        public IEnumerable<Account> Login(string _gebruikersnaam, string _wachtwoord)
        {  
            return _context.Account.ToList();
        }
        [HttpPost("maak-account")]
        public Account MaakAccount([FromBody] AccountController account)
        {
            return null;
        }
    }
}
