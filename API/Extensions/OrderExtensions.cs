using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class OrderExtensions
    {
        public static IQueryable<OrderDto> ProjectOrderToOrderDto(this IQueryable<Order> queryable)
        {
            return queryable.Select(order => new OrderDto()
            {
                Id = order.Id,
                BuyerId = order.BuyerId,
                OrderDate = order.OrderDate,
                OrderItems = order.OrderItems.Select(oi => new OrderItemDto()
                {
                    ProductId = oi.ItemOrdered.ProductId,
                    Name = oi.ItemOrdered.PictureUrl,
                    PictureUrl = oi.ItemOrdered.PictureUrl,
                    Price = oi.Price,
                    Quantity = oi.Quantity
                }).ToList(),
                DeliveryFee = order.DeliveryFee,
                OrderStatus = order.Status.ToString(),
                ShippingAddress = order.ShippingAddress,
                Subtotal = order.Subtotal,
                Total = order.GetTotal()
            }).AsNoTracking();
        }
    }
}