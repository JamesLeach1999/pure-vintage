const router = require('express').Router();
const User = require('../models/User');
const {  ensureAuthenticated } = require('../middleware/auth');
console.log('i work8');
const { filter } = require('../emails/account');
const Product = require('../models/products');
const cloudinary = require('cloudinary').v2;
const Order = require('../models/Order');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// AUTHENTICATION EXPLAINED
// i have used ensureAuthenticated on most of the routes here. This is so we can get the session and user ID and therefore the user profile
// i also return whether or not the user is authenticated and whether or not they are an admin
// the results of these return vvalues determine what you see in the navigation bar, or the nav partial
// if the user is not authenticated, i didnt want to do a catch all in the auth middleware as all cases are slightly different and the data needed for the pages isnt returned
// instead, i check whether or not theyre logged in and render in the same or different page with different data
// i also check for whether or not the passport value is empty. when you log out it dosent delete the passport field from the session
// but rather just removes the value for passport leaving it blank. so had to account for this as well

// only admins can upload and uses multer middleware to handle images
router.post('/products', ensureAuthenticated, async (req, res) => {
  var errors = [];
  // using an array to store theimages max is 10 images
  var ogName = [];

  // retreiving input data. using multer middleware for the image

  var t = [];
  
  if (req.files.image.length > 0) {
    for (var i = 0; req.files.image.length > i; i++) {
      // uploading the cloudinary for universal browser access of pics. resizing for easier insertion into card react element
      var fileJPG = await cloudinary.uploader.upload(req.files.image[i].tempFilePath, {
        width: 1250,
        height: 1250,
        tags: 'pure-vintage',
        public_id: req.files.image[i].name,
      });
      // push all image urls to new product to be accessed via mongo
      ogName.push(fileJPG.url);
    }
  } else {
    var fileJPG = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
      width: 1250,
      height: 1250,
      tags: 'pure-vintage',
      public_id: req.files.image.name,
    });

    ogName.push(fileJPG.url);
  }

  var flip = ogName.reverse();
  // ogName.push(await cloudinary.uploader.upload(`${img.originalname}`));
  // });

  // console.log(ogName);
  const price = req.body.price;
  const name = req.body.name;
  const brand = req.body.brand;
  const category = req.body.category;
  const description = req.body.description;
  const size = req.body.size;

  // ERROR CHECKING. makes sure all fields filled
  if (!price || !name || !brand || !category || !description) {
    errors.push({
      msg: 'please fill all fields',
    });
  }

  if (price < 0) {
    errors.push({
      msg: 'price cant be below 0',
    });
  }

  // const user = await User.findOne({
  //   _id: req.session.passport.user,
  // });

  // console.log(fileJPG.url);

  // again, only will work if the user is an admin. wont matter too much as if they are not admins they wont see the option to upload anyway

  const products = new Product({
    price,
    name,
    brand,
    category,
    description,
    size,
    image: flip,
    featured: false,
  });

  try {
    await products.save();

    res.redirect('/store');
  } catch (error) {
    res.status(401).send(error);
  }
});

// getting the manage products page for the create, edit and delete page links
router.post('/manage', async (req, res) => {
  // console.log(req.body.category)
  var category;

  console.log('i work2');
  // console.log(req.method);

  // console.log(req.body)
  if (req.body.category) {
    var category = req.body.category.toString();
    var catStr = category.replace(/,/g, ' ');

    req.body.category = catStr;
  }
  if (req.body.brand) {
    var brand = req.body.brand.toString();
    var brandStr = brand.replace(/,/g, ' ');

    req.body.brand = brandStr;
  }
  if (req.body.size) {
    var size = req.body.size.toString();
    var sizeStr = size.replace(/,/g, ' ');

    req.body.size = sizeStr;
  }

  var clothes = [];
  if (
    req.body.category === undefined &&
    req.body.brand === undefined &&
    req.body.size === undefined &&
    req.body.skip === undefined
  ) {
    const pro = await Product.find({}).limit(16);
    // console.log(await Product.find({ category: ['jim'] }));
    pro.forEach((n) => {
      clothes.push(n);
    });
  } else {
    const user = await User.findById({ _id: req.session.passport.user });
    if (!user) {
      var auth = false;
      var admin = false;
    } else if (!user.isAdmin) {
      var auth = true;
      var admin = false;
    } else {
      var auth = true;
      var admin = true;
    }
    // console.log(req.body)
    console.log('i work5');

    var pro1 = await filter(req.body);
    // console.log(pro1);
    pro1.forEach((ite) => {
      clothes.push(ite);
    });
  }
  res.send({
    pageTitle: 'welcome',
    names: clothes,
    query: req.query.id,
    isAuth: auth,
    isAdmin: admin,
  });
});
// getting the add page
// router.get('/add', ensureAuthenticated, async (req, res) => {
//   try {
//     const user = await User.findById({ _id: req.session.passport.user });

