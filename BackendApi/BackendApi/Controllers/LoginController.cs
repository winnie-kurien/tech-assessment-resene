﻿using Microsoft.AspNetCore.Mvc;
using BackendApi.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BackendApi.Controllers;

[ApiController]
[Route("Validate")]
public class LoginController : ControllerBase
{

    private readonly ILogger<LoginController> _logger;
    public IConfiguration _configuration;

    public LoginController(ILogger<LoginController> logger, IConfiguration configuration)
    {
        _logger = logger;
        _configuration = configuration;
    }

    [HttpPost]
    [Produces("application/json")]
    public IActionResult Post(Login _userData)
    {
        if (_userData != null)
        {
                //create claims details based on the user information
                var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("CSNO", _userData.csno.ToString()),
                        new Claim("MSG", "Customer is Valid")
                    };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    _configuration["Jwt:Issuer"],
                    _configuration["Jwt:Audience"],
                    claims,
                    expires: DateTime.UtcNow.AddMinutes(10),
                    signingCredentials: signIn);
                return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token), msg = "Customer is Valid" });
        }
        else
        {
            return BadRequest();
        }
    }
}

