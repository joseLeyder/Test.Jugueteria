using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Test.Jugueteria.Api.Models;
using Test.Jugueteria.Api.Utils;
using Test.Jugueteria.DataAccess.Contracts.Entities;
using Test.Jugueteria.DataAccess.Contracts.Repositories;

namespace Test.Jugueteria.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductosController : ControllerBase
    {
        private readonly IBaseRepository<Producto> _repository;
        private IFormFile AuxArchivo;
        private string AuxPath;

        public ProductosController(IBaseRepository<Producto> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<ProductoModel>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllAsync(string search, int page, int rows)
        {
            try
            {
                Expression <Func<Producto, bool> > where = x => true;

                var whereQuery = where;

                if (!string.IsNullOrEmpty(search))
                {
                    Expression<Func<Producto, bool>> whereName = (x) => x.Nombre.Contains(search);
                    whereQuery = whereName;
                }

                var result = await _repository.GetAllAsync(
                    whereCondition: whereQuery, orderBy: a => a.OrderBy(x => x.Nombre), take: rows, skip: (page - 1) * rows);

                return Ok(result);

            }
            catch (Exception ex)
            {
                ModelState.AddModelError(ex.Source, ex.Message);
                throw;
            }
        }

        [HttpGet("GetTotalRecords")]
        [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetTotalRecords(string search)
        {
            try
            {
                Expression<Func<Producto, bool>> where = x => true;

                var whereQuery = where;

                if (!string.IsNullOrEmpty(search))
                {
                    Expression<Func<Producto, bool>> whereName = (x) => x.Nombre.Contains(search);
                    whereQuery = whereName;
                }

                var totalRecords = await _repository.GetCountAsync(whereCondition: whereQuery);

                return Ok(totalRecords);
            }
            catch (Exception ex)
            {
                ModelState.AddModelError(ex.Source, ex.Message);
                throw;
            }
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(ProductoModel), StatusCodes.Status200OK)]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var suscripcion = await _repository.GetAsync(id);

                return Ok(suscripcion);
            }
            catch (Exception ex)
            {
                ModelState.AddModelError(ex.Source, ex.Message);
                throw;
            }
        }

        //POST: api/Cliente
        [HttpPost]
        [ProducesResponseType(typeof(ProductoModel), StatusCodes.Status200OK)]
        public async Task<IActionResult> Post([FromForm] ProductoModel producto)
        {
            try
            {

                if (producto.FotoProducto != null)
                {
                    AuxArchivo = producto.FotoProducto;
                    AuxPath = "";
                }

                string filext = Path.GetExtension(producto.FotoProducto.FileName);

                //var producto = new Producto();
                var productoEntri = await _repository.AddAsync(new Producto { 
                    Nombre = producto.Nombre,
                    Compania = producto.Compania,
                    Descripcion = producto.Descripcion,
                    Precio = producto.Precio,
                    RestriccionEdad = producto.RestriccionEdad
                });

                await FileCustum.SaveFile(AuxArchivo, "Archivos/Productos/" + productoEntri.Id.ToString() + "/", AuxPath, productoEntri.Id);

                productoEntri.PathFoto = "Archivos/Productos/" + productoEntri.Id.ToString() + "/" + productoEntri.Id + filext;

                productoEntri = await _repository.UpdateAsync(productoEntri);

                return Ok(productoEntri);
            }
            catch (Exception ex)
            {
                ModelState.AddModelError(ex.Source, ex.Message);
                throw;
            }
        }

        //PUT: api/Cliente
        [HttpPut]
        [ProducesResponseType(typeof(ProductoModel), StatusCodes.Status200OK)]
        public async Task<IActionResult> Put([FromForm] ProductoModel producto)
        {
            try
            {
                var original = await _repository.GetAsync(x => x.Id == producto.Id);
                if (original != null)
                {
                    original.Nombre = producto.Nombre;
                    original.Precio = producto.Precio;
                    original.RestriccionEdad = producto.RestriccionEdad;
                    original.Compania = producto.Compania;
                    original.Descripcion = producto.Descripcion;
                    if (producto.FotoProducto != null)
                    {
                        string filext = Path.GetExtension(producto.FotoProducto.FileName);
                        if (Directory.Exists("Archivos/Productos/" + producto.Id.ToString()))
                            Directory.Delete("Archivos/Productos/" + producto.Id.ToString(),true);
                        await FileCustum.SaveFile(producto.FotoProducto, "Archivos/Productos/" + producto.Id.ToString() + "/", "", producto.Id);

                        original.PathFoto = "Archivos/Productos/" + producto.Id.ToString() + "/" + producto.Id + filext;
                    }

                    var productoUpd = await _repository.UpdateAsync(original);
                    return Ok(productoUpd);
                }

                return Forbid();
            }
            catch (Exception ex)
            {
                ModelState.AddModelError(ex.Source, ex.Message);
                throw;
            }
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var original = await _repository.GetAsync(x => x.Id == id);
                if (original != null)
                {
                    var result = await _repository.DeleteAsync(id);
                    return Ok(result);
                }
                return NotFound();
            }
            catch (Exception ex)
            {
                ModelState.AddModelError(ex.Source, ex.Message);
                throw;
            }
        }

    }
}
