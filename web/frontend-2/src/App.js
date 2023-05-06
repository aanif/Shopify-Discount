import {useState, useEffect} from 'react'
import './App.css';
import axios from 'axios';

function App() {
    const [allPrices, setAllPrices] = useState([]);

    useEffect(() => {
        getAllPricess();
    }, [])

    const getAllPricess = async () => {
        const res = await axios.get('http://127.0.0.1:8000/api/priceRule');
        setAllPrices(res.data.price_rules);
    }


  return (
    <div className="App container">
        {allPrices.length > 0 && <table border="1">
            <tbody>
                <tr>
                    <th>Title</th>
                    <th>starts at</th>
                    <th>ends at</th>
                </tr>
                {allPrices.map((item, index) => (
                    <tr key={index}>
                        <td>{item.title}</td>
                        <td>{item.starts_at}</td>
                        <td>{item.ends_at}</td>
                    </tr>
                ))}
            </tbody>
        </table>}
    </div>
  );
}

export default App;
