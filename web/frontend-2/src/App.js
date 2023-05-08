import {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import FullScreenDialog from './components/modal';

function App() {
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        getAllOffers();
    }, [])

    const getAllOffers = async () => {
        const res = await axios.get('http://127.0.0.1:8000/api/priceRule');
        res.data.price_rules.forEach(async(item)=>{
            const startDateTime = new Date(item.starts_at);
            const endDateTime = new Date(item.ends_at); 
            const startLocalDateTimeString = startDateTime.toLocaleString();   
            const endLocalDateTimeString = endDateTime.toLocaleString();
            item.starts_at=startLocalDateTimeString
            item.ends_at=endLocalDateTimeString
        })
        setOffers(res.data.price_rules);
    }

  return (
    <div className="App container">
        {offers.length > 0 && <table border="1">
            <tbody>
                <tr>
                    <th>Title</th>
                    <th>starts at</th>
                    <th>ends at</th>
                </tr>
                {offers.map((item, index) => (
                    <tr key={index}>
                        <td>{item.title}</td>
                        <td>{item.starts_at}</td>
                        <td>{item.ends_at}</td>
                        <td className=""><FullScreenDialog offer={item}/></td>
                    </tr>
                ))}
            </tbody>
        </table>}
    </div>
  );
}

export default App;
