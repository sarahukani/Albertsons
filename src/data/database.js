import backendOrigin from "../config/origin.js";

/*
***************************************************************************
***************************************************************************
   Control-f to find your function/query by category:
       USER-QUERIES
       STORE-QUERIES
       PRODUCT-QUERIES
       PLAYLIST-QUERIES
       CLOUD-STORAGE-QUERIES
       ALBERT-QUERIES
***************************************************************************
***************************************************************************
*/
let albertOrigin = "http://34.68.232.71:2002";

export default class Database {

    
   // **************************************************************************
   // USER-QUERIES *************************************************************
   // **************************************************************************

   static async getAllUsers() {
       const response = await fetch(`${backendOrigin}/users`);
       const userData = await response.json();
       return userData;
   }

   static async getUserByID(userID){
       const response = await fetch(`${backendOrigin}/users/${userID}`);
       const userData = await response.json();
       return userData;
   }

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

   // **************************************************************************
   // STORE-QUERIES ************************************************************
   // **************************************************************************

   static async getStoreByID(storeID) {
       const response = await fetch(`${backendOrigin}/stores/${storeID}`);
       const storeData = await response.json();
       return storeData;
   }

   static async getStoresByStoreIDs(storeIDs) {
       let storeList = [];
       for (let i = 0; i < storeIDs.length; i++) {
           storeList.push(Database.getStoreByID(storeIDs[i]));
       }
       return storeList;
   }

   static async getAllStores() {
       const response = await fetch(`${backendOrigin}/stores`);
       const storeData = await response.json();
       return storeData;
   }

   static async pushStoreProductsList(storeID, productID) {
       const response = await fetch(`${backendOrigin}/stores/add-product/${storeID}/${productID}`, {
           method:"PUT",
           headers: {
               "Content-Type": "application/json",
           }
       });
       const storeData = await response.json();
       return storeData;
   }

   static async popStoreProductsList(storeID, productID) {
       const response = await fetch(`${backendOrigin}/stores/delete-product/${storeID}/${productID}`, {
           method:"PUT",
           headers: {
               "Content-Type": "application/json",
           }
       });
       const storeData = await response.json();
       return storeData;
   }

   static async pushStorePlaylist(storeID, playlistID) {
       const response = await fetch(`${backendOrigin}/stores/add-playlist/${storeID}/${playlistID}`, {
           method:"PUT",
           headers: {
               "Content-Type": "application/json",
           }
       });
       const storeData = await response.json();
       return storeData;
   }

   static async popStorePlaylist(storeID, playlistID) {
       const response = await fetch(`${backendOrigin}/stores/delete-playlist/${storeID}/${playlistID}`, {
           method:"PUT",
           headers: {
               "Content-Type": "application/json",
           }
       });
       const storeData = await response.json();
       return storeData;
   }

   // TODO: Make it dynamic to pop/push multiple products
   static async updateStoreProductsList() {}

   // TODO: Make it dynamic to pop/push multiple playlists
   static async updateStorePlaylists() {}

   static async getCurrentLocationProducts(storeID) {
       const response = await fetch(`${backendOrigin}/stores/current-products/${storeID}`);
       const storeProductsData = await response.json();
       return storeProductsData;
   }  

   static async getCurrentLocationPlaylists(storeID) {
       const response = await fetch(`${backendOrigin}/stores/current-playlists/${storeID}`);
       const storePlaylistsData = await response.json();
       return storePlaylistsData;
   }  


   // **************************************************************************
   // PRODUCT-QUERIES **********************************************************
   // **************************************************************************

   static async getProductbyID(storeID) {
       const response = await fetch(`${backendOrigin}/products/${storeID}`);
       const storeProductID = await response.json();
       return storeProductID;
   }

   static async getAllProducts() {
       const response = await fetch(`${backendOrigin}/products`);
       const productData = await response.json();
       return productData;
   }

