import backendOrigin from "../config/origin";

export default class Database {

    static async postUserSession(loginRequest) {
        console.log(loginRequest);
        try {
            const response = await fetch(`${backendOrigin}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginRequest),
            });
            if (response.status === 401) {
                throw new Error("Invalid login credentials");
            }
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("An error occurred");
            }
        } catch (error) {
            console.log(error);
        }
    }

    static async getAllUsers() {
        const response = await fetch(`${backendOrigin}/users`);
        const userData = await response.json();
        return userData;
    }

    static async getStoreById(storeId) {
        const response = await fetch(`${backendOrigin}/stores/${storeId}`);
        const storeData = await response.json();
        // console.log(storeData);

        return storeData;
    }

    static async getStoresByStoreIds(storeIds) {
        let storeList = [];
        for (let i = 0; i < storeIds.length; i++) {
            storeList.push(Database.getStoreById(storeIds[i]));
            // console.log(Database.getStoreById(storeIds[i]));
        }
        return storeList;
    }

    static async createPlaylist(name, imageUrls, startDate, endDate) {
        const playlistData = {
          name: name,
          images: imageUrls,
          startDate: startDate,
          endDate: endDate,
        };
      
        try {
          const response = await fetch(`${backendOrigin}/playlists/create`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(playlistData),
          });
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const data = await response.json();
          console.log('Playlist saved:', data);
          // Perform any other actions or update the UI as needed
        } catch (error) {
          console.error('Error while saving playlist:', error);
        }
      };


    static async getAllProducts() {
        try {
            const response = await fetch(`${backendOrigin}/products`);
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }
      


    static async uploadProductImages(file) {
            var formdata = new FormData();
            formdata.append("file", file);

            var requestOptions = {
                method: 'POST',
                body: formdata,
            };
        
            fetch(`${backendOrigin}/gcp/upload`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
}


