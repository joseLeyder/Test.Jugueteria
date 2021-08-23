using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;

namespace Test.Jugueteria.Api.Models
{
    public class ProductoModel
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "El nombre del producto es obligatorio.")]
        [StringLength(50, ErrorMessage = "El nombre debe ser máximo de {1} carácteres")]
        public string Nombre { get; set; }
        [StringLength(100, ErrorMessage = "La descripción debe ser máximo de {1} carácteres")]
        public string Descripcion { get; set; }
        [Range(0, 100, ErrorMessage = "El valor para la restricción de edad debe ser de {1} a {2}")]
        public int RestriccionEdad { get; set; }
        [Required(ErrorMessage = "La compañia del producto es obligatoria.")]
        [StringLength(50, ErrorMessage = "La compañia debe ser máximo de {1} carácteres")]
        public string Compania { get; set; }
        [Required(ErrorMessage = "El precio del producto es obligatorio")]
        [Range(1, 1000, ErrorMessage = "El valor para el precio debe ser de {1} a {2}")]
        public decimal Precio { get; set; }

        //Para agregar la foto al servidor
        public IFormFile FotoProducto { get; set; }
        public string PathFoto { get; set; }
    }
}
