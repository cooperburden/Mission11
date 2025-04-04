import { useEffect, useState } from "react";
import { Book } from '../types/Book'
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Import the custom hook to access cart context
import { fetchBooks } from "../api/BooksAPI";
import Pagination from "./Pagination";

function BookList({ selectedCategories }: {selectedCategories: string[] }) {

    const [books, setBooks] = useState<Book[]>([]);
    const[pageSize, setPageSize] = useState<number>(10);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const { addToCart } = useCart(); // Destructure addToCart from context

    useEffect(() => {
        const loadBooks = async () => {
            try {
                setLoading(true);
              const data = await fetchBooks(pageSize, pageNum, selectedCategories)
             

            setBooks(data.books);
            setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        loadBooks();

    }, [pageSize, pageNum, selectedCategories]);


    if (loading) return <p>Loading Projects...</p>
    if (error) return <p className='text-red-500'>Error: {error}</p>

    return (
        <>
            <br />
            {books.map((b) => 
                <div id="bookCard" className="card" key={b.bookID}>
                    <h3 className="card-title" >{b.title}</h3>
                    <div className="card-body">
                        <ul className="list-unstyled">
                            <li><strong>Author:</strong> {b.author}</li>
                            <li><strong>Publisher</strong> {b.publisher}</li>
                            <li><strong>ISBN:</strong> {b.isbn}</li>
                            <li><strong>Classifcation:</strong> {b.classification}</li>
                            <li><strong>Category:</strong> {b.category}</li>
                            <li><strong>Number of Pages:</strong> {b.pageCount}</li>
                            <li><strong>Price:</strong> ${b.price}</li>
                        </ul>

                        <button className="btn btn-success" onClick={() => addToCart(b)} > Add to Cart </button>
                    </div>

                </div>


            )}

            <Pagination 
                currentPage={pageNum}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={setPageNum}
                onPageSizeChange={(newSize) => {
                    setPageSize(newSize);
                    setPageNum(1);
                }}

            />
        </>
    );
}

export default BookList;
