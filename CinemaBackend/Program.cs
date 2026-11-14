var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("SiteCinemax", policy =>
    {
        policy
            .AllowAnyOrigin()//permite requisições de qualquer origem
            .AllowAnyHeader()//permite qualquer header HTTP
            .AllowAnyMethod();//permite métodos como GET, POST, PUT e DELETE
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("SiteCinemax");

app.UseAuthorization();

app.MapControllers();

app.Run();