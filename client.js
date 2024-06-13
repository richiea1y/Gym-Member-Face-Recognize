import axios from "axios";

axios.post('http://localhost:8887/store-data', data)
    .then(response => {
        console.log('Data stored successfully:', response.data);
    })
    .catch(error => {
        console.error('Error storing data:', error);
    });