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
    public class AccountController : Controller
    {
        private readonly Context _context;
        byte[] saltBytes = new byte[128/8];
        string salt;

        public AccountController(Context context)
        {
            _context = context;
        }



        [HttpGet("login")]
        public IActionResult Login(string _gebruikersnaam, string _wachtwoord)
        {  

            Account _account = _context.Account.FirstOrDefault(a => a.Gebruikersnaam == _gebruikersnaam);
            if(_account == null)
            {
                return NoContent();
            }
            if(ValidateHash(_wachtwoord, _account.Salt, _account.Wachtwoord))
            {
                _account.Wachtwoord = null;
                HttpContext.Session.SetString("Account", JsonConvert.SerializeObject(_account));
                return Ok(_account);
            }
            else
            {
                return StatusCode(Microsoft.AspNetCore.Http.StatusCodes.Status206PartialContent);
            }
             
        }
        


        [HttpGet("getAccount")]
        public Account GetAccount()
        {
            if(HttpContext.Session.GetString("Account") != null)
            {
                return JsonConvert.DeserializeObject<Account>(HttpContext.Session.GetString("Account"));
            }
            else
            {
                return null;
            }
        }

        [HttpPost("MaakAccount")]
        public IActionResult MaakAccount([FromBody] Account account)
        {
            if(_context.Account.FirstOrDefault(a => a.Gebruikersnaam == account.Gebruikersnaam) == null && _context.Account.FirstOrDefault(a => a.EmailAdres == account.EmailAdres) == null)
            {
                using(_context)
                {
                    _context.Database.EnsureCreated();
                    _context.Account.Add(new Account
                    {
                        Gebruikersnaam = account.Gebruikersnaam,
                        Wachtwoord = CreateHash(account.Wachtwoord),
                        Salt = salt,
                        Naam = account.Naam,
                        Tussenvoegsel = account.Tussenvoegsel,
                        Achternaam = account.Achternaam,
                        StraatHuisnr = account.StraatHuisnr,
                        Postcode = account.Postcode,
                        EmailAdres = account.EmailAdres,
                        Telefoonnummer = account.Telefoonnummer
                    });

                //http://www.systemnetmail.com/ voor info over mailen
                MailMessage message = new System.Net.Mail.MailMessage();
                string fromEmail = "thuisbegymmen@gmail.com";
                string emailPassword = "adminthuisbegymmen";
                message.From = new MailAddress(fromEmail);
                message.To.Add(account.EmailAdres);
                message.Subject = "Account aangemaakt";
                message.Body = "Bij deze willen we u laten weten dat u een account heeft op ThuisBegymmen. Log in om uw gegevens in te zien.";
                message.DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure;

                using (SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587))
                {
                    smtpClient.EnableSsl = true;
                    smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
                    smtpClient.UseDefaultCredentials = false;
                    smtpClient.Credentials = new NetworkCredential(fromEmail, emailPassword);

                    smtpClient.Send(message.From.ToString(), message.To.ToString(), message.Subject, message.Body);
                }
                    _context.SaveChanges();    
                }
                return Ok();
            }
            else
            {
                return NoContent();
            }

            
        }

        [HttpPut("VeranderAccount")]
        public IActionResult VeranderAccount([FromBody] Account _account)
        {
            Account account = _context.Account.FirstOrDefault(a => a.Id == _account.Id);

            if(!string.IsNullOrEmpty(_account.Naam)){account.Naam = _account.Naam;}
            if(!string.IsNullOrEmpty(_account.Tussenvoegsel)){account.Tussenvoegsel = _account.Tussenvoegsel;}
            if(!string.IsNullOrEmpty(_account.Achternaam)){account.Achternaam = _account.Achternaam;}
            if(!string.IsNullOrEmpty(_account.StraatHuisnr)){account.StraatHuisnr = _account.StraatHuisnr;}
            if(!string.IsNullOrEmpty(_account.Postcode)){account.Postcode = _account.Postcode;}
            if(!string.IsNullOrEmpty(_account.EmailAdres)){account.EmailAdres = _account.EmailAdres;}
            if(!string.IsNullOrEmpty(_account.Wachtwoord)){account.Wachtwoord = CreateHash(_account.Wachtwoord);
                                                            account.Salt = salt;}
            //Alleen telefoonnr kan niet aangepast worden 
            _context.SaveChanges();
            account.Wachtwoord = null;
            return Ok(account);
        }

        [HttpDelete("LogOut")]
        public IActionResult LogOut()
        {
            HttpContext.Session.Remove("Account");
            return Ok();
        }

        [HttpGet("GetAllAccounts")]
        public IActionResult GetAllAccounts()
        {
            List<Account> accounts;
            try
            {
                accounts = _context.Account.ToList();

                foreach(Account account in accounts)
                {
                    account.Wachtwoord = null;
                }
            }
            catch(MySql.Data.MySqlClient.MySqlException)
            {
                return BadRequest();
            }
            return Ok(accounts);
        }

        [HttpGet("GetSingleAccount")]
        public IActionResult GetSingleAccount(int _accountId)
        {
            Account account;
            try
            {
                account =_context.Account.FirstOrDefault(a => a.Id == _accountId);
                account.Wachtwoord = null;
            }
            catch(MySql.Data.MySqlClient.MySqlException)
            {
                return BadRequest();
            }
            return Ok(account);
        }

        [HttpPut("UpdateRechten")]
        public IActionResult UpdateRechten([FromBody] Account _account)
        {
            Account account = _context.Account.FirstOrDefault(a => a.Id == _account.Id);

            account.IsAdmin = _account.IsAdmin;
            // account.Rechten = _account.Rechten;
            // account.ToevoegenProduct = _account.ToevoegenProduct;
            // account.VerwijderProduct = _account.VerwijderProduct;
            // account.ToevoegenCategorie = _account.ToevoegenCategorie;
            // account.VerwijderCategorie = _account.VerwijderCategorie;
            // account.VerwijderAccount = _account.VerwijderAccount;

            try
            {
                _context.SaveChanges();
            }
            catch(MySql.Data.MySqlClient.MySqlException)
            {
                return BadRequest();
            }
            return Ok();
        }

        [HttpDelete("VerwijderAccount")]
        public IActionResult VerwijderAccount([FromBody] Account _account)
        {
            Account account = _context.Account.FirstOrDefault(a => a.Id == _account.Id);
            _context.Remove(account);
            _context.SaveChanges();
            return Ok();
        }
        
        [HttpPut("ResetPassword")]
        public IActionResult ResetPassword(string EmailAdres)
        {
            Account account = _context.Account.FirstOrDefault(a => a.EmailAdres == EmailAdres);

            Random rnd = new Random();

            string password = rnd.Next(10,99).ToString() + account.Gebruikersnaam + rnd.Next(10,99).ToString();

            account.Wachtwoord = CreateHash(password);
            account.Salt = salt;
            _context.SaveChanges();
            
            //http://www.systemnetmail.com/ voor info over mailen
            MailMessage message = new System.Net.Mail.MailMessage();
            string fromEmail = "thuisbegymmen@gmail.com";
            string emailPassword = "adminthuisbegymmen";
            message.From = new MailAddress(fromEmail);
            message.To.Add(account.EmailAdres);
            message.Subject = "Account gereset";
            message.Body = 
            
            "Goedendag,\n\n U heeft uw account gereset op thuisbegymmen.nl. Hieronder ziet u uw nieuwe wachtwoord en gebruikersnaam die aan het account zijn gekoppeld.\n\n Gebruikersnaam: \t"+ account.Gebruikersnaam + "\n Wachtwoord: \t" + password + "\n\n Met vriendelijke groet,\nThuisbegymmen.nl";
            
            message.DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure;

            using (SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587))
            {
                smtpClient.EnableSsl = true;
                smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtpClient.UseDefaultCredentials = false;
                smtpClient.Credentials = new NetworkCredential(fromEmail, emailPassword);

                smtpClient.Send(message.From.ToString(), message.To.ToString(), message.Subject, message.Body);
            }
            return Ok();
        }
        public string CreateHash(string wachtwoord)
        {
            var provider = new RNGCryptoServiceProvider();
            provider.GetNonZeroBytes(saltBytes);
            salt = Convert.ToBase64String(saltBytes);

            var rfc2898DeriveBytes = new Rfc2898DeriveBytes(wachtwoord, saltBytes, 10000);
            var hashPassword = Convert.ToBase64String(rfc2898DeriveBytes.GetBytes(256));

            return hashPassword;
        }
        public bool ValidateHash(string enteredPassword, string salt, string hashedPassword)
        {
            var saltBytes = Convert.FromBase64String(salt);
            var rfc2898DeriveBytes = new Rfc2898DeriveBytes(enteredPassword, saltBytes, 10000);
            return Convert.ToBase64String(rfc2898DeriveBytes.GetBytes(256)) == hashedPassword;
        }
    }
}
