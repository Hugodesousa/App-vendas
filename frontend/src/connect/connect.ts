export function requestAPI(url:string) {
    fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      const t = data
      return t
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
}