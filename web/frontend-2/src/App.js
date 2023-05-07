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
        res.data.price_rules.forEach(async(item)=>{
            const startDateTime = new Date(item.starts_at);
            const endDateTime = new Date(item.ends_at); 
            const startLocalDateTimeString = startDateTime.toLocaleString();   
            const endLocalDateTimeString = endDateTime.toLocaleString();
            item.starts_at=startLocalDateTimeString
            item.ends_at=endLocalDateTimeString
        })
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
                        <td className="button hover" onClick={()=>console.log("play")}>check offer</td>
                    </tr>
                ))}
            </tbody>
        </table>}
    </div>
  );
}

export default App;
