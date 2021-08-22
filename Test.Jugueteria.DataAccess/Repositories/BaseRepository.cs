using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Test.Jugueteria.DataAccess.Contracts.Context;
using Test.Jugueteria.DataAccess.Contracts.Repositories;
using Test.Jugueteria.DataAccess.Extensions;

namespace Test.Jugueteria.DataAccess.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        private readonly JugueteriaDBContext _context = null;
        private readonly DbSet<T> table = null;
        private readonly CancellationToken _cancellationToken = new CancellationToken();
        private readonly ILogger<BaseRepository<T>> _Logger;

        public BaseRepository(JugueteriaDBContext context, ILogger<BaseRepository<T>> logger)
        {
            _context = context;
            table = _context.Set<T>();
            _Logger = logger;
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public async Task<T> AddAsync(T element)
        {
            try
            {
                await _context.Database.BeginTransactionAsync(_cancellationToken);

                var addEntity = await table.AddAsync(element, _cancellationToken);

                await _context.SaveChangesAsync();

                await _context.Database.CurrentTransaction.CommitAsync(_cancellationToken);

                return await Task.FromResult(addEntity.Entity);
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, ex.Message);
                throw ex;
            }
        }

        public async Task<bool> DeleteAsync(object id)
        {
            try
            {
                table.Remove(await GetAsync(id));

                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, ex.Message);
                throw ex;
            }
        }

        public Task<bool> ExistAsync(object id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<T>> GetAllAsync(int? take = null, int? skip = null)
        {
            try
            {
                return await table
                            .AsNoTracking()
                            .SkipOrAll(skip)
                            .TakeOrAll(take.Value)
                            .ToListAsync();
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, ex.Message);
                throw ex;
            }
        }

        public async Task<IEnumerable<T>> GetAllAsync(
                                             Expression<Func<T, bool>> whereCondition,
                                             Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
                                             int? take = null,
                                             int? skip = null) 
        {
            try
            {
                if (orderBy != null)
                    return await orderBy(table)
                            .AsNoTracking()
                            .Where(whereCondition)
                            .SkipOrAll(skip)
                            .TakeOrAll(take)
                            .ToListAsync();
                else
                    return await table
                            .AsNoTracking()
                            .Where(whereCondition)
                            .SkipOrAll(skip)
                            .TakeOrAll(take)
                            .ToListAsync();
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, ex.Message);
                throw ex;
            }
        }

        public async Task<T> GetAsync(object id)
        {
            try
            {
                return await table
                    .FindAsync(new object[] { id }, _cancellationToken);
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, ex.Message);
                throw ex;
            }
        }

        public async Task<T> GetAsync(Expression<Func<T, bool>> whereCondition = null)
        {
            try
            {
                IQueryable<T> query = table;

                if (whereCondition != null)
                    query = query.Where(whereCondition);

                return await query
                               .AsNoTracking()
                               .FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, ex.Message);
                throw ex;
            }
        }

        public async Task<int> GetCountAsync(Expression<Func<T, bool>> whereCondition)
        {
            try
            {
                return await table
                        .AsNoTracking()
                        .Where(whereCondition)
                        .CountAsync();
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, ex.Message);
                throw ex;
            }
        }

        public async Task<T> UpdateAsync(T element)
        {
            try
            {
                await _context.Database.BeginTransactionAsync(_cancellationToken);

                var updateEntity = table.Update(element);

                await _context.SaveChangesAsync();

                await _context.Database.CurrentTransaction.CommitAsync(_cancellationToken);

                return await Task.FromResult(updateEntity.Entity);
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, ex.Message);
                throw ex;
            }
        }


    }
}
