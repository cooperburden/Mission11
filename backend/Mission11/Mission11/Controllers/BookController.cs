using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11.Data;
using System.Linq;

namespace Mission11.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _bookContext;

        public BookController(BookDbContext temp) => _bookContext = temp;

        [HttpGet]
        public IActionResult Get(int pageSize = 10, int pageNum = 1, string sortOrder = "asc", [FromQuery] List<string>? bookTypes = null)
        {
            var query = _bookContext.Books.AsQueryable();

            if (bookTypes != null && bookTypes.Any())
            {
                query = query.Where(b => bookTypes.Contains(b.Category));
            }
            
            var totalNumBooks = query.Count();
            
            // Get the books from the database
            var booksQuery = query.AsQueryable();

            // Sort the books based on the sortOrder parameter
            if (sortOrder.ToLower() == "desc")
            {
                booksQuery = booksQuery.OrderByDescending(b => b.Title);  // Sorting by title in descending order
            }
            else
            {
                booksQuery = booksQuery.OrderBy(b => b.Title);  // Sorting by title in ascending order
            }

            // Paginate the books
            var booksToDisplay = booksQuery
                .Skip((pageNum - 1) * pageSize)  // Skip the books for the previous pages
                .Take(pageSize)  // Take the books for the current page
                .ToList();




            // Create the response object with books and pagination info
            var response = new
            {
                Books = booksToDisplay,
                TotalNumBooks = totalNumBooks
            };

            return Ok(response);
        }

        [HttpGet("GetBookTypes")]
        public IActionResult GetBookTypes()
        {
            var bookTypes = _bookContext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();
            
            return Ok(bookTypes);
        }

        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _bookContext.Books.Add(newBook);
            _bookContext.SaveChanges();
            return Ok(newBook);
        }

        [HttpPut("UpdateBook/{bookId}")]
        public IActionResult UpdateBook(int bookId, [FromBody] Book updatedBook)
        {
            var existingBook = _bookContext.Books.Find(bookId);
            
            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;
            
            _bookContext.Books.Update(existingBook);
            _bookContext.SaveChanges();
            
            return Ok(existingBook);
        }


        [HttpDelete("Delete/{bookId}")]
        public IActionResult DeleteBook(int bookId)
        {
            var book = _bookContext.Books.Find(bookId);

            if (book == null)
            {
                return NotFound(new {message = "Book not found"});
            }
            
            _bookContext.Books.Remove(book);
            _bookContext.SaveChanges();

            return NoContent();
        }
        
        
    }
}