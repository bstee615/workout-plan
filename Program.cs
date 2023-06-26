var builder = WebApplication.CreateBuilder(args);

void ConfigureServices(IServiceCollection services)
{
    services.AddCors(options =>
    {
        options.AddPolicy("CorsPolicy",
            builder => builder.WithOrigins("http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
    });

    services.AddSignalR();
}

// Add services to the container.
builder.Services.AddRazorPages();
ConfigureServices(builder.Services);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseDefaultFiles(); // serves index.html as the default page
app.UseStaticFiles();  // enables serving static files

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

// public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
// {
app.UseCors("CorsPolicy");

app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<WorkoutHub>("/workout");
});
// }

app.Run();
