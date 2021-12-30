using API.Entities;

namespace API.Data
{
    public static class DbInitializer
    {
        public static void Initialize(StoreContext context)
        {
            context.Database.EnsureCreated();

            // Look for any products.
            if (context.Products.Any())
            {
                return;   // DB has been seeded
            }

            var products = new List<Product>
            {
                new Product { Name = "Product 1", Description = "Description 1", Price = 100, PictureURL = "https://via.placeholder.com/150", Type = "Type 1", Brand = "Brand 1", QuantityInStock = 10 },
                new Product { Name = "Product 2", Description = "Description 2", Price = 200, PictureURL = "https://via.placeholder.com/150", Type = "Type 2", Brand = "Brand 2", QuantityInStock = 20 },
                new Product { Name = "Product 3", Description = "Description 3", Price = 300, PictureURL = "https://via.placeholder.com/150", Type = "Type 3", Brand = "Brand 3", QuantityInStock = 30 },
                new Product { Name = "Product 4", Description = "Description 4", Price = 400, PictureURL = "https://via.placeholder.com/150", Type = "Type 4", Brand = "Brand 4", QuantityInStock = 40 },
                new Product { Name = "Product 5", Description = "Description 5", Price = 500, PictureURL = "https://via.placeholder.com/150", Type = "Type 5", Brand = "Brand 5", QuantityInStock = 50 },
                new Product { Name = "Product 6", Description = "Description 6", Price = 600, PictureURL = "https://via.placeholder.com/150", Type = "Type 6", Brand = "Brand 6", QuantityInStock = 60 },
                new Product { Name = "Product 7", Description = "Description 7", Price = 700, PictureURL = "https://via.placeholder.com/150", Type = "Type 7", Brand = "Brand 7", QuantityInStock = 70 },
                new Product { Name = "Product 8", Description = "Description 8", Price = 800, PictureURL = "https://via.placeholder.com/150", Type = "Type 8", Brand = "Brand 8", QuantityInStock = 80 },
            };

            context.Products.AddRange(products);

            context.SaveChanges();

        }
    }
}