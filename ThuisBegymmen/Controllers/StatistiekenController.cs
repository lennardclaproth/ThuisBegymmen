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

    public class StatistiekenController : Controller
    {
        private readonly Context _context;

        public StatistiekenController(Context context) => _context = context;

        public class SalesPerProduct
        {
            private int productid;
            private int hoeveelheid;
            
            public SalesPerProduct(int productid, int hoeveelheid)
            {
                this.productid = productid;
                this.hoeveelheid = hoeveelheid;
            }
            public int ProductId
            {
                get { return productid; }
                set { productid = value; }
            }
            public int Hoeveelheid
            {
                get { return hoeveelheid; }
                set { hoeveelheid = value; }
            }
        }

        public class OrdersPerMonth
        {
            private int month;
            private int year;
            private int aantalOrders;
            
            public OrdersPerMonth(int month, int year, int aantalOrders)
            {
                this.month = month;
                this.year = year;
                this.aantalOrders = aantalOrders;
            }
            public int Month
            {
                get { return month; }
                set { month = value; }
            }
            public int Year
            {
                get { return year; }
                set { year = value; }
            }
            public int AantalOrders
            {
                get { return aantalOrders; }
                set { aantalOrders = value; }
            }
        }

        List<SalesPerProduct> SalesList = new List<SalesPerProduct>();
        List<OrdersPerMonth> MonthList = new List<OrdersPerMonth>();

        [HttpGet("getOrders")]
        public IActionResult getOrders(string ascending_or_descending)
        {
            List<Product> productList = _context.Product.ToList();
            // lennards code
            List<OrderDetail> orderDetails = _context.OrderDetail.ToList();
            List<OrderDetail> orderDetailByProductId = new List<OrderDetail>();
            int hoeveelheid = 0;
            // foreach(OrderDetail detail in orderDetails)
            // {
            //     detail.Product = _context.Product.FirstOrDefault(p => p.ProductId == detail.ProductId);
            // }

            foreach (OrderDetail detail in orderDetails.GroupBy(o=>o.ProductId).Select(groupO => groupO.First()))
            {
                hoeveelheid = 0;
                List<OrderDetail> orderDetailsByProductId = orderDetails.FindAll(o => o.ProductId == detail.ProductId);

                foreach(OrderDetail detailByProductId in orderDetailsByProductId)
                {
                    hoeveelheid = hoeveelheid + detailByProductId.Hoeveelheid;
                }
                OrderDetail orderDetail = new OrderDetail();
                orderDetail.Hoeveelheid = hoeveelheid;
                orderDetail.OrderId = detail.OrderId;
                orderDetail.ProductId = detail.ProductId;
                orderDetail.Product = productList.FirstOrDefault(p => p.ProductId == detail.ProductId);
                orderDetailByProductId.Add(orderDetail);
            }

            if(ascending_or_descending.Equals("descending"))
            {
                return Ok(orderDetailByProductId.OrderByDescending(o => o.Hoeveelheid).Take(10));
            }
            else
            {
                return Ok(orderDetailByProductId.OrderBy(o => o.Hoeveelheid).Take(10));
            }
        }
        // [HttpGet("getOrders")]
        // public List<SalesPerProduct> getOrders(string ascending_or_descending)
        // {

            
        //     // ----------- eerst alle orderdetails ophalen en evt alvast groeperen
        //     var orderHistory = 
        //     from orderDetail in _context.OrderDetail
        //     join p in _context.Product on orderDetail.ProductId equals p.ProductId
        //     group orderDetail by p.ProductId into orderDetailsGroupedByProductId
        //     orderby orderDetailsGroupedByProductId.Key
        //     select orderDetailsGroupedByProductId;

        //     // ------------ dan de productid omzetten naar productnaam
        //     // var productIdsWithNames = 
        //     // (from od in _context.OrderDetail
        //     // join p in _context.Product on od.ProductId equals p.ProductId
        //     // select new
        //     // {
        //     //     ProductNaam = p.Productnaam,
        //     //     ProductId = od.ProductId
        //     // }
        //     // ).ToList();

        //     //------------ dan de producten groeperen/optellen bij elkaar
        //     foreach(var detailGroup in orderHistory)
        //     {
        //         var aantalProducten = 0;
        //         var productGetal = detailGroup.Key;
        //         foreach(var product in detailGroup)
        //         {
        //             aantalProducten = aantalProducten + product.Hoeveelheid;
        //         }
        //         // ------------ dan alleen de kolommen hoeveelheid en product selecteren
        //         SalesList.Add(new SalesPerProduct(productGetal, aantalProducten));
        //     }

        //     // ------------ het resultaat doorgeven als lijst, gesorteerd en gefilterd op 10 stuks
        //     if (ascending_or_descending.Equals("descending"))
        //     {
        //         return SalesList.OrderByDescending(o => o.Hoeveelheid).Take(10).ToList();
        //     }
        //     else
        //     {
        //         return SalesList.OrderBy(o => o.Hoeveelheid).Take(10).ToList();
        //     }
        // }

        [HttpGet ("getOrdersByMonth")]
        public List<OrdersPerMonth> getMonthList()
        {
            var ordersByMonth =
            from order in _context.Order
            group order by new
            {
                DateTime.Parse(order.OrderDatum).Year,
                DateTime.Parse(order.OrderDatum).Month
            } 
            into monthGroup
            orderby monthGroup.Key.Year
            select monthGroup;
            foreach(var monthGroup in ordersByMonth)
            {
                var aantalOrders = 0;
                var maandGroup = monthGroup.Key.Month;
                var yearGroup = monthGroup.Key.Year;
                foreach(var order in monthGroup)
                {
                    aantalOrders = aantalOrders + 1;
                }
                MonthList.Add(new OrdersPerMonth(maandGroup, yearGroup, aantalOrders));
            }
            return MonthList.OrderBy(y => y.Month).ToList();
        }
    }
}
