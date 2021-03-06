using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Test.Jugueteria.DataAccess.Contracts.Repositories
{
    public interface IBaseRepository<T> where T: class
    {
        Task<T> AddAsync(T element);
        Task<T> UpdateAsync(T element);
        Task<bool> DeleteAsync(object id);
        Task<T> GetAsync(object id);
        Task<IEnumerable<T>> GetAllAsync(int? page = null, int? rows = null);
        Task<bool> ExistAsync(object id);
        Task<IEnumerable<T>> GetAllAsync(
            Expression<Func<T, bool>> whereCondition,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            int? take = null,
            int? skip = null);
        Task<int> GetCountAsync(Expression<Func<T, bool>> whereCondition);
        Task<T> GetAsync(Expression<Func<T, bool>> whereCondition = null);
    }
}
