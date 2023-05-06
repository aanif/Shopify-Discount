export async function getPriceRules() {
    const response = await fetch(`http://127.0.0.1:8000/api/priceRule`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
    return await response.json();
}
