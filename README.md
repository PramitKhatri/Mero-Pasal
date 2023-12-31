# Mero-Pasal
If you have copied this code then please ensure that all dependencies both for React and Django are installed.

If you are getting react scripts missing error when doing npm start, install it first in the directory 
"**:C//Mero Pasal/meropasal_f/**"

`npm i react-scripts`

for server-side :
go to :**C//Mero Pasal/**

` myvenv\scripts\activate`

 `cd meropasal_b`

Now you should be inside meropasal_b directory.
`pip install -r requirements.txt`

` python manage.py runserver`

If at any time you decide to update or add any new python pakages then to update the requirements.txt file
In 
**C://Mero Pasal/meropasal_b/**

`pip freeze > requirements.txt`  (only do this while in virtual environment)





Various Users for the application

* admin@admin.com
admin

* seller@seller.com
seller@123

* seller2@seller.com
seller@123

* user@user.com
user@123

* user2@user.com
user@123

___

When you install dotenv make sure to add changes to manage.py file
these are:

```py
import dotenv
    def main:
        dotenv.read_dotenv()

```

now in main project directory, create a file named  .env and add your EMAIL_USER,EMAIL_PASSWORD, EMAIL_FROM


If you add your authentic gmail and password, for it to work, go to gmail.com and in manage your account option you need to turn on less secure app access in Security.  This will allow this django function to use your gmail to send email.

___


In case if you ever want to delete data form the databasw without deleting the table itself, do this:
 `python manage.py shell`
 `from django.contrib.auth.models import User`  or it can be like from product.models import Product
 `User.objects.all().delete()`  //replace the User with your model name.

___


I am writing this before I forget how convoluted my program is for esewa integration. 
In order page there is this code: 
``` js
if (selectedMethod === '2') {
          props.data.product.map(product=>(
            callEsewa({ product_id:product.id, price: product.price*product.quantity })
          ))
        }
```
This code is for when the use chooses to pay via esewa from cart. from product page it is simple as you just have to send the id and the price of that product.
But for the products in cart, the products are placed in an array. so I have to execute esewa function for every product in the cart. 
So callEsewa function is mapped for every item in the cart and will send their respective product id and price to the esewa function. I don't know how this will go...


quick note: the default category value in the model will be the id of category, I have used the slug related field here to show the string instead of id 
BUT, we can actually show the whole category data inside the product api view in browser so instead of showing like this

```json
    {
        "id":1
        "name":"product name"
        "category":1
    }
```
we get :

```json
    {
        "id":1
        "name":"product name"
        "category":{
            "id":1
            "category":"my category"
        }
    }
```
I did this for seller using 
```py
seller=UserSerializer()
```

~~Simple but useful~~

No not simple at all, because if you do this then when adding a new product, i have to also send the id and category name both to the view so that serializer is valid. this is like a double edged sword. shows all data but also requires all data when being created. 
___

Here is how I am getting the order items from the backend:

First by using the id of the user, we get all the orders that have been made by the use, see MyOrders.jsx 
```js
    axios.get(`http://localhost:8000/order/${userdata.user.id}/`, {
      headers: {
        'Authorization': `Token ${userdata.token}`
      }
    })
      .then(res => setOrders(res.data))
      .catch(err => console.log(err))
```

Now we have an array of order details each containing the address and date to be delivered. But we only need the orderid. We use that order id to send a request to the backend to receive all the orderitems that have the orderid.

```js
    const OrderItemDetail = await Promise.all( 
      orders.map(order => axios.get(`http://localhost:8000/getorderitems/${order.id}/`))
    )
```
Using Promise.all ensures that you wait for all the requests to complete and gather all the responses from each order before further processing. so to go any further in code, we have to loop over each item in orders array.

this is where it gets weird. Since each response can contain multiple orderitems.
for example, one orderitem would be a tshirt you ordered yesterday but another orderitem will be an array which will contain the hat and shoes you ordered at once today.  
So the response will be an array of arrays basically.

to get individual data of each product we do this:
```js
    const allOrderItems = OrderItemDetail.reduce((accumulator, SingleOrderItemDetail) => {
      if (SingleOrderItemDetail.data) {
        return accumulator.concat(SingleOrderItemDetail.data)
      }
      return accumulator
    }, [])
    
    setOrderitems(allOrderItems)
```

this will extract all the individual orderitems from the array of array and put it into a single array.
now something like  [[t-shirt],[hat,shoes]]  will become [t-shirt,hat,shoes]

Now we just do :
```js
{orderitems.map((item, index) => (            
                  <p key={index}>{item.product.product_name}</p>
                
              ))}
```
___

##### These only apply to the previous version of meropasal, due to various authentication and authorization problems, the seller model had to be removed entirely.=========================

Mero-Pasal consists of two user model. One is User model that handles normal users and Other is a custom User model named Seller that handles the function of a Seller/vendor.

User authentication is done with Token for users and JWT refresh token for sellers. I did this so that I can learn to use both. JWT tokens seem to be progressively better but also a bit difficult to implement.

Since I am using Two types of user when I made this app,
I made it so that Seller will have email as a unique field.
Now the normal user=authenticate() function can only use username and password .
So to work around that issue I have to create a custom suthenticate function that will handle the Seller authentication.
And have to manually register it in settings.py 
so when i have to authenticate user with email and not username I have to follow this way
In views.py, I can import authenticate as from from appname.custom_authenticator import authenticator_class if I have registered in settings.py 
both the app name and function name can be anything i want. Check line 57-61 in setting.py (maychange)
quick note: just not make your instance and your function name which is authenticate same
example: 
 ```python
 from seller.authenticator import SellerAuthenticator 
 authenticate_seller=SellerAuthenticator()  not authenticate=SellerAuthenticator()
 use it as: seller=authenticate_seller.authenticate(request,email,password)
 ```