using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<StoreContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


// app.UseHttpsRedirection();

app.UseRouting();

app.UseCors(opt => opt.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:11286"));

app.UseAuthorization();

app.MapControllers();

using var scope = app.Services.CreateScope();

StoreContext context = scope.ServiceProvider.GetRequiredService<StoreContext>();

ILogger<Program> logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

try
{
    context.Database.Migrate();
    DbInitializer.Initialize(context);
}
catch (Exception ex)
{

    logger.LogError(ex, "An error occurred while seeding the database.");
}


app.Run();
