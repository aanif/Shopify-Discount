export async function getAllShopifyProducts() {
    const response = await fetch(`http://localhost:8000`, { //add URL as first argument
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
    return await response.json();
}
