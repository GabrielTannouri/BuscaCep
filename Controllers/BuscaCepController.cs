using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace BuscaCepApplication.Controllers
{
    public class BuscaCepController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public async Task<JsonResult> GetDataByCep(string cep)
        {
            using (var httpClient = new HttpClient())
            {
                var response = await httpClient.GetAsync($"https://viacep.com.br/ws/{cep}/json/");

                if (response.IsSuccessStatusCode)
                {
                    string content = await response.Content.ReadAsStringAsync();

                    return Json(content, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(null);
                }
            }
        }
    }
}