//     res.render('add.ejs', {
//       isAuth: true,
//       isAdmin: user.isAdmin,
//     });
//   } catch (error) {
//     res.status(400).send(error + 'numberwang');
//   }
// });

// getting the edit page, will add pagnintation
// router.get('/edit', ensureAuthenticated, async (req, res) => {
//   try {
//     // getting the add page
//     const user = await User.findById({ _id: req.session.passport.user });

//     const products = await Product.find({});
//     res.render('edit.ejs', {
//       names: products,
//       isAuth: true,
//       isAdmin: user.isAdmin,
//     });
//   } catch (error) {
//     res.status(400).send(error + 'numberwang');
//   }
// });

// router.post('/edit', ensureAuthenticated, async (req, res) => {
//   console.log(req.body);
//   var category;
//   if (req.body.category) {
//     var category = req.body.category.toString();
//     var catStr = category.replace(/,/g, ' ');

//     req.body.category = catStr;
//   }
//   if (req.body.brand) {
//     var brand = req.body.brand.toString();
//     var brandStr = brand.replace(/,/g, ' ');

//     req.body.brand = brandStr;
//   }
//   if (req.body.size) {
//     var size = req.body.size.toString();
//     var sizeStr = size.replace(/,/g, ' ');

//     req.body.size = sizeStr;
//   }

//   var clothes = [];
//   if (
//     req.body.category === undefined &&
//     req.body.brand === undefined &&
//     req.body.size === undefined
//   ) {
//     const pro = await Product.find({});

//     pro.forEach((n) => {
//       clothes.push(n);
//     });
//   } else {
//     console.log('i work7');

//     var pro1 = await filter(req.body);
//     pro1.forEach((ite) => {
//       clothes.push(ite);
//     });
//   }

//   console.log(req.body.yes);

//   // if(req.body.delete){
//   //     Product.findByIdAndDelete({_id: req.body.delete}, (err, res) => {
//   //         console.log(res)
//   //     })
//   // }
//   res.render('edit.ejs', {
//     pageTitle: 'welcome',
//     names: clothes,
//     isAuth: true,
//     isAdmin: true,
//   });
// });

router.post('/editPost', async (req, res) => {
  // console.log(req.body);

  var edits = req.body.edit;

  const id = req.body.id;
  var f = [];
  var updates = ['name', 'brand', 'category', 'description', 'size', 'price', 'featured'];
  updates.forEach((pro) => {
    f.push(pro);
  });
  for (var i = 0; i < edits.length; i++) {
    if (edits[i] !== '') {
      switch (updates[i]) {
        case 'name':
          Product.findByIdAndUpdate({ _id: id }, { name: edits[i] }, (err, res) => {
            console.log(err);
          });
          break;
        case 'brand':
          Product.findByIdAndUpdate({ _id: id }, { brand: edits[i] }, (err, res) => {
            console.log(err);
          });
          break;
        case 'category':
          Product.findByIdAndUpdate({ _id: id }, { category: edits[i] }, (err, res) => {
            console.log(err);
          });
          break;
        case 'description':
          Product.findByIdAndUpdate({ _id: id }, { description: edits[i] }, (err, res) => {
            console.log(err);
          });
          break;
        case 'size':
          Product.findByIdAndUpdate({ _id: id }, { size: edits[i] }, (err, res) => {
            console.log(err);
          });
          break;
        case 'price':
          var num = edits[i];
          console.log();
          var num1 = parseInt(num);
          console.log;
          Product.findByIdAndUpdate({ _id: id }, { price: num1 }, (err, res) => {
            console.log(err);
          });
          break;
      }
    }
  }
  const products = await Product.find({});
  res.redirect('back');
});

