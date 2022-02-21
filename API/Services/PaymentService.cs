using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Stripe;

namespace API.Services
{
    public class PaymentService
    {
        private readonly IConfiguration configuration;

        public PaymentService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public async Task<PaymentIntent> CreateOrUpdatePaymentIntent(Basket basket)
        {
            StripeConfiguration.ApiKey = configuration["StripeSettings:SecretKey"];
            var service = new PaymentIntentService();
            PaymentIntent intent = new();

            var subtotal = basket.Items.Sum(i => i.Product.Price * i.Quantity);

            var delieveryFee = subtotal > 100 ? 0 : 50;

            if (string.IsNullOrEmpty(basket.PaymentIntentId))
            {
                var options = new PaymentIntentCreateOptions
                {
                    Amount = subtotal + delieveryFee,
                    Currency = "usd",
                    PaymentMethodTypes = new List<string> { "card" }
                };
                intent = await service.CreateAsync(options);

            }
            else
            {
                var options = new PaymentIntentUpdateOptions
                {
                    Amount = subtotal + delieveryFee
                };
                await service.UpdateAsync(basket.PaymentIntentId, options);
            }
            return intent;
        }
    }
}