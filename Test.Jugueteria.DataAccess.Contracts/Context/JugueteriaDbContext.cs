using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Test.Jugueteria.DataAccess.Contracts.Entities;

namespace Test.Jugueteria.DataAccess.Contracts.Context
{
    public class JugueteriaDBContext : DbContext
    {
        public JugueteriaDBContext(DbContextOptions<JugueteriaDBContext> options) : base(options)
        {

        }

        public DbSet<Producto> Producto { get; set; }
    }
}