// // getting the delete agent,again will add pagnintation
// router.get('/delete', ensureAuthenticated, async (req, res) => {
//   try {
//     // getting the add page
//     const user = await User.findById({ _id: req.session.passport.user });
//     const products = await Product.find({});
//     res.render('delete.ejs', {
//       names: products,
//       isAuth: true,
//       isAdmin: user.isAdmin,
//     });
//   } catch (error) {
//     res.status(400).send(error + 'numberwang');
//   }
// });

router.post('/delete', ensureAuthenticated, async (req, res) => {
  var category;
  if (req.body.category) {
    var category = req.body.category.toString();
    var catStr = category.replace(/,/g, ' ');

    req.body.category = catStr;
  }
  if (req.body.brand) {
    var brand = req.body.brand.toString();
    var brandStr = brand.replace(/,/g, ' ');

    req.body.brand = brandStr;
  }
  if (req.body.size) {
    var size = req.body.size.toString();
    var sizeStr = size.replace(/,/g, ' ');

    req.body.size = sizeStr;
  }
  // console.log(req.body);

  var clothes = [];
  if (
    req.body.category === undefined &&
    req.body.brand === undefined &&
    req.body.size === undefined
  ) {
    const pro = await Product.find({});

    pro.forEach((n) => {
      clothes.push(n);
    });
  } else {
    console.log('i work6');

    var pro1 = await filter(req.body);
    pro1.forEach((ite) => {
      clothes.push(ite);
    });
  }

  if (req.body.delete) {
    Product.findByIdAndDelete({ _id: req.body.delete }, (err, res) => {
      console.log(res);
    });
  }
  res.redirect('/manage');
});

router.post('/featured', ensureAuthenticated, async (req, res) => {
  // console.log(req.query.featured);

  var featured = await Product.findById({ _id: req.body.featured });

  Product.findByIdAndUpdate({ _id: req.body.featured }, { featured: !featured.featured }, () => {
    console.log('worked');
  });

  res.redirect('/manage');
});

router.post('/inStock', ensureAuthenticated, async (req, res) => {
  console.log(req.query.inStock);

  var stock = await Product.findById({ _id: req.body.inStock });

  Product.findByIdAndUpdate({ _id: req.body.inStock }, { inStock: !stock.inStock }, () => {
    console.log('worked');
  });

  res.redirect('/manage');
});

router.post('/gender', ensureAuthenticated, async (req, res) => {
  console.log(req.query.gender);

  var gender = await Product.findById({ _id: req.body.gender });

  Product.findByIdAndUpdate({ _id: req.body.gender }, { gender: !gender.gender }, () => {
    console.log('worked');
  });

  res.redirect('/manage');
});

router.post("/delRev", ensureAuthenticated, async(req, res) => {
  
})
// again, checking if the user is logged in then sending back different results depending
router.get('/home', async (req, res) => {
  // console.log(req.session);

  if (req.session.passport && req.session.passport.user) {
    try {
      const user = await User.findById({ _id: req.session.passport.user });
      // retrieving only the first 5 results
      const products = await Product.find({}).limit(5);

      const categories = await Product.find({}).limit(2);

      res.send({
        pageTitle: 'welcome',
        names: products,
        query: req.query.id,
        categories: categories,
        isAuth: true,
        isAdmin: user.isAdmin,
      });
    } catch (error) {
      res.status(400).send(error + 'numberwang');
    }
  } else {
    try {
      // retrieving only the first 5 results
      const products = await Product.find({}).limit(5);

      const categories = await Product.find({}).limit(2);

      res.render('index.ejs', {
        pageTitle: 'welcome',
        names: products,
        query: req.query.id,
        categories: categories,
        isAuth: false,
        isAdmin: false,
      });
    } catch (error) {
      res.status(400).send(error + 'numberwang');
    }
  }
});

