using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;
        public BasketController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            Basket basket = await RetrieveBasket();
            if (basket == null) return NotFound();

            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    ProductName = item.Product.Name,
                    Price = item.Product.Price,
                    Quantity = item.Quantity,
                    PictureUrl = item.Product.PictureURL,
                    Brand = item.Product.Brand,
                    Type = item.Product.Type
                }).ToList()
            };
        }



        [HttpPost]
        public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
        {
            var basket = await RetrieveBasket();

            if (basket == null) basket = CreateBasket();

            var product = await _context.Products.FindAsync(productId);

            if (product == null) return NotFound();

            basket.AddItem(product, quantity);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return StatusCode(201);

            return BadRequest(new ProblemDetails
            {
                Status = 400,
                Title = "An error occurred while adding item to basket",
                Detail = "Unable to add item to basket"
            });
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteItemFromBasket(int productId, int quantity)
        {
            var basket = await _context.Baskets.Include(i => i.Items).FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
            if (basket == null) return NotFound();

            var item = basket.Items.FirstOrDefault(x => x.ProductId == productId);
            if (item == null) return NotFound();

            basket.RemoveItem(productId, quantity);
            await _context.SaveChangesAsync();

            return StatusCode(201);
        }

        private async Task<Basket> RetrieveBasket()
        {
            return await _context.Baskets.Include(i => i.Items).ThenInclude(p => p.Product).FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }


        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();

            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };

            Response.Cookies.Append("buyerId", buyerId, cookieOptions);

            var basket = new Basket { BuyerId = buyerId };

            _context.Baskets.Add(basket);

            return basket;
        }


    }
}