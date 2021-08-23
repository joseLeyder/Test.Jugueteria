using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;

namespace Test.Jugueteria.Api.Utils
{
    public static class FileCustum
    {
        
        public static bool ExistsFile(string pathFile, string basePath = "")
        {
            try
            {
                var pathFolder = Path.Combine(basePath != "" ? basePath : Directory.GetCurrentDirectory(), pathFile);
                return File.Exists(pathFolder);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public static async Task SaveFile(IFormFile file, string pathLocal, string basePath = "", int id = 0)
        {
            try
            {
                var pathFolder = Path.Combine(basePath != "" ? basePath : Directory.GetCurrentDirectory(), pathLocal);
                if (!Directory.Exists(pathFolder))
                    Directory.CreateDirectory(pathFolder);

                var path = Path.Combine(pathFolder, id == 0 ? file.FileName : id.ToString() + Path.GetExtension(file.FileName));
                using (Stream output = File.OpenWrite(path))
                {
                    await file.CopyToAsync(output);
                    await output.DisposeAsync();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public static void DeleteFile(string pathLocal, string basePath = "")
        {
            GC.Collect();
            GC.WaitForPendingFinalizers();
            var pathFolder = Path.Combine(basePath != "" ? basePath : Directory.GetCurrentDirectory(), pathLocal);
            FileInfo f = new FileInfo(pathFolder);
            if (f != null)
            {
                if (File.Exists(pathFolder))
                {
                    File.Delete(pathFolder);
                    f.Delete();
                }
            }
            List<(string, string)> sssssss = new List<(string, string)>() {
            ("",""),
            };
        }
    }

}