router.get('/manage1', ensureAuthenticated, async (req, res) => {
  var category;
  // console.log(localStorage)
  console.log('i work3');
  // console.log(req.query.params);

  // console.log(req.body)
  if (req.query.category) {
    var category = req.query.category.toString();
    var catStr = category.replace(/,/g, ' ');

    req.query.category = catStr;
  }
  if (req.query.brand) {
    var brand = req.query.brand.toString();
    var brandStr = brand.replace(/,/g, ' ');

    req.query.brand = brandStr;
  }
  if (req.query.size) {
    var size = req.query.size.toString();
    var sizeStr = size.replace(/,/g, ' ');

    req.query.size = sizeStr;
  }

  var clothes = [];
  if (
    req.query.category === undefined &&
    req.query.brand === undefined &&
    req.query.size === undefined &&
    req.query.skip === undefined
  ) {
    const pro = await Product.find({}).limit(16);
    // console.log(await Product.find({ category: ['shoes'], price: { $lt: '558' } }));

    pro.forEach((n) => {
      clothes.push(n);
    });
  } else {
    // console.log(await Product.find({ category: ['shoes'], price: { $lt: '558' } }));
    console.log('i work5');

    var pro1 = await filter(req.query);
    // console.log(pro1);
    pro1.forEach((ite) => {
      clothes.push(ite);
    });
  }
  res.send({
    pageTitle: 'welcome',
    names: clothes,
    query: req.query.id,
    isAuth: false,
    isAdmin: false,
  });
});
// similarly to the home page with the logged in. will add pagnintation
router.get('/store1', async (req, res) => {
  var category;
  // console.log(localStorage)
  console.log('i work3');
  console.log(req.query);

  // console.log(req.body)
  if (req.query.category) {
    var category = req.query.category.toString();
    var catStr = category.replace(/,/g, ' ');

    req.query.category = catStr;
  }
  if (req.query.brand) {
    var brand = req.query.brand.toString();
    var brandStr = brand.replace(/,/g, ' ');

    req.query.brand = brandStr;
  }
  if (req.query.size) {
    var size = req.query.size.toString();
    var sizeStr = size.replace(/,/g, ' ');

    req.query.size = sizeStr;
  }

  var clothes = [];
  if (
    req.query.category === undefined &&
    req.query.brand === undefined &&
    req.query.size === undefined &&
    req.query.skip === undefined &&
    req.query.gender === undefined
  ) {
    const pro = await Product.find({ inStock: true }).limit(16);
    // console.log(await Product.find({ category: ['shoes'], price: { $lt: '558' } }));

    pro.forEach((n) => {
      clothes.push(n);
    });
  } else {
    // console.log(await Product.find({ category: ['shoes'], price: { $lt: '558' } }));
    console.log('i work5');

    // console.log(req.query);

    var pro1 = await filter(req.query);

    pro1.forEach((ite) => {
      clothes.push(ite);
    });

    console.log(clothes);

    var skipValue = req.body.skip + 16;
    // clothes = clothes.slice(req.body.skip, skipValue);
    console.log('thats wangernumb555');
  }
  console.log('yeees');
  // console.log(JSON.stringify(clothes))

  res.send({
    pageTitle: 'welcome',
    names: clothes,
    query: req.query.id,
    isAuth: false,
    isAdmin: false,
  });
});

