import { useEffect, useState } from "react";
import './CategoryFilter.css';

function CategoryFilter({
    selectedCategories, 
    setSelectedCategories
} : {
    selectedCategories: string[];
    setSelectedCategories: (categories: string[]) => void;
}) {
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://localhost:5000/Book?pageSize=100&pageNum=1');
                const data = await response.json();
                
                console.log('Fetched categories (full response):', JSON.stringify(data, null, 2));
                if (data.books) {
                    const categoriesList = data.books.map((book: any) => book.category);
                    console.log('Categories list:', categoriesList);
                    setCategories(categoriesList);
                } else {
                    console.log('No books found in response');
                    setCategories([]);
                }
            } catch (error) {
                console.error('Error fetching categories', error);
                setCategories([]);
            }
        };

        fetchCategories(); 
    }, []);

    function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
        const updatedCategories = selectedCategories.includes(target.value) 
            ? selectedCategories.filter(x => x !== target.value) 
            : [...selectedCategories, target.value];
        setSelectedCategories(updatedCategories);
    }

    return (
        <div className="category-filter">
            <h5>Project Types</h5>
            <div className="category-list">
                {categories.map((c, index) => (
                    <div key={c || index} className="category-item"> 
                        <input 
                            type='checkbox' 
                            id={c || `category-${index}`} 
                            value={c} 
                            className="category-checkbox" 
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor={c || `category-${index}`}>{c}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryFilter;