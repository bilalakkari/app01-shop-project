export class LOGIN {
    username: string = "";
    password: string = "";
}

export class SIGN_UP {
    id: number = 0;
    username: string = "";
    email: string = "";
    password: string = "";
    img: string = "";
    is_verified: boolean = false;
}

export class UPDATE_PROFILE {
    ID: number = 0;
    username: string = "";
    email: string = "";
    password: string = "";
    img: string = "";
}

export class DATA_POST_USER {
    user_id: any = 0;
    product_id: number = 0;
    quantity: number = 0;
}

export class ORDERS {
    user_id: any = 0;
    product_id: number = 0;
    quantity: number = 0;
}

export class DATA_POST_USER_FAVOURITES {
    user_id: any = 0;
    product_id: number = 0;
}

export class DATA_POST_PRODUCT {
    title: string = "";
    description: string = "";
    price: number = 0;
    imgUrl: string = "";
    imgUrl2: string = "";
    imgUrl3: string = "";
    category_id: string = "";
}

export class USER {
    id: number = 0;
    username: string = "";
    password: string = "";
    email: string = "";
}

export class CHECK_USERS {
    username: string = "";
    email: string = "";
}

export class SEND_EMAIL {
    FullName: string = "";
    Email: string = "";
    Test: string = "";
    Text: string = "";
}

export class CHECKOUT {
    FirstName: string = "";
    LastName: string = "";
    Street: string = "";
    Phone: string = "";
    EmailAddress: string = "";
    Products_Checkout: string = "";
    Notes: string = "";
}

export class ADD_CATEGORY {
    category_id: string = "";
    category_name: string = "";
    category_img: string = "";
}

export class ADD_COMMENT {
    user_id: string = "";
    product_id: string = "";
    comment_text: string = "";
    stars: string = "";
}