router.get('/recentReviews', async (req, res) => {
  var review = [];
  var proImages = [];
  const orders = await Product.find({});

  const ordersRev = orders.reverse();
  // console.log(ordersRev.length);
  for (var i = 0; i < ordersRev.length; i++) {
    // const oProducts = JSON.parse(ordersRev);

    if (ordersRev[i].reviews !== [] || ordersRev[i].image !== null ) {
      review.push(ordersRev[i].reviews);
      proImages.push(ordersRev[i].image[i]);
    }
    // console.log(oProducts.product);

    // if (oProducts[0].product) {
    //   product = await Product.findById({ _id: oProducts[0].product._id });
    // } else {
    //   product = await Product.findById({ _id: oProducts.product._id });
    // }
    // if (product !== null) {
    //   if (product.reviews[0] !== null) {
    //     console.log('here');
    //     console.log(product.reviews);
    //     proImages.push(product.image[0]);

    //     review.push(product.reviews);
    //     console.log('5');
    //     console.log(review);
    //   }
    //   console.log('6');

    //   console.log(review);
    // }
    // console.log('7');

    // console.log(review);
  }
  // console.log('8');

  // console.log(review);

  // console.log('numberwang1');

  var filtered = review.filter(function (el) {
    return el.reviews !== [] || el.reviews !== undefined;
  });

  

  console.log('number');
  // console.log(proImages);
  console.log(filtered);
  res.send({
    name: filtered,
    images: proImages,
  });
});

router.get('/featuredRows', async (req, res) => {
  var pro1 = await Product.find({ featured: true, inStock: true });
  // console.log(pro1);
  res.send({
    pageTitle: 'welcome',
    cat1: pro1,
    isAuth: false,
    isAdmin: false,
  });
});

router.get('/otherReviews', async (req, res) => {
  var revs = await Product.find({ _id: { $ne: req.query.id }, category: req.query.category });
  // console.log('number 3');
  // console.log(revs);
  res.send({
    name: revs,
  });
});

router.post('/store', async (req, res) => {
  // console.log(req.body.category)
  var category;

  console.log('i work2');
  // console.log(req.method);

  // console.log(req.body)
  if (req.body.category) {
    var category = req.body.category.toString();
    var catStr = category.replace(/,/g, ' ');

    req.body.category = catStr;
  }
  if (req.body.brand) {
    var brand = req.body.brand.toString();
    var brandStr = brand.replace(/,/g, ' ');

    req.body.brand = brandStr;
  }
  if (req.body.size) {
    var size = req.body.size.toString();
    var sizeStr = size.replace(/,/g, ' ');

    req.body.size = sizeStr;
  }

  var clothes = [];
  if (
    req.body.category === undefined &&
    req.body.brand === undefined &&
    req.body.size === undefined &&
    req.body.skip === undefined
  ) {
    const pro = await Product.find({});
    // console.log('thats wangernumb 3');
    pro.forEach((n) => {
      clothes.push(n);
    });
  } else {
    const user = await User.findById({ _id: req.session.passport.user });
    if (!user) {
      var auth = false;
      var admin = false;
    } else if (!user.isAdmin) {
      var auth = true;
      var admin = false;
    } else {
      var auth = true;
      var admin = true;
    }

    // console.log(req.body.skip)
    // console.log(req.body)
    console.log('i work5');
    // console.log(req.body);

    try {
      var pro1 = await filter(req.body);
    } catch (error) {
      console.log(error);
    }
    // console.log(pro1);
    pro1.forEach((ite) => {
      clothes.push(ite);
    });
    var skipValue = req.body.skip + 16;
    clothes = clothes.slice(req.body.skip, skipValue);
    console.log('thats wangernumb');
    // console.log(clothes);
  }
  res.send({
    pageTitle: 'welcome',
    names: clothes,
    query: req.query.id,
    isAuth: auth,
    isAdmin: admin,
  });
});

// getting individual products based on their passed in ids from the store page
router.get('/product', async (req, res) => {
  if (req.session.passport && req.session.passport.user) {
    try {
      const product = await Product.findOne({
        _id: req.query.id,
      });

      const user = await User.findById({ _id: req.session.passport.user });
      const isAdmin = user.isAdmin;
      // console.log('wangernumb 1');
      // console.log(product);

      // also returning all images which will be shown on the individual product page
      res.send({
        pageTitle: 'welcome',
        name: product,
        query: req.query.id,
        inCart: req.query.inCart,
        reviews: product.reviews,
        inStock: product.inStock,

        isAuth: true,
        isAdmin: isAdmin,
        images: product.image,
      });
    } catch (error) {
      res.status(400).send(error + 'numberwang');
    }
  } else {
    try {
      const product = await Product.findOne({
        _id: req.query.id,
      });
      // console.log('wangernumb 2');

      // console.log(product)
      res.send({
        pageTitle: 'welcome',
        name: product,
        query: req.query.id,
        inCart: req.query.inCart,
        reviews: product.reviews,
        inStock: product.inStock,
        isAuth: false,
        isAdmin: false,
      });
    } catch (error) {
      res.status(400).send(error + 'numberwang');
    }
  }
});

// posting reviews for products, pushing them onto the product review array
router.post('/reviews',  async (req, res) => {
  const star = req.body.star;
  const name = req.body.name;
  const brand = req.body.desc;
  const id = req.body.id;
  // console.log(id);
  console.log('thats numberwang');
  const review = {
    name: name,
    rating: star,
    comment: brand,
  };
  // console.log(req.body);
  const product = await Product.findById({
    _id: id,
  });
  // console.log(product);
  product.reviews.push(review);

  await product.save();

  res.redirect('/store');
});

// adding products to your cart, fairly straight forward just pushing the selected product onto your cart array
router.post('/added',  async (req, res) => {
  try {
    const newP = await Product.findOne({
      _id: req.body.id,
    });

    const user = await User.findByIdAndUpdate(
      {
        _id: req.session.passport.user,
      },
      {
        $push: {
          cart: newP._id,
        },
      }
    );
    if (!user) {
      var auth = false;
      var admin = false;
    } else if (!user.isAdmin) {
      var auth = true;
      var admin = false;
    } else {
      var auth = true;
      var admin = true;
    }
    await user.save();
    const test = await Product.findOne({
      _id: user.cart,
    });
    // console.log(test);
    // console.log(req.query.cart)

    res.redirect('/store');
  } catch (error) {
    res.status(400).send(error + 'numberwang');
  }
});

// getting the cart page. using an array to return all cart items to be displayed with ejs
router.get('/cart1', async (req, res) => {
  var fullCart = [];
  console.log('thats numberwang');
  // console.log(req.query.id);
  var id = req.query.id;
  const user = await User.findById({
    _id: id,
  });

  const isAdmin = user.isAdmin;
  // console.log(user['cart'])
  const cart = user['cart'];
  for (var i = 0; i < cart.length; i++) {
    var product = await Product.findById({
      _id: cart[i],
    });

    fullCart.push(product);
  }
  // console.log(fullCart)
  res.send({
    cart: fullCart,
    isAuth: true,
    isAdmin: isAdmin,
  });
});

// removing products from your cart. can currently only do 1 at a time with the cart.remove
router.post('/cartProduct', ensureAuthenticated, async (req, res) => {
  try {
    // const ID = req.params.id

    const newP = await Product.findOne({
      _id: req.body.id,
    });
    const user = await User.findById({
      _id: req.session.passport.user,
    });

    const cart = user.cart;

    cart.remove({ _id: req.body.id });

    console.log(cart);

    await user.save();

    // const products = await User.findByIdAndDelete({cart: req.body.id})

    // console.log(user)
    res.redirect('/store');
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/edit', ensureAuthenticated, async (req, res) => {
  const validUpdates = ['description', 'completed'];
  const updates = Object.keys(req.body);
  const isValidUpdate = updates.every((update) => {
    return validUpdates.includes(update);
  });

  if (!isValidUpdate) {
    return res.status(404).send({
      error: 'invalid update ',
    });
  }
  try {
    const ID = req.params.id;
    const products = await Product.findOne({
      _id: ID,
      owner: req.user._id,
    });

    if (!products) {
      return res.status(404).send();
    }

    updates.forEach((update) => (products[update] = req.body[update]));
    await products.save();
    res.send(products);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/product/*', (req, res) => {
  res.redirect('/store');
});

module.exports = router;