   static async createProduct(pID, name, price, imageURL){
       let product = {
           name: name,
           price: price,
           imageURL: imageURL
       };
       let requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json' // Set the Content-Type header to application/json
        },
        body: JSON.stringify(product),

      };
       const response = await fetch(`${backendOrigin}/products/create/${pID}`, requestOptions);
       const productData = await response.json();
       return productData;
   }

   static async deleteProduct(pID) {
       const response = await fetch(`${backendOrigin}/products/delete/${pID}`, {
           method: "DELETE"
       });
       const successMessage = await response.json();
       return successMessage;
   }


   // **************************************************************************
   // PLAYLIST-QUERIES *********************************************************
   // **************************************************************************

   static async getAllPlaylists() {
       const response = await fetch(`${backendOrigin}/playlists`);
       const playlistData = await response.json();
       return playlistData;
   }

   static async getPlaylistbyID(playlistID) {
       const response = await fetch(`${backendOrigin}/playlists/${playlistID}`);
       const storePlaylistsData = await response.json();
       return storePlaylistsData;
   }

   static async createPlaylist(name, imageURLs, startDate, endDate) {
       let playlist = {
           name : name,
           images : imageURLs,
           startDate: startDate.toISOString(),
           endDate: endDate.toISOString(),
       };

       console.log(playlist);

       let requestOptions = {
           method: 'PUT',
           body: JSON.stringify(playlist),
           headers: {
            'Content-Type': 'application/json',
          },
       };
       const response = await fetch(`${backendOrigin}/playlists/create`, requestOptions);
       const playlistData = await response.json();
       return playlistData;
   }

   static async deletePlaylists(plID) {
       const response = await fetch(`${backendOrigin}/playlists/delete/${plID}`, {
           method: "DELETE"
       });
       const successMessage = await response.json();
       return successMessage;
   }

   // **************************************************************************
   // CLOUD-STORAGE-QUERIES ****************************************************
   // **************************************************************************

   static async uploadProductImage(file) {
       var formdata = new FormData();
       formdata.append("files", file);
       var requestOptions = {
           method: 'POST',
           body: formdata,
       };
       fetch(`${backendOrigin}/gcp/upload-multiple`, requestOptions)
       .then(response => response.text())
       .then(result => {
            console.log(result);
            return result;
        })
       .catch(error => console.log('error', error));
   }

   static async uploadProductImages(files) {
        return new Promise((resolve, reject) => {
        let pids = "";
        var formdata = new FormData();
        for (let i = 0; i < files.length; i++) {
            formdata.append("files", files[i]);
        }
        })
    }


    // **************************************************************************
    // USER TABLE QUERIES *******************************************************
    // **************************************************************************

    static async getAllUsers() {
        const response = await fetch(`${backendOrigin}/users`);
        const userData = await response.json();
        return userData;
    }

    static async getUserByID(userID){
        const response = await fetch(`${backendOrigin}/users/${userID}`);
        const userData = await response.json();
        return userData;
    }

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

    // **************************************************************************
    // STORE TABLE QUERIES ******************************************************
    // **************************************************************************

    static async getStoreByID(storeID) {
        const response = await fetch(`${backendOrigin}/stores/${storeID}`);
        const storeData = await response.json();
        return storeData;
    }

    static async getStoresByStoreIDs(storeIDs) {
        let storeList = [];
        for (let i = 0; i < storeIDs.length; i++) {
            storeList.push(Database.getStoreByID(storeIDs[i]));
        }
        return storeList;
    }

    static async getAllStores() {
        const response = await fetch(`${backendOrigin}/stores`);
        const storeData = await response.json();
        return storeData;
    }

    static async pushStoreProductsList(storeID, productID) {
        const response = await fetch(`${backendOrigin}/stores/add-product/${storeID}/${productID}`, {
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const storeData = await response.json();
        return storeData;
    }

    static async popStoreProductsList(storeID, productID) {
        const response = await fetch(`${backendOrigin}/stores/delete-product/${storeID}/${productID}`, {
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const storeData = await response.json();
        return storeData;
    }

    static async pushStorePlaylist(storeID, playlistID) {
        const response = await fetch(`${backendOrigin}/stores/add-playlist/${storeID}/${playlistID}`, {
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const storeData = await response.json();
        return storeData;
    }

    static async popStorePlaylist(storeID, playlistID) {
        const response = await fetch(`${backendOrigin}/stores/delete-playlist/${storeID}/${playlistID}`, {
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const storeData = await response.json();
        return storeData;
    }

    // TODO: Make it dynamic to pop/push multiple products
    static async updateStoreProductsList() {}

    // TODO: Make it dynamic to pop/push multiple playlists
    static async updateStorePlaylists() {}

    static async getCurrentLocationProducts(storeID) {
        const response = await fetch(`${backendOrigin}/stores/current-products/${storeID}`);
        const storeProductsData = await response.json();
        return storeProductsData;
    }   

    static async getCurrentLocationPlaylists(storeID) {
        const response = await fetch(`${backendOrigin}/stores/current-playlists/${storeID}`);
        const storePlaylistsData = await response.json();
        return storePlaylistsData;
    }   

    // **************************************************************************
    // PRODUCT TABLE QUERIES ****************************************************
    // **************************************************************************

    static async getProductbyID(storeID) {
        const response = await fetch(`${backendOrigin}/products/${storeID}`);
        const storeProductID = await response.json();
        return storeProductID;
    }

    static async getAllProducts() {
        const response = await fetch(`${backendOrigin}/products`);
        const productData = await response.json();
        return productData;
    }

    static async createProduct(pID, name, price, imageURL){
        let product = {
            name: name,
            price: price,
            imageURL: imageURL
        };
        let requestOptions = {
            method: 'PUT',
            body: JSON.stringify(product),
             headers: {
                    "Content-Type": "application/json",
                },
        };
        const response = await fetch(`${backendOrigin}/products/create/${pID}`, requestOptions);
        const productData = await response.json();
        return productData;
    }

    static async deleteProduct(pID) {
        const response = await fetch(`${backendOrigin}/products/delete/${pID}`, {
            method: "DELETE"
        });
        const successMessage = await response.json();
        return successMessage;
    }

    // **************************************************************************
    // PLAYLIST QUERIES *********************************************************
    // **************************************************************************

    static async getAllPlaylists() {
        const response = await fetch(`${backendOrigin}/playlists`);
        const playlistData = await response.json();
        return playlistData;
    }

    static async getPlaylistbyID(playlistID) {
        const response = await fetch(`${backendOrigin}/playlists/${playlistID}`);
        const storePlaylistsData = await response.json();
        return storePlaylistsData;
    }

    static async createPlaylist(name, imageURLs, startDate, endDate) {
        let playlist = {
            name : name, 
            images : imageURLs, 
            startDate : startDate,
            endDate : endDate
        };

        let requestOptions = {
            method: 'PUT',
            body: JSON.stringify(playlist),
        };
        const response = await fetch(`${backendOrigin}/playlists/create`, requestOptions);
        const playlistData = await response.json();
        return playlistData;
    }

    static async deletePlaylists(plID) {
        const response = await fetch(`${backendOrigin}/playlists/delete/${plID}`, {
            method: "DELETE"
        });
        const successMessage = await response.json();
        return successMessage;
    }

    // **************************************************************************
    // CLOUD STORAGE QUERIES ****************************************************
    // **************************************************************************

    static async uploadProductImage(file) {
        var formdata = new FormData();
        formdata.append("files", file);

        var requestOptions = {
            method: 'POST',
            body: formdata,
        };
        fetch(`${backendOrigin}/gcp/upload-multiple`, requestOptions)

            .then(response => response.text())
            .then(result => {
            console.log("THIS IS THE RESULT OF THE API CALL: ", result);
            pids = result;
            resolve(pids); // Resolve the promise with the result value
            })
            .catch(error => {
            console.log('error', error);
            reject(error); // Reject the promise if there's an error
            });
        
        }

   static async deleteImage(pID) {
       const response = await fetch(`${backendOrigin}/gcp/delete/${pID}`);
       const successMessage = await response.json();
       return successMessage;
   }

   // **************************************************************************
   // ALBERT-QUERIES ***********************************************************
   // **************************************************************************

   static async getProductRecommendations(storeID, category) {
        const queryParams = new URLSearchParams();
        queryParams.append("storeid", storeID);
        queryParams.append("category", category);

        const url = `${albertOrigin}/getrec/script-call/?${queryParams.toString()}`;
        console.log(url);
        const response = await fetch(url);
        const productRecommendations = await response.json();
        console.log(productRecommendations);
        return productRecommendations;
   }

    // static async uploadProductImages(files) {
    //     let pids = "";
    //     var formdata = new FormData();
    //     for (let i = 0; i < files.length; i++) {
    //         formdata.append("files", files[i]);
    //     }
    //     var requestOptions = {
    //         method: 'POST',
    //         body: formdata,
    //     };
    //     fetch(`${backendOrigin}/gcp/upload-multiple`, requestOptions)
    //     .then(response => response.text())
    //     .then(result => {
    //         console.log("THIS IS THE RESULT OF THE API CALL: ", result);
    //         pids = result;
    //     })
    //     .catch(error => console.log('error', error));

    //     return pids;
    // }
    static async uploadProductImages(files) {
        return new Promise((resolve, reject) => {
          let pids = "";
          var formdata = new FormData();
          for (let i = 0; i < files.length; i++) {
            formdata.append("files", files[i]);
          }
          var requestOptions = {
            method: 'POST',
            body: formdata,
          };
          fetch(`${backendOrigin}/gcp/upload-multiple`, requestOptions)
            .then(response => response.text())
            .then(result => {
              console.log("THIS IS THE RESULT OF THE API CALL: ", result);
              pids = result;
              resolve(pids); // Resolve the promise with the result value
            })
            .catch(error => {
              console.log('error', error);
              reject(error); // Reject the promise if there's an error
            });
        });
      }


    static async deleteImage(pID) {
        const response = await fetch(`${backendOrigin}/gcp/delete/${pID}`);
        const successMessage = await response.json();
        return successMessage;
    }

    // **************************************************************************
    // ALBERT QUERIES ***********************************************************
    // **************************************************************************

}
