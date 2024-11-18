import { useState, useEffect } from 'react';
import getAllProducts from '../../services/getAllProducts';
import CardList from '../../components/CardList/CardList';
import Navbar from '../../components/Navbar/Navbar';
import RadioButton from '../../components/RadioButton/RadioButton';

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const allProducts = getAllProducts();
    setProducts(allProducts);
    setFilteredProducts(allProducts); // Set awal ke semua produk
  }, []);

  const handleFilterChange = (value) => {
    setFilter(value); // Perbarui filter
    if (value === 'all') {
      setFilteredProducts(products); // Tampilkan semua produk
    } else if (value === 'menshoes') {
      setFilteredProducts(products.filter(product => product.category === "Men's Shoe"));
    } else if (value === 'womenshoes') {
      setFilteredProducts(products.filter(product => product.category === "Women's Shoe"));
    }
  };

  const RadioButtonOpts = [
    { label: 'All', value: 'all' },
    { label: "Men's Shoes", value: 'menshoes' },
    { label: "Women's Shoes", value: 'womenshoes' },
  ];

  return (
    <>
      <Navbar />
      <div className="px-24 py-4 gap-4 mt-4 flex-wrap">
        <h3 className="font-medium">Filter</h3>
        <div className="flex gap-2 flex-wrap">
          <RadioButton 
            options={RadioButtonOpts} 
            defaultValue={'all'} 
            onChange={handleFilterChange} // Kirim fungsi langsung
          />
        </div>
      </div>
      <section className="container px-24 py-4 bg-gray-50">
        <main className="grid grid-cols-4 gap-4">
          <CardList products={filteredProducts} />
        </main>
      </section>
    </>
  );
}
