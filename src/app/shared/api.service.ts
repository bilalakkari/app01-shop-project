import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public search = new BehaviorSubject<string>("");

  constructor(private api: HttpClient) { }

  readonly PhotoUrl = "https://localhost:5001/Photos/";

  getCategories() {
    return this.api.get('http://localhost:3000/categories');
  }

  getAllUsers() {
    return this.api.get('https://localhost:5001/api/login');
  }

  checkUsers() {
    return this.api.get('https://localhost:5001/api/checkusersList');
  }

  UploadPhoto(val: any) {
    return this.api.post('https://localhost:5001/api/signup/SaveFile', val);
  }

  signUp(data: any) {
    return this.api.post<any>('https://localhost:5001/api/signup', data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  emailsent(data: any) {
    return this.api.post<any>('http://localhost:3000/checkemail', data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  changeProfile(id: any, user: any) {
    return this.api.put("http://localhost:3000/changeprofile", { user })
  }

  changeCategory(category_id: any, category_name: any) {
    return this.api.put("http://localhost:3000/edit-category", { category_id: category_id, category_name: category_name })
  }

  getProducts() {
    return this.api.get("http://localhost:3000/products")
  }

  getProduct(id: any) {
    return this.api.get(`http://localhost:3000/products/${id}`)
  }

  getComments(id: any) {
    return this.api.get(`http://localhost:3000/comments/${id}`)
  }

  getUserData(id: any) {
    return this.api.get(`https://localhost:5001/api/usersData/${id}`)
  }

  deleteProduct(id: any) {
    return this.api.delete(`https://localhost:5001/api/products/${id}`)
  }

  deleteCategory(id: any) {
    return this.api.delete(`http://localhost:3000/delete-category/${id}`)
  }

  getProductCart(user_id: any) {
    return this.api.get("http://localhost:3000/cart-prodcts/" + user_id)
  }

  getProductCartId(product_id: any, user_id: any) {
    return this.api.get("http://localhost:3000/cart-prodcts/" + product_id + "/" + user_id)
  }

  getUsersEmail(user_id: any) {
    return this.api.get("https://localhost:5001/api/checkusersList/" + user_id)
  }

  editProductCart(id: any, quantity: any) {
    return this.api.put("http://localhost:3000/cart-prodcts", { id: id, quantity: quantity })
  }

  addQuantity(id: any, quantity: any) {
    return this.api.put("http://localhost:3000/addQuantity/", { id: id, quantity: quantity })
  }

  removeQuantity(id: any, quantity: any) {
    return this.api.put("http://localhost:3000/removeQuantity/", { id: id, quantity: quantity })
  }

  removeproduct_cart(id: any) {
    return this.api.delete(`http://localhost:3000/products-card/${id}`)
  }

  getLogin() {
    return this.api.get("https://localhost:5001/api/login")
  }

  addUserProduct(data: any) {
    return this.api.post<any>('https://localhost:5001/api/userproducts', data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  addProducts(data: any) {
    return this.api.post<any>('http://localhost:3000/post-product', data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  addComments(data: any) {
    return this.api.post<any>('http://localhost:3000/addComment', data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  contactEmail(data: any) {
    return this.api.post<any>('http://localhost:3000/contact', data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  checkoutEmail(data: any) {
    return this.api.post<any>('http://localhost:3000/checkout', data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  favourites(data: any) {
    return this.api.post<any>('http://localhost:3000/favourites', data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  addCategories(data: any) {
    return this.api.post<any>('http://localhost:3000/category', data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getFavouritesProducts(user_id: any) {
    return this.api.get(`http://localhost:3000/favourites/${user_id}`)
  }

  getFavouritesProductsUserId(user_id: any, product_id: any) {
    return this.api.get(`http://localhost:3000/favourites/${user_id}/${product_id}`)
  }

  removeFavouriteProduct(product_id: any) {
    return this.api.delete(`http://localhost:3000/favourites-card/${product_id}`)
  }

  deleteAllItemsCart(user_id: any) {
    return this.api.delete(`http://localhost:3000/deleteAllProducts/${user_id}`)
  }


  addOrders(data: any) {
    return this.api.post<any>('http://localhost:3000/addOrders', data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getUserEmail(email: any) {
    return this.api.get(`http://localhost:3000/userEmail/${email}`)
  }

  verifyUser(user_id: any) {
    return this.api.put(`http://localhost:3000/verify`, { user_id: user_id })
  }
}
