using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Test.Jugueteria.DataAccess.Contracts.Entities
{
    public class Producto
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string Nombre { get; set; }
        [StringLength(100)]
        public string Descripcion { get; set; }
        [Range(0, 100)]
        public int RestriccionEdad { get; set; }
        [Required]
        [StringLength(50)]
        public string Compania { get; set; }
        [Required]
        [Range(1, 1000)]
        [Column(TypeName = "decimal(6, 2)")]
        public decimal Precio { get; set; }
        public string PathFoto { get; set; }
    }
}
