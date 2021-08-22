using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Test.Jugueteria.DataAccess.Extensions
{
    public static class QueryableExtension
    {
        public static IQueryable<T> SkipOrAll<T>(this IQueryable<T> src, int? skip) => skip.HasValue ? src.Skip(skip.Value) : src;
        public static IQueryable<T> TakeOrAll<T>(this IQueryable<T> src, int? take) => take.HasValue ? src.Take(take.Value) : src;
    }
}
