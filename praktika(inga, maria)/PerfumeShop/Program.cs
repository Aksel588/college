
using MySqlConnector;

var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

string connectionString =
    "Server=localhost;Port=3306;Database=perfumery_db;User ID=root;Password=;";

app.MapGet("/api/perfumes", async () =>
{
    await using var connection =
        new MySqlConnection(connectionString);

    await connection.OpenAsync();

    string sql = @"
        SELECT p.perfume_name, p.brand, p.price,
               c.category_name
        FROM perfumes p
        JOIN categories c
        ON p.category_id = c.category_id
        ORDER BY p.perfume_name;
    ";

    await using var command =
        new MySqlCommand(sql, connection);

    await using var reader =
        await command.ExecuteReaderAsync();

    var perfumes = new List<object>();

    while (await reader.ReadAsync())
    {
        perfumes.Add(new
        {
            Name = reader["perfume_name"].ToString(),
            Brand = reader["brand"].ToString(),
            Price = reader["price"],
            Category = reader["category_name"].ToString()
        });
    }

    return Results.Ok(perfumes);
});

app.Run();